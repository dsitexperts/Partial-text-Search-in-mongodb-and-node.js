var User = require('./models/user');
module.exports = function(app, passport){
	
	app.get('/', isLoggedIn, function(req, res){
		res.render('profile.ejs');
	});

}