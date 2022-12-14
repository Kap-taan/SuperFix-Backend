const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel')

const requireEmployeeAuth = async (req, res, next) => {

    // Extracting the Bearer Token
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token is required" });
    }

    const token = authorization.split(' ')[1];


    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await Employee.findOne({ _id }).select('_id');
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized" })
    }

}