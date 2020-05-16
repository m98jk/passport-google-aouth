const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID =
  '583043613779-98shgj49rp6s3b9vnsff0mlgec9gh57s.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'sSaqDi2KzM9bfUsAYZ2dIFIZ';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // User.findById(id, function (err, user) {
  done(null, user);
  // });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(null, profile);
      // console.log(profile);

      // });
    }
  )
);
