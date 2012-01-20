<html>
<head>
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<title>JuiPlus</title>
<link href="demo/demo.css" rel="stylesheet" type="text/css" />
<link href="styles/jquery.juiplus.css" rel="stylesheet" type="text/css" />
<link href="styles/jquery.fcbk.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" language="javascript" src="javascript/jquery.js"></script>
<script type="text/javascript" language="javascript" src="javascript/jquery.juiplus.js"></script>
<script type="text/javascript" language="javascript" src="javascript/jquery.elastic.js"></script>
<script type="text/javascript" language="javascript" src="javascript/jquery.fcbkcomplete.js"></script>
<!--[if !IE 7]>
	<style type="text/css">
		#wrap {display:table;height:100%}
	</style>
<![endif]-->
</head>
<body>
<div id="outerpage">
	<div id="main">
		<div id="topmenu">
			<div class="navigation"><h1>Jui Plus<sup>beta</sup> 0.0.1</h1>
			<a href="?j=home">Home</a> | 
			<a href="?j=screenshot">Screenshots</a> | 
			<a href="?j=document">Documents</a> | 
			</div>
		</div>
		<div id="infomenu">
			<div id="info" style="padding: 4 4 4 4;"></div>
		</div>
			<?php
			$j='info';
			if(isset($_GET['j']) ) $j = $_GET['j'];
			if($j == 'document')
			{
				include('document.php');
			}
			else if($j == 'screenshot')
			{
				include('screenshot.php');
			}
			else
			{
				include('demo.php');
			}// else for j
			?>
			</div>
		</div>
<div id="footer"><p style="text-align:center;">Onur GUZEL &copy;</p></div>
</body>
</html>
