const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
    let token;
    const brearerHeader = req.header('authorization');
    if(brearerHeader) {
        const bearer = brearerHeader.split(' ');
        token = bearer[1];
    }
    else {
        return res.status(401).send('Access Denied');
    }
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err) {
        res.status(400).send('Invalid Token');
    }
}