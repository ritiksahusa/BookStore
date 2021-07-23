const jwt= require('jsonwebtoken');
const config= require('config');

function auth(req, res, next){
    const token= req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied, No token Provided');
                // check whether token exist or not    
    
                //console.log(jwt.verify('token', config.get('jwtPrivateKey')));
    try {
        const decoded=jwt.verify(token, config.get('jwtPrivateKey'));
                                // verify the token with key else exception
        req.user =decoded;
                        // decoded is the json object contains user details
                        // create newproperty in req and add jsonobject
        next();
    } catch (ex) {
        res.status(400).send('Invalid Token');
    }    
}

module.exports = auth;