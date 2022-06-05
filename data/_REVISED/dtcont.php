<?php

if(!isset($_POST['ind'])||!isset($_POST['lang']))header( 'Location: /', true);

session_start();

error_reporting(error_reporting()& ~E_NOTICE);

$curr_auth_req='';
$curr_auth_lev=0;

$sercnf = json_decode(file_get_contents("../subs.dat"), true);
$sysname=$_POST['ind'];
$lang=$_POST['lang'];
$nodes=$sercnf[$sysname]['nodes'];
$host=$nodes[array_keys($nodes)[0]]['host'];
$port=$nodes[array_keys($nodes)[0]]['port'];

if(isset($_POST['auth'])){ 
	if (!$_POST['auth']){
		$curr_auth_req='';
		$curr_auth_lev=0;}
	else {
		$curr_auth_req=$_POST['auth']; 
	}
}
else{
	$curr_auth_req='';
	$curr_auth_lev=0;}

$srvsck=@fsockopen($host,$port,$errno,$errstr);
@socket_set_blocking($srvsck,true); 
$request='{"request":"checkauth","authority":"'.$curr_auth_req.'"}';
@fputs($srvsck,$request);
$srvres=json_decode(@fgets($srvsck));
@fclose($srvsck);
$curr_auth_lev=$srvres->{'data'};

$labels=array(
	"uk"=>	array(
			"wait"=>"Отримання даних. Будь ласка, зачекайте",
			"guest"=>"Гість",
			"supervisor"=>"Диспетчер",
			"engineer"=>"Інженер",
			"admin"=>"Адміністратор",
			"logout"=>"Вихід",
			"flowchart"=>"Діаграма",
			"dataarc"=>"Архів даних",
			"alarmarc"=>"Архів аварій",
			"manual"=>"Керівництво",
			"report"=>"Звіт",
			"info"=>"Довідка",
			"settings"=>"Таблиця налаштувань",
			"varreg"=>"Реєстр зінних",
			"nodes"=>"Вузли даних",
			"fault"=>"Сервер не відповідає. Будь ласка, перевірте, що сервер запущений та працює належним чином та перезавантажте сторінку."
		),
	"ru"=>	array(
			"wait"=>"Получение данных. Пожалуйста, подождите",
			"guest"=>"Гость",
			"supervisor"=>"Диспетчер",
			"engineer"=>"Инженер",
			"admin"=>"Администратор",
			"logout"=>"Выход",
			"flowchart"=>"Диаграмма",
			"dataarc"=>"Архив данных",
			"alarmarc"=>"Архив аварий",
			"manual"=>"Руководство",
			"report"=>"Отчет",
			"info"=>"Справка",
			"settings"=>"Таблица настроек",
			"varreg"=>"Реестр переменных",
			"nodes"=>"Узлы данных",
			"fault"=>"Сервер не отвечает. Пожалуйста, убедитесь, что сервер запущен и работает надлежащим образом и перезагрузите страницу."
		),
	"en"=>	array(
			"wait"=>"Receiving data. Please wait",
			"guest"=>"Guest",
			"supervisor"=>"Supervisor",
			"engineer"=>"Engineer",
			"admin"=>"Administrator",
			"logout"=>"Logout",
			"flowchart"=>"Flowchart",
			"dataarc"=>"Data Archive",
			"alarmarc"=>"Alarm Archive",
			"manual"=>"Manual",
			"report"=>"Report",
			"info"=>"Information",
			"settings"=>"Settings",
			"varreg"=>"Register Variables",
			"nodes"=>"Data Nodes",
			"fault"=>"Server is not responding. Please check the server is started and properly running and reload the page."
		)

);


?>

<!DOCTYPE html>
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
<!--[if lt IE 9]><script language="javascript" type="text/javascript" src="excanvas.js"></script><![endif]-->
</head>
<body>
<div id="WaitBlock" style="position:absolute;left:0px;top:0px;text-align:center;display:block;color:#d0d0d0;width:100%;height:100%;background-color:#000000;opacity:0.9;z-index:99;">
<p style="margin-top:25%;background-color:#101010;padding:10px;font-weight:bold;">
SERION System Manager Interface<br>
<?php 
echo $labels[$lang]['wait']; 
?>
...</p></div>

<div style="width:1000px;position:absolute;top:50px;cursor:default;font-size:11px;z-index:0;">
&nbsp;<span id="authinfo">&nbsp;SERION System Manager Interface © Sunrise Media 2021</span>
&nbsp;<span id="datetimeline"></span>
</div>
<div id="cont_head" style="width:100%;position:sticky;top:0px;padding:0px;z-index:10;box-shadow: 0 0 10px rgba(0,0,0,0.5);">
<div style="color:#FFFFFF;text-indent:20px;height:20px;padding:2px;background-color:#40667b;">
<div class="intheader" style="display:inline;">--</div>
<div style="display:inline;text-align:right;font-size:12px;color:#f0f0f0;">
<?php 
if($curr_auth_lev==0)echo "&nbsp;&nbsp;".$labels[$lang]['guest']." "; 
if($curr_auth_lev==1)echo "&nbsp;&nbsp;".$labels[$lang]['supervisor']." "; 
if($curr_auth_lev==2)echo "&nbsp;&nbsp;".$labels[$lang]['engineer']." "; 
if($curr_auth_lev==3)echo "&nbsp;&nbsp;".$labels[$lang]['admin']." "; 
?>
<div style="display:inline;cursor:pointer;color:#e0e0e0;" onClick='location.replace("dtcont.php")'>[<?php echo $labels[$lang]['logout']; ?>]</div>

</div>
</div>

<?php
if($curr_auth_lev==0){
echo "<table id=\"topmenu\">
<tr><td class=\"topmenuitm flwchrt\" id=\"flwchrt\">".$labels[$lang]['flowchart']."</td>
<td class=\"topmenuitm\" id=\"dtarc\">".$labels[$lang]['dataarc']."</td>
<td class=\"topmenuitm\" id=\"alarc\">".$labels[$lang]['alarmarc']."</td>
<td class=\"topmenuitm\" id=\"manlp\">".$labels[$lang]['manual']."</td>
<!--td class=\"topmenuitm\" id=\"infop\">".$labels[$lang]['info']."</td-->
</tr></table>
</div>
<script type=\"text/javascript\">\r\n";
echo file_get_contents($sysname."/flowchart/fnc0.js");
echo "\r\n</script>\r\n<div id=\"content\" name=\"\">\r\n</div>";}
else if($curr_auth_lev==1){
echo "<table id=\"topmenu\">
<tr><td class=\"topmenuitm flwchrt\" id=\"flwchrt\">".$labels[$lang]['flowchart']."</td>
<td class=\"topmenuitm\" id=\"dtarc\">".$labels[$lang]['dataarc']."</td>
<td class=\"topmenuitm\" id=\"alarc\">".$labels[$lang]['alarmarc']."</td>
<td class=\"topmenuitm\" id=\"manlp\">".$labels[$lang]['manual']."</td>
<!--td class=\"topmenuitm\" id=\"infop\">".$labels[$lang]['info']."</td-->
</tr></table>
</div>
<script type=\"text/javascript\">\r\n";
echo file_get_contents($sysname."/flowchart/fnc1.js");
echo "\r\n</script>\r\n<div id=\"content\" name=\"\">\r\n</div>";}
else if($curr_auth_lev==2){
echo "<table id=\"topmenu\">
<tr><td class=\"topmenuitm flwchrt\" id=\"flwchrt\">".$labels[$lang]['flowchart']."</td>
<td class=\"topmenuitm\" id=\"dtarc\">".$labels[$lang]['dataarc']."</td>
<td class=\"topmenuitm\" id=\"alarc\">".$labels[$lang]['alarmarc']."</td>
<td class=\"topmenuitm\" id=\"sysrep\">".$labels[$lang]['report']."</td>
<td class=\"topmenuitm\" id=\"manlp\">".$labels[$lang]['manual']."</td>
<!--td class=\"topmenuitm\" id=\"infop\">".$labels[$lang]['info']."</td-->
<td class=\"topmenuitm\" id=\"conftbl\">".$labels[$lang]['settings']."</td>
</tr></table>
</div>
<script type=\"text/javascript\">\r\n";
echo file_get_contents($sysname."/flowchart/fnc2.js");
echo "\r\n</script>\r\n<div id=\"content\" name=\"\">\r\n</div>";}
else if($curr_auth_lev==3){
echo "<table id=\"topmenu\">
<tr><td class=\"topmenuitm flwchrt\" id=\"flwchrt\">".$labels[$lang]['flowchart']."</td>
<td class=\"topmenuitm\" id=\"dtarc\">".$labels[$lang]['dataarc']."</td>
<td class=\"topmenuitm\" id=\"alarc\">".$labels[$lang]['alarmarc']."</td>
<td class=\"topmenuitm\" id=\"sysrep\">".$labels[$lang]['report']."</td>
<td class=\"topmenuitm\" id=\"manlp\">".$labels[$lang]['manual']."</td>
<!--td class=\"topmenuitm\" id=\"infop\">".$labels[$lang]['info']."</td-->
<td class=\"topmenuitm\" id=\"conftbl\">".$labels[$lang]['settings']."</td>
<td class=\"topmenuitm\" id=\"vregp\">".$labels[$lang]['varreg']."</td>
<td class=\"topmenuitm\" id=\"srvdt\">".$labels[$lang]['nodes']."</td>
</tr></table>
</div>
<script type=\"text/javascript\">\r\n";
echo file_get_contents($sysname."/flowchart/fnc3.js");
echo "\r\n</script>\r\n<div id=\"content\" name=\"\">\r\n</div>";}
else{
echo "<table id=\"topmenu\">
<tr><td class=\"topmenuitm flwchrt\" id=\"flwchrt\">".$labels[$lang]['flowchart']."</td>
<td class=\"topmenuitm\" id=\"dtarc\">".$labels[$lang]['dataarc']."</td>
<td class=\"topmenuitm\" id=\"alarc\">".$labels[$lang]['alarmarc']."</td>
<td class=\"topmenuitm\" id=\"manlp\">".$labels[$lang]['manual']."</td>
<!--td class=\"topmenuitm\" id=\"infop\">".$labels[$lang]['info']."</td-->
</tr></table>
</div>
<script type=\"text/javascript\">\r\n";
echo file_get_contents($sysname."/flowchart/fnc0.js");
echo "\r\n</script>\r\n<div id=\"content\" name=\"\">\r\n</div>";}
?>

<script type="text/javascript">
<!--
	jQuery.fn.extend({disableSelection:function(){this.each(function(){this.onselectstart=function(){return false;};this.unselectable="on";jQuery(this).css({'-moz-user-select':'none','-o-user-select':'none','-khtml-user-select':'none','-webkit-user-select':'none','-ms-user-select':'none','user-select':'none'});});}});
	var Nodes=JSON.parse('<?php echo json_encode($nodes); ?>');
	var SubSystem="<?php echo $sysname; ?>";
	var curr_auth_req='';
	var curr_auth_lev=0;
	var SerAll=true;
	var curr_lang="<?php echo $lang; ?>";
	$.ajax({async:false,type:"POST",url:"srvcom.php",dataType:"json",data:{"subsys":SubSystem,"request":"checkauth","authority":"<?php echo $curr_auth_req ?>","data":"","node":"<?php echo array_keys($nodes)[0]; ?>"},success:function(data){if(data['data_server']!=null){SerAll=true;curr_auth_lev=data['data_server']['data'];curr_auth_req=data['client']['request']['authority'];}else{SerAll=false;}}});
	if(SerAll){$("head").append("<script type=\"text/javascript\" src=\"general.js\"></scr"+"ipt>");}
	else{$("body").html("<br /><p style=\"color:#d03030;font-weight:bold;\"><?php echo $labels[$lang]['fault']; ?></p>");}

	$(window).resize(function(){$("#lng").css({'left':$(".intheader").width()-65});});
	$("#lng").css({'left':$(".intheader").width()-65});
-->
</script>
</body>
</html>

<?php

unset($_POST['ind']);
unset($_POST['auth']);

$_SESSION = array();
session_unset();
session_destroy();

?>

