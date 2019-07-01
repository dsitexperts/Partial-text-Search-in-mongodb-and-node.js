var Equipt = require('./models/equipt');
var express = require('express');
var router = express.Router();

module.exports = function(app) {

app.get('/', (req, res) => {
   Equipt.find().limit(6).then(Equipt => {
    res.render('index', {
      pageTitle: 'DCC',
      Equipt: Equipt
    });
  }).catch(err => {
      res.sendStatus(404);
  });

});

app.post('/search', (req, res) => {
	console.log('i am searching');
  let q = req.body.query;
  let query = {
    "$or": [{"Code": {"$regex": q, "$options": "i"}}, {"Make": {"$regex": q, "$options": "i"}}, {"Model": {"$regex": q, "$options": "i"}}]
  };
  let output = [];

  Equipt.find(query).limit(10).then( Equipt => {
      if(Equipt && Equipt.length && Equipt.length > 0) {
          Equipt.forEach(Equipt => {
            let obj = {
                id: Equipt.Code + '|' + Equipt.Make + '|' + Equipt.Model,
                label: Equipt.Code + '|' + Equipt.Make + '|' + Equipt.Model
            };
            output.push(obj);
          });
      }
      res.json(output);
  }).catch(err => {
    res.sendStatus(404);
  });


app.get('/search', (req, res) => {
	console.log('i am searching1');
	var t = req.query.q;
	var list1 = t.split("|");
	console.log(t.split("|"));
	let query1 = {"Model":list1[2],"Code":list1[0],"Make":list1[1]};
	console.log(query1);
   Equipt.find(query1).then(Equipt => {
	   	console.log(Equipt);
    res.render('product.hbs', {
       
      'Equipt': Equipt
    });
  }).catch(err => {
      res.sendStatus(404);
  });
})
});
};