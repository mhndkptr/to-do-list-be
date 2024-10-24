const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_JWT_SECRET,
};

passport.use(
  "user-jwt",
  new JwtStrategy(opt, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: jwtPayload.id } });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
