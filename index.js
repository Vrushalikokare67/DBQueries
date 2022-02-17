const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// parse application/json
app.use(bodyParser.json());

//Create Database Connection
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Vrushali@123",
	database: "employeemanagesys",
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});


// creat a new Record
app.post("/api/create", (req, res) => {
	let data = { eid:req.body.eid , ename: req.body.ename,  ecode:req.body.ecode ,esalary: req.body.esalary };
	let sql = "INSERT INTO employee SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});


// show all records
app.get("/api/view", (req, res) => {
	let sql = "SELECT * FROM employee";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});


// show a single record
app.get("/api/view/:id", (req, res) => {
	let sql = "SELECT * FROM employee WHERE eid=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

//update Record
app.put("/api/update/", (req, res) => {
	let sql = "UPDATE employee SET eid='" + req.body.eid +"',ename='" + req.body.ename + "', ecode='" + req.body.ecode + "',esalary='" + req.body.esalary +"' WHERE eid=" + req.body.eid;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});


// delete the record
app.delete("/api/delete/:eid", (req, res) => {
	let sql = "DELETE FROM employee WHERE eid=" + req.params.eid + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});



app.listen(8000, () => {
	console.log("server started on port 8000...");
});




