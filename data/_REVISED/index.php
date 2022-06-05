<?php

session_start();
$_SESSION = array();

unset($_POST['ind']);
unset($_POST['auth']);

if(!isset($_POST['cust_lang']))$_POST['cust_lang']='';

$labels=array(
	"uk"=>	array(
			"head"=>"Вхід до системи моніторингу",
			"object"=>"Об'єкт",
			"select"=>"Оберіть зі списку",
			"password"=>"Код доступу",
			"submit"=>"Вхід",
			"comment"=>"Оберіть необхідний об'єкт, зазначте код рівня доступу та натисніть Вхід. Без зазначення належного коду доступу вхід буде виконано з правами Гостя. <br />Увійшовши до підсистеми можливо переглядати та змінювати дані об'єкту, згідно із чинним рівнем доступу."
		),
	"ru"=>	array(
			"head"=>"Вход в систему мониторинга",
			"object"=>"Объект",
			"select"=>"Выберите из списка",
			"password"=>"Код доступа",
			"submit"=>"Вход",
			"comment"=>"Выберите необходимый объект, введите код уровня доступа и нажмите Вход. Без указания надлежащего кода доступа вход будет выполнен на правах Гостя. <br />После входа в подсистему можно просматривать и изменять параметры объекта, согласно с действующим уровнем доступа."
		),
	"en"=>	array(
			"head"=>"Login the Monitoring System",
			"object"=>"Object",
			"select"=>"Choose from the list",
			"password"=>"Access code",
			"submit"=>"Login",
			"comment"=>"Select an Object, enter the Access code, and then click Login. Without specifying the proper Access code login will be made with the Guest access level. <br /> After logging the subsystem the viewing and modifying of object parameters are possible in accordance with the current access level."
		)

);

if ($_POST['cust_lang']==''){
	$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
	if (!in_array($lang, array_keys($labels))){$lang='en';}
}
else $lang=$_POST['cust_lang'];

$sercnf = json_decode(file_get_contents("../subs.dat"), true);
//$subs = array_keys($sercnf); 
 
?>


<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="jquery.min.js"></script>
<title>SERION System Manager Interface</title>
<link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body style="background-color:#a0a0a0;font-family:Arial,Helvetica,sans-serif,SimSun;">


<table align="center" style="width:900px;margin-top:100px;padding:3px;border-spacing:0px;text-align:left;font-size:14px;color:#f0f0f0;box-shadow: 0px 0px 7px rgba(0,0,0,0.6);background-color:#40667b;">
<tr><td style="width:750px;padding:5px;font-size:12px;background-color:#30566b;">SERION <font style="color:#90a6aa;">System Manager Interface</font></td>
<td style="width:50px;padding-right:5px;font-size:11px;background-color:#30566b;text-align:right;">
<form method="post" action="/" style="display:inline;padding:0px;">
<select name="cust_lang" onchange="this.form.submit()">
<?php 
echo $_POST['cust_lang'];
foreach($labels as $key=>$value)
	if($_POST['cust_lang']==''){
		if($key==$lang){echo '<option value="'.$key.'" selected>'.$key.'</option>';}
		else echo '<option value="'.$key.'">'.$key.'</option>';
	}
	else{
		if($key==$_POST['cust_lang']){echo '<option value="'.$key.'" selected>'.$key.'</option>';}
		else echo '<option value="'.$key.'">'.$key.'</option>';	
	}

?>
</select>
</form>
</td></tr>
<tr><td colspan="2" style="padding:30px;font-size:16px;"><?php echo $labels[$lang]["head"] ?></td></tr>
<tr><td colspan="2" style="background-color:rgb(224,117,48);text-align:center;padding:5px;width:100%;">
<form method="post" id="form" action="dtcont.php" style="display:inline;">
<div style="display:inline;padding:5px;"><?php echo $labels[$lang]["object"] ?></div>
<div style="display:inline;padding:5px;">
<select name="subsys" id="subsystemselect" style="width:400px;">
<option value="" disabled="disabled" selected><?php echo $labels[$lang]["select"] ?></option>
<?php foreach($sercnf as $key=>$value)echo '<option value="'.$key.'">'.$sercnf[$key]['description'][$lang].'</option>'; ?>
</select></div>
<div style="display:inline;padding:5px;"><?php echo $labels[$lang]["password"] ?></div>
<div style="display:inline;padding:5px;"><input type="password" id="code" name="auth"  style="width:100px;" disabled /></div>
<div style="display:inline;padding:5px;"><button value="submit" id="send" style="width:50px;" disabled><?php echo $labels[$lang]["submit"] ?></button></div>
<input type="hidden" name="ind" id="subind" />
<input type="hidden" name="lang" value="<?php echo $lang ?>" />
</form>
</td></tr>
<tr><td colspan="2" style="font-size:10px;padding:10px;color:#90a6aa;"><?php echo $labels[$lang]["comment"] ?></td></tr>
<tr><td colspan="2" style="color:#50768b;text-align:right;font-size:10px;">© Sunrise Media 2020</td></tr>
</table>
</body>
</html>

<script language="javascript">
	$(document).ready(function(){
		jQuery.fn.extend({disableSelection:function(){this.each(function(){this.onselectstart=function(){return false;};this.unselectable="on";jQuery(this).css({'-moz-user-select':'none','-o-user-select':'none','-khtml-user-select':'none','-webkit-user-select':'none','-ms-user-select':'none','user-select':'none'});});}});
		$("#subsystemselect").change(function(){
			$("#subind").attr("value",$(this).val());
			$("#send").prop('disabled', false);
			$("#code").prop('disabled', false);
		});
		if($("#subsystemselect").val()){
			$("#send").prop('disabled', false);
			$("#code").prop('disabled', false);
		}
		else{
			$("#send").prop('disabled', true);
			$("#code").prop('disabled', true);
		}
	});
</script>

<?php

$_SESSION = array();
session_destroy();

?>