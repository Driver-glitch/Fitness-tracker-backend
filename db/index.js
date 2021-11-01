// require and re-export all files in this db directory (users, activities...)
module.exports = {
    ...require("./users"),
    ...require("./activities"),
    ...require("./client"),
    ...require("./routines"),
    ...require("./routines_activities"),
  };