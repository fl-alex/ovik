<?php


//$sercnf = json_decode(file_get_contents("../subs.dat"), true);
//$sysname=$_POST['ind'];
//$lang=$_POST['lang'];
//$nodes=$sercnf[$sysname]['nodes'];
//$host=$nodes[array_keys($nodes)[0]]['host'];
//$port=$nodes[array_keys($nodes)[0]]['port'];



?>


<!--
"request":"getarchive",
	"data":{
		"from":"2021-12-22 00:00:22",
		"to":"2021-12-23 15:05:22",
		"names":["Z1BACURVAL"]},
	"authority":"",
	"date":"2021-12-23 16:16:00"
-->


<DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>SERION System Manager Interface</title>
<link rel="icon" href="favicon.ico" type="image/x-icon">
<link type="text/css" rel="stylesheet" media="all" href="styles.css" />
<link type="text/css" rel="stylesheet" media="all" href="jquery.jqplot.min.css" />
<link type="text/css" rel="stylesheet" media="all" href="jquery-ui.css" />
<link type="text/css" rel="stylesheet" media="all" href="jquery-ui-timepicker-addon.min.css" />
<script type="text/javascript" src="base64.js"></script>
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="jquery-ui.js"></script>
<script type="text/javascript" src="jquery.jqplot.min.js"></script>
<script type="text/javascript" src="jquery-ui-timepicker-addon.min.js"></script>
<script type="text/javascript" src="jquery-ui-timepicker-addon-i18n.min.js"></script>
<script type="text/javascript" src="jqplot.canvasAxisLabelRenderer.js"></script>
<script type="text/javascript" src="jqplot.canvasAxisTickRenderer.js"></script>
<script type="text/javascript" src="jqplot.cursor.js"></script>
<script type="text/javascript" src="jqplot.dateAxisRenderer.js"></script>
<script type="text/javascript" src="jqplot.highlighter.js"></script>
<script type="text/javascript" src="jqplot.canvasTextRenderer.js"></script>
<script type="text/javascript" src="jqplot.canvasOverlay.js"></script>
</head>
<body>


<script type="text/javascript">

	jQuery.fn.extend({disableSelection:function(){this.each(function(){this.onselectstart=function(){return false;};this.unselectable="on";jQuery(this).css({'-moz-user-select':'none','-o-user-select':'none','-khtml-user-select':'none','-webkit-user-select':'none','-ms-user-select':'none','user-select':'none'});});}});

	$.ajax({
		async:false,
		type:"POST",
		url:"srvcom.php",
		dataType:"json",
		data:{"subsys":"subsys1","node":"mb", "request":"getarchive","authority":"1252",data:{"from":"2021-12-22 00:00:22","to":"2021-12-23 15:00:00","names":["Z2B6CURVAL"]}},
	//	data:{"from":"2021-12-22 00:00:22","to":"2021-12-23 15:00:00","names":["Z1BACURVAL"]},

		success:function(data){
			if(data['data_server']!=null){				
				console.log(data);
			}			
		}
	});
</script>
</body>
</html>

