
var counter=0;
function LoadDoc(){
  
       
document.getElementById('filename').innerHTML = globalfilename;


       var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        
     if (xhttp.readyState == 4 && xhttp.status == 200) {
        
          if(counter>0)
         {
          editor.detachShareJsDoc()
            //doc.detachShareJsDoc();
         //   //doc.destroy();
          }
         alert(user+globalfilename);
          doc = sjs.get(user,globalfilename);
doc.subscribe();
doc.whenReady(function () {
  if (!doc.type) {
    doc.create('text');
  }
  if (doc.type && doc.type.name === 'text') {
    doc.attachCodeMirror(editor);
         editor.setValue(xhttp.responseText);
    counter++;
  }
});
 

          
        
          
      
  }
  
 };
var user=username[1];
var ret=searchJSONArray(globalfilename);

 if(ret!=-1)
 user=sharedjson[ret].Group;


  
  xhttp.open("POST", "/loaddoc", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("filename="+globalfilename+"&user="+user);

 //xhttp.setRequestHeader("Content-type", "/compileandexecute");
      }