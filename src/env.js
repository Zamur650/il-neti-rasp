const dotenv = require("dotenv");

(async () => {
  if (process.env.NODE_ENV != "production") {
    await dotenv.config();
  }
})();

module.exports = process.env;
