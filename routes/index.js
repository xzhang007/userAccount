var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	var db = req.con;
	var data = "";

	db.query('SELECT * FROM account', function(err, rows) {
		if (err) {
			console.log(err);
		}
		var data = rows;

		// use index.ejs
		res.render('index', { title: 'Account Information', data: data});
	});
  
});

// add page
router.get('/add', function(req, res, next) {
	// user userAdd.ejs
	res.render('userAdd', { title: 'Add User'});
});

// add post
router.post('/userAdd', function(req, res, next) {
	var db = req.con;

	var sql = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	};

	// console.log(sql);
	var query = db.query('INSERT INTO account SET ?', sql, function(err, rows) {
		if (err) {
			console.log(err);
		}
		res.setHeader('Content-Type', 'application/json');
		res.redirect('/');
	});
})

	// edit page
	router.get('/userEdit', function(req, res, next) {
		var id = req.query.id;
		var db = req.con;
		var data = "";

		db.query('SELECT * FROM account WHERE id = ?', id, function(err, rows) {
			if (err) {
				console.log(err);
			}

			var data = rows;
			res.render('userEdit', { title: 'Edit Account', data: data});
		})
	})

	router.post('/userEdit', function(req, res, next) {
		var db = req.con;
		var id = req.body.id;

		var sql = {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email
		};

		var query = db.query('UPDATE account SET ? WHERE id = ?', [sql, id], function(err, rows) {
			if (err) {
				console.log(err);
			}

			res.setHeader('Content-Type', 'application/json');
			res.redirect('/');
		});
	})

	router.get('/userDelete', function(req, res, next) {
		var id = req.query.id;
		var db = req.con;

		var qur = db.query('DELETE FROM account WHERE id = ?', id, function(err, rows) {
			if (err) {
				console.log(err);
			}
			res.redirect('/');
		})
	})

module.exports = router;
