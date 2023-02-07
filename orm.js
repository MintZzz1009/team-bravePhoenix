// const { default: SequelizeAuto } = require("sequelize-auto/types");

// const auto = new SequelizeAuto('database', 'user', 'pass', {
//     host: 'localhost',
//     dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
//     directory: './models',
//     port: 'port',
//     caseModel: 'c',
//     caseFile: 'c',
//     singularize: true,
// })

const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto("brave_phoenix", "root", "brave_phoenix", {
      host: "express-database3.cdlyzoinjxjt.ap-northeast-2.rds.amazonaws.com",
      port: "3306",
      dialect: "mysql",
      //noAlias: true // as 별칭 미설정 여부
   }
);
auto.run((err)=>{
   if(err) throw err;
})