var fs = require("fs");

var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;
var location_compiler = config.location_compiler;

console.log(location_compiler);

var express=require("express");
var app=express();
console.log("Server startting up");
app.post('/appdata', function (req, res) {
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



console.log("Post"+req.param('email',null));
});

app.get("/:compiler/:filename",function(req,res){
  //res.send("got a request"+req.params.compiler+" "+req.params.userId);
        
    var exec = require('child_process').exec,
    child;

child = exec(location_compiler+ req.params.compiler+' '+req.params.filename,
  function (error, stdout, stderr) {
    //console.log('stdout: '+ stdout);
 if(stderr=="")
  res.send("Compiled sucessfully");
else
    res.send('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});});
app.get("/:filename",function(req,res){
  //res.send("got a request"+req.params.compiler+" "+req.params.userId);
        
    var exec = require('child_process').exec,
    child;

child = exec('script/compiler.sh'+"./"+req.params.filename,
  function (error, stdout, stderr) {
    //console.log('stdout: '+ stdout);
 if(stderr=="")
  res.send(stdout);
else
    res.send('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});});
app.listen(port,host);



