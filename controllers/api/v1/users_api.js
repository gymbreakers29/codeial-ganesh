const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment')

module.exports.createSession = async function(req,res){
    try {
        let user = await User.findOne({email:req.body.email});
        if(!user|| req.body.password!=user.password){
            return res.json(422,{
                message:"Invalid username or password"
            })   
        }
        return res.json(200,{
            message:"Sign in successful, token",
            data: jwt.sign(user.toJSON(),env.jwt_key,{expiresIn:'100000'})
        }) 

    } catch (error) {
        console.log(error);
        return res.json(500,{
            message:"Internal server error"
        }) 
    }
}