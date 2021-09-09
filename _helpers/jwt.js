const expressJwt = require('express-jwt');

module.exports = jwt;

//JSON Web Token 
function jwt() {
    const { secret } = JSON.parse(process.env.SECRET);
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            '/login',
        ]
    });
}