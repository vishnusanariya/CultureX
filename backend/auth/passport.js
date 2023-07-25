const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User= require('../models/userSchema');
const findOrCreate = require('mongoose-findorcreate');
require('dotenv').config();
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			// console.log('profile',profile);
			User.findOrCreate({email: profile._json.email,displayName:profile._json.name}).then((res)=>{
				// console.log('prof res:',res);
				callback(null, profile);
			})
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});