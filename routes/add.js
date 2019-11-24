var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('add', { message: '' });
});

router.post('/', function(req, res, next){
	//Get submitted details
	var surname = req.body.surname;
	var firstname = req.body.firstname;
	var middlename = req.body.middlename;
	var sex = req.body.sex;
	var level = req.body.level;
	var department = req.body.department;
	var faculty = req.body.faculty;

	//Connect to database
	var database = new sqlite3.Database("Database", function(error){
		if(error){
			return console.error(error.message);
		}
	});

	//Perform query
	database.serialize(function(){
		//Query statement
	    var query = "CREATE TABLE IF NOT EXISTS students(" +
                                    "surname varchar(100), " +
                                    "firstname varchar(100), " +
                                    "middlename varchar(10), " +
                                    "sex varchar(10), " +
                                    "level varchar(100), " + 
                                    "department varchar(100), " + 
                                    "faculty varchar(100) " + 
                                    ")";
		//Execute the query
		database.run(query);
		//Add the student by inserting into the database
		var statement = database.prepare("INSERT INTO students VALUES(?, ?, ?, ?, ?, ?, ?)");
		statement.run(surname, firstname, middlename, sex, level, department, faculty);
		statement.finalize( function(error){
			if(error){
				res.render('add', { message: 'Could not add student' });
			}else{
				res.render('add', { message: 'Registration successful' });
			}
		});
	});
});

module.exports = router;
