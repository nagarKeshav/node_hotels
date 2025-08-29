const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/pearson');

// Configure Local Strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      console.log("Received credentials:", username, password);
      const user = await Person.findOne({ username });
      // console.log(user);
      
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const isPasswordMatch = user.password === password;
      if (!isPasswordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

module.exports = passport;
