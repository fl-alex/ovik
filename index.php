<html>
    <HEAD>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Температура и влажность по складу ПрАТ "ДКПК"</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <link type="text/css" rel="stylesheet" media="all" href="/asset/css/bootstrap.min.css">        
<STYLE>

    .highcharts-figure,
.highcharts-data-table table {
    min-width: 360px;
    max-width: 800px;
    margin: 1em auto;
}
 
.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
     
}

#str {
    color: red;
    background:  yellow;
    min-width: 100%;
    /*font-size: 25px;*/
    padding: 5px;    
}

#str {
    animation: blink 2s infinite; /* Параметры анимации */
   }
   @keyframes blink {
    from { opacity: 1; /* Непрозрачный текст */ }
    to { opacity: 0.1; /* Прозрачный текст */ }
   }

#spr {
    color: gray;
    font-size: 11px;
}


    
</style>

    </HEAD>

<body>            

        <script type="text/javascript" src="jquery.min.js"></script>
        <script type="text/javascript" src="/asset/js/bootstrap.min.js"></script>

  <div class="px-4 my-0 text-center">
      <img class="d-block mx-auto" src="/asset/img/logo_dkpk.png" alt="" width="7%">
    <h3 class="display-6 fw-bold">Архив данных температуры и влажности</h3>
    <h3 class="display-7">Склад готовой продукции ПрАТ "ДКПК"</h3>
    
    <div class="col-lg-6 mx-auto border border-success rounded mt-2 p-2">
      
        <p class="lead mb-4">Выберите тип показаний и период</p>        
        <p>                        
            <input type="radio" id="h1" name="sensor" value="tmp" checked="true"><label for="tmp">&nbsp;- температура</label>
            <input type="radio" id="t1" name="sensor" value="hmd" checked="false"><label for="hmd">&nbsp;- влажность</label>
        </p>
        
        <FORM>
            <select class="col-2" id="mounth" aria-label="Месяц">                
                <option selected value="01-31">Январь</option>
                <option value="02-28" >Февраль</option>
                <option value="03-31" >Март</option>
                <option value="04-30" >Апрель</option>
                <option value="05-31" >Май</option>
                <option value="06-30" >Июнь</option>
                <option value="07-31" >Июль</option>
                <option value="08-31" >Август</option>
                <option value="09-30" >Сентябрь</option>
                <option value="10-31" >Октябрь</option>
                <option value="11-30" >Ноябрь</option>
                <option value="12-31" >Декабрь</option>               
            </select>
            
            <select class="col-2" aria-label="Год" id="year">  
                
                <option selected value="2022" >2022</option>
                <option value="2021">2021</option>               
                <option value="2020">2020</option>                
            </select>            
            </FORM>  
        
  
        <div>              
          <button type="submit" id="send" class="btn btn-success btn-sm px-4 gap-3">Получить данные</button>
        </div>

        <figure class="highcharts-figure" id="fig">            
            <div id="container"></div>
            <p class="highcharts-description">        
            </p>
        </figure>  
        
    </div>
  </div>
   
<script type="text/javascript">
var text_title="";
var y_title="";
var sensor_count=0;
var data_count=0;     

    $("#send").on("click", function(){
           
    var sensors=[];
    var list_date = new Map();
    var list_date_value = new Map();
    var data_object = new Map();    
    var date_array=[];
    var mydata=[];
    
    
    
    var sensors_tmp=["SP01AIRTMP","SP02AIRTMP","SP03AIRTMP","SP04AIRTMP","SP05AIRTMP",
                    "SP06AIRTMP","SP07AIRTMP","SP08AIRTMP","SP09AIRTMP","SP10AIRTMP",
                    "SP11AIRTMP","SP12AIRTMP","SP13AIRTMP","SP14AIRTMP","SP15AIRTMP",
                    "SP16AIRTMP","SP17AIRTMP","SP18AIRTMP","SP19AIRTMP","SP20AIRTMP"];
                
    var sensors_hmd=["SP01AIRHMD","SP02AIRHMD","SP03AIRHMD","SP04AIRHMD","SP05AIRHMD",
                    "SP06AIRHMD","SP07AIRHMD","SP08AIRHMD","SP09AIRHMD","SP10AIRHMD",
                    "SP11AIRHMD","SP12AIRHMD","SP13AIRHMD","SP14AIRHMD","SP15AIRHMD",
                    "SP16AIRHMD","SP17AIRHMD","SP18AIRHMD","SP19AIRHMD","SP20AIRHMD"];
                
    if ($('input[name=sensor]:checked').val()==="tmp") {
        sensors = sensors_tmp;
    }
    else {
        sensors = sensors_hmd;
    }
        
        $("#result").empty();                        
        $("#fig").empty();
        $("#fig").append('<div id="container"></div> <p class="highcharts-description"></p>');
        
        var data_from = $("#year").val()+"-"+($("#mounth").val()).substring(0,2)+"-01 00:00";
        var data_to = $("#year").val()+"-"+($("#mounth").val()).substring(0,2)+"-"+ ($("#mounth").val()).substring($("#mounth").val().length - 2)+" 23:59";
        $("#container").append("<span id='str'>Получение данных. Ожидайте...</span>");   
       

	
             $.ajax({
		async:true,
		type:"POST",
		url:"srvcom.php",
		dataType:"json",
		data:{"subsys":"subsys1",
                        "node":"mb", 
                        "request":"getarchive",
                        "authority":"1252",
                              "data":{"from": data_from,
                                    "to": data_to,
                                     "names":sensors
                                }
                    },	

		success:function(data){                      
                    $("#result").empty();
                    $("#result").append("Вывод данных...");
                    var cur_date;                        
                    
    			if(data['data_server']!==null){
                            
                                $.each(data['data_server']['data'],function(i){
                                    sensor_count = sensor_count + 1;
                                    $.each(this,function(key, value){
                                        data_count = data_count + 1;
                                        cur_date = key.substring(0,10);                            
                                        if(date_array.indexOf(cur_date) === -1){// нет даты в массиве - заносим
                                            date_array.push(cur_date);
                                        }

                                        if((list_date_value.has(cur_date) === false)||(list_date_value.length==0)){// нет даты в коллекции - добавляем вместе с показанием датчика
                                            list_date_value.set(cur_date, Number(value));
                                            list_date.set(cur_date, Number(1));
                                        }

                                        if(list_date_value.has(cur_date) === true){// есть дата в коллекции - обновляем, добавляя к текущим новые показания датчика
                                            list_date_value.set(cur_date, list_date_value.get(cur_date)+Number(value));
                                            list_date.set(cur_date, list_date.get(cur_date)+Number(1));
                                        }

                                                    data_object.set(key,value);                                                                                
                                    });
                                });                                                               
                                
                                
                                $("#result").empty();

                                 if($('input[name=sensor]:checked').val()==="tmp"){
                                                text_title = "Температура, &#176;С. " + $('#mounth option:selected').text()+" " + $('#year').val()+" г.";
                                                y_title = "Температура, &#176;С";
                                                }
                                else {                                                    
                                                    text_title = "Влажность, %. "+ $('#mounth option:selected').text()+" " + $('#year').val()+" г.";
                                                    y_title = "Влажность, %";
                                                }

                                                list_date_value.forEach(function (value, key){                                       
                                                        let t = parseFloat(value/list_date.get(key)).toFixed(2);                                                
                                                        mydata.push(parseFloat(t).toFixed(2));
                                                     });
                                
                                if (list_date.size>0){
                                    var [firstKey] = list_date.keys();
                                    make_chart(mydata, firstKey.split("-"));                                                
                                }
                                
                                else {
                                    sensor_count = 0;
                                    data_count = 0;
                                    $('#container').empty().append("<font style='color:red;'>Данных за "+$('#mounth option:selected').text()+" " + $('#year').val()+" года нет. Измените период выборки.</font>");
                                }
                                
                        }                                                                       
		}                                 
	});           
    });





function make_chart (mydata, firstKey){

var mydataf = new Float64Array(mydata);

Highcharts.chart('container', {

    title: {
        text: text_title
    },

    subtitle: {
        text: ''
    },

    yAxis: {
        title: {
            text: y_title
        },
        min:0      
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Дата'
        },
        type: 'datetime',
        tite: {
            text: "Дата"
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: Date.UTC(firstKey[0],firstKey[1]-1,firstKey[2]),
            pointInterval: 24 * 3600 * 1000 // one day
        }
    },

    series: [{
        name: '',
        data: mydataf
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});

mydata=[];
$(".highcharts-credits").empty();
$("#fig").append("<hr style='color:green;'><span id='spr'>Данные за период сформированы на основании " + data_count+" показаний с "+sensor_count+" датчиков склада.</span>");

sensor_count = 0;
data_count = 0;

}


	
</script>
        
        <script src="scripts/highcharts.js"></script>
        <script src="scripts/series-label.js"></script>
        <script src="scripts/exporting.js"></script>
        <script src="scripts/export-data.js"></script>
        <script src="scripts/accessibility.js"></script>
        
</body>
</html>

