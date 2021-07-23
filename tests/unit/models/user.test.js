const {User}= require('../../../modules/user');
const jwt= require('jsonwebtoken');//use to generate web token for json object
const config = require('config');
const mongoose= require('mongoose');
describe('user.generateWeboken',()=>{
    it('should generateweb token',()=>{
        const payload={_id: new mongoose.Types.ObjectId().toHexString(
            
        ),isAdmin:true}
        const user = new User(payload);
        const token=user.generateAuthToken();
        const decoded= jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    });
});