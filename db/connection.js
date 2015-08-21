var Sequelize = require("sequelize");

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  true //false
  });
} else {
  // the application is executed on the local machine
  sequelize = new Sequelize("postgres:///tunr_db");
}

var Artist = sequelize.import("../models/artist");
var Song = sequelize.import("../models/song");

Song.belongsTo(Artist);
Artist.hasMany(Song);

module.exports = {
  sql: Sequelize,
  do: sequelize,
  models: {
    Song: Song,
    Artist: Artist
  }
}
