var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('tasklist', ['tasklist']);
var bodyParser = require('body-parser');

/* this is the route
app.get('/', function(req, res){
	res.send("hello world from the server");
});
*/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//receive the request from the browser with /tasklist as the route
app.get('/tasklist', function(req, res){
	console.log("Received an HTTP request");

	db.tasklist.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});

	/* USED TO BE THE DATA FROM THE SERVER
	 task1 = {
	 taskName: 'task1',
	 taskDescription: 'this is a task',
	 taskDueDate:'this is the due date'
	 }

	 task2 = {
	 taskName: 'task1',
	 taskDescription: 'this is a task',
	 taskDueDate:'this is the due date'
	 }

	 var tasks = [task1,task2];
	 res.json(tasks);
	 */

});


app.post('/tasklist', function(req, res){
	console.log(req.body);
	db.tasklist.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/tasklist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.tasklist.remove({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/tasklist/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	db.tasklist.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/tasklist/:id', function(req,res){
	var id = req.params.id;
	console.log(req.body.taskName);
	db.tasklist.findAndModify({query: {_id:mongojs.ObjectId(id)},
		update: {$set:{taskName:req.body.taskName, taskDescription:req.body.taskDescription, taskDueDate:req.body.taskDueDate, taskProgress:req.body.taskProgress}},
		new: true},function(err,doc){
		res.json(doc);
	});
});


app.listen(8888);
console.log("Successful response from server on port 8888");