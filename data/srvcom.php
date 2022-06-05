<?php
$sercnf = json_decode(file_get_contents("../subs.dat"), true);
//$sysname=substr(dirname(dirname($_SERVER['PHP_SELF'])),1);

$sysname=$_POST['subsys'];
$descr=$sercnf[$sysname]['description'];
$nodes=$sercnf[$sysname]['nodes'];


$response=array();

if(empty($_POST)){echo '<!DOCTYPE html>
<html><title>Serion</title>
<body style="background-color:#808080;font-family:Tahoma;">
<div style="font-size:14px;color:#FFFFFF">Serion System Manager<br />interface port repeater</div>
<p style="font-size:12px;color:#B0B0B0;">Please send a proper request</p></body></html>';}
else{

$node=$_POST['node'];

$host=$nodes[$node]['host'];
$port=$nodes[$node]['port'];
$lines=$nodes[$node]['lines'];

$srvsck=@fsockopen($host,$port,$errno,$errstr);
@socket_set_blocking($srvsck,true); 

@fputs($srvsck,json_encode($_POST));

$srvres=@fgets($srvsck);

if(!$srvres){$response=json_decode('{"data_server":null}',true);}
else{$response=json_decode('{"data_server":'.$srvres.'}',true);}
@fclose($srvsck);
$addata=array(
	'subsys'=>array(
		'description'=>$descr,
		'nodes'=>$nodes
	),
	'socket'=>array(
		'errno'=>$errno,
		'errstr'=>$errstr//iconv('windows-1251','utf-8',$errstr)
	),
	'client'=>array(
		'browser'=>$_SERVER['HTTP_USER_AGENT'],
		'address'=>$_SERVER['REMOTE_ADDR'],
		'port'=>$_SERVER['REMOTE_PORT'],
		'request'=>$_REQUEST
	),
	'http_server'=>array(
		'name'=>$_SERVER['SERVER_NAME'],
		'address'=>$_SERVER['SERVER_ADDR'],
		'port'=>$_SERVER['SERVER_PORT'],
		'protocol'=>$_SERVER['SERVER_PROTOCOL'],
		'software'=>$_SERVER['SERVER_SOFTWARE']
	)
);

echo json_encode(array_merge_recursive($addata,$response));}
?>