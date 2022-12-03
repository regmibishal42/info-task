const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserModel = require('./Models/UserModel');
const {findUserById} = require('./repository/user-respository');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_HASH_KEY;

// const jwtAutherer = async (payload,done) =>{
//     console.log('Jwt authere Called');
//     const user = await UserModel.findByPk(payload.sub);
//     console.log('Payload is Here',payload.sub);
//     if(user) return done(null,user);
//     else return done(err);
// }
// const mainCalled = (passport) => {
//     console.log('JWT passport called');
//     passport.use(new JwtStrategy(opts,jwtAutherer))
// };

module.exports = function(passport){
    console.log('Verifying Token')
    passport.use(
        new JwtStrategy(opts,function(jwt_payload,done){
            console.log('JWT PAYLOAD',jwt_payload);
            findUserById(jwt_payload.sub)
                .then((user)=> {
                    if(user) return done(null,user);
                    else return done(null,false);
                })
                .catch((error)=> {
                    console.log('Catch Error',error);
                    return done(error,false);
                })
            
        })
    );
};