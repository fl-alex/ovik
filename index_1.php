<?php header('Access-Control-Allow-Origin: *'); ?>
<DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>SERION System Manager Interface</title>
<link rel="icon" href="favicon.ico" type="image/x-icon">
<!--link type="text/css" rel="stylesheet" media="all" href="styles.css" /-->
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
<!--script type="text/javascript" src="jqplot.canvasTextRenderer.js"></script>
<script type="text/javascript" src="jqplot.canvasOverlay.js"></script-->
</head>

<!--STYLE>

    table {
        font-size: 11px;
        line-height: 11px;
    }
    
    td {
      padding: 1px;
    }
       
    
   td input{
        margin: 1px;
        height: 10px;
    }
    
</style-->

<body>
    
   <h3>Архив данных температуры и влажности Склада готовой продукции ПрАТ "ДКПК"</h3>
   
    
  <p>Выберите датчик и укажите период не более трех месяцев</p>
  <table>
      <THEAD>      
          <th>Влажность</th>
          <th>Температура</th>      
        </THEAD>
        <tr>
            <td><input type="radio" id="h1" name="sensor" value="SP01AIRHMD" checked><label for="SP01AIRHMD">Датчик №1</label></td>
            <td><input type="radio" id="t1" name="sensor" value="SP01AIRTMP" checked><label for="SP01AIRTMP">Датчик №1</label></td>
        </tr>
        <tr>
            <td><input type="radio" id="h2" name="sensor" value="SP02AIRHMD" checked><label for="SP02AIRHMD">Датчик №2</label></td>
            <td><input type="radio" id="t2" name="sensor" value="SP02AIRTMP" checked><label for="SP02AIRTMP">Датчик №2</label></td>
        </tr>
        <tr>
            <td><input type="radio" id="h3" name="sensor" value="SP03AIRHMD" checked><label for="SP03AIRHMD">Датчик №3</label></td>
            <td><input type="radio" id="t3" name="sensor" value="SP03AIRTMP" checked><label for="SP03AIRTMP">Датчик №3</label></td>
        </tr>
  </TABLE>
  
  <br>
  <div id="iii">
  <input type="datetime-local" id="date_start" name="date_start" />    
    <input type="datetime-local" id="date_end" name="date_end" />
  </div>
  <div>
      <br>
    <button type="submit" id="send">Submit</button>
  </div>
  

   
    
    <DIV id="result" ></DIV>         

   
    
    
    
<script type="text/javascript">


    $("#send").on("click", function(){
       
    ddd =$("#date_start").val();
    ddd2 =$("#date_end").val();
    
    var d1 ="";    
    var d2 ="";
    var count_date ={};
    var data_object = new Map();
    var data_sums = new Map();
    var data_pure_object = {};        
    var date_array=[];
    var sensor = $('input[name=sensor]:checked').val();
    var sensor_type = sensor.substring(sensor.length - 3);
    
    d1 +=ddd.substring(0,10);    
    d1 +=" "+ddd.substring(11,16);    
    
    ddd2 =$("#date_end").val();
    
    d2 +=ddd2.substring(0,10);    
    d2 +=" "+ddd2.substring(11,16);    
       
        $("#result").empty();
        $("#result").append("<br>"+sensor);
	$("#result").append("<br>"+d1);
        $("#result").append("<br>"+d2);
        
        $("#result").append("<br>Получение данных. Ожидайте...");   
       

	
//             $.ajax({
//		async:false,
//		type:"POST",                
//		url:"http://169.254.234.252:160/srvcom.php",
//		dataType:"json",
//		data:{"subsys":"subsys1",
//                        "node":"mb", 
//                        "request":"getarchive",
//                        "authority":"1252",
//                              "data":{"from":d1,
//                                    "to":d2,
//                                    "names":[sensor]}
//                    },	
//
//		success:function(data){  
//                    var tmp_date="";
//                    $("#result").empty();
//                    $("#result").append("<br>");
//    			if(data['data_server']!==null){								
//                                $.each(data['data_server']['data'],function(i){                                    
//                                    $.each(this,function(key, value){
//                                        data_object.set(key,Number(value).toFixed(2));                                        
//                                        //let curDate = new Date(key);
//                                        //let pure_date = curDate.toISOString().split('T')[0];
//                                        // из строки датавремя выделяем только дату в формате гггг-мм-дд 
//                                        // и записываем ее как ключ массива, т.о. получим массив с УНИКАЛЬНЫМИ значениями дат,
//                                        // в значение массива пишем чистый вывод датавремя:
//                                        //date_array.push(pure_date); 
//                                        //data_pure_object[pure_date] = value;
//                                        
//                                                                                
////                                        if(Date(pure_date) !== Date(tmp_date)){
////                                            console.log("!=="+tmp_date+"_____"+pure_date+"-->"+value);
////                                            data_sums.set(pure_date, value);
////                                            tmp_date = pure_date;
////                                        }
////                                        else {
////                                            console.log("!=="+tmp_date+"_____"+pure_date+"-->"+value);
////                                            data_sums.set(pure_date, data_sums[pure_date]+value);
////                                            tmp_date = pure_date;
////                                        }
//                                        
//                                        if(sensor_type=="TMP"){
//                                            $("#result").append(key+"  "+value+"&#176;C<br>");
//                                        }
//                                        else {
//                                            $("#result").append(key+"  "+value+"%<br>");
//                                        }
//                                            
//                                    });
//                                });                                
//			}	
//                        //date_array.forEach(function (x) { 
//                           //count_date[x] = (count_date[x] || 0) + 1;
//                           //console.log(x);
//                        //});
//                        //console.log(count_date);
//                        //$.each(count_date,function(key, value){                            
//                           //console.log(key +":"+value); 
//                        //});
//                        var cur_date;
//                        var counter=0;
//                        data_object.forEach(function (value, key) {
//                            //let curDate = new Date(key);
//                            //let pure_date = curDate.toISOString().split('T')[0];
//                            cur_date = key.substring(0,10);
//                            if (counter = 0){
//                                tmp_date = cur_date;
//                                data_sums.set(tmp_date, Number(value).toFixed(2));
//                                counter = counter + 1;
//                            }
//                            
//                            else{                                
//                                    data_sums.set(tmp_date, data_sums[tmp_date]+Number(value).toFixed(2));
//                                    counter = counter + 1;                                
//                            }
//                            
//                            console.log(key+"=="+tmp_date+"---"+value);                            
//                                 
//                        });
//                        
//                        console.log(data_sums);
//                        console.log(data_object);
//                        
//                        
//		}
//	});
        



// Пример отправки POST запроса:

//async function postData(url = 'http://169.254.234.252:160/srvcom.php', data = {}) 
//                        {
//                            // Default options are marked with *
//                            const response = await fetch(url, {
//                              method: 'POST', // *GET, POST, PUT, DELETE, etc.
//                              mode: 'no-cors', // no-cors, *cors, same-origin
//                              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//                              credentials: 'include', // include, *same-origin, omit
//                              headers: {
//                                'Content-Type': 'json'
//                                //'Content-Type': 'application/x-www-form-urlencoded',
//                              },
//                              redirect: 'follow', // manual, *follow, error
//                              referrerPolicy: 'no-referrer', // no-referrer, *client
//                              //body: JSON.stringify(data) // body data type must match "Content-Type" header
//                              body: {subsys:"subsys1", node:"mb", request:"getarchive", authority:"1252", data:{from:d1, to:d2, names:[sensor]}} // body data type must match "Content-Type" header
//                            });
//                            //return await response.json(); // parses JSON response into native JavaScript objects
//                            return await response.json(); // parses JSON response into native JavaScript objects
//                       }
//
//postData(
//        )
//  .then((data) => {
//    console.log(data); // JSON data parsed by `response.json()` call
//  });
//	
        
//   var data = {"subsys":"subsys1", "node":"mb", "request":"getarchive", "authority":"1252", "data":{"from":d1, "to":d2, "names":[sensor]}};
//fetch("http://169.254.234.252:160/srvcom.php",{ 
//    method: "POST",
//    headers: 'Content-Type': 'json',
//    body:  JSON.stringify(data)
//})
//.then(function(response){ 
//    return response.json(); 
//})
//.then(function(data){ 
//    console.log(data);
//});
    
  
//var data = new Map([
//  ['from',  d1],
//  ['to',    d2],
//  ['names', sensor]
//]);
var from, to, names;
  
var payload = {subsys:'subsys1', node:'mb', request:'getarchive', 'data[from]':d1,'data[to]':d2,'data[names]':sensor};


//var data = new FormData();
//data.append( "json", JSON.stringify( payload ) );

//fetch("http://169.254.234.252:160/srvcom.php",
//{
//    method: "POST",
//    credentials: 'include',
//    headers: {        
//        //'Content-Type': 'application/x-www-form-urlencoded, charset=UTF-8',
//        headers: new Headers({'content-type': 'application/json'})
//        
//    },
//    mode: 'no-cors',
//    body: JSON.stringify(payload)
//})
//.then(function(res){ return res.json(); })
//.then(function(data){  console.log(data); });

fetch('http://169.254.234.252:160/srvcom.php',{
    method: "POST",
    credentials: 'include',
    headers: {        
        //'Content-Type': 'application/x-www-form-urlencoded, charset=UTF-8',
        headers: new Headers({'Content-Type': 'json', 'X-Requested-With': 'XMLHttpRequest'})
        
    },
    
    mode: 'no-cors',
    body: JSON.stringify(payload)
})
//  .then(response => {
//     const contentType = response.headers.get('content-type');
//     if (!contentType || !contentType.includes('application/json')) {
//       throw new TypeError("Oops, we haven't got JSON!");
//     }
//     return response.json();
//  })
  .then(data => {
      console.log(data);
      /* process your data further */
  })
  .catch(error => console.error(error));
         
       
    });

	//jQuery.fn.extend({disableSelection:function(){this.each(function(){this.onselectstart=function(){return false;};this.unselectable="on";jQuery(this).css({'-moz-user-select':'none','-o-user-select':'none','-khtml-user-select':'none','-webkit-user-select':'none','-ms-user-select':'none','user-select':'none'});});}});

	
</script>
</body>
</html>

