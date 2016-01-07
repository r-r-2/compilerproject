var fs = require("fs");
var bodyParser = require('body-parser')
var express=require("express");




var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;
var location_compiler = config.location_compiler;



var app=express();
//app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
   extended: true
 })); 
//app.use(bodyParser.json()); 
console.log("Server startting up");



app.post('/code', function (req, res)
{
  console.log("Entered Writting ");
  fs.writeFile(req.body.user+"/"+req.body.filename, req.body.code,function(err){
    if (err) {
      console.log("Error Writting to file");
      throw err;
    }
     console.log("File written:"+req.body.filename);
      
  });
   //console.log("Post"+req.body.filename);
   //res.send(req.body.compiler);
});

app.post("/compileandexecute",function(req,res){
  //res.send("got a request"+req.params.compiler+" "+req.params.userId);
      console.log(" Entered compile and execute");  

    var exec = require('child_process').exec,
    child;

child = exec(location_compiler+" "+req.body.user+" "+ req.body.compiler+' '+req.body.filename,
  function (error, stdout, stderr) {
    //console.log('stdout: '+ stdout);
 if(stderr=="")
  {
    //res.send("Compiled sucessfully");
    var outputfile;
    if(req.body.compiler=="gcc"||"g++")
      outputfile="./a.out"
    child = exec('script/compiler.sh'+" "+req.body.user+" "+outputfile,
  function (error, stdout, stderr) {
    //console.log('stdout: '+ stdout);
 if(stderr=="")
  res.send(stdout);
else
    res.send('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});

  }
else
    res.send('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec eror: ' + error);
    }
});});

app.listen(port,host);



