const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

module.exports = authenticate;


//Check database if provided admin credentials are correct and return token 
async function authenticate({ login, password }) {

    const admin = await Admin.findOne({ login: login });
    if (!admin) throw "Login not found";
    const hash = admin.passwordHash;
    var bcryptResult = false;
    var token = '';

    await bcrypt.compare(password, hash).then((result) => {
        if (result) {
            token = jwt.sign({ sub: admin.login }, JSON.parse(process.env.SECRET).secret, {expiresIn: '1h'});
            bcryptResult = true;
        }
    })

    if (bcryptResult) {
        
        console.log("Login successful");
        return {
            token
        }
    } else throw "Error authenticating";
}


