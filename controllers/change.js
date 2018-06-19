var express = require("express");
var app = express();
var port = 3000;
var MongoClient = require('mongodb').MongoClient;

// database
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/login-details");

var nameSchema = new mongoose.Schema({
name: String,
 pwd: String
});

var User = mongoose.model("User", nameSchema);


//

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
 res.sendFile("/root/18thjune/final/index.html");
});

app.get("/view/signup.html", (req, res) => {
 res.sendFile("/root/18thjune/final/view/signup.html");
});

app.get("/view/login.html", (req, res) => {
 res.sendFile("/root/18thjune/final/view/login.html");
});


app.post("/signup", (req, res) => {
// res.end("hello");
	var myData = new User(req.body);
	 myData.save()
	 .then(item => {
	 res.send("item saved to database");
	 })
	 .catch(err => {
	 res.status(400).send("unable to save to database");
	 });

});

app.post("/login", (req, res) => {

//

var url = "mongodb://localhost:27017/";
var user_pass;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("login-details");
  dbo.collection("users").findOne({"name":req.body.name}, function(err, result) {
    if (!result) {//throw err;
		res.send("wrong username");
	}
	else{
	//console.log(err);
        user_pass=result['pwd'];
        console.log('pass'+user_pass+'pass2'+req.body.pwd);
        console.log(result);
        if(req.body.pwd==user_pass)
                res.send("hello "+req.body.name);
        else
                res.send("wrong pssword");
	}
    db.close();
  });
});
});



 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});

