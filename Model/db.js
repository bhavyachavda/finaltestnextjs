var mysql = require("mysql");

var con = mysql.createConnection({
  host: "192.168.2.8",
  user: "trainee",
  password: "trainee@123",
  database: "trainee",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected");
});

const queryRunner = (query) => {
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export default {queryRunner};
