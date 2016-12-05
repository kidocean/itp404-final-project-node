var express = require('express')
var app = express()
var Sequelize = require('sequelize');
var cors = require('cors');
var bodyParser = require('body-parser');

var DB_NAME = 'chikwok_relief';
var DB_USER = 'chikwok';
var DB_PASSWORD = '2891071516';
var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: 'vps.uscitp.com'

});

var Country = sequelize.define('country', {
  Startdate: {
    type: Sequelize.STRING
  },
  Country: {
    type: Sequelize.STRING
  },
  Location: {
    type: Sequelize.STRING
  },
  Disastertype: {
    type: Sequelize.STRING
  },
  Totaldeaths: {
    type: Sequelize.INTEGER
  }
  },{
  timestamps: false

});

app.use(cors());
app.use(bodyParser());

// app.get('/', function (request, response) {
//   var promise = Country.findAll();
//
//   promise.then(function(c){
//     response.json({
//       data:c
//     });
//   });
// })

app.get('/search/:id', function (request, response){
var promise =  Country.findAll({
    where: {
       country: {
         $like: '%' + request.params.id +'%'
       }
}
});
promise.then(function(Country){
    response.json({
    data: Country
    });
  });
});

app.get('/searchdisaster/:id', function (request, response){
var promise =  Country.findAll({
    where: {
       Disastertype: {
         $like: '%' + request.params.id +'%'
       }
}
});
promise.then(function(Disaster){
    response.json({
    data: Disaster
    });
  });
});

app.get('/searchlocation/:id', function (request, response){
var promise =  Country.findAll({
    where: {
       Location: {
         $like: '%' + request.params.id +'%'
       }
}
});
promise.then(function(Location){
    response.json({
    data: Location
    });
  });
});


app.listen(process.env.PORT || 3000)
