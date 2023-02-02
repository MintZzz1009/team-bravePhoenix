const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto("brave_phoenix", "root", "12345678", {
    host: "express-database.cdlyzoinjxjt.ap-northeast-2.rds.amazonaws.com",
    port: "3306",
    dialect: "mysql",
    //noAlias: true
}
);
auto.run((err) => {
    if (err) throw err;
})