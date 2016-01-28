// // (function() {

// // 	var link = document.getElementsByTagName("a")[0];

// // 	link.onclick = function() {

// // 		Tutsplus.ajax('files/ajax.txt', {
// // 			method: "GET",
// // 			cache: false,
// // 			complete: function(response) {
// // 				alert(response);
// // 			}
// // 		});

// // 		return false;
// // 	};
// // 	})();




// (function(){
// var link =document.getElementsByTagName("a")[0];
// link.onclick=function(){
// var xhr=new XMLHttpRequest();
// xhr.onreadystatechange = function()
// {
// if((xhr.readystate==4)&&(xhr.status==200||xhr.status==304)){
// 	console.log("inside");
// 	xhr.responseText;
// 	var d=document.getElementsByTagName("body")[0];
// 	var p= document.createElement("p");
// 	var pText=document.createTextNode(xhr.responseText);
// 	p.appendChild(pText);
// 	d.appendChild(p);
// }
// };
// xhr.open("GET","/file/a.txt");
// xhr.send(NULL);
// return false;
// };
// })();
(function ()
{
	 var link =document.getElementsByTagName("a")[0];
	 link.onclick=function(){
   guessCnt=0;
   guess="";
   server();
};
   
})();

function server()
{
   xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET","http://localhost:8001/getstring", false);
   console.log("hhhh");
   alert("hai");
   xmlhttp.onreadystatechange=function(){
         if (xmlhttp.readyState==4 && xmlhttp.status==200){
           string=xmlhttp.responseText;
           var d=document.getElementsByTagName("body")[0];
	var p= document.createElement("p");
	console.log("hhh");
	alert("hai");
	var pText=document.createTextNode(string);
	p.appendChild(pText);
	d.appendChild(p);
         }
   }
   xmlhttp.send();
}