const passport = require('passport')
const db = require('./models/index')
const config = require('./config/config')
const  JwtStrategy = require('passport-jwt').Strategy,
 ExtractJwt = require("passport-jwt").ExtractJwt


module.exports = () => {
    const params = {
        secretOrKey: config.development.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new JwtStrategy(params, (payload, done) => {
    
    db.users.findOne({id: payload.id})
    .then(user => {
     if(user){
            return done(null, {id: user.id,
            email: user.email
        });
    }
     return done(null, false);
    })
    .catch(error => 
        done(error, null))
   })
    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize()
        },
        authenticate: () => {
        return passport.authenticate("jwt", config.development.jwtSession);
        }
    } 
}