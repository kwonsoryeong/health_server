const path = require('path');
const Sequelize = require('sequelize');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize); //회원
db.Exercise = require('./exercise')(sequelize, Sequelize); //운동
db.AssignExercise = require('./assignExercise')(sequelize, Sequelize); //운동 배정
db.ExerciseLink = require('./exerciseLink')(sequelize, Sequelize); //운동 링크
db.ExercisePack = require('./exercisePack')(sequelize, Sequelize); //운동 묶음
db.Sales = require('./sales')(sequelize, Sequelize); //매출
db.Manager = require('./manager')(sequelize, Sequelize); //매니저(로그인정보)

module.exports = db;
