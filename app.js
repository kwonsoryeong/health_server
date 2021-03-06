const express = require('express')
const session = require('express-session')
//const FileStore = require('session-file-store')(session);

const app = express()
//var MySQLStore = require('express-mysql-session')(session)
/*var options ={                
    host: 'localhost',
    port: 3306,
    user: '',
    password: '',
    database: ''
};*/
//var sessionStore = new MySQLStore(options);  

app.use(session({ 
    secret: 'kwonsoryeong1113',
    resave: false, 
    saveUninitialized: true,
    //store: new FileStore(),
    //OR
    //store: sessionStore
}));

//const port = 3002
const port = 3000

const routers = require('./api/api')
var sequelize = require('./models').sequelize; // sequelize require

sequelize.sync(); 

var cors = require('cors')
var bodyParser = require('body-parser')

//도메인에게 XHR 요청 설정, 모든 api에 cors 허용함


app.use(cors({
    origin: true,
    credentials: true
  }))

//POST body 등을 편리하게 추출하기 위함
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

//api routes
app.use(routers.customer);
app.use(routers.customerenter);
app.use(routers.exercise);
app.use(routers.assignexercise);
app.use(routers.exerciselink);
app.use(routers.exercisepack);
app.use(routers.sales);
app.use(routers.manager);
app.use(routers.inbody);

//app.use(routers.bible);
//app.use(routers.quotation);

app.listen(port, () => console.log(`API Server listening on port ${port}`))


process.on('uncaughtException', (err) => {
    console.error("Server uncaughtException : Catch");
    console.error(err);
    process.exit(1);
});
