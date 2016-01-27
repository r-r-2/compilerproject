function iFrameOn(){

richTextfield.document.designMode='On';
}

function submit_form()
{
var theForm=document.getElementById("myform");
theForm.elements["mytextarea"].value= window.frames['richTextfield'].document.body.innerHTML;
theForm.submit();

}