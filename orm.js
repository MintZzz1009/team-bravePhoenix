const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto("brave_phoenix", "root", "brave_phoenix", {
      host: "express-database3.cdlyzoinjxjt.ap-northeast-2.rds.amazonaws.com",
      port: "3306",
      dialect: "mysql",
      //noAlias: true
   }
);
auto.run((err)=>{
   if(err) throw err;
})