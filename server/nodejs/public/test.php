
<!DOCTYPE html>
<html>
<head>
<title>Test</title>
 <meta name="description" content="Test webpage" />
  <meta name="keywords" content="test" />
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <link rel="stylesheet" type="text/css" href="css/style.css" />
  <!-- modernizr enables HTML5 elements and feature detects -->
  <script type="text/javascript" src="js/modernizr-1.5.min.js"></script>
  <script type="text/javascript" src="js/textarea.js"></script>
</head>
<body onLoad="iFrameOn();">
  <div id="main">
    <header>
      <div id="logo">
        <div id="logo_text">
            <h1><a href="index.html">Online Compiler With version control<span class="logo_six">_1.0</span></a></h1>
       
  </div>
      </div>
      <nav>
        <div id="menu_container">
          <ul class="sf-menu" id="nav">
            <li><a href="#">Home</a></li>
           
            <li><a href="#">Details</a></li>
            <li><a href="#">Drop down</a>
              <ul>
                <li><a href="#">Drop down</a></li>
                <li><a href="#">Drop Down Two</a>
                  <ul>
                    <li><a href="#">Sub Drop Down One</a></li>
                    <li><a href="#">Sub Drop Down Two</a></li>
                    <li><a href="#">Sub Drop Down Three</a></li>
                    <li><a href="#">Sub Drop Down Four</a></li>
                    <li><a href="#">Sub Drop Down Five</a></li>
                  </ul>
                </li>
                <li><a href="#">Drop Down Three</a></li>
                <li><a href="#">Drop Down Four</a></li>
                <li><a href="#">Drop Down Five</a></li>
              </ul>
            </li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
      </nav>
    </header>
    <div id="site_content">
      <div id="sidebar_container">
        
        <div class="sidebar">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="#">First Link</a></li>
            <li><a href="#">Another Link</a></li>
            <li><a href="#">And Another</a></li>
            <li><a href="#">Last One</a></li>
          </ul>
        </div>
       
      </div>
      <div class="content">
        <form action="my_parse_file.php" name="myform" id="myform" method="post">
<p>Title: <input name="title"id="title" size="50" maxlength="80"/></p>
<p>Code: <br>
  <textarea style="display:none;"name="mytextarea"id="mytextarea" cols="100" rows="14"></textarea>
  <iframe name="richTextfield" id="richTextfield" style="width:650px ;height:300px"></iframe>
</p>
<input name="btn" type="button" value="Submit code" onClick="javascript:submit_form();"/>
</form>
     </div>
    </div>
   
  </div>


  <p>&nbsp;</p>
  <!-- javascript at the bottom for fast page loading -->
  <script type="text/javascript" src="js/jquery.js"></script>
  <script type="text/javascript" src="js/jquery.easing-sooper.js"></script>
  <script type="text/javascript" src="js/jquery.sooperfish.js"></script>
  <script type="text/javascript">
    $(document).ready(function() {
      $('ul.sf-menu').sooperfish();
    });
  </script>
</body>
</html>
