var http = require('http');
var Duplex = require('stream').Duplex;
var browserChannel = require('browserchannel').server;
var express = require('express');
var livedb = require('livedb');
var sharejs = require('share');
//var shareCodeMirror = require('..');
var mysql = require("mysql");
var bodyParser = require('body-parser')
var fs = require("fs");
var session = require('express-session');
var backend = livedb.client(livedb.memory());
var share = sharejs.server.createClient({backend: backend});

var app = express();
var favicon = require('serve-favicon');
 
var app = express();
app.use(favicon('./favicon.ico'));
app.use(express.static(__dirname));
app.use(session({secret: 'ssshhhhh'}));
//app.use(express.static(shareCodeMirror.scriptsDir));
app.use(express.static(__dirname + '/../node_modules/codemirror/lib'));
app.use(express.static(sharejs.scriptsDir));
app.use(browserChannel(function (client) {
  var stream = new Duplex({objectMode: true});
  stream._write = function (chunk, encoding, callback) {
    if (client.state !== 'closed') {
      client.send(chunk);
    }
    callback();
  };
  stream._read = function () {
  };
  stream.headers = client.headers;
  stream.remoteAddress = stream.address;
  client.on('message', function (data) {
    stream.push(data);
  });
  stream.on('error', function (msg) {
    client.stop();
  });
  client.on('close', function (reason) {
    stream.emit('close');
    stream.emit('end');
    stream.end();
  });
  return share.listen(stream);
}));
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
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




var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/favicon.ico'));
//app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
   extended: true
 })); 
app.use(express.static(__dirname + '/public'));

//app.use(bodyParser.json()); 

console.log("Server starting up");
app.get('/check', function(req,res) {
 console.log("here");
  res.send('sucessjjj');
});

app.get('/icontest', function(req,res) {
	console.log("here");
  res.sendFile('/home/suraj/Desktop/compilerproject/server/nodejs/compiler/favicon.ico');
});
app.post('/login', function (req, res)
{
  console.log("here");
sess=req.session;
sess.email=req.body.username;
console.log("username:"+sess.email);
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

app.post('/filelist', function (req, res)
{
 sess=req.session;
console.log("email"+sess.email);
if(sess.email)
{

 var returnstring="failure";
  var username=req.body.username;
    

   var exec = require('child_process').exec,
    child;

child = exec("script/filelist.sh"+" "+username+" ",
  function (error, stdout, stderr) {
    if(error)
     { res.send("error file list");
   console.log(error);
 } 
    else
      {
        console.log("List "+stdout);
        res.send(stdout);
}  
});
}
else
console.log("Not logged in");
});

app.post('/undo', function (req, res)
{

 var returnstring="failure";
  var username=req.body.user;
    

   var exec = require('child_process').exec,
    child;
var foldername=req.body.filename.split(".");
child = exec("script/compiler.sh"+" "+username+" "+" "+foldername[0]+" "+"git"+" "+"log"+" "+"--pretty=oneline"+" "+req.body.filename,
  function (error, stdout, stderr) {
    if(error)
     { res.send("error file list");
   console.log(error);
 } 
    else
      {
        console.log("List "+stdout);
        res.send(stdout);
}  
});
});

app.post('/signup', function (req, res)
{

 var returnstring="failure";
  var username=req.body.username;
   var password=req.body.password;
var email=req.body.email;
username="'"+username+"'";
email="'"+email+"'";
password="'"+password+"'";
  console.log(username);   

   var exec = require('child_process').exec,
    child;

child = exec("script/signup.sh"+" "+username,
  function (error, stdout, stderr) {
    if(error)
     { res.send("error file creation");
   console.log(error);
 } 
    else
      {
        con.query("insert into login  values ("+username+","+password+","+email+")",function(err,rows){
       if(err) {
        console.log(err);
        res.send(err);
      }
        res.send("sucess");
      
      
   });


}  
});
});
app.post('/newfile', function (req, res)
{

 var returnstring="failure";
  var username=req.body.username;
var filename=req.body.filename;
        var foldername=req.body.filename.split(".");



  console.log("username :"+username+"filename:"+filename+foldername[0]);   

   var exec = require('child_process').exec,
    child;

child = exec("script/createfile.sh"+" "+username+" "+" "+foldername[0]+" "+filename,
  function (error, stdout, stderr) {
    if(error)
     { 
     res.send("error file creation");
     console.log(error);
 } 
    else
      {
        
        res.send("sucess file creation");
      
      
   



      
      
   


}  
});

});
app.post('/share', function (req, res)
{
  console.log("Entered Sharing ");
var exec = require('child_process').exec,
    child,child2;
var sharedfoldername="group1",shareduser="rahul";
var filename2=req.body.filename.split('.');
child = exec("script/signup.sh"+" "+sharedfoldername+" "+"mv"+" "+req.body.user+"/"+filename2[0]+" "+sharedfoldername+"/"
,
  function (error, stdout, stderr) {
    if(error)
     { res.send("error file creation");
   console.log(error);
 } 
    else
      {



        fs.appendFileSync(req.body.user+"/"+"sharedetails.json", req.body.details);
 fs.appendFile(shareduser+"/"+"sharedetails.json", req.body.details,function(err){
    if (err) {
      console.log("Error Writing to file");
      throw err;
    }

     res.send("Sucess");
 
      
  });


}  
});

   });

app.post('/code', function (req, res)
{
  console.log("Entered Writing ");
var foldername=req.body.filename.split(".");
  fs.writeFile(req.body.user+"/"+foldername[0]+"/"+req.body.filename, req.body.code,function(err){
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
  console.log("In loaddoc");
var foldername=req.body.filename.split('.');
  res.sendFile("/home/nis/Desktop/compilerproject/server/nodejs/"+req.body.user+"/"+foldername[0]+"/"+req.body.filename);

});
app.post("/commit",function(req,res){
  console.log("In Commit");
  console.log(req.body.user+req.body.filename);
  var exec = require('child_process').exec,
    child;
var foldername=req.body.filename.split(".");
console.log("folder"+foldername[0]);
child = exec("script/compiler.sh"+" "+req.body.user+" "+foldername[0]+" "+"git"+" "+"add"+" "+req.body.filename,
  function (error, stdout, stderr) {
    if(error)
     { res.send("error file git add");
   console.log(error);
 } 
    else
      {
        
console.log("Sucess add");
child = exec("script/compiler.sh"+" "+req.body.user+" "+foldername[0]+" "+"git"+" "+"commit "+" "+"-m "+" " +"'test'",
  function (error, stdout, stderr) {
    if(error)
     { res.send("error file git commit");
   console.log(error);
 } 
    else
      {
        
console.log("Sucess commit");

}  

  
});
 } //res.sendFile("/home/suraj/Desktop/compilerproject/server/nodejs/"+req.body.user+"/"+req.body.filename);
});
});
app.post("/revert",function(req,res){
  console.log("In revert");
  console.log(req.body.user+req.body.filename);
  var exec = require('child_process').exec,
    child;
var foldername=req.body.filename.split(".");
console.log("folder"+foldername[0]);
child = exec("script/compiler.sh"+" "+req.body.username+" "+foldername[0]+" "+"git"+" "+"checkout"+" "+req.body.commitid,
  function (error, stdout, stderr) {
    if(error)
     { res.send("error file git checkout");
   console.log(error);
 } 
    else
      {
        res.send("sucess");
console.log("Success");
}  

  
 //res.sendFile("/home/suraj/Desktop/compilerproject/server/nodejs/"+req.body.user+"/"+req.body.filename);
});
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

var server = http.createServer(app);

//server.listen(7007,host);
server.listen(7007,"localhost");
