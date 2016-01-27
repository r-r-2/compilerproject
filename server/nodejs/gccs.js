var fs = require("fs");
var bodyParser = require('body-parser')
var express=require("express");

var mysql = require("mysql");

var app=express();



var con = mysql.createConnection({
  host: "localhost",
  user: "root"d,
  password: "root",
    database: "compilerproject",
  port: '/var/run/mysqld/mysqld.sock'    
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
 
  

});




var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;
var location_compiler = config.location_compiler;



'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
      host=iface.address;
    }
    ++alias;
  });
});





//app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
   extended: true
 })); 
app.use(express.static(__dirname + '/public'));

//app.use(bodyParser.json()); 

console.log("Server starting up");

//app.get('/', function(req,res) {
  //res.sendfile('connect.html');
//});
app.post('/login', function (req, res)
{
  console.log("here");
 var returnstring="failure";
  var username=req.body.username;
   var password=req.body.password;
   con.query('SELECT password FROM login where username="'+username+'"',function(err,rows){
  //if(err) throw err;
  if(rows[0]!=null){
console.log(password+","+rows[0].password)
  if(password==rows[0].password)
    returnstring="sucess";
 }
   //res.send("valid");
  //  else
  //   res.send("invalid");//    con.end(function(err) {
//     console.log('Connection Terminatting');
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
// });
   res.send(returnstring);
  
//res.sendFile("/home/suraj/Desktop/compilerproject/server/nodejs/public/compiler/coder.html");

});
 
  
   //console.log("Post"+req.body.filename);
   //res.send(req.body.compiler);
});
app.post('/code', function (req, res)
{
  console.log("Entered Writing ");
  fs.writeFile(req.body.user+"/"+req.body.filename, req.body.code,function(err){
    if (err) {
      console.log("Error Writing to file");
      throw err;
    }
    var date=new Date();
     console.log("File written:"+req.body.filename+ " at:"+date);
     res.send("Sucess");
      
  });
   //console.log("Post"+req.body.filename);
   //res.send(req.body.compiler);
});
app.post("/loaddoc",function(req,res){
  res.sendFile("/home/suraj/Desktop/compilerproject/server/nodejs/"+req.body.user+"/"+req.body.filename);

});
app.post("/compileandexecute",function(req,res){
  //res.send("got a request"+req.params.compiler+" "+req.params.userId);
      console.log(" Entered compile and execute");  
fs.writeFileSync(req.body.user+"/a.in", req.body.input);
    var exec = require('child_process').exec,
    child;

child = exec(location_compiler+" "+req.body.user+" "+ req.body.compiler+' '+req.body.filename,
  function (error, stdout, stderr) {
    //console.log('stdout: '+ stdout);
 if(stderr=="")
  {
    //res.send("Compiled sucessfully");
    var outputfile;
    if(req.body.compiler=="gcc")
     {
      console.log("Entered gcc and g++ execution part"+ req.body.compiler);
      outputfile="./a.out ";
     }
     else
      if(req.body.compiler=="javac"){
        console.log("Entered java execution part");
        var filename=req.body.filename.split(".");
        outputfile=filename[0];
    }
       inputfile="a.in"
    child = exec('script/execute.sh'+" "+req.body.user+" "+" "+req.body.compiler+" "+outputfile+" "+inputfile ,
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
});
});

app.listen(port,host);
app.listen(port,"localhost");




