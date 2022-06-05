//JESUS IS LORD!
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Date/Time informer
var obj_hours=document.getElementById("datetimeline");

var name_month={
	"uk":["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"],
	"ru":["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],
	"en":["January","February","March","April","May","June","July","August","September","October","November","December"]
}
var name_day={
	"uk":["Неділя","Понеділок", "Вівторок","Середа","Четвер","П`ятниця","Субота"],
	"ru":["Воскресенье","Понедельник", "Вторник","Среда","Четверг","Пятница","Суббота"],
	"en":["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"]
}

function wr_hours(){
	time=new Date();
	time_sec=time.getSeconds();
	time_min=time.getMinutes();
	time_hours=time.getHours();
	time_wr=((time_hours<10)?"0":"")+time_hours;
	time_wr+=":";
	time_wr+=((time_min<10)?"0":"")+time_min;
	time_wr+=":";
	time_wr+=((time_sec<10)?"0":"")+time_sec;
	time_wr=name_day[curr_lang][time.getDay()]+" | "+time.getDate()+" "+name_month[curr_lang][time.getMonth()]+" "+time.getFullYear()+" | "+time_wr;
	obj_hours.innerHTML=time_wr; 
}
wr_hours();
setInterval("wr_hours();",1000);

function labelproc (LObj,PObj,x,y,alignx,aligny,scl){
	if($(LObj).length && $(PObj).length){
		var SchWdth=PObj.get(0).naturalWidth;
		var SchHght=PObj.get(0).naturalHeight;		
		var kx=PObj.width()/SchWdth;
		var ky=PObj.height()/SchHght;		
		if(alignx=="left"){LObj.css("left",x*kx);}
		if(aligny=="top"){LObj.css("top",y*ky+PObj.parent().height()*0.5-PObj.height()*0.5+50);}
		if(alignx=="right"){LObj.css("left",x*kx-LObj.width());}
		if(aligny=="bottom"){LObj.css("top",y*ky+PObj.parent().height()*0.5-PObj.height()*0.5+50-LObj.height());}
		if(alignx=="center"){LObj.css("left",x*kx-LObj.width()*0.5);}
		if(aligny=="center"){LObj.css("top",y*ky+PObj.parent().height()*0.5-PObj.height()*0.5+50-LObj.height()*0.5);}
		LObj.css("font-size",Math.round(kx*scl));
	}
};

function datetimeElementsinit()
{
	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: 'Пред.',
		nextText: 'След.',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Не',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	
	$.datepicker.regional['uk'] = {
		closeText: 'Закрити',
		prevText: 'Попер.',
		nextText: 'Наст.',
		currentText: 'Сьогодні',
		monthNames: ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
		monthNamesShort: ['Січ','Лют','Бер','Кві','Тра','Чер','Лип','Сер','Вер','Жов','Лис','Гру'],
		dayNames: ['неділя','понеділок','вівторок','середа','четвер','п\'ятниця','субота'],
		dayNamesShort: ['нед','пон','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Не',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	
	$.timepicker.regional['ru'] = {
		timeOnlyTitle: 'Выберите время',
		timeText: 'Время',
		hourText: 'Часы',
		minuteText: 'Минуты',
		secondText: 'Секунды',
		millisecText: 'Миллисекунды',
		timezoneText: 'Часовой пояс',
		currentText: 'Сейчас',
		closeText: 'Закрыть',
		timeFormat: 'HH:mm:ss',
		amNames: ['AM', 'A'],
		pmNames: ['PM', 'P'],
		isRTL: false
	};
	
	$.timepicker.regional['uk'] = {
		timeOnlyTitle: 'Оберіть час',
		timeText: 'Час',
		hourText: 'Години',
		minuteText: 'Хвилини',
		secondText: 'Секунди',
		millisecText: 'Мілісекунди',
		timezoneText: 'Часовий пояс',
		currentText: 'Зараз',
		closeText: 'Закрити',
		timeFormat: 'HH:mm:ss',
		amNames: ['AM', 'A'],
		pmNames: ['PM', 'P'],
		isRTL: false
	};
	
	$.datepicker.setDefaults($.datepicker.regional[curr_lang]);
	$.timepicker.setDefaults($.timepicker.regional[curr_lang]);
	
	$(".datetimeinput").datetimepicker({controlType: "select",oneLine: true,dateFormat: 'yy-mm-dd',timeFormat: "HH:mm:ss"});
	$(".ui-datepicker").css("font-size","10px");
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Date.prototype.toLocaleFormat = function(format) {
	var f = {y : this.getYear() + 1900,m : this.getMonth() + 1,d : this.getDate(),H : this.getHours(),M : this.getMinutes(),S : this.getSeconds()}
	for(k in f)
		format = format.replace('%' + k, f[k] < 10 ? "0" + f[k] : f[k]);
	return format;
};

function arrayKeys(input) {
	var output = new Array();
	var counter = 0;
	for (i in input) {
		output[counter++] = i;
	} 
	return output; 
}

var NodesNames=arrayKeys(Nodes);
var VarNodes={};
var NodeVars={};
var VarGroup={};
var VarValues={};
var Description=[];
var SrvStat={};
var PlotImg={};
var CommObj={};

function GetSrvStat(async){
	var response={};
	var part={};
	var SSTmp={};
	var i=0;

	function GetDataQry(){
		$.ajax({
				async: async,
				type: "POST",
				url: "srvcom.php",
				dataType: "text",
				timeout: 60000,
				data: {"subsys":SubSystem,"request":"getsrvstatus","authority":"","data":"","node":NodesNames[i]},
				success: function(data){
					if(data!=null){
						try{
							SSTmp={};
							response=JSON.parse(data);
							if(response["socket"]["errno"]==0){
				
								Description=response["subsys"]["description"];
				
								SSTmp=response["data_server"]["data"];

							}
							else{
								alert(response["socket"]["errstr"]);
								location.reload(true);
							}
						}
						catch(e){
							SSTmp=JSON.parse('{}');}
					}
				},
				error: function(xhr,ajaxOptions,thrownError){
					//if((curr_auth_lev>2)&&(thrownError!="")){
		        		//	alert("Connection error. Cannot complete the request. "+thrownError);}
				},
				complete:function(){
					SrvStat[NodesNames[i]]=SSTmp;
					i++;
					if(i<=NodesNames.length-1){
						GetDataQry();
					}
				}
		});
	}
	GetDataQry();
	setTimeout(function(){GetSrvStat(true);},5000);
}

GetSrvStat(false);

function GetCommConf(async){
	var response={};
	var part={};
	var SSTmp={};
	var i=0;

	function GetDataQry(){
		$.extend(true,CommObj,JSON.parse('{"'+NodesNames[i]+'":{}}'));
		$.ajax({
				async: async,
				type: "POST",
				url: "srvcom.php",
				dataType: "text",
				timeout: 60000,
				data: {"subsys":SubSystem,"request":"getcomconf","authority":curr_auth_req,"data":"","node":NodesNames[i]},
				success: function(data){
					if(data!=null){
						try{
							SSTmp={};
							response=JSON.parse(data);
							if(response["socket"]["errno"]==0){
				
								SSTmp=response["data_server"]["data"];

							}
							else{
								alert(response["socket"]["errstr"]);
								location.reload(true);
							}
						}
						catch(e){
							SSTmp=JSON.parse('{}');}
					}
				},
				error: function(xhr,ajaxOptions,thrownError){
					//if((curr_auth_lev>2)&&(thrownError!="")){
		        		//	alert("Connection error. Cannot complete the request. "+thrownError);}
				},
				complete:function(){
					CommObj[NodesNames[i]] = SSTmp;
					i++;
					if(i<=NodesNames.length-1){
						GetDataQry();
					}
				}
		});
	}
	GetDataQry();
	setTimeout(function(){GetCommConf(true);},60000);
}

GetCommConf(false);

function testJSON(Obj) { 
        if (typeof Obj == "object") { 
                return true; 
        } 
	else if (typeof Obj == "string"){
            try { 
                JSON.parse(Obj); 
                return true; 
            } catch (error) { 
                return false; 
            } 
	}
	else
		return false;
}

function NormalDescr(Obj){
	des_str = "";
	des_str = Obj.toString();
	if(!des_str)
		des_str = "{\""+curr_lang+"\":\"[No Data]\"}";
	des_obj = {};
	if(testJSON(des_str)){	
		try{	
		des_obj = JSON.parse(des_str);	
		if(!des_obj.hasOwnProperty(curr_lang)){
			des_obj = JSON.parse('{"'+curr_lang+'":"[No Data for current language]"}');}}
		catch(error){
			des_obj = JSON.parse('{"'+curr_lang+'":"[Error parsing the Data string]"}');}}
	else{
		try{	
			des_obj = JSON.parse('{"'+curr_lang+'":"'+des_str+'"}');}
		catch(error){
			des_obj = JSON.parse('{"'+curr_lang+'":"[Error parsing the Data string]"}');}}
	
	Obj = des_obj;
	return Obj;
}

function GetVarGroup(async){

	var i=0;

	function GetDataQry(){

		var response={};
		var part={};
		var VGJTmp={};
		var lines=[];

		$.ajax({
				async: async,
				type: "POST",
				url: "srvcom.php",
				dataType: "text",
				timeout: 60000,
				data: {"subsys":SubSystem,"request":"getvargroup","authority":curr_auth_req,"data":"","node":NodesNames[i]},
				success: function(data){ 
					if(data!=null){
						try{
							response=JSON.parse(data);
							if(response["socket"]["errno"]==0){																

								lines=response["subsys"]["nodes"][NodesNames[i]]["lines"];

								for(var name in response["data_server"]["data"]["virtual"]){
									if(response["data_server"]["data"]["virtual"].hasOwnProperty(name)){
											response["data_server"]["data"]["virtual"][name]["description"] = NormalDescr(response["data_server"]["data"]["virtual"][name]["description"]);
										part=JSON.parse('{"'+name+'":"'+NodesNames[i]+'"}');
										$.extend(true,VarNodes,part);}}
								$.extend(true,VGJTmp,response["data_server"]["data"]["virtual"]);							
								if (lines.includes("line1")){
									for(var name in response["data_server"]["data"]["line1"]){
										if(response["data_server"]["data"]["line1"].hasOwnProperty(name)){
											response["data_server"]["data"]["line1"][name]["description"] = NormalDescr(response["data_server"]["data"]["line1"][name]["description"]);
											part=JSON.parse('{"'+name+'":"'+NodesNames[i]+'"}');
											$.extend(true,VarNodes,part);}}
									$.extend(true,VGJTmp,response["data_server"]["data"]["line1"]);}
								if (lines.includes("line2")){
									for(var name in response["data_server"]["data"]["line2"]){
										if(response["data_server"]["data"]["line2"].hasOwnProperty(name)){
											response["data_server"]["data"]["line2"][name]["description"] = NormalDescr(response["data_server"]["data"]["line2"][name]["description"]);
											part=JSON.parse('{"'+name+'":"'+NodesNames[i]+'"}');
											$.extend(true,VarNodes,part);}}
									$.extend(true,VGJTmp,response["data_server"]["data"]["line2"]);}
								if (lines.includes("line3")){
									for(var name in response["data_server"]["data"]["line3"]){
										if(response["data_server"]["data"]["line3"].hasOwnProperty(name)){
											response["data_server"]["data"]["line3"][name]["description"] = NormalDescr(response["data_server"]["data"]["line3"][name]["description"]);
											part=JSON.parse('{"'+name+'":"'+NodesNames[i]+'"}');
											$.extend(true,VarNodes,part);}}
									$.extend(true,VGJTmp,response["data_server"]["data"]["line3"]);}
								if (lines.includes("line4")){
									for(var name in response["data_server"]["data"]["line4"]){
										if(response["data_server"]["data"]["line4"].hasOwnProperty(name)){
											response["data_server"]["data"]["line4"][name]["description"] = NormalDescr(response["data_server"]["data"]["line4"][name]["description"]);
											part=JSON.parse('{"'+name+'":"'+NodesNames[i]+'"}');
											$.extend(true,VarNodes,part);}}
									$.extend(true,VGJTmp,response["data_server"]["data"]["line4"]);}}
							else{
								alert(response["socket"]["errstr"]);}}
						catch(e){
							VGJTmp=JSON.parse('{}');}}},
				error: function(xhr,ajaxOptions,thrownError){
					//if((curr_auth_lev>2)&&(thrownError!="")){
		        		//	alert("Connection error. Cannot complete the request. "+thrownError);}
				},
				complete:function(){
					for(var name in VGJTmp){
						if(VGJTmp.hasOwnProperty(name)){
							if(VGJTmp[name]["answer"]=="0")
								VGJTmp[name]["value"] = null;}}
					$.extend(true,VarGroup,VGJTmp);
					NodeVars[NodesNames[i]]=[];
					for(var name in VGJTmp){
						if(VGJTmp.hasOwnProperty(name)){
							NodeVars[NodesNames[i]].push(name);}}
					i++;
					if(i<=NodesNames.length-1){
						GetDataQry();}}});}
	GetDataQry();
	
	setTimeout(function(){GetVarGroup(true);},10000);}

GetVarGroup(false);


function GetVarValues(async){

	var i=0;

	function GetDataQry(){

		var response={};
		var part={};
		var VVSTmp={};
		var VVJTmp={};
		var lines=[];

		$.ajax({
				async: async,
				type: "POST",
				url: "srvcom.php",
				dataType: "text",
				timeout: 60000,
				data: {"subsys":SubSystem,"request":"getvarvalues","authority":curr_auth_req,"data":"","node":NodesNames[i]},
				success: function(data){ 
					if(data!=null){
						try{
							response=JSON.parse(data);
							if(response["socket"]["errno"]==0){
																			
								$.extend(true,VVJTmp,response["data_server"]["data"]["virtual"]);
												
								lines=response["subsys"]["nodes"][NodesNames[i]]["lines"];
							
								if (lines.includes("line1")){
									$.extend(true,VVJTmp,response["data_server"]["data"]["line1"]);}
								if (lines.includes("line2")){
									$.extend(true,VVJTmp,response["data_server"]["data"]["line2"]);}
								if (lines.includes("line3")){
									$.extend(true,VVJTmp,response["data_server"]["data"]["line3"]);}
								if (lines.includes("line4")){
									$.extend(true,VVJTmp,response["data_server"]["data"]["line4"]);}
							}
							else{
								alert(response["socket"]["errstr"]);
								//location.reload(true);
							}
						}
						catch(e){
							VVJTmp=JSON.parse('{}');}
				
						}

				},
				error: function(xhr,ajaxOptions,thrownError){
					//if((curr_auth_lev>2)&&(thrownError!="")){
		        		//	alert("Connection error. Cannot complete the request. "+thrownError);}
				},
				complete:function(){
					$.extend(true,VarValues,VVJTmp);
					i++;
					if(i<=NodesNames.length-1){
						GetDataQry();
					}
				}
		});
	}

	GetDataQry();

	for(name in VarValues){
		if(VarValues.hasOwnProperty(name)){
			if(VarGroup[name]["answer"]=="1")
				VarGroup[name]["value"]=VarValues[name]
			else
				VarGroup[name]["value"] = null;}}

	setTimeout(function(){GetVarValues(true);},3000);
}

GetVarValues(false)

function SendData(request,authority,data,node){
	var req={"subsys":SubSystem,"request":request,"authority":authority,"data":data,"node":node};
	var response={};
	$.ajax({
			async: false,
			type: "POST",
			url: "srvcom.php",
			dataType: "text",
			data: req,
			timeout: 60000,
			success: function(data){
				if(data!=null){
					try{
						response=JSON.parse(data);
						if(response["socket"]["errno"]!=0){
							if(curr_auth_lev>2){
								alert("An error occurred: " + e);
							}
							alert(response["socket"]["errstr"]);
							response=JSON.parse('{}');
							location.reload(true);
						}
					}
					catch(e){
						if(curr_auth_lev>2){
							alert("An error occurred: " + e);
						}
						response=JSON.parse('{}');
					}
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				//if((curr_auth_lev>2)&&(thrownError!="")){
	        		//	alert("Connection error. Cannot complete the request." +thrownError);}
			}
	});
	return response;
}

var min_x=function(Data){
	var min=Data[0][0];
	return min;}

var max_x=function(Data){
	var i=0;
	var max='';
	while(Data[i]!=null){i++;}
	max=Data[i-1][0];
	return max;}

var min_y=function(Data){
	var i=0;
	var min=Infinity;
	while(Data[i]!=null){if(parseFloat(Data[i][1])<min){min=parseFloat(Data[i][1])};i++;}
	return min;}

var max_y=function(Data){
	var i=0;
	var max=-Infinity;
	while(Data[i]!=null){if(parseFloat(Data[i][1])>max){max=parseFloat(Data[i][1])};i++;}
	return max;}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Configuration Table Page

function ConfTblContent(){

	var labels={
			"uk":{
				"print_table":"Друк таблиці",
				"group_of_parameters":"Група параметрів",
				"ungrouped_parameters":"Негруповані параметри",
				"var_name":"Ім\'я змінної",
				"var_description":"Опис",
				"var_value":"Значення",
				"val_active":"Активний",
				"val_inactive":"Неактивний",
				"no_aval_vars":"Немає доступних змінних",
				"parameter_blocked":"Параметр заблоковано"
			},
			"ru":{
				"print_table":"Печать таблицы",
				"group_of_parameters":"Группа параметров",
				"ungrouped_parameters":"Негруппированные параметры",
				"var_name":"Имя переменной",
				"var_description":"Описание",
				"var_value":"Значение",
				"val_active":"Активен",
				"val_inactive":"Неактивен",
				"no_aval_vars":"Нет доступных переменных",
				"parameter_blocked":"Параметр заблокирован"				
			},
			"en":{
				"print_table":"Print the Table",
				"group_of_parameters":"Group of Parameters",
				"ungrouped_parameters":"Ungrouped Parameters",
				"var_name":"Variable Name",
				"var_description":"Description",
				"var_value":"Value",
				"val_active":"Active",
				"val_inactive":"Inactive",
				"no_aval_vars":"No any available variables",
				"parameter_blocked":"Parameter is locked"				
			}
	};

	function GetColor(i) {
		var color=(['#915151','#91634D','#91774D','#91904E','#7BA150','#5BA150','#41A15F','#40A17B','#41A19C','#418CA1','#437AA1','#4063A1','#4350A1','#5E50A1','#7E50A1','#91537C']);
		while((i>color.length-1)&&(i>0)){
			i=i-color.length;}
	    return color[i];}
	
	var names = [], name;

	for(name in VarGroup){
		if(VarGroup.hasOwnProperty(name)){
			if(VarGroup[name]["write"]!=0)names.push(name);
		}
	}

	names.sort();
	
	var GroupObj={};
	for(var i=0;i<=names.length-1;i++){
		if(VarGroup[names[i]]["group"]!=''){
			if(typeof GroupObj[VarGroup[names[i]]["group"]]!='object'){
				GroupObj[VarGroup[names[i]]["group"]]=[];
			}
			GroupObj[VarGroup[names[i]]["group"]].push(names[i]);
		}
		else{
			if(typeof GroupObj["*"]!='object'){
				GroupObj["*"]=[];
			}
			GroupObj["*"].push(names[i]);
		}
	}
	
	var GrNames = [], name;

	for(name in GroupObj){
		if(GroupObj.hasOwnProperty(name)){
			GrNames.push(name);
		}
	};
	
	GrNames.sort();

	var html='<br /><div id=\"cnftblcont\"><div class=\"cftb_add\"><img class=\"prcftbl\" src=\"Print.ico\" title=\"'+labels[curr_lang]['print_table']+'\" style=\"cursor:pointer;\" /></div><table class=\"conftable\"><tr><td></td></tr>';
	if(GrNames.length>0){
		for(var j=0;j<=GrNames.length-1;j++){
			html=html+'<tr><td colspan=\"3\"></td></tr><tr onClick=\"$(\'.'+(GrNames[j]!='*'?GrNames[j]+'_list':'ungrouped_parameters_list')+'\').toggle(100)\" style=\"cursor:pointer;background-color:'+GetColor(j)+';\"><td colspan=\"4\" align=\"left\" style=\"font-size:14px;padding:5px;text-indent:20px;\">'+(GrNames[j]!='*'?labels[curr_lang]['group_of_parameters']+' <div style=\"text-indent:10px;font-weight:bold;color:#f0f0f0;text-align:center;display:inline-block;\">"'+GrNames[j]+'"</div>':labels[curr_lang]['ungrouped_parameters'])+'</td></tr>'+
			'<tr class=\"'+(GrNames[j]!='*'?GrNames[j]+'_list hidden_row':'ungrouped_parameters_list hidden_row')+'\" style=\"display:none;\"><td>'+labels[curr_lang]['var_name']+'</td><td>'+labels[curr_lang]['var_description']+'</td><td>'+labels[curr_lang]['var_value']+'</td></tr>';
			for(var i=0;i<=GroupObj[GrNames[j]].length-1;i++){
					html=html+'<tr class=\"'+(GrNames[j]!='*'?GrNames[j]+'_list hidden_row':'ungrouped_parameters_list hidden_row')+'\" style=\"display:none;\"><td class=\"dtpar\" style="width:15%;font-weight:bold;">'+GroupObj[GrNames[j]][i]+'</td><td class=\"dtpar\" style="width:75%;">'+
					     VarGroup[GroupObj[GrNames[j]][i]]["description"][curr_lang]+((VarGroup[GroupObj[GrNames[j]][i]]["type"]=="FLOAT")||(VarGroup[GroupObj[GrNames[j]][i]]["type"]=="FIXED")||(VarGroup[GroupObj[GrNames[j]][i]]["type"]=="INTEGER")?", <b>"+VarGroup[GroupObj[GrNames[j]][i]]["dataunits"]:"")+(VarGroup[GroupObj[GrNames[j]][i]]["processing"]!=0?'</b></td><td class=\"editval\" style=\"border-bottom:1px solid #b0b0b0;border-right:1px solid #b0b0b0;cursor:pointer;\">':'</b></td><td class=\"non_editval\" title=\"'+labels[curr_lang]['parameter_blocked']+'\" style=\"border-bottom:1px solid #b0b0b0;border-right:1px solid #b0b0b0;\">')+
					     (VarGroup[GroupObj[GrNames[j]][i]]["write"]==2?('[WriteOnly]'):((VarGroup[GroupObj[GrNames[j]][i]]["type"]!="BOOL"?(VarGroup[GroupObj[GrNames[j]][i]]["value"]):(VarGroup[GroupObj[GrNames[j]][i]]["value"]!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive']))))+
					'</td></tr>';
			}
		}
		html=html+'</table></div><br />';		
		$(".cftb_add").disableSelection();
	}
	else html="<div style=\"text-align:center;height:60px;color:#E03030;font-weight:bold;\"><br />"+labels[curr_lang]['no_aval_vars']+"</div>";
	return html;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ArcData Page

var plot={};

function GetVarArcs(Names,Period){
	var Obj={};
	var tresp={};

	if((Period["from"]!=undefined)&&(Period["to"]!=undefined)){

		for(var i=0;i<=Names.length-1;i++){
			$.extend(true,Obj,JSON.parse('{"'+VarNodes[Names[i]]+'":{}}'));
		}


		for (var i=0;i<=NodesNames.length-1;i++){
			$.extend(true,Obj[NodesNames[i]],JSON.parse('{"names":[],"from":"'+Period["from"]+'","to":"'+Period["to"]+'"}'));
			for(var j=0;j<=Names.length-1;j++){
				Obj[NodesNames[i]]["names"].push(Names[j])
			}
		}

		for(var i=0;i<=NodesNames.length-1;i++){
			$.extend(true,tresp,SendData("getarchive",curr_auth_req,Obj[NodesNames[i]],NodesNames[i]));
		}
		if(tresp["data_server"]["result"]=='SUCCESS'){
			var ArcObj = {};
			var Tmplt = tresp["data_server"]["data"];
			for(name in Tmplt){
				$.extend(true,ArcObj,JSON.parse('{"'+name+'":[]}'));
				for(par in Tmplt[name]){
					ArcObj[name].push(JSON.parse('["'+par+'","'+Tmplt[name][par]+'"]'));
				}
			}
			return ArcObj;
		}
		if(typeof tresp["data_server"]["data"]=="string"){
			alert(tresp["data_server"]["data"]);
			for(var i=0;i<=Names.length-1;i++){
				Obj[Names[i]]=[];
			}
			return Obj;
		}
	}
	else{
		for(var i=0;i<=Names.length-1;i++){
			Obj[Names[i]]=[];
		}
		return Obj;
	}
}

var avg_y=function(Data,rt){
	var i=0;
	var avg=0;
	var sum=0;
	while(Data[i]!=null){sum=sum+parseFloat(Data[i][1]);i++;}
	if(i>0){
		avg=sum/i;
		return avg.toFixed(rt);
	}
	else  return '--';
}

var pdel_val=function(Data,rt){
var d=Data[Data.length-1][1]-Data[0][1];
return d.toFixed(rt);}

var rms_val=function(Data,rt){
	var i=0;
	var sum=0;
	var rms=0;
	while(Data[i]!=null){
		sum=sum+Math.pow(parseFloat(Data[i][1]),2);
		i++;
	}
	if(i>0){
		rms=Math.pow((sum/i),0.5);	
		return rms.toFixed(rt);	
	}	
	else return '--';
}

var gmt_val=function(Data,rt){
	var i=0;
	var mlt=1;
	var gmt=0;
	while(Data[i]!=null){
		mlt=mlt*parseFloat(Data[i][1]);
		i++;
	}
	if(i>0){
		gmt=Math.pow(mlt,(1/i));
		return gmt.toFixed(rt);		
	}	
	else return '--';
}

var grm_val=function(Data,rt){
	var i=0;
	var sum=0;
	var grm=0;
	while(Data[i]!=null){
		sum=sum+1/parseFloat(Data[i][1]);
		i++;
	}
	if(i>0){
		grm=i/sum;	
		return grm.toFixed(rt);		
	}
	else return '--';
}

var mdn_val=function(Data,rt){
	var i=0;
	var row=[];
	var mdn=0;
	while(Data[i]!=null){
		row.push(parseFloat(Data[i][1]));
		i++;
	}
	if(i>0){
		row.sort(function(a,b){return a-b});
		if (row.length%2==0){
    		mdn=(row[(row.length/2)-1]+row[(row.length/2)])/2;
		}
		if (row.length%2==1){
    		mdn=row[(row.length/2|0)];
		}	
		return mdn.toFixed(rt);	
	}
	else return '--';
}

var mad_val=function(Data,avg,rt){
	var i=0;
	var sum=0;
	var mad=0;
	while(Data[i]!=null){
		sum=sum+Math.abs(parseFloat(Data[i][1])-avg);
		i++;
	}
	if(i>0){
		mad=sum/i;	
		return '&plusmn;'+mad.toFixed(rt);
	}
	else return '--';
}

var asd_val=function(Data,avg,rt){
	var i=0;
	var sum=0;
	var asd=0;
	while(Data[i]!=null){
		sum=sum+Math.pow((parseFloat(Data[i][1])-avg),2);
		i++;
	}
	if(i>0){
		asd=Math.pow(((1/(i-1))*sum),0.5);	
		return '&plusmn;'+asd.toFixed(rt);
	}	
	else return '--';
}

var fn_vel=function(Data,rt){
	var p=Data[0][1];
	var pg=[];
	var ng=[];
	var sg=0;
	var tg=0;
	var pt=new Date();
	var nt=new Date();
	var i=0;
	var apg=0;
	var ang=0;
	if(Data.length>1){
		for(i=0;i<=Data.length-2;i++){
		pt=new Date(Date.parse(Data[i][0]));
		nt=new Date(Date.parse(Data[i+1][0]));
		tg=1000000*(parseFloat(Data[i+1][1])-parseFloat(Data[i][1]))/Math.abs((nt.getTime()-pt.getTime()));
		if(tg>0){pg.push(tg);}
		if(tg<0){ng.push(tg);}
		}
	for(i=0;i<=pg.length-1;i++){
		apg=apg+pg[i]/pg.length;
	}
	
	for(i=0;i<=ng.length-1;i++){
		ang=ang+ng[i]/ng.length;
	}
	
	pt=new Date(Date.parse(Data[0][0]));
	nt=new Date(Date.parse(Data[Data.length-1][0]));
	sg=1000000*(parseFloat(Data[Data.length-1][1])-parseFloat(Data[0][1]))/Math.abs((nt.getTime()-pt.getTime()));
	}
	return [apg.toFixed(rt),ang.toFixed(rt),sg.toFixed(rt)];
}

function GetColor(i) {
	var color=(['#915151','#91634D','#91774D','#91904E','#7BA150','#5BA150','#41A15F','#40A17B','#41A19C','#418CA1','#437AA1','#4063A1','#4350A1','#5E50A1','#7E50A1','#91537C']);
	while((i>color.length-1)&&(i>0)){
		i=i-color.length;}
    return color[i];}

function DataArchive(){

	var labels={
			"uk":{
				"group_of_parameters":"Група параметрів",
				"ungrouped_parameters":"Негруповані параметри",
				"var_name":"Ім\'я змінної",
				"var_description":"Опис",
				"arc_representing":"Відображення даних архіву",
				"refresh":"Оновити",
				"export_csv":"Експорт",
				"displ_in_table":"Виведення на таблицю",
				"displ_on_graph":"Виведення на діаграму",
				"data_of_arc":"Дані архіву параметра",
				"hide":"Приховати",
				"data_start":"Початок виведення даних",
				"data_end":"Кінець виведення даних",
				"per_average":"Середнє значення",
				"avg_arithmetic":"Середнє арифметичне",
				"avg_geometric":"Середнє геометричне",
				"avg_harmonic":"Середнє гармонічне",
				"avg_rms":"Середнє квадратичне",
				"avg_median":"Медіана",
				"dev_absolute":"Абсолютне",
				"dev_rms":"Середньоквадратичне",
				"per_dev":"Відхилення",
				"min_val":"Мін. значення",
				"max_val":"Макс. значення",
				"per_per":"за період",
				"per_vel":"ШЗ зн. за пер.",
				"per_aiv":"СШЗ зн.",
				"per_adv":"СШС зн.",
				"no_aval_vars":"Немає доступних змінних"
			},
			"ru":{
				"group_of_parameters":"Группа параметров",
				"ungrouped_parameters":"Негруппированные параметры",
				"var_name":"Имя переменной",
				"var_description":"Описание",
				"arc_representing":"Отображение данных архива",
				"refresh":"Обновить",
				"export_csv":"Экспорт",
				"displ_in_table":"Отображение в таблице",
				"displ_on_graph":"Отображение на графике",
				"data_of_arc":"Данные архива параметра",
				"hide":"Скрыть",
				"data_start":"Начало отображения данных",
				"data_end":"Окончание отображения данных",
				"per_average":"Середнее значение",
				"avg_arithmetic":"Середнее арифметическое",
				"avg_geometric":"Середнее геометрическое",
				"avg_harmonic":"Середнее гармоническое",
				"avg_rms":"Середнее квадратическое",
				"avg_median":"Медиана",
				"dev_absolute":"Абсолютное",
				"dev_rms":"Середнеквадратическое",
				"per_dev":"Отклонение",
				"min_val":"Мин. значение",
				"max_val":"Макс. значение",
				"per_per":"за период",
				"per_vel":"СИ зн. за пер.",
				"per_aiv":"ССВ зн.",
				"per_adv":"ССУ зн.",
				"no_aval_vars":"Нет доступных переменных"				
			},
			"en":{
				"group_of_parameters":"Group of Parameters",
				"ungrouped_parameters":"Ungrouped Parameters",
				"var_name":"Variable Name",
				"var_description":"Description",
				"arc_representing":"Data Representing",
				"refresh":"Refresh",
				"export_csv":"Export",
				"displ_in_table":"Display in Table",
				"displ_on_graph":"Display on the Graph",
				"data_of_arc":"Archived Data of the Parameter",
				"hide":"Hide",
				"data_start":"Display Data Start",
				"data_end":"Display Data End",
				"per_average":"Average value",
				"avg_arithmetic":"Arithmetic mean",
				"avg_geometric":"Geometric mean",
				"avg_harmonic":"Harmonic mean",
				"avg_rms":"Root mean square",
				"avg_median":"Median",
				"dev_absolute":"Absolute",
				"dev_rms":"Root mean square",
				"per_dev":"Deviation",
				"min_val":"Min. value",
				"max_val":"Max. value",
				"per_per":"over the period",
				"per_vel":"RofC val. o/per.",
				"per_aiv":"ARofI val.",
				"per_adv":"ARofD val.",
				"no_aval_vars":"No any available variables"				
			}
	};


var html='<br /><table class=\"datatable\">';

var names = [], name;
for(name in VarGroup){if(VarGroup.hasOwnProperty(name)){
if(VarGroup[name]["archive"]=="1" && VarGroup[name]["processing"]=="1")names.push(name);}};

names.sort();

var GroupObj={};
for(var i=0;i<=names.length-1;i++){
if(VarGroup[names[i]]["group"]!=''){
if(typeof GroupObj[VarGroup[names[i]]["group"]]!='object'){GroupObj[VarGroup[names[i]]["group"]]=[]}
GroupObj[VarGroup[names[i]]["group"]].push(names[i]);}
else{
if(typeof GroupObj["*"]!='object'){GroupObj["*"]=[]}
GroupObj["*"].push(names[i]);}}

var GrNames = [], name;
for(name in GroupObj){if(GroupObj.hasOwnProperty(name)){GrNames.push(name);}};

GrNames.sort();

if(GrNames.length>0){
	for(var j=0;j<=GrNames.length-1;j++){
	html=html+'<tr><td colspan=\"4\"></td></tr><tr onClick=\"$(\'.'+(GrNames[j]!='*'?GrNames[j]+'_list':'ungrouped_parameters_list')+'\').toggle(100)\" style=\"cursor:pointer;background-color:'+GetColor(j)+';\"><td colspan=\"4\" align=\"left\" style=\"font-size:14px;padding:5px;text-indent:20px;\">'+(GrNames[j]!='*'?labels[curr_lang]['group_of_parameters']+' <div style=\"text-indent:10px;font-weight:bold;color:#f0f0f0;text-align:center;display:inline-block;\">"'+GrNames[j]+'"</div>':labels[curr_lang]['ungrouped_parameters'])+'</td></tr>'+
	'<tr class=\"'+(GrNames[j]!='*'?GrNames[j]+'_list hidden_row':'ungrouped_parameters_list hidden_row')+'\" style=\"display:none;\"><td>'+labels[curr_lang]['var_name']+'</td><td>'+labels[curr_lang]['var_description']+'</td><td colspan=\"2\">'+labels[curr_lang]['arc_representing']+'</td></tr>';
	for(var i=0;i<=GroupObj[GrNames[j]].length-1;i++){
		if(VarGroup[GroupObj[GrNames[j]][i]]["archive"]=='1'){
			if(VarGroup[GroupObj[GrNames[j]][i]]["type"]=='BOOL'||
	   	   	   (VarGroup[GroupObj[GrNames[j]][i]]["type"]=='INTEGER'&&
		    	   VarGroup[GroupObj[GrNames[j]][i]]["plot"]=='0')||
	   	   	   (VarGroup[GroupObj[GrNames[j]][i]]["type"]=='FLOAT'&&
		    	   VarGroup[GroupObj[GrNames[j]][i]]["plot"]=='0')||
	   	   	   (VarGroup[GroupObj[GrNames[j]][i]]["type"]=='FIXED'&&
		   	   VarGroup[GroupObj[GrNames[j]][i]]["plot"]=='0')){
				var ads='<td colspan=\"2\" class=\"refrbt\" style=\"width:150px;\">'+labels[curr_lang]['refresh']+'</td>';
			   	if(curr_auth_lev>0){
				    ads='<td class=\"refrbt\" style=\"width:75px;\">'+labels[curr_lang]['refresh']+'</td><td class=\"csvexp\" style=\"width:75px;\">'+labels[curr_lang]['export_csv']+'</td>';}
				html=html+'<tr class=\"'+(GrNames[j]!='*'?GrNames[j]+'_list hidden_row':'ungrouped_parameters_list hidden_row')+'\" style=\"display:none;\"><td class=\"dtpar\" style="width:12%;font-weight:bold;">'+GroupObj[GrNames[j]][i]+'</td><td class=\"dtpar\" style="width:55%;">'+

					VarGroup[GroupObj[GrNames[j]][i]]["description"][curr_lang]+'</td><td colspan=\"2\" class=\"arctbl\" name=\"'+GroupObj[GrNames[j]][i]+'\">'+labels[curr_lang]['displ_in_table']+'</td></tr>';

				html=html+'<tr class=\"'+(GrNames[j]!='*'?GrNames[j]+'_list hidden_row':'ungrouped_parameters_list hidden_row')+'\" style=\"display:none;\"><td colspan=\"4\" style=\"margin:0px;padding:0px;border-style:none;\">'+
					  '<div class=\"vararcdt\" id=\"'+GroupObj[GrNames[j]][i]+'\">'+
					  '<table style=\"width:100%;background-color:#e0e0e0;\">'+
					  '<tr><td colspan=\"6\" class=\"header\">'+labels[curr_lang]['data_of_arc']+' <b>'+GroupObj[GrNames[j]][i]+'</b> :: '+VarGroup[GroupObj[GrNames[j]][i]]["description"][curr_lang]+'<div class=\"hide_arc\" onClick=\"$(this).parents(\'.vararcdt\').hide();\" title=\"'+labels[curr_lang]['hide']+'\">[ _ ]</div></td></tr>'+
					  '<tr><td>'+labels[curr_lang]['data_start']+':</td>'+
					  '<td style=\"border-bottom:1px solid #C0C0C0;border-right:1px solid #C0C0C0;\"><input type=\"text\" style=\"width:95%\" class=\"datetimeinput data_from\" readonly=\"readonly\" /></td>'+
					  '<td>'+labels[curr_lang]['data_end']+':</td>'+
					  '<td style=\"border-bottom:1px solid #C0C0C0;border-right:1px solid #C0C0C0;\"><input type=\"text\" style=\"width:95%\" class=\"datetimeinput data_to\" readonly=\"readonly\" /></td>'+
					  ads+'</tr>'+
					  '</table>'+
					  '<div class=\"arcdata\">Internal Error</div><div class=\"arcslc\" style=\"display:none;\"></div></div></td></tr>';}
		
			if((VarGroup[GroupObj[GrNames[j]][i]]["type"]=='FLOAT'&&
		    	   VarGroup[GroupObj[GrNames[j]][i]]["plot"]=='1')||
	   	   	   (VarGroup[GroupObj[GrNames[j]][i]]["type"]=='FIXED'&&
		    	   VarGroup[GroupObj[GrNames[j]][i]]["plot"]=='1')||
	   	   	   (VarGroup[GroupObj[GrNames[j]][i]]["type"]=='INTEGER'&&
		    	   VarGroup[GroupObj[GrNames[j]][i]]["plot"]=='1')){
				var ads1='';
				var ads2='<td colspan=\"2\" class=\"refrbt\" style=\"width:55px;\">'+labels[curr_lang]['refresh']+'</td>';
			   	if(curr_auth_lev==1)ads2='<td class=\"refrbt\" style=\"width:55px;\">'+labels[curr_lang]['refresh']+'</td><td class=\"csvexp\" style=\"width:55px;\">'+labels[curr_lang]['export_csv']+'</td>';
			   	if(curr_auth_lev>1){
					ads1='<table style=\"width:100%\"><tr><td style=\"font-size:11px;width:17%;\">'+labels[curr_lang]['per_average']+', '+VarGroup[GroupObj[GrNames[j]][i]]["dataunits"]+':</td><td style=\"width:16.6%;\"><select style=\"font-size:11px;padding:0px;margin:0px;width:100%;\" size=\"1\" class=\"avg_calc\"><option value=\"avg\">'+labels[curr_lang]['avg_arithmetic']+'</option><option value=\"gmt\">'+labels[curr_lang]['avg_geometric']+'</option><option value=\"grm\">'+labels[curr_lang]['avg_harmonic']+'</option><option value=\"rms\">'+labels[curr_lang]['avg_rms']+'</option><option selected value=\"mdn\">'+labels[curr_lang]['avg_median']+'</option></select></td><td class="avg_val" style=\"width:16.6%;background-color:#efebe5;font-weight:bold;\">--</td>'+
						'<td style=\"font-size:11px;width:16.6%;\">'+labels[curr_lang]['per_dev']+', '+VarGroup[GroupObj[GrNames[j]][i]]["dataunits"]+'</td><td style=\"width:16.6%;\"><select style=\"font-size:11px;padding:0px;margin:0px;width:100%;\" size=\"1\" class=\"var_calc\"><option selected value=\"mad\">'+labels[curr_lang]['dev_absolute']+'</option><option value=\"asd\">'+labels[curr_lang]['dev_rms']+'</option></select></td><td class="ras_val" style=\"width:16.6%;background-color:#efebe5;font-weight:bold;\">--</td></tr>'+
					        '<tr><td style=\"font-size:11px;\">'+labels[curr_lang]['min_val']+', '+VarGroup[GroupObj[GrNames[j]][i]]["dataunits"]+':</td><td class="min_val" style=\"background-color:#efebe5;font-weight:bold;\">--</td>'+
					        '<td style=\"font-size:11px;\">'+labels[curr_lang]['max_val']+', '+VarGroup[GroupObj[GrNames[j]][i]]["dataunits"]+':</td><td class="max_val" style=\"background-color:#efebe5;font-weight:bold;\">--</td>'+
					        '<td style=\"font-size:11px;\">&Delta; '+labels[curr_lang]['per_per']+', '+VarGroup[GroupObj[GrNames[j]][i]]["dataunits"]+':</td><td class="pdel_val" style=\"background-color:#efebe5;font-weight:bold;\">--</td></tr>'+
						'<tr><td style=\"font-size:10px;\">'+labels[curr_lang]['per_vel']+' ('+VarGroup[GroupObj[GrNames[j]][i]]["dataunits"]+'&times;sec<sup>-1</sup>&times;10<sup>-3</sup>):</td><td class="prd_grd" style=\"background-color:#efebe5;font-weight:bold;\">--</td>'+
					        '<td style=\"font-size:10px;\">'+labels[curr_lang]['per_aiv']+' ('+VarGroup[GroupObj[GrNames[j]][i]]["dataunits"]+'&times;sec<sup>-1</sup>&times;10<sup>-3</sup>):</td><td class="avgp_grd" style=\"background-color:#efebe5;font-weight:bold;\">--</td>'+
					        '<td style=\"font-size:10px;\">'+labels[curr_lang]['per_adv']+' ('+VarGroup[GroupObj[GrNames[j]][i]]["dataunits"]+'&times;sec<sup>-1</sup>&times;10<sup>-3</sup>):</td><td class="avgn_grd" style=\"background-color:#efebe5;font-weight:bold;\">--</td></tr></table>';

					ads2='<td class=\"refrbt\" style=\"width:55px;\">'+labels[curr_lang]['refresh']+'</td><td class=\"csvexp\" style=\"width:55px;\">'+labels[curr_lang]['export_csv']+'</td>';}
				html=html+'<tr class=\"'+(GrNames[j]!='*'?GrNames[j]+'_list hidden_row':'ungrouped_parameters_list hidden_row')+'\" style=\"display:none;\"><td class=\"dtpar\" style="width:12%;font-weight:bold;">'+GroupObj[GrNames[j]][i]+'</td><td class=\"dtpar\" style="width:55%;">'+

				     VarGroup[GroupObj[GrNames[j]][i]]["description"][curr_lang]+'</td><td class=\"arctbl\" name=\"'+GroupObj[GrNames[j]][i]+'\">'+labels[curr_lang]['displ_in_table']+'</td><td class=\"arcgrh\" name=\"'+GroupObj[GrNames[j]][i]+'\">'+labels[curr_lang]['displ_on_graph']+'</td></tr>';
				html=html+'<tr class=\"'+(GrNames[j]!='*'?GrNames[j]+'_list hidden_row':'ungrouped_parameters_list hidden_row')+'\" style=\"display:none;\"><td colspan=\"4\" style=\"margin:0px;padding:0px;border-style:none;\">'+
					  '<div class=\"vararcdt\" id=\"'+GroupObj[GrNames[j]][i]+'\">'+
					  '<table style=\"width:100%;background-color:#e0e0e0;\">'+
					  '<tr><td colspan=\"6\" class=\"header\">'+labels[curr_lang]['data_of_arc']+' <b>'+GroupObj[GrNames[j]][i]+'</b> :: '+VarGroup[GroupObj[GrNames[j]][i]]["description"][curr_lang]+'<div class=\"hide_arc\" onClick=\"$(this).parents(\'.vararcdt\').hide();\" title=\"'+labels[curr_lang]['hide']+'\">[ _ ]</div></td></tr>'+
					  '<tr><td>'+labels[curr_lang]['data_start']+':</td>'+
					  '<td style=\"border-bottom:1px solid #C0C0C0;border-right:1px solid #C0C0C0;\"><input type=\"text\" style=\"width:95%\" class=\"datetimeinput data_from\" readonly=\"readonly\" /></td>'+
					  '<td>'+labels[curr_lang]['data_end']+':</td>'+
					  '<td style=\"border-bottom:1px solid #C0C0C0;border-right:1px solid #C0C0C0;\"><input type=\"text\" style=\"width:95%\" class=\"datetimeinput data_to\" readonly=\"readonly\" /></td>'+
					  ads2+'</tr>'+
					  '<tr class=\"'+(GrNames[j]!='*'?GrNames[j]+'_list hidden_row':'ungrouped_parameters_list hidden_row')+'\" style=\"display:none;\"><td colspan=\"6\">'+ads1+'</td></tr>'+
					  '</table>'+
					  '<div class=\"arcdata\">Internal Error</div><div class=\"arcslc\" style=\"display:none;\"></div></div></td></tr>';}
		}
	}
	}
	html=html+'</table><br />';
}
else html="<div style=\"text-align:center;height:60px;color:#E03030;font-weight:bold;\"><br />"+labels[curr_lang]['no_aval_vars']+"</div>";
return html;
}

function ArcDataInit(Name){


	var labels={
			"uk":{
				"wrong_date":"Невірно вказана дата"
			},
			"ru":{
				"wrong_date":"Неверно указана дата"				
			},
			"en":{
				"wrong_date":"Wrond date input"				
			}
	};

var now=new Date;
var yes=new Date(now.getTime() - 86400000);

if($("#"+Name).find(".data_from").val()==''||!$("#"+Name).is(":visible")){$("#"+Name).find(".data_from").val(yes.format('yyyy-mm-dd HH:MM:ss'))}
if($("#"+Name).find(".data_to").val()==''||!$("#"+Name).is(":visible")){$("#"+Name).find(".data_to").val(now.format('yyyy-mm-dd HH:MM:ss'))}

var from=$("#"+Name).find(".data_from").val();
var to=$("#"+Name).find(".data_to").val();

if((Date.parse(from)>=Date.parse(to))||
   (Date.parse(to)-Date.parse(from)>7776000000)){
alert(labels[curr_lang]['wrong_date']);return {};}
else{return JSON.parse('{"from":"'+from+'","to":"'+to+'"}');}}

function ArcTable(Name){

	var labels={
			"uk":{
				"no_data":"Немає даних у вказаному діапазоні",
				"date_time":"Дата/Час",
				"var_value":"Значення",
				"val_active":"Активний",
				"val_inactive":"Неактивний",
				"print_table":"Друк таблиці"
			},
			"ru":{
				"no_data":"Нет данных в указанном диапазоне",
				"date_time":"Дата/Время",
				"var_value":"Значение",
				"val_active":"Активно",
				"val_inactive":"Неактивно",
				"print_table":"Печать таблицы"				
			},
			"en":{
				"no_data":"No Data over specified period",
				"date_time":"Date/Time",
				"var_value":"Value",
				"val_active":"Active",
				"val_inactive":"Inactive",
				"print_table":"Print the Table"			
			}
	};

var Obj=$("#"+Name).find(".arcdata");
var Data=GetVarArcs([Name],ArcDataInit(Name));
Obj.css({'text-align':''});
if((Data[Name].length==0)||(typeof Data[Name]=="string")){
if(typeof Data[Name]=="string"){alert(Data[Name])}
Obj.html('');
if((curr_auth_lev>1)&&
    (VarGroup[Name]["type"]=='FLOAT'&&
    VarGroup[Name]["plot"]=='1')||
    (VarGroup[Name]["type"]=='FIXED'&&
    VarGroup[Name]["plot"]=='1')||
    (VarGroup[Name]["type"]=='INTEGER'&&
    VarGroup[Name]["plot"]=='1')){
        $("#"+Name).find(".avg_val").html("--");
        $("#"+Name).find(".ras_val").html("--");
        $("#"+Name).find(".min_val").html("--");
        $("#"+Name).find(".max_val").html("--");
        $("#"+Name).find(".pdel_val").html("--");
        $("#"+Name).find(".prd_grd").html("--");
        $("#"+Name).find(".avgp_grd").html("--");
        $("#"+Name).find(".avgn_grd").html("--");}
    Obj.html('<div class=\"vararcdt\" id=\"'+Name+'\" style=\"display:block;\"><div class=\"arcdatatable\">'+labels[curr_lang]['no_data']+'</div></div>');}
else{
	Obj.html('');
	if((curr_auth_lev>1)&&
       (VarGroup[Name]["type"]=='FLOAT'&&
       VarGroup[Name]["plot"]=='1')||
       (VarGroup[Name]["type"]=='FIXED'&&
       VarGroup[Name]["plot"]=='1')||
       (VarGroup[Name]["type"]=='INTEGER'&&
       VarGroup[Name]["plot"]=='1')){

		if($("#"+Name).find(".avg_calc").val()=='avg')$("#"+Name).find(".avg_val").html(avg_y(Data[Name],VarGroup[Name]["roundto"]))
		else if($("#"+Name).find(".avg_calc").val()=='gmt')$("#"+Name).find(".avg_val").html(gmt_val(Data[Name],VarGroup[Name]["roundto"]))
		else if($("#"+Name).find(".avg_calc").val()=='grm')$("#"+Name).find(".avg_val").html(grm_val(Data[Name],VarGroup[Name]["roundto"]))
		else if($("#"+Name).find(".avg_calc").val()=='rms')$("#"+Name).find(".avg_val").html(rms_val(Data[Name],VarGroup[Name]["roundto"]))
		else if($("#"+Name).find(".avg_calc").val()=='mdn')$("#"+Name).find(".avg_val").html(mdn_val(Data[Name],VarGroup[Name]["roundto"]));
		
		if($("#"+Name).find(".var_calc").val()=='mad')$("#"+Name).find(".ras_val").html(mad_val(Data[Name],$("#"+Name).find(".avg_val").text(),VarGroup[Name]["roundto"]))
		else if($("#"+Name).find(".var_calc").val()=='asd')$("#"+Name).find(".ras_val").html(asd_val(Data[Name],$("#"+Name).find(".avg_val").text(),VarGroup[Name]["roundto"]));

        $("#"+Name).find(".min_val").html(min_y(Data[Name]));
        $("#"+Name).find(".max_val").html(max_y(Data[Name]));
        $("#"+Name).find(".pdel_val").html(pdel_val(Data[Name],VarGroup[Name]["roundto"]));
		var vel=fn_vel(Data[Name],VarGroup[Name]["roundto"]);
        $("#"+Name).find(".prd_grd").html(vel[2]);
        $("#"+Name).find(".avgp_grd").html(vel[0]);
        $("#"+Name).find(".avgn_grd").html(vel[1]);}
var str='<div class=\"arcdatatablecont\"><table class=\"arcdatatable\"><tr><td>'+labels[curr_lang]['date_time']+'</td><td>'+labels[curr_lang]['var_value']+'</td></tr>';
for(var i=0;i<=Data[Name].length-1;i++){
  	if(curr_auth_lev>1){
       	if(VarGroup[Name]["type"]!='BOOL'){str=str+'<tr><td class=\"arcdatatablepar slicedata\">'+Data[Name][i][0]+'</td><td class=\"arcdatatablepar\">'+Data[Name][i][1]+'</td></tr>';}
   		else{str=str+'<tr><td class=\"arcdatatablepar slicedata\">'+Data[Name][i][0]+'</td><td class=\"arcdatatablepar\">'+(Data[Name][i][1]!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])+'</td></tr>';}}
   	else{
       	if(VarGroup[Name]["type"]!='BOOL'){str=str+'<tr><td class=\"arcdatatablepar\">'+Data[Name][i][0]+'</td><td class=\"arcdatatablepar\">'+Data[Name][i][1]+'</td></tr>';}
   		else{str=str+'<tr><td class=\"arcdatatablepar\">'+Data[Name][i][0]+'</td><td class=\"arcdatatablepar\">'+(Data[Name][i][1]!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])+'</td></tr>';}}}
if(curr_auth_lev>0){
	Obj.html('<div id="'+Name+'_dtadd" class=\"dtbl_add\"><img class=\"prdtbl\" src=\"Print.ico\" title=\"'+labels[curr_lang]['print_table']+'\" style=\"cursor:pointer;\" /></div>');
	$("#"+Name+"_dtadd").css({'margin-top':-Obj.find(".arcdatatable").height()+2});
	$("#"+Name+"_dtadd").css({'margin-left':2});
	$("#"+Name+"_dtadd").disableSelection();}
Obj.append(str+'</table></div>');
$("#"+Name).find(".arcslc").html("");}}

function ArcGraph(Name){

	var labels={
			"uk":{
				"no_data":"Немає даних у вказаному діапазоні",
				"date_time":"Дата/Час",
				"var_value":"Значення",
				"gen_picture":"Генерувати зображення",
				"un_zoom":"Скасувати масштабування",
				"add_plot":"Побудувати додаткові значення",
				"add_values":"Додаткові значення",
				"do_plot":"Побудувати",
				"hide":"Приховати",
				"print_graph":"Друк діаграми",
				"print_table":"Друк таблиці"
			},
			"ru":{
				"no_data":"Нет данных в указанном диапазоне",
				"date_time":"Дата/Время",
				"var_value":"Значение",
				"gen_picture":"Генерировать изображение",
				"un_zoom":"Отменить масштабирование",
				"add_plot":"Построить дополнительные значения",
				"add_values":"Дополнительные значения",
				"do_plot":"Построить",
				"hide":"Скрыть",
				"print_graph":"Печать диаграммы",
				"print_table":"Друк таблиці"				
			},
			"en":{
				"no_data":"No Data over specified period",
				"date_time":"Date/Time",
				"var_value":"Value",
				"gen_picture":"Generate the Image",
				"un_zoom":"Undo Zoom",
				"add_plot":"Plot additional Values",
				"add_values":"Additional Values",
				"do_plot":"Plot",
				"hide":"Hide",
				"print_graph":"Print the Graph",
				"print_table":"Print the Table"		
			}
	};


var Obj=$("#"+Name).find(".arcdata");
var Data=GetVarArcs([Name],ArcDataInit(Name));
var i=0;
Obj.html('<div id="'+Name+'_plot"></div>');
Obj.css({'text-align':''});
if((Data[Name].length>0)&&(typeof Data[Name]!="string")){
Obj.css({'text-align':'left'});
    $("#"+Name+"_plot").html("");
    var grhcursdt={};
    if(curr_auth_lev>1){
    	grhcursdt={zoom:true,looseZoom:true,tooltipLocation:'w'}}
    else{
    	grhcursdt={zoom:false,looseZoom:false}}
    var yiTicks=0.5*(1+Math.round(((Math.round(max_y(Data[Name])+0.5)-Math.round(min_y(Data[Name])-0.5)))/15));
    var nyTicks=Math.round((Math.round(max_y(Data[Name])+0.5)-Math.round(min_y(Data[Name])-0.5))/yiTicks+0.5);
	var minYval=Math.round(min_y(Data[Name])-0.5);
	var maxYval=Math.round(max_y(Data[Name])+0.5);
	var alarmranges={show:false};
	if(VarGroup[Name]["critical"]=="1"){
		alarmranges={
        	show: true,
        	objects: [                
				{horizontalLine: {
                    y:+VarGroup[Name]["crminval"],
                    lineWidth:1,
                    color:'rgba(250,100,0,0.7)',
					xminOffset:"0px",
					xmaxOffset:"0px",
                    shadow: false
                	}
				},              
				{horizontalLine: {
                    y:+VarGroup[Name]["crmaxval"],
                    lineWidth:1,
                    color:'rgba(250,100,0,0.7)',
					xminOffset:"0px",
					xmaxOffset:"0px",
                    shadow: false
                	}
				},
          		{rectangle:{ymax:+VarGroup[Name]["crminval"],xminOffset:"0px",xmaxOffset:"0px",yminOffset:"0px",ymaxOffset:"0px",
                    color:"rgba(200,100,0,0.2)",showTooltip:false}},
          		{rectangle:{ymin:+VarGroup[Name]["crmaxval"],xminOffset:"0px",xmaxOffset:"0px",yminOffset:"0px",ymaxOffset:"0px",
                    color:"rgba(200,100,0,0.2)",showTooltip:false}}
        	]
      	} 
	}
    $.jqplot.config.enablePlugins=true;
   	plot[Name]=$.jqplot(Name+"_plot",[Data[Name]],{
    seriesDefaults: {showLabel:true,fill:false,shadowAlpha:0.5,shadowDepth:1,lineWidth:2,rendererOptions:{smooth:true},showMarker:false},      
	axesDefaults:{labelRenderer: $.jqplot.CanvasAxisLabelRenderer},
    axes:{
        xaxis:{
			renderer:$.jqplot.DateAxisRenderer,
			tickRenderer:$.jqplot.CanvasAxisTickRenderer,
			showTicks:true,
			showLabel:false,
			tickOptions:{angle:-90,fontSize:'8pt',formatString:'%Y-%m-%#d %#H:%M:%S'},
			label:labels[curr_lang]['date_time'],
			min:min_x(Data[Name]),
			max:max_x(Data[Name]),
			numberTicks:30},
        yaxis:{
			tickOptions:{fontSize:'8pt'},
			min:minYval,
			max:maxYval,
			numberTicks:nyTicks,
			tickInterval:yiTicks,
			showLabel:false,
			label:labels[curr_lang]['var_value']+', '+VarGroup[Name]["dataunits"],
			labelOptions:{fontSize:'12pt'},
			pad:0}
    },
    series: [{label:Name+' ('+VarGroup[Name]["description"][curr_lang]+', '+VarGroup[Name]["dataunits"]+')',color:"#A03030"}],
	canvasOverlay:alarmranges,
    cursor:grhcursdt,
    legend: {show:true,location:'e'},
    grid: {gridLineColor:"#A0A0A0",drawBorder:false,shadow:false,background:"#faf0e8",drawGridLines:true},
    highlighter: {show:true,tooltipLocation:'ne',sizeAdjust:5,showMarker:true,useAxesFormatters:true}
});
$("#"+Name).find(".arcslc").html("");
if(curr_auth_lev==1){
	$("#"+Name+"_plot").parents(".arcdata").append('<div id="'+Name+'_add" class=\"grh_add\">'+
	'<img class=\"prpng\" src=\"Print.ico\" title=\"'+labels[curr_lang]['print_table']+'\" style=\"cursor:pointer;\" />'+
	'</div>');
	$("#"+Name+"_add").css({'margin-top':-$("#"+Name+"_plot").height()+1});
	$("#"+Name+"_add").css({'margin-left':Obj.find(".jqplot-yaxis").width()+36});
	$("#"+Name+"_add").disableSelection();}
if(curr_auth_lev>1){
	var vel=fn_vel(Data[Name],VarGroup[Name]["roundto"]);

	if($("#"+Name).find(".avg_calc").val()=='avg')$("#"+Name).find(".avg_val").html(avg_y(Data[Name],VarGroup[Name]["roundto"]))
	else if($("#"+Name).find(".avg_calc").val()=='gmt')$("#"+Name).find(".avg_val").html(gmt_val(Data[Name],VarGroup[Name]["roundto"]))
	else if($("#"+Name).find(".avg_calc").val()=='grm')$("#"+Name).find(".avg_val").html(grm_val(Data[Name],VarGroup[Name]["roundto"]))
	else if($("#"+Name).find(".avg_calc").val()=='rms')$("#"+Name).find(".avg_val").html(rms_val(Data[Name],VarGroup[Name]["roundto"]))
	else if($("#"+Name).find(".avg_calc").val()=='mdn')$("#"+Name).find(".avg_val").html(mdn_val(Data[Name],VarGroup[Name]["roundto"]));
	
	if($("#"+Name).find(".var_calc").val()=='mad')$("#"+Name).find(".ras_val").html(mad_val(Data[Name],$("#"+Name).find(".avg_val").text(),VarGroup[Name]["roundto"]))
	else if($("#"+Name).find(".var_calc").val()=='asd')$("#"+Name).find(".ras_val").html(asd_val(Data[Name],$("#"+Name).find(".avg_val").text(),VarGroup[Name]["roundto"]));

    $("#"+Name).find(".min_val").html(min_y(Data[Name]));
    $("#"+Name).find(".max_val").html(max_y(Data[Name]));
    $("#"+Name).find(".pdel_val").html(pdel_val(Data[Name],VarGroup[Name]["roundto"]));
    $("#"+Name).find(".prd_grd").html(vel[2]);
    $("#"+Name).find(".avgp_grd").html(vel[0]);
    $("#"+Name).find(".avgn_grd").html(vel[1]);
	$("#"+Name+"_plot").parent().append('<div id="'+Name+'_add" class=\"grh_add\">'+
	'<img class=\"prpng\" src=\"Print.ico\" title=\"'+labels[curr_lang]['print_graph']+'\" style=\"cursor:pointer;\" />'+
	'&nbsp;<img class=\"wnpng\" src=\"Win.ico\" title=\"'+labels[curr_lang]['gen_picture']+'\" style=\"cursor:pointer;\" />'+
	'&nbsp;<img class=\"grhzmout\" src=\"Zoom.ico\" title=\"'+labels[curr_lang]['un_zoom']+'\" id=\"'+Name+'_unzoom\" style=\"cursor:pointer;\" />'+
	'&nbsp;<img class=\"addcrv\" src=\"AddCrv.ico\" title=\"'+labels[curr_lang]['add_plot']+'\" style=\"cursor:pointer;\" /></div>'+
	'<div class=\"addcrvgrp\"><div style=\"height:16px;text-align:center;font-weight:bold;color:#ffffff;background-color:#aaaaaa;\">'+labels[curr_lang]['add_values']+'</div><div style=\"color:#ffffff;position:absolute;margin-left:520px;margin-top:-16px;cursor:pointer;\" title=\"'+labels[curr_lang]['hide']+'\" onClick=\"$(this).parents(\'.addcrvgrp\').hide();\">[ _ ]</div><div class=\"addcrvlist\"></div>'+
	'<div class=\"addcrvbt\" style=\"position:absolute;width:550px;margin-left:-2px;text-align:center;height:16px;\">'+labels[curr_lang]['do_plot']+'</div>'+
	'</div>');

	$("#"+Name).find(".addcrvlist").html("");
	$("#"+Name).find(".addcrvgrp").css({'height':Obj.find(".jqplot-series-canvas").height()-24});
	
	$("#"+Name).find(".addcrvgrp").css({'margin-top':-$("#"+Name+"_plot").height()+1});
	$("#"+Name).find(".addcrvgrp").css({'margin-left':Obj.find(".jqplot-yaxis").width()+Obj.find(".grh_add").width()+42});
	
	$("#"+Name).find(".addcrvlist").css({'height':Obj.find(".addcrvgrp").height()-18});
	$("#"+Name).find(".addcrvlist").css({'overflow':'auto'});
	$("#"+Name).find(".addcrvbt").css({'top':Obj.find(".addcrvgrp").height()+3});
	var names=[],name;
	for(name in VarGroup){if(VarGroup.hasOwnProperty(name)){names.push(name);}};
	names.sort();
	var html='<table style=\"width:100%;text-align:left;color:#ffffff;\">';
	for(var i=0;i<=names.length-1;i++){
	if((names[i]!=Name)&&
	  ((VarGroup[names[i]]["type"]=='FLOAT'&&
    	VarGroup[names[i]]["plot"]=='1')||
       	(VarGroup[names[i]]["type"]=='FIXED'&&
       	VarGroup[names[i]]["plot"]=='1')||
       	(VarGroup[names[i]]["type"]=='INTEGER'&&
       	VarGroup[names[i]]["plot"]=='1'))){
		html=html+'<tr><td><input type=\"checkbox\" value=\"'+
		names[i]+
		'\" />&nbsp;'+
		names[i]+
		'</td><td>'+VarGroup[names[i]]['description'][curr_lang]+
		'</td></tr>';}}
	html=html+'</table>';
	$("#"+Name).find(".addcrvlist").html(html);
	$("#"+Name+"_add").css({'margin-top':-$("#"+Name+"_plot").height()+1});
	$("#"+Name+"_add").css({'margin-left':Obj.find(".jqplot-yaxis").width()+36});
	$("#"+Name+"_add").disableSelection();
	}}
else{
if(typeof Data[Name]=="string"){alert(Data[Name])}
	if(curr_auth_lev>1){
    	$("#"+Name).find(".avg_val").html("--");
    	$("#"+Name).find(".ras_val").html("--");
    	$("#"+Name).find(".min_val").html("--");
    	$("#"+Name).find(".max_val").html("--");
    	$("#"+Name).find(".pdel_val").html("--");
        $("#"+Name).find(".prd_grd").html("--");
        $("#"+Name).find(".avgp_grd").html("--");
        $("#"+Name).find(".avgn_grd").html("--");}
$("#"+Name+"_plot").html(labels[curr_lang]['no_data'])}}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Alarm data page

function AlarmArchive(){


	var labels={
			"uk":{
				"no_data":"Немає даних...",
				"var_name":"Ім\'я змінної",
				"var_description":"Опис",
				"refresh":"Оновити",
				"data_start":"Початок виведення даних",
				"data_end":"Кінець виведення даних",
				"data_filter":"Фільтрація даних",
				"no_filter":"Фільтрація відсутня",
				"no_aval_vars":"Немає доступних змінних"
			},
			"ru":{
				"no_data":"Нет данных...",
				"var_name":"Имя переменной",
				"var_description":"Описание",
				"refresh":"Обновить",
				"data_start":"Начало отображения данных",
				"data_end":"Окончание отображения данных",
				"data_filter":"Фильтрация данных",
				"no_filter":"Фильтрация отсутствует",
				"no_aval_vars":"Нет доступных переменных"				
			},
			"en":{
				"no_data":"No data...",
				"var_name":"Variable Name",
				"var_description":"Description",
				"refresh":"Refresh",
				"data_start":"Display Data Start",
				"data_end":"Display Data End",
				"data_filter":"Data Filtering",
				"no_filter":"No Filtering",
				"no_aval_vars":"No any available variables"				
			}
	};


var now=new Date;
var tes=new Date(now.getTime() - 86400000);

var html='<br /><table class=\"alarmtable\" id=\"AlarmArchive\">'+

		'<tr><td colspan=\"2\">'+
		'<table style=\"width:100%;background-color:#e0e0e0;\">'+
		'<tr><td>'+labels[curr_lang]['data_start']+':</td>'+
		'<td style=\"border-bottom:1px solid #C0C0C0;border-right:1px solid #C0C0C0;\"><input type=\"text\" style=\"width:95%\" class=\"datetimeinput data_from\" readonly=\"readonly\" /></td>'+
		'<td>'+labels[curr_lang]['data_end']+':</td>'+
		'<td style=\"border-bottom:1px solid #C0C0C0;border-right:1px solid #C0C0C0;\"><input type=\"text\" style=\"width:95%\" class=\"datetimeinput data_to\" readonly=\"readonly\" /></td>'+
		'<td colspan=\"3\" class=\"refrals\" style=\"width:55px;\">'+labels[curr_lang]['refresh']+'</td></tr>'+
		'</table></td></tr>'+

		'<tr><td id=\"AlarmArchiveHead\" style=\"background-color:#EDEAE3;\" colspan=\"2\">'+labels[curr_lang]['no_data']+'</td></tr>'+
		'<tr><td style=\"font-size:11px;background-color:#e0e0e0;\">'+labels[curr_lang]['data_filter']+'</td><td style=\"width:60%;\"><select style=\"font-size:11px;padding:0px;margin:0px;width:100%;\" size=\"1\" class=\"alarm_filter\"><option selected value=\"none\" >'+labels[curr_lang]['no_filter']+'</option></select></td></tr>'+
		'<tr><td colspan=\"2\"><div id=\"AlarmDataCont\"></div></td></tr></table>';
		 
return html;}

function CreateAlarmArchive(){

	var labels={
			"uk":{
				"wrong_date":"Невірно вказана дата",
				"var_name":"Ім\'я змінної",
				"val_active":"Активний",
				"val_inactive":"Неактивний",
				"val_below":"нижче",
				"val_above":"вище",
				//"cr_state":"критичний стан",
				//"cr_value":"критичне значення",
				"cr_state":"",
				"cr_value":"",
				"date_time_app":"Дата (Час) виникнення",
				"date_time_clr":"Дата (Час) усунення",
				"al_cr_state":"Аварійний або критичний стан",
				"al_cr_st_from":"Аварійні та критичниі стани за період з",
				"al_cr_st_to":"до",
				"no_data":"Немає даних у вказаному діапазоні",
				"print_table":"Друк таблиці"
			},
			"ru":{
				"wrong_date":"Неверно указана дата",
				"var_name":"Имя переменной",
				"val_active":"Активно",
				"val_inactive":"Неактивно",
				"val_below":"ниже",
				"val_above":"выше",
				//"cr_state":"критическое состояние",
				//"cr_value":"критическое значение",
				"cr_state":"",
				"cr_value":"",
				"date_time_app":"Дата (Время) возникновения",
				"date_time_clr":"Дата (Время) устранения",
				"al_cr_state":"Аварийное или критическое состояние",
				"al_cr_st_from":"Аварийные и критические состояния за период с",
				"al_cr_st_to":"по",
				"no_data":"Нет данных в указанном диапазоне",
				"print_table":"Печать таблицы"			
			},
			"en":{
				"wrong_date":"Wrond date input",
				"var_name":"Variable Name",
				"var_value":"Value",
				"val_active":"Active",
				"val_below":"below",
				"val_above":"above",
				//"cr_state":"critical state",
				//"cr_value":"critical value",
				"cr_state":"",
				"cr_value":"",
				"date_time_app":"Date (Time) of appearance",
				"date_time_clr":"Date (time) of elimination",
				"al_cr_state":"Alarm or critical state",
				"al_cr_st_from":"Alarm and critical states over the period from",
				"al_cr_st_to":"to",
				"no_data":"No Data over specified period",
				"print_table":"Print the Table"				
			}
	};




var now=new Date;
var yes=new Date(now.getTime() - 86400000);

if($("#AlarmArchive").find(".data_from").val()==''){$("#AlarmArchive").find(".data_from").val(yes.format('yyyy-mm-dd HH:MM:ss'))}
if($("#AlarmArchive").find(".data_to").val()==''){$("#AlarmArchive").find(".data_to").val(now.format('yyyy-mm-dd HH:MM:ss'))}

var from=$("#AlarmArchive").find(".data_from").val();
var to=$("#AlarmArchive").find(".data_to").val();

if((Date.parse(from)>=Date.parse(to))||
   (Date.parse(to)-Date.parse(from)>7776000000)){
alert(labels[curr_lang]['wrong_date']);}
else{
	var prd=JSON.parse('{"from":"'+from+'","to":"'+to+'"}');

	var names=[], name;

	for(name in VarGroup){
		if((VarGroup.hasOwnProperty(name))&&
	   	   (VarGroup[name]["critical"]=="1")&&
	   	   (VarGroup[name]["archive"]=="1")&&
		   (VarGroup[name]["processing"]=="1")){
			if(($("#AlarmArchive").find(".alarm_filter").val()=="none")||
			   ($("#AlarmArchive").find(".alarm_filter").val()==name))
				names.push(name);
		}
}

names.sort();

if(names.length==0){
	return '<div style=\"background-color:#DDDAD3;\">'+labels[curr_lang]['no_data']+'</div>';}
else{

var ArcData=GetVarArcs(names,prd);

var AlarmList=[];

for(var i=0;i<=names.length-1;i++){
	if(VarGroup[names[i]]["type"]=="BOOL"){
		for(var j=0;j<=ArcData[names[i]].length-1;j++){
			if(ArcData[names[i]][j][1]==+VarGroup[names[i]]["alarmstate"]){

				if($("#AlarmArchive").find(".alarm_filter").find("option[value='"+names[i]+"']").length==0)
					$("#AlarmArchive").find(".alarm_filter").append($('<option>',{value:names[i],text:VarGroup[names[i]]["description"][curr_lang]}));

				if(j<ArcData[names[i]].length-1)
					AlarmList.push([VarGroup[names[i]]["description"][curr_lang]/*+" ("+(ArcData[names[i]][j][1]!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])+") <b>"+labels[curr_lang]['cr_state']+"</b>"*/,names[i],ArcData[names[i]][j][0],ArcData[names[i]][j+1][0]]);
				if(j==ArcData[names[i]].length-1)
					AlarmList.push([VarGroup[names[i]]["description"][curr_lang]/*+" ("+(ArcData[names[i]][j][1]!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])+") <b>"+labels[curr_lang]['cr_state']+"</b>"*/,names[i],ArcData[names[i]][j][0],"--"]);
			}
		}
	}
	if((VarGroup[names[i]]["type"]=="INTEGER")){
		for(var j=0;j<=ArcData[names[i]].length-1;j++){
			if(ArcData[names[i]][j][1]==+VarGroup[names[i]]["crvalue"]){

				if($("#AlarmArchive").find(".alarm_filter").find("option[value='"+names[i]+"']").length==0)
					$("#AlarmArchive").find(".alarm_filter").append($('<option>',{value:names[i],text:VarGroup[names[i]]["description"][curr_lang]}));

				if(j<ArcData[names[i]].length-1)
					AlarmList.push([VarGroup[names[i]]["description"][curr_lang]+": "+ArcData[names[i]][j][1]+VarGroup[names[i]]["dataunits"]+" - <b>"+labels[curr_lang]['cr_value']+"</b>",names[i],ArcData[names[i]][j][0],ArcData[names[i]][j+1][0]]);
				if(j==ArcData[names[i]].length-1)
					AlarmList.push([VarGroup[names[i]]["description"]+": "+ArcData[names[i]][j][1]+VarGroup[names[i]]["dataunits"]+" - <b>"+labels[curr_lang]['cr_value']+"</b>",names[i],ArcData[names[i]][j][0],"--"]);
			}
		}
	}
	if((VarGroup[names[i]]["type"]=='FLOAT')||
    	   (VarGroup[names[i]]["type"]=='FIXED')){

		var k=0;
		for(j=0;j<=(ArcData[names[i]].length-1);j++){
			if(ArcData[names[i]][j][1]<+VarGroup[names[i]]["crminval"]){

				if($("#AlarmArchive").find(".alarm_filter").find("option[value='"+names[i]+"']").length==0)
					$("#AlarmArchive").find(".alarm_filter").append($('<option>',{value:names[i],text:VarGroup[names[i]]["description"][curr_lang]}));

				for (k=j;k<=(ArcData[names[i]].length-1);k++){
					if ((k<=(ArcData[names[i]].length-1))&&(+ArcData[names[i]][k][1]>=(parseInt(+VarGroup[names[i]]["crminval"],10)+parseInt(+VarGroup[names[i]]["crdiffer"],10)))){
						AlarmList.push([VarGroup[names[i]]["description"][curr_lang]+": "+ArcData[names[i]][j][1]+VarGroup[names[i]]["dataunits"]+" - <b>"+labels[curr_lang]['val_below']+" "+VarGroup[names[i]]["crminval"]+"</b>"+VarGroup[names[i]]["dataunits"],names[i],ArcData[names[i]][j][0],ArcData[names[i]][k][0]]);
						j=k;
						break;
					}
					if (k==(ArcData[names[i]].length-1)){
						AlarmList.push([VarGroup[names[i]]["description"][curr_lang]+": "+ArcData[names[i]][j][1]+VarGroup[names[i]]["dataunits"]+" - <b>"+labels[curr_lang]['val_below']+" "+VarGroup[names[i]]["crminval"]+"</b>"+VarGroup[names[i]]["dataunits"],names[i],ArcData[names[i]][j][0],"--"]);
						j=k;
					}
				}
			}
			if(ArcData[names[i]][j][1]>+VarGroup[names[i]]["crmaxval"]){

				if($("#AlarmArchive").find(".alarm_filter").find("option[value='"+names[i]+"']").length==0)
					$("#AlarmArchive").find(".alarm_filter").append($('<option>',{value:names[i],text:VarGroup[names[i]]["description"][curr_lang]}));

				for (k=j;k<=(ArcData[names[i]].length-1);k++){
					if ((k<=(ArcData[names[i]].length-1))&&(+ArcData[names[i]][k][1]<=(parseInt(+VarGroup[names[i]]["crmaxval"],10)-parseInt(+VarGroup[names[i]]["crdiffer"],10)))){
						AlarmList.push([VarGroup[names[i]]["description"][curr_lang]+": "+ArcData[names[i]][j][1]+VarGroup[names[i]]["dataunits"]+" - <b>"+labels[curr_lang]['val_above']+" "+VarGroup[names[i]]["crmaxval"]+"</b>"+VarGroup[names[i]]["dataunits"],names[i],ArcData[names[i]][j][0],ArcData[names[i]][k][0]]);
						j=k;
						break;
					}
					if (k==(ArcData[names[i]].length-1)){
						AlarmList.push([VarGroup[names[i]]["description"][curr_lang]+": "+ArcData[names[i]][j][1]+VarGroup[names[i]]["dataunits"]+" - <b>"+labels[curr_lang]['val_above']+" "+VarGroup[names[i]]["crmaxval"]+"</b>"+VarGroup[names[i]]["dataunits"],names[i],ArcData[names[i]][j][0],"--"]);
						j=k;
					}
				}
			}
		}
	}
}


AlarmList.sort(function(a,b){
	var d1=parseInt(+a[2].replace(/ /g,"").replace(/-/g,"").replace(/:/g,""),10);
	var d2=parseInt(+b[2].replace(/ /g,"").replace(/-/g,"").replace(/:/g,""),10);
	return(d1-d2)});


$("#AlarmDataCont").html("");

if(AlarmList.length>0){
	if(curr_auth_lev>1){
		var altbl="<div class=\"altbl_add\"><img class=\"praltbl\" src=\"Print.ico\" title=\""+labels[curr_lang]['print_table']+"\" style=\"cursor:pointer;\" /></div><table style=\"width:100%;border-spacing:0px;\">"+
				  "<tr><td style=\"padding:4px;\">"+labels[curr_lang]['al_cr_state']+"</td><td style=\"padding:4px;\">"+labels[curr_lang]['var_name']+"</td><td style=\"width:17%;padding:4px;\">"+labels[curr_lang]['date_time_app']+"</td><td style=\"width:17%;padding:4px;\">"+labels[curr_lang]['date_time_clr']+"</td></tr>";
		for(var i=0;i<=AlarmList.length-1;i++){
			altbl=altbl+"<tr><td style=\"text-align:left;\" class=\"dtpar\">"+AlarmList[i][0]+"</td><td style=\"text-align:left;\" class=\"dtpar\" id=\""+AlarmList[i][1]+"_alnote\">"+AlarmList[i][1]+"</td><td class=\"arcalslice\" style=\"background-color:#e05050;border-bottom:1px solid #b0b0b0;border-right:1px solid #b0b0b0;\">"+AlarmList[i][2]+"</td><td "+(AlarmList[i][3]=='--'?'':'class=\"arcalslice\"')+"style=\"border-bottom:1px solid #b0b0b0;border-right:1px solid #b0b0b0;"+(AlarmList[i][3]=='--'?'background-color:#e05050;':'background-color:#50e050;')+"\">"+AlarmList[i][3]+"</td></tr>";
			altbl=altbl+"<tr><td colspan=\"4\" class=\"alparadd\"></td></tr>";
		}
	}
	else if(curr_auth_lev==1){
		var altbl="<div class=\"altbl_add\"><img class=\"praltbl\" src=\"Print.ico\" title=\""+labels[curr_lang]['print_table']+"\" style=\"cursor:pointer;\" /></div><table style=\"width:100%;border-spacing:0px;\">"+
				  "<tr><td style=\"padding:4px;\">"+labels[curr_lang]['al_cr_state']+"</td><td style=\"padding:4px;\">"+labels[curr_lang]['date_time_app']+"</td><td style=\"padding:4px;\">"+labels[curr_lang]['date_time_clr']+"</td></tr>";
		for(var i=0;i<=AlarmList.length-1;i++){
			altbl=altbl+"<tr><td style=\"text-align:left;\" class=\"dtpar\">"+AlarmList[i][0]+"</td><td style=\"background-color:#e05050;border-bottom:1px solid #b0b0b0;border-right:1px solid #b0b0b0;\">"+AlarmList[i][2]+"</td><td style=\"border-bottom:1px solid #b0b0b0;border-right:1px solid #b0b0b0;"+(AlarmList[i][3]=='--'?'background-color:#e05050;':'background-color:#50e050;')+"\">"+AlarmList[i][3]+"</td></tr>";
		}
	}
	else if(curr_auth_lev<1){
		var altbl="<table style=\"width:100%;border-spacing:0px;\"><tr><td style=\"padding:4px;\">"+labels[curr_lang]['al_cr_state']+"</td><td style=\"padding:4px;\">"+labels[curr_lang]['date_time_app']+"</td></tr>";
		for(var i=0;i<=AlarmList.length-1;i++){
			altbl=altbl+"<tr><td style=\"text-align:left;\" class=\"dtpar\">"+AlarmList[i][0]+"</td><td  class=\"dtpar\" style=\"text-align:center;\">"+AlarmList[i][2]+"</td></tr>";
		}
	}

	altbl=altbl+"</table>";

	$("#AlarmArchiveHead").html(labels[curr_lang]['al_cr_st_from']+" <b>"+from+"</b> "+labels[curr_lang]['al_cr_st_to']+" <b>"+to+"</b></div>");
	$("#AlarmDataCont").html(altbl);
}
else{
	$("#AlarmArchiveHead").html(labels[curr_lang]['no_data']);}

}}}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Report data page
function SystemDataReport(){


	var labels={
			"uk":{
				"var_name":"Ім\'я змінної",
				"var_description":"Опис",
				"group_of_parameters":"Група параметрів",
				"ungrouped_parameters":"Негруповані параметри",
				"data_cut":"Дата (Час) зрізу даних архіву",
				"data_check":"Вибір параметрів для формування звіту",
				"print":"Вивести на друк",
				"gen_report":"Сформувати звіт",
				"no_aval_vars":"Немає доступних змінних"
			},
			"ru":{
				"var_name":"Имя переменной",
				"var_description":"Описание",
				"group_of_parameters":"Группа параметров",
				"ungrouped_parameters":"Негруппированные параметры",
				"data_cut":"Дата (Время) среза данных архива",
				"data_check":"Выбор параметров для формирования отчета",
				"print":"Распечатать",
				"gen_report":"Сформировать отчет",
				"no_aval_vars":"Нет доступных переменных"				
			},
			"en":{
				"var_name":"Variable Name",
				"var_description":"Description",
				"group_of_parameters":"Group of Parameters",
				"ungrouped_parameters":"Ungrouped Parameters",
				"refresh":"Refresh",
				"data_cut":"Date (Time) to slice the archive",
				"data_check":"Choose the Parameters to generate the Report",
				"print":"Print data",
				"gen_report":"Generate the Report",
				"no_aval_vars":"No any available variables"				
			}
	};


var now=new Date;

	function GetColor(i) {
		var color=(['#915151','#91634D','#91774D','#91904E','#7BA150','#5BA150','#41A15F','#40A17B','#41A19C','#418CA1','#437AA1','#4063A1','#4350A1','#5E50A1','#7E50A1','#91537C']);
		while((i>color.length-1)&&(i>0)){
			i=i-color.length;}
	    return color[i];}
	
	var names = [], name;

	for(name in VarGroup){
		if(VarGroup.hasOwnProperty(name)){
			if(VarGroup[name]["archive"]=="1" && VarGroup[name]["processing"]=="1")names.push(name);
		}
	}

	names.sort();
	
	var GroupObj={};
	for(var i=0;i<=names.length-1;i++){
		if(VarGroup[names[i]]["group"]!=''){
			if(typeof GroupObj[VarGroup[names[i]]["group"]]!='object'){
				GroupObj[VarGroup[names[i]]["group"]]=[];
			}
			GroupObj[VarGroup[names[i]]["group"]].push(names[i]);
		}
		else{
			if(typeof GroupObj["*"]!='object'){
				GroupObj["*"]=[];
			}
			GroupObj["*"].push(names[i]);
		}
	}
	
	var GrNames = [], name;

	for(name in GroupObj){
		if(GroupObj.hasOwnProperty(name)){
			GrNames.push(name);
		}
	};
	
	GrNames.sort();

var repvarlist=	"<table style=\"border-spacing:0px;width:90%;\">"+		 
				"<tr><td colspan=\"3\" style=\"padding:3px;\">"+labels[curr_lang]['data_check']+"</td></tr>"+
				"<tr style=\"background-color:#D0C5B5;\"><td colspan=\"2\">"+labels[curr_lang]['var_name']+"</td><td style=\"width:70%;\">"+labels[curr_lang]['var_description']+"</td></tr>";

	if(GrNames.length>0){
		for(var j=0;j<=GrNames.length-1;j++){
			repvarlist=repvarlist+'<tr><td colspan=\"3\"></td></tr><tr onClick=\"$(\'.'+(GrNames[j]!='*'?GrNames[j]+'_list':'ungrouped_parameters_list')+'\').toggle(100)\" style=\"cursor:pointer;background-color:'+GetColor(j)+';\"><td colspan=\"4\" align=\"left\" style=\"font-size:14px;padding:5px;text-indent:20px;\">'+(GrNames[j]!='*'?labels[curr_lang]['group_of_parameters']+' <div style=\"text-indent:10px;font-weight:bold;color:#f0f0f0;text-align:center;display:inline-block;\">"'+GrNames[j]+'"</div>':labels[curr_lang]['ungrouped_parameters'])+'</td></tr>'
			for(var i=0;i<=GroupObj[GrNames[j]].length-1;i++){
					repvarlist=repvarlist+'<tr class=\"'+(GrNames[j]!='*'?GrNames[j]+'_list hidden_row':'ungrouped_parameters_list hidden_row')+'\" style=\"display:none;background-color:#eae5db;\"><td style=\"border-bottom:1px solid #CAC8C0;\"><input type=\"checkbox\" value=\"'+GroupObj[GrNames[j]][i]+'_repvarlist\" class=\"params\"></td><td style=\"text-align:left;text-indent:10px;font-weight:bold;border-bottom:1px solid #CAC8C0;\">'+GroupObj[GrNames[j]][i]+'</td><td style=\"text-align:left;text-indent:20px;border-bottom:1px solid #CAC8C0;\">'+VarGroup[GroupObj[GrNames[j]][i]]["description"][curr_lang]+'</td></tr>';
		}
	}}

repvarlist=repvarlist+
		 	"<tr><td colspan=\"3\" align=\"left\"><input type=\"checkbox\" id=\"RepPrint\">"+labels[curr_lang]['print']+"</td></tr>"+
		 	"<tr><td class=\"arcdrep\" colspan=\"3\">"+labels[curr_lang]['gen_report']+"</td></tr>"+
			"</table>";

	var html="<br /><table class=\"reporttable\" id=\"ReportDataTable\" style=\"width:auto;\"><tr><td><table style=\"border-spacing:0px;width:600px;\">"+
		 "<tr><td colspan=\"4\" style=\"background-color:#D0C5B5;\"> "+labels[curr_lang]['data_cut']+":</td></tr>"+
		 "<tr style=\"background-color:#DAD8D0;\"><td style=\"border-bottom:1px solid #b0b0b0;\"><input type=\"text\" style=\"width:200px;\" class=\"datetimeinput data_sl\" readonly=\"readonly\" value=\""+now.format('yyyy-mm-dd HH:MM:ss')+"\" /></td></tr></table>"+
		 "<tr><td>"+repvarlist+
		 "</td></tr>"+
		 "</table></td></tr>";

	html=html+"</table><br />";

return html;}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Variables Register Page

function VarReg(){



	var labels={
			"uk":{
				"filter":"Фільтр",
				"node_names":"Вузли даних",
				"var_nature":"Сутність",
				"var_real":"Реальна",
				"var_virtual":"Віртуальна",
				"var_name":"Ім\'я",
				"var_description":"Опис",
				"var_reg":"Адреса регістра",
				"acc_level":"Рівень доступу",
				"guest":"Гість",
				"supervisor":"Диспетчер",
				"engineer":"Інженер",
				"admin":"Адміністратор",
				"group":"Група",
				"var_arch":"Архівування",
				"var_read":"Читання тільки",
				"var_readwrite":"Читання-запис",
				"var_write":"Запис тільки",
				"all_groups":"Всі можливі",
				"var_type":"Тип",
				"weak_conn":"Погана якість зв`язку",
				"no_aval_vars":"Немає доступних змінних"
			},
			"ru":{
				"filter":"Фильтр",
				"node_names":"Узлы данных",
				"var_nature":"Сущность",
				"var_real":"Реальная",
				"var_virtual":"Виртуальная",
				"var_name":"Имя",
				"var_description":"Описание",
				"var_reg":"Адрес регистра",
				"acc_level":"Уровень доступа",
				"guest":"Гость",
				"supervisor":"Диспетчер",
				"engineer":"Инженер",
				"admin":"Администратор",
				"group":"Группа",
				"var_arch":"Архивирование",
				"var_read":"Чтение только",
				"var_readwrite":"Чтение-запись",
				"var_write":"Запись только",
				"all_groups":"Все доступные",
				"var_type":"Тип",
				"weak_conn":"Плохая связь",
				"no_aval_vars":"Нет доступных переменных"				
			},
			"en":{
				"filter":"Filter",
				"node_names":"Data Nodes",
				"var_nature":"Nature",
				"var_real":"Real",
				"var_virtual":"Virtual",
				"var_name":"Name",
				"var_description":"Description",
				"var_reg":"Register Address",
				"acc_level":"Access Level",
				"guest":"Guest",
				"supervisor":"Supervisor",
				"engineer":"Engineer",
				"admin":"Administrator",
				"group":"Group",
				"var_arch":"Archiving",
				"var_read":"Read only",
				"var_readwrite":"Read-write",
				"var_write":"Write only",
				"all_groups":"All available",
				"var_type":"Type",
				"weak_conn":"Weak Connection",
				"no_aval_vars":"No any available variables"				
			}
	};


	var html="<br />"+
			 "<div align=\"center\">"+
			 "<table style=\"border-spacing:0px;padding:0px;margin:0px;\"><tr><td>"+
			 "<div id=\"VarRegFilter\" style=\"background-color:#CAC8C0;display:block;padding:5px;\">"+
			 "<table style=\"font-size:11px;border-spacing:1px;background-color:#D0D0D0;width:100%;border:1px solid #C0C0C0;\"><tr><td style=\"text-align:center;\">"+labels[curr_lang]['filter']+"</td></tr>"+
			 "<tr><td style=\"text-align:center;background-color:#EAEAEA;\">"+labels[curr_lang]['node_names']+"</td></tr>";

	for(var name in NodeVars){
		html=html+"<tr><td style=\"text-align:left;background-color:#EAE5DB;\"><input class=\"varflt\" type=\"checkbox\" checked name=\""+name+"_node\" style=\"transform:scale(0.8);padding-top:2px;\">"+name+"<span> ("+NodeVars[name].length+")</span></td></tr>";
	}


	html=html+	 "<tr><td style=\"text-align:center;background-color:#EAEAEA;\">"+labels[curr_lang]['var_nature']+"</td></tr>"+
			 "<tr><td style=\"text-align:left;background-color:#EAE5DB;\"><input class=\"varflt\" type=\"checkbox\" checked name=\"real\" style=\"transform:scale(0.8);padding-top:2px;\">"+labels[curr_lang]['var_real']+" <span id=\"real_count\"></span></td></tr>"+
			 "<tr><td style=\"text-align:left;background-color:#EAE5DB;\"><input class=\"varflt\" type=\"checkbox\" checked name=\"virtual\" style=\"transform:scale(0.8);padding-top:2px;\">"+labels[curr_lang]['var_virtual']+" <span id=\"virtual_count\"></span></td></tr>"+
			 "<tr><td style=\"text-align:center;background-color:#EAEAEA;\">"+labels[curr_lang]['var_name']+"</td></tr>"+
			 "<tr><td style=\"text-align:center;\"><input type=\"text\" style=\"font-size:11px;\" id=\"varsearchreq_nam\"></td></tr>"+
			 "<tr><td style=\"text-align:center;background-color:#EAEAEA;\">"+labels[curr_lang]['var_description']+"</td></tr>"+
			 "<tr><td style=\"text-align:center;\"><input type=\"text\" style=\"font-size:11px;\" id=\"varsearchreq_des\"></td></tr>"+
			 "<tr><td style=\"text-align:center;background-color:#EAEAEA;\">"+labels[curr_lang]['var_reg']+"</td></tr>"+
			 "<tr><td style=\"text-align:center;\"><input type=\"text\" style=\"font-size:11px;\" id=\"varsearchreq_add\"></td></tr>"+
			 "<tr><td style=\"text-align:center;background-color:#EAEAEA;\">"+labels[curr_lang]['acc_level']+"</td></tr>"+
			 "<tr><td><select style=\"font-size:11px;padding:0px;margin:0px;width:100%;\" size=\"1\" id=\"varsearchreq_lev\"><option "+(curr_auth_lev==0?'selected':'')+" value=\"0\">"+labels[curr_lang]['guest']+"</option><option "+(curr_auth_lev==1?'selected':'')+" value=\"1\">"+labels[curr_lang]['supervisor']+"</option><option "+(curr_auth_lev==2?'selected':'')+" value=\"2\">"+labels[curr_lang]['engineer']+"</option><option "+(curr_auth_lev==3?'selected':'')+" value=\"3\">"+labels[curr_lang]['admin']+"</option></select></td></tr>"+
			 "<tr><td style=\"text-align:center;background-color:#EAEAEA;\">"+labels[curr_lang]['group']+"</td></tr>"+
			 "<tr><td><select style=\"font-size:11px;padding:0px;margin:0px;width:100%;\" size=\"1\" id=\"vargroupreq\"><option selected value=\"none\">"+labels[curr_lang]['all_groups']+"</option></select></td></tr>"+
			 "<tr><td style=\"text-align:center;background-color:#EAEAEA;\">"+labels[curr_lang]['var_type']+"</td></tr>"+
			 "<tr><td style=\"text-align:left;background-color:#EAE5DB;\"><input class=\"varflt\" type=\"checkbox\" checked name=\"bool\" style=\"transform:scale(0.8);padding-top:2px;\">BOOL <span id=\"bool_count\"></span></td></tr>"+
			 "<tr><td style=\"text-align:left;background-color:#EAE5DB;\"><input class=\"varflt\" type=\"checkbox\" checked name=\"integer\" style=\"transform:scale(0.8);padding-top:2px;\">INTEGER <span id=\"integer_count\"></span></td></tr>"+
			 "<tr><td style=\"text-align:left;background-color:#EAE5DB;\"><input class=\"varflt\" type=\"checkbox\" checked name=\"fixed\" style=\"transform:scale(0.8);padding-top:2px;\">FIXED <span id=\"fixed_count\"></span></td></tr>"+
			 "<tr><td style=\"text-align:left;background-color:#EAE5DB;\"><input class=\"varflt\" type=\"checkbox\" checked name=\"float\" style=\"transform:scale(0.8);padding-top:2px;\">FLOAT <span id=\"float_count\"></span></td></tr>"+
			 "<tr><td style=\"text-align:left;background-color:#EAEAEA;\"><input class=\"varflt\" type=\"checkbox\" name=\"arch\" style=\"transform:scale(0.8);padding-top:2px;\">"+labels[curr_lang]['var_arch']+" <span id=\"arch_count\"></span></td></tr>"+
			 "<tr><td style=\"text-align:left;background-color:#EAEAEA;\"><input class=\"varflt\" type=\"checkbox\" name=\"readonly\" style=\"transform:scale(0.8);padding-top:2px;\">"+labels[curr_lang]['var_read']+" <span id=\"read_count\"></span></td></tr>"+
			 "<tr><td style=\"text-align:left;background-color:#EAEAEA;\"><input class=\"varflt\" type=\"checkbox\" name=\"readwrite\" style=\"transform:scale(0.8);padding-top:2px;\">"+labels[curr_lang]['var_readwrite']+" <span id=\"readwrite_count\"></span></td></tr>"+
			 "<tr><td style=\"text-align:left;background-color:#EAEAEA;\"><input class=\"varflt\" type=\"checkbox\" name=\"writeonly\" style=\"transform:scale(0.8);padding-top:2px;\">"+labels[curr_lang]['var_write']+" <span id=\"write_count\"></span></td></tr>"+
			 "<tr><td style=\"text-align:left;background-color:#EAEAEA;\"><input class=\"varflt\" type=\"checkbox\" name=\"comm_err\" style=\"transform:scale(0.8);padding-top:2px;\">"+labels[curr_lang]['weak_conn']+" <span id=\"comm_err_count\"></span></td></tr>"+
			 "</table></div>"+
			 "</td><td>"+
			 "<div style=\"background-color:#CAC8C0;display:block;padding:5px;\" id=\"RegVarTable\">"+
			 "<div style=\"display:table-cell;vertical-align:top;background-color: #d0d0d0;text-indent:5px;font-size:12px;width:120px;\">"+
			 "<div id=\"VarRegList\" style=\"overflow-y:scroll;\"></div></div>"+
			 "<div style=\"display:table-cell;vertical-align:top;background-color:#d0d0d0;text-indent:5px;overflow-y:scroll;border:1px solid #c0c0c0;\" id=\"VarRegData\"></div>"+
			 "</div></div>"+
			 "</td></tr></table>";
	return html;
}

function CreateVarReg(){


	var labels={
			"uk":{
				"var_reg_cls":"Співпадіння адреси регстрів змінних",
				"var_reg_num_cls":"за номером",
				"var_nam_cls":"Співпадіння імен змінних",
				"var_des_cls":"Співпадіння опису змінних",
				"var_des_txt_cls":"за текстом",
				"var_parameter":"Параметр змінної",
				"var_nature":"Сутність",
				"var_parameter_value":"Значення",
				"var_name":"Ім\'я змінної",
				"var_processing":"Обробка змінної",
				"var_type":"Тип змінної",
				"var_description":"Опис змінної",
				"var_answer":"Відповідь пристрою",
				"var_error_str":"Текст помилки",
				"var_flprec":"Точність даних",
				"var_value":"Значення",
				"var_actual":"Актуальність значення змінної",
				"group":"Група",
				"var_implement":"Приналежність",
				"var_log":"Реєстрація зміни значення",
				"var_address":"Адреса пристрою",
				"var_reg":"Адреса регістра",
				"var_words":"Кількість слів даних (по 2 байти)",
				"var_reg_type":"Тип регістрів",
				"var_func":"Функція",
				"var_neg_val":"Від\'ємні значення (дод. код)",
				"var_units":"Одиниці виміру",
				"var_write":"Запис значень",
				"var_wr_var":"Змінна для виведення даних",
				"var_wr_step":"Крок виведення значень",
				"var_corr":"Корекція значень",
				"var_mult":"Множник (K)",
				"var_shift":"Зміщення (B)",
				"var_round":"Округлення дроб. частини, до знаку",
				"var_archive":"Архівування значень",
				"var_arc_step":"Крок архівування",
				"var_plot":"Побудова графіків",
				"var_critical":"Критичний стан",
				"var_cr_max":"Максимальне значення змінної",
				"var_cr_min":"Мінімальне значення змінної",
				"var_cr_val":"Критичне значення",
				"var_cr_diff":"Диференціал скидання крит. стану",
				"var_cr_var_ign":"Ігнорування аварійної сигналізації",
				"acc_level":"Рівень доступу",
				"no_aval_vars":"Немає доступних змінних"
			},
			"ru":{
				"var_reg_cls":"Совпадение адресов регистров переменных",
				"var_reg_num_cls":"по номеру",
				"var_nam_cls":"Совпадение имен переменных",
				"var_des_cls":"Совпадение описания переменных",
				"var_des_txt_cls":"по тексту",
				"var_parameter":"Параметр переменной",
				"var_parameter_value":"Значение",
				"var_name":"Имя переменной",
				"var_nature":"Сущность",
				"var_processing":"Обработка переменной",
				"var_type":"Тип переменной",
				"var_description":"Описание переменной",
				"var_answer":"Ответ устройства",
				"var_error_str":"Текст ошибки",
				"var_flprec":"Точность данных",
				"var_value":"Значение",
				"var_actual":"Актуальность значения переменной",
				"group":"Группа",
				"var_implement":"Принадлежность",
				"var_log":"Регистрация изменения значения",
				"var_address":"Адрес устройства",
				"var_reg":"Адрес регистра",
				"var_words":"Количество слов данных (по 2 байта)",
				"var_reg_type":"Тип регистров",
				"var_func":"Функция",
				"var_neg_val":"Отрицательные значения (доп. код)",
				"var_units":"Единицы измерения",
				"var_write":"Запись значений",
				"var_wr_var":"Переменная вывода данных",
				"var_wr_step":"Шаг выведения значений",
				"var_corr":"Коррекция значений",
				"var_mult":"Множитель (K)",
				"var_shift":"Смещение (B)",
				"var_round":"Округление дроб. части, до знака",
				"var_archive":"Архивация значений",
				"var_arc_step":"Шаг архивации",
				"var_plot":"Построение графиков",
				"var_critical":"Критическое состояние",
				"var_cr_max":"Максимальное значение переменной",
				"var_cr_min":"Минимальное значение переменной",
				"var_cr_val":"Критическое значение",
				"var_cr_diff":"Дифференциал сброса крит. состояния",
				"var_cr_var_ign":"Игнорир-е авар-ой сигнализации",
				"acc_level":"Уровень доступа",
				"no_aval_vars":"Нет доступных переменных"			
			},
			"en":{
				"var_reg_cls":"Matching of variables Registers addresses",
				"var_reg_num_cls":"by number",
				"var_nam_cls":"Matching of variables Names",
				"var_des_cls":"Matching of variables Description",
				"var_des_txt_cls":"by text",
				"var_parameter":"Parameter of Variable",
				"var_parameter_value":"Value",
				"var_name":"Variable Name",
				"var_nature":"Nature",
				"var_processing":"Variable Processing",
				"var_type":"Variable Type",
				"var_description":"Variable Description",
				"var_answer":"Answer of Device",
				"var_error_str":"Error string",
				"var_flprec":"Float precision",
				"var_value":"Value",
				"var_actual":"The actuality of the variable value",
				"group":"Group",
				"var_implement":"Implement",
				"var_log":"Registering changing values",
				"var_address":"Device Address",
				"var_reg":"Register Address",
				"var_words":"The number of data words (2 bytes)",
				"var_reg_type":"Register Type",
				"var_func":"Function",
				"var_neg_val":"Negative values (two's complement)",
				"var_units":"Units",
				"var_write":"Write Data",
				"var_wr_var":"Variable for data output",
				"var_wr_step":"Value Step to write data",
				"var_corr":"Value Correction",
				"var_mult":"Multiplier (K)",
				"var_shift":"Offset (B)",
				"var_round":"Rounding the fract. part to sign",
				"var_archive":"Archiving values",
				"var_arc_step":"Archiving step",
				"var_plot":"Plotting",
				"var_critical":"Critical State",
				"var_cr_max":"The maximum Value",
				"var_cr_min":"The minimum Value",
				"var_cr_val":"The critical Value",
				"var_cr_diff":"The critical state reset Differential",
				"var_cr_var_ign":"Ignoring the alarm output",
				"acc_level":"Access Level",
				"no_aval_vars":"No any available variables"				
			}
	};

	var names=[];
	var nodes=[];
	var Vname="";

	var real_count=0;
	var virtual_count=0;
	var bool_count=0;
	var integer_count=0;
	var fixed_count=0;
	var float_count=0;
	var code_count=0;
	var comm_err_count=0;
	var err=[];
		
	for(name in VarGroup){if(VarGroup.hasOwnProperty(name)) names.push(name);}

	for(var i=0;i<=names.length-1;i++){
		for(var j=0;j<=names.length-1;j++){
			if($.inArray(i,err)==-1){
				if ((VarNodes[names[i]] == VarNodes[names[j]]) &&
				   (VarGroup[names[i]]["origin"].includes("line") && VarGroup[names[j]]["origin"].includes("line")) &&
				   (VarGroup[names[i]]["origin"] == VarGroup[names[j]]["origin"]) &&
				   ((CommObj[VarNodes[names[i]]][VarGroup[names[i]]["origin"]]["Port"].includes("COM") && VarGroup[names[i]]["unitrtuaddr"] == VarGroup[names[j]]["unitrtuaddr"])||
				    (CommObj[VarNodes[names[i]]][VarGroup[names[i]]["origin"]]["Port"] == "ETHERNET" && VarGroup[names[i]]["unitethaddr"] == VarGroup[names[j]]["unitethaddr"])) &&
				   (VarGroup[names[i]]["type"] == VarGroup[names[j]]["type"]) &&
				   (i != j)){
					if(VarGroup[names[i]]["regaddress"] == VarGroup[names[j]]["regaddress"]){
						err.push(j);alert(labels[curr_lang]['var_reg_cls']+': '+names[i]+' || '+names[j]+' ('+labels[curr_lang]['var_reg_num_cls']+' '+VarGroup[names[i]]["regaddress"]+')')
					}
					if(JSON.stringify(VarGroup[names[i]]["description"]) == JSON.stringify(VarGroup[names[j]]["description"])){
						err.push(j);alert(labels[curr_lang]['var_des_cls']+': '+names[i]+' || '+names[j]+' ('+labels[curr_lang]['var_des_txt_cls']+' '+JSON.stringify(VarGroup[names[i]]["description"])+')')
					}
				}
			}
		}

		if(VarGroup[names[i]]["origin"].includes("line"))real_count++;
		if(VarGroup[names[i]]["origin"].includes("virtual"))virtual_count++;
		if(VarGroup[names[i]]["type"]=="BOOL")bool_count++;
		if(VarGroup[names[i]]["type"]=="INTEGER")integer_count++;
		if(VarGroup[names[i]]["type"]=="FIXED")fixed_count++;
		if(VarGroup[names[i]]["type"]=="FLOAT")float_count++;
		if(((VarGroup[names[i]]["answer"]=="0"))&&(VarGroup[names[i]]["processing"]=="1")&&(SrvStat[VarNodes[names[i]]]["scanning"]))comm_err_count++;}

	$("#real_count").text("("+real_count+")");
	$("#virtual_count").text("("+virtual_count+")");
	$("#bool_count").text("("+bool_count+")");
	$("#integer_count").text("("+integer_count+")");
	$("#fixed_count").text("("+fixed_count+")");
	$("#float_count").text("("+float_count+")");
	$("#comm_err_count").text("("+comm_err_count+")");

	names=[];

for(var Nname in NodeVars){
	if($("#VarRegFilter").find(".varflt[name="+Nname+"_node]").prop("checked")){
		for(var i=0;i<=NodeVars[Nname].length-1;i++){
			Vname=NodeVars[Nname][i];
			if((VarGroup.hasOwnProperty(Vname))&&
			   (
				($("#VarRegFilter").find(".varflt[name='real']").prop("checked")&&(VarGroup[Vname]["origin"].includes("line")))||
				($("#VarRegFilter").find(".varflt[name='virtual']").prop("checked")&&(VarGroup[Vname]["origin"].includes("virtual")))
			   )&&
			   (
				($("#VarRegFilter").find(".varflt[name='bool']").prop("checked")&&(VarGroup[Vname]["type"]=="BOOL"))||
				($("#VarRegFilter").find(".varflt[name='integer']").prop("checked")&&(VarGroup[Vname]["type"]=="INTEGER"))||
				($("#VarRegFilter").find(".varflt[name='fixed']").prop("checked")&&(VarGroup[Vname]["type"]=="FIXED"))||
				($("#VarRegFilter").find(".varflt[name='float']").prop("checked")&&(VarGroup[Vname]["type"]=="FLOAT"))
			   )
                            &&(
					($("#varsearchreq_nam").val()=="")||
					(Vname.indexOf($("#varsearchreq_nam").val())>-1)
			       )
                            &&(
					($("#varsearchreq_des").val()=="")||
					(VarGroup[Vname]["description"].indexOf($("#varsearchreq_des").val())>-1)
			       )
                            &&(
					($("#varsearchreq_add").val()=="")||
					(VarGroup[Vname]["regaddress"]==$("#varsearchreq_add").val())
			       )
			    &&(
					($("#VarRegFilter").find("#varsearchreq_lev").val()>=VarGroup[Vname]["hidden"])
			       )
			    &&(
					($("#VarRegFilter").find("#vargroupreq").val()=="none")||
					($("#VarRegFilter").find("#vargroupreq").val()==VarGroup[Vname]["group"])
				)
			    &&(
					($("#VarRegFilter").find(".varflt[name='arch']").prop("checked")&&(VarGroup[Vname]["archive"]=="1"))||
					(!$("#VarRegFilter").find(".varflt[name='arch']").prop("checked"))
			       )
			    &&(
					($("#VarRegFilter").find(".varflt[name='readonly']").prop("checked")&&(VarGroup[Vname]["write"]=="0"))||
					(!$("#VarRegFilter").find(".varflt[name='readonly']").prop("checked"))
			       )
			    &&(
					($("#VarRegFilter").find(".varflt[name='readwrite']").prop("checked")&&(VarGroup[Vname]["write"]=="1"))||
					(!$("#VarRegFilter").find(".varflt[name='readwrite']").prop("checked"))
			       )
			    &&(
					($("#VarRegFilter").find(".varflt[name='writeonly']").prop("checked")&&(VarGroup[Vname]["write"]=="2"))||
					(!$("#VarRegFilter").find(".varflt[name='writeonly']").prop("checked"))
			       )
			    &&(
			    		($("#VarRegFilter").find(".varflt[name='comm_err']").prop("checked")&&
				 	((VarGroup[Vname]["processing"]=="1")&&((VarGroup[Vname]["answer"]=="0")||(VarGroup[Vname]["crcerr"]=="1"))))
					||(!$("#VarRegFilter").find(".varflt[name='comm_err']").prop("checked"))
				)
			  )
				names.push(Vname);
		}
	}
}
	names.sort();

	for(var i=0;i<=names.length-1;i++){
		if((VarGroup[names[i]]["group"]!='')&&($("#VarRegFilter").find("#vargroupreq").find("option[value='"+VarGroup[names[i]]["group"]+"']").length==0)){
			$("#VarRegFilter").find("#vargroupreq").append($('<option>',{value:VarGroup[names[i]]["group"],text:VarGroup[names[i]]["group"]}));
		}
	}

	$("#VarRegList").html("");
	
	if(names.length>0){
		for(var i=0;i<=names.length-1;i++){
			$("#VarRegList").append("<div id=\""+names[i]+"_varreglist\" class=\"vrlitem\">"+names[i]+"</div>");
		}  
		if(curr_auth_lev==3){
			$("#VarRegData").html(
			"<table id=\"RegVarTableCont\" style=\"width:500px;font-size:11px;border-spacing:1px;background-color:#d0d0d0;text-indent:2px;text-align:left;\">"+
			"<tr style=\"text-align:center;background-color:#d5d5d5;\"><td style=\"width:50%;\">"+labels[curr_lang]['var_parameter']+"</td><td style=\"width:50%;\">"+labels[curr_lang]['var_parameter_value']+"</td></tr>"+
			"<tr><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_name']+"</td><td class=\"regvarpar\" id=\"RegVarName\"></td></tr>"+
    			"<tr><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_nature']+"</td><td class=\"regvarpar\" id=\"RegVarNature\"></td></tr>"+ //+(Line#)
    			"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL vFLOAT vBOOL vINTEGER\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_processing']+"</td><td id=\"RegVarProc\" class=\"editpar\" name=\"edit_processing\"></td></tr>"+
			"<tr><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_type']+"</td><td class=\"regvarpar\" id=\"RegVarType\"></td></tr>"+
	    		"<tr><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_description']+"</td><td id=\"RegVarDescription\" class=\"editpar\" name=\"edit_description\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_answer']+"</td><td class=\"regvarpar\" id=\"RegVarAnswer\"></td></tr>"+ //+(DataAge)
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_error_str']+"</td><td class=\"regvarpar\" id=\"RegVarErrStr\"></td></tr>"+
	    		"<tr class=\"started\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_value']+"</td><td id=\"RegVarValue\"></td></tr>"+ //+(Units*NotForEdit)
	    		"<tr class=\"vFLOAT vBOOL vINTEGER\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_actual']+"</td><td class=\"regvarpar\" id=\"RegVarActual\"></td></tr>"+
   			"<tr><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['group']+"</td><td class=\"editpar\" id=\"RegVarGroup\" name=\"edit_group\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_implement']+"</td><td class=\"editpar\" id=\"RegVarImplement\" name=\"edit_implement\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL WriteValue\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_log']+"</td><td class=\"editpar\" id=\"RegVarLog\" name=\"edit_log\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL Rtu485\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_address']+"</td><td class=\"editpar\" id=\"RegVarUnitRtuAddr\" name=\"edit_unitrtuaddr\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL Ethernet\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_address']+"</td><td class=\"editpar\" id=\"RegVarUnitEthAddr\" name=\"edit_unitethaddr\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_reg']+"</td><td class=\"editpar\" id=\"RegVarRegAddr\" name=\"edit_regaddress\"></td></tr>"+
	    		"<tr class=\"rFIXED rINTEGER\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_words']+"</td><td class=\"editpar\" id=\"RegVarRegNumb\" name=\"edit_regsnumber\"></td></tr>"+
	    		"<tr class=\"rFLOAT\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_flprec']+"</td><td class=\"editpar\" id=\"RegVarFloatPrec\" name=\"edit_floatprec\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_reg_type']+"</td><td class=\"editpar\" id=\"RegVarRegType\" name=\"edit_regtype\"></td></tr>"+
	    		"<tr class=\"vFLOAT vBOOL vINTEGER\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_func']+"</td><td id=\"RegVarFunc\" class=\"editpar\" name=\"edit_function\"></td></tr>"+
	    		"<tr class=\"rFIXED rINTEGER\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_neg_val']+"</td><td class=\"editpar\" id=\"RegVarNegVal\" name=\"edit_negval\"></td></tr>"+
	     		"<tr class=\"rFLOAT rFIXED rINTEGER vFLOAT\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_units']+"</td><td class=\"editpar\" name=\"edit_dataunits\" id=\"RegVarDtUnits\"></td></tr>"+
	   		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL vFLOAT vBOOL vINTEGER\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_write']+"</td><td id=\"RegVarWrite\" class=\"editpar\" name=\"edit_write\"></td></tr>"+
	    		"<tr class=\"vFLOAT vBOOL vINTEGER WriteValue\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_wr_var']+"</td><td id=\"RegVarWrVar\" class=\"editpar\" name=\"edit_writetovar\"></td></tr>"+
	    		"<tr class=\"vFLOAT vINTEGER WriteValue\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_wr_step']+"</td><td id=\"RegVarWrStp\" class=\"editpar\" name=\"edit_writestep\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rBOOL\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_corr']+"</td><td id=\"RegVarCorr\" class=\"editpar\" name=\"edit_correction\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_mult']+"</td><td id=\"RegVarCorrK\" class=\"editpar\" name=\"edit_multiplier\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_shift']+"</td><td id=\"RegVarCorrB\" class=\"editpar\" name=\"edit_shifting\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED vFLOAT\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_round']+"</td><td id=\"RegVarRndTo\" class=\"editpar\" name=\"edit_roundto\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL vFLOAT vBOOL vINTEGER\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_archive']+"</td><td id=\"RegVarArc\" class=\"editpar\" name=\"edit_archive\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER vFLOAT vINTEGER DataArchive\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_arc_step']+"</td><td id=\"RegVarArcStep\" class=\"editpar\" name=\"edit_arcstep\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER vFLOAT vINTEGER\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_plot']+"</td><td id=\"RegVarPlot\" class=\"editpar\" name=\"edit_plot\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL vFLOAT vBOOL vINTEGER\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_critical']+"</td><td id=\"RegVarCrState\" class=\"editpar\" name=\"edit_critical\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED vFLOAT CrState\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_cr_max']+"</td><td id=\"RegVarCrMaxVal\" class=\"editpar\" name=\"edit_crmaxval\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED vFLOAT CrState\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_cr_min']+"</td><td id=\"RegVarCrMinVal\" class=\"editpar\" name=\"edit_crminval\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED vFLOAT CrState\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_cr_diff']+"</td><td id=\"RegVarCrDiff\" class=\"editpar\" name=\"edit_crdiffer\"></td></tr>"+
	    		"<tr class=\"rINTEGER rBOOL vBOOL vINTEGER CrState\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_cr_val']+"</td><td id=\"RegVarCrVal\" class=\"editpar\" name=\"edit_crvalue\"></td></tr>"+
	    		"<tr class=\" rBOOL vBOOL CrState\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_cr_val']+"</td><td id=\"RegVarCrStVarSt\" class=\"editpar\" name=\"edit_alarmstate\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL vFLOAT vBOOL vINTEGER CrState\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['var_cr_var_ign']+"</td><td id=\"RegVarCrStIgn\" class=\"editpar\" name=\"edit_ignorecritical\"></td></tr>"+
	    		"<tr class=\"rFLOAT rFIXED rINTEGER rBOOL vFLOAT vBOOL vINTEGER\"><td style=\"text-indent:5px;\" class=\"regvarpar\">"+labels[curr_lang]['acc_level']+"</td><td id=\"RegVarAcsLev\" class=\"editpar\" name=\"edit_hidden\"></td></tr>"+
			"</table>");
		}

		$("#VarRegList").find(".vrlitem:first").click();
	}
	else alert(labels[curr_lang]['no_aval_vars']);
}

function WriteVarValue(Name,Val,Obj){
	var Value=null;	
	if(VarGroup[Name]["type"]=="BOOL"){
		if(Val=="ACTIVE")Value="1"
		else if(Val=="INACTIVE")Value="0";
   	}
	else {
		if(!isNaN(parseFloat(Val)))Value=parseFloat(Val)
		else Value=null;
	}
	if((Value!=null)&&(VarGroup[Name]["write"]!=2&&Value!=VarGroup[Name]["value"]||VarGroup[Name]["write"]==2)){
		var PrVal=VarGroup[Name]["value"];
		var TmpDt=SendData("setvarval",curr_auth_req,JSON.parse('{"'+Name+'":"'+Value+'"}'),VarNodes[Name]);
		alert(TmpDt["data_server"]["result"]+'\r\n'+JSON.stringify(TmpDt["data_server"]["data"][Name]));
		if(TmpDt[Name]!=PrVal)Obj.css({'background-color':'#ffefbf'});
	}		
	Obj.find('.setblock').remove();	
}

function WriteVarData(Name,Par,Val,Obj){
	var Value=null;
	if((Par=="plot")||(Par=="critical")||(Par=="ignorecritical")||(Par=="archive")||(Par=="processing")||(Par=="negval")||(Par=="log")){
		if(Val=="ALLOW")Value="1"
		else if(Val=="DENY")Value="0";
	}
	else if(Par=="alarmstate"){
		if(Val=="ACTIVE")Value="1"
		else if(Val=="INACTIVE")Value="0";
	}
	else if(Par=="write"){
		if(Val=="READ_ONLY")Value="0"
		else if(Val=="READ_WRITE")Value="1"
		else if(Val=="WRITE_ONLY")Value="2";
	}
	else if(Par=="hidden"){
		if(Val=="GUEST")Value="0"
		else if(Val=="SUPERVISOR")Value="1"
		else if(Val=="ENGINEER")Value="2"
		else if(Val=="ADMINISTRATOR")Value="3";
	}
	else if(Par=="regtype"){
		if(Val=="COILS")Value="1"
		else if(Val=="DISCR_INPUTS")Value="2"
		else if(Val=="HOLDING_REGS")Value="3"
		else if(Val=="INPUT_REGS")Value="4";
	}
	else if(Par=="crvalue"){
		if(VarGroup[Name]["type"]=="BOOL"){
			if(Val=="ACTIVE")Value="1"
			else if(Val=="INACTIVE")Value="0";
       	}
		else {
			if(!isNaN(parseFloat(Val)))Value=parseFloat(Val)
			else Value=null;
		}
	}	
	else if(Par=="correction"){
		if(VarGroup[Name]["type"]=="BOOL"){
			if(Val=="INVERSE")Value="1"
			else if(Val=="NOINVERSE")Value="0";
       	}
		else {
			if(!isNaN(parseFloat(Val)))Value=parseFloat(Val)
			else Value=null;
		}
	}	
	else if((Par=="multiplier")||(Par=="shifting")||(Par=="arcstep")||(Par=="writestep")||(Par=="crmaxval")||(Par=="crminval")||(Par=="crdiffer")){
		if(!isNaN(parseFloat(Val)))Value=parseFloat(Val)
		else Value=null;
	}
	else Value=Val.replace(/"/g,"'");
	
	if((Value!=null)&&(Value!=VarGroup[Name][Par])){
		var TmpDt=SendData("setvardata",curr_auth_req,JSON.parse('{"'+Name+'":{"'+Par+'":"'+Value+'"}}'),VarNodes[Name]);
		alert(TmpDt["data_server"]["result"]+'\r\r'+TmpDt["data_server"]["data"]);}
		Obj.find('.setblock').remove();

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Server data page

function SrvData(){


	var labels={
			"uk":{
				"node_data":"Параметри вузла даних",
				"scanning":"Синхронізація даних з периферійними пристроями",
				"scanning_started":"Запущено",
				"scanning_stopped":"Зупинено",
				"cr_state":"Наявність критичних станів",
				"ce_state":"Наявність помилок зв\'язку",
				"found":"Виявлено",
				"not_found":"Не виявлено",
				"ip_addr":"IP адреса серверу вузла даних",
				"ip_port":"Номер порту TCP-сервера",
				"data_lines":"Лінії зв`язку",
				"arc_max_size":"Максимальний розмір архіву, Mб",
				"arc_cur_size":"Поточний розмір архіву, Mб",
				"prg_aurn":"Автозапуск програми",
				"scn_aust":"Автозапуск синхронізації даних",
				"scn_aust_dly":"Затримка автозапуску синхронізації даних, сек.",
				"last_date":"Дата ост. коректн. припинення роботи",
				"start_scn":"Запуск синхронізації даних",
				"stop_scn":"Зупинка синхронізації даних",
				"restart_prg":"Перезапуск програми",
				"browser":"Ваш переглядач",
				"wan_ip":"Ваша зовнішня адреса",
				"cl_ip_port":"Порт зв`язку з сервером",
				"ser_name":"Ім`я серверу",
				"ser_addr":"Адреса розміщення сервера",
				"con_port":"Порт з`єднання",
				"con_prot":"Протокол зв`язку сервера",
				"add_info":"Додаткова інформація",
				"ser_sw":"ПЗ сервера"
			},
			"ru":{
				"node_data":"Параметры узла данных",
				"scanning":"Синхронизация данных с периферийными устройствами",
				"scanning_started":"Запущена",
				"scanning_stopped":"Остановлена",
				"cr_state":"Наличие критических состояний",
				"ce_state":"Наличие ошибок связи",
				"found":"Обнаружено",
				"not_found":"Не обнаружено",
				"ip_addr":"IP адрес сервера узла данных",
				"ip_port":"Номер порта TCP-сервера",
				"data_lines":"Линии связи",
				"arc_max_size":"Максимальный размер архива, Mб",
				"arc_cur_size":"Текущий размер архива, Mб",
				"prg_aurn":"Автозапуск программы",
				"scn_aust":"Автозапуск синхронизации данных",
				"scn_aust_dly":"Задержка автозапуска синхронизации данных, сек.",
				"last_date":"Дата посл. корректн. завершения работы",
				"start_scn":"Запуск синхронизации данных",
				"stop_scn":"Остановка синхронизации данных",
				"restart_prg":"Перезапуск программы",
				"browser":"Ваш обозреватель",
				"wan_ip":"Ваш внешний адрес",
				"cl_ip_port":"Порт связи с сервером",
				"ser_name":"Имя сервера",
				"ser_addr":"Адрес размещения сервера",
				"con_port":"Порт соединения",
				"con_prot":"Протокол связи сервера",
				"add_info":"Дополнительная информация",
				"ser_sw":"ПО сервера"				
			},
			"en":{
				"node_data":"Data Node parameters",
				"scanning":"Peripheral devices data sync",
				"scanning_started":"Started",
				"scanning_stopped":"Stopped",
				"cr_state":"Critical state",
				"ce_state":"Communication errors",
				"found":"Found",
				"not_found":"Not found",
				"ip_addr":"Data Node IP address",
				"ip_port":"TCP-server Port number",
				"data_lines":"Connection Lines",
				"arc_max_ize":"Maximum size of the archive, MB",
				"arc_cur_ize":"Currebt size of the archive, MB",
				"prg_aurn":"Autorun program",
				"scn_aust":"Autostart devices data sync",
				"scn_aust_dly":"Autostart devices data sync dly, sec",
				"last_date":"Latest correct shutdown date",
				"start_scn":"Start the devices data sync",
				"stop_scn":"Stop the devices data sync",
				"restart_prg":"Restart the program",
				"browser":"Your Browser",
				"wan_ip":"Your external address",
				"cl_ip_port":"Server connection port",
				"ser_name":"Server Name",
				"ser_addr":"Server location address",
				"con_port":"Connection port",
				"con_prot":"Connection protocol",
				"add_info":"Additional Information",
				"ser_sw":"Server SW"	
			}
	};

	var response={};


	var html="<br /><div align=\"center\"><div style=\"background-color:#CAC8C0;display:inline-block;padding:10px;\">";

	for(var i=0;i<=NodesNames.length-1;i++){
	
		response=SendData("getsrvconf",curr_auth_req,"",NodesNames[i]);
		
		html=html+"<div style=\"background-color:#D0D0D0;padding:10px;width:800px;font-size:12px;text-align:left;cursor:pointer;\" onClick=\"$('#"+NodesNames[i]+"_node_cont').toggle()\" >"+labels[curr_lang]['node_data']+" <b>\""+NodesNames[i]+"\"</b></div><div id=\""+NodesNames[i]+"_node_cont\" style=\"display:none;\">";
		
		html=html+"<table style=\"padding:2px;font-size:12px;width:800px;\">"+
			 "<tr style=\"background-color:#EAE5DB;\"><td colspan=\"2\" style=\"text-align:left;text-indent:10px;color:#707070;padding:5px;\">"+SrvStat[NodesNames[i]]["about"]+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['scanning']+"</td><td>"+(SrvStat[NodesNames[i]]["scanning"]?labels[curr_lang]['scanning_started']:labels[curr_lang]['scanning_stopped'])+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['ip_addr']+"</td><td>"+response["subsys"]["nodes"][NodesNames[i]]["host"]+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['ip_port']+"</td><td>"+response["data_server"]["data"]["DefaultPort"]+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['data_lines']+"</td><td>"+response["subsys"]["nodes"][NodesNames[i]]["lines"]+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['arc_cur_size']+"</td><td>"+response["data_server"]["data"]["CurArcSize"]+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['arc_max_size']+"</td><td>"+response["data_server"]["data"]["MaxArcSize"]+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['prg_aurn']+"</td><td>"+response["data_server"]["data"]["AutoRun"]+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['scn_aust']+"</td><td>"+response["data_server"]["data"]["AutoStart"]+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['scn_aust_dly']+"</td><td>"+response["data_server"]["data"]["AutoStartDly"]+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['last_date']+"</td><td>"+response["data_server"]["data"]["LastDate"]+"</td></tr>"+

			 "<tr style=\"background-color:#EAE5DB;\"><td colspan=\"2\" class=\"srvcomm\" onClick=\"alert(SendData('setsrvcmd',curr_auth_req,'startscan','"+NodesNames[i]+"')['data_server']['data']);\">"+labels[curr_lang]['start_scn']+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td colspan=\"2\" class=\"srvcomm\" onClick=\"alert(SendData('setsrvcmd',curr_auth_req,'stopscan','"+NodesNames[i]+"')['data_server']['data']);\">"+labels[curr_lang]['stop_scn']+"</td></tr>"+
			 "<tr style=\"background-color:#EAE5DB;\"><td colspan=\"2\" class=\"srvcomm\" onClick=\"alert(SendData('setsrvcmd',curr_auth_req,'restart','"+NodesNames[i]+"')['data_server']['data']);\">"+labels[curr_lang]['restart_prg']+"</td></tr>"+

			"</table></div>";

		html=html+"<div style=\"padding:5px;\"></div>";

	}
	
	html=html+"<div style=\"background-color:#D0D0D0;padding:10px;width:800px;font-size:12px;text-align:left;cursor:pointer;\" onClick=\"$('#add_data_cont').toggle()\" >"+labels[curr_lang]['add_info']+"</div><div id=\"add_data_cont\" style=\"display:none;\">";

	html=html+"<table style=\"padding:2px;font-size:12px;width:800px;\">"+
		  "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['browser']+"</td><td>"+response["client"]["browser"]+"</td></tr>"+
		  "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['wan_ip']+"</td><td>"+response["client"]["address"]+"</td></tr>"+
		  "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['cl_ip_port']+"</td><td>"+response["client"]["port"]+"</td></tr>"+
		  "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['ser_name']+"</td><td>"+response["http_server"]["name"]+"</td></tr>"+
		  "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['ser_addr']+"</td><td>"+response["http_server"]["address"]+"</td></tr>"+
		  "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['con_port']+"</td><td>"+response["http_server"]["port"]+"</td></tr>"+
		  "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['con_prot']+"</td><td>"+response["http_server"]["protocol"]+"</td></tr>"+
		  "<tr style=\"background-color:#EAE5DB;\"><td style=\"text-align:left;text-indent:10px;width:300px;\">"+labels[curr_lang]['ser_sw']+"</td><td>"+response["http_server"]["software"]+"</td></tr>"+
		  "</table></div>";



	html=html+"</div>";

	return html;

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FlowChart

function FlwChrtPrms(){

	var labels={
			"uk":{
				"val_active":"Активний",
				"val_inactive":"Неактивний"
			},
			"ru":{
				"val_active":"Активно",
				"val_inactive":"Неактивно"				
			},
			"en":{
				"val_active":"Active",
				"val_inactive":"Inactive"		
			}
	};

	if($("#content").find("#FlowChart").length){
			$("#content").find(".parval").each(function(){
				$(this).show();
				var Name="";
				if($(this).attr("id")!=null){Name=$(this).attr("id").replace("_label","");}
				if(VarGroup.hasOwnProperty(Name)){
					$(this).attr('title',VarGroup[Name]["description"][curr_lang]);

					if((VarGroup[Name]["processing"]=="1")&&(SrvStat[VarNodes[Name]]["scanning"])){
						if((((VarGroup[Name]["origin"].includes("line"))&&(VarGroup[Name]["answer"]=="1"))||
				   	   	   ((VarGroup[Name]["origin"].includes("virtual"))&&(VarGroup[Name]["actual"]=="1")))){
							if(VarGroup[Name]["critical"]!="1"){$(this).css({"background-color":""});}
							if(VarGroup[Name]["critical"]=="1"){
								if(VarGroup[Name]["crstate"]!="1")$(this).css({"background-color":"#50ff60"});
								if(VarGroup[Name]["crstate"]=="1")$(this).css({"background-color":"#ff6050"});
							}
						}
						else {
							$(this).css({'background-color':'#dfb030'});
							//$(this).html('--');
							//$(this).hide();
						}
					}
					else $(this).css({'background-color':'#c5c5c0'});

					if(Name!="")$(this).html((VarGroup[Name]["type"]!="BOOL"?"<b>"+(VarGroup[Name]["value"]!=""?VarGroup[Name]["value"]:"N/A")+"</b>"+((VarGroup[Name]["type"]=="FLOAT")||(VarGroup[Name]["type"]=="FIXED")||(VarGroup[Name]["type"]=="INTEGER")?VarGroup[Name]["dataunits"]:""):(VarGroup[Name]["value"]!="1"?"<b>"+labels[curr_lang]['val_inactive']+"</b>":"<b>"+labels[curr_lang]['val_active']+"</b>")));
				}
				else $(this).hide();
			});
			$("#content").find(".parimg").each(function(){
				var Name="";
				if($(this).attr("id")!=null) Name=$(this).attr("id").replace("_pict","");
				if(VarGroup.hasOwnProperty(Name)){
					if((SrvStat[VarNodes[Name]]["scanning"])&&(Name!="")&&(VarGroup[Name]["value"]!="0")/*&&(((VarGroup[Name]["origin"].includes("line"))&&(VarGroup[Name]["answer"]=="1"))||((VarGroup[Name]["origin"].includes("virtual"))&&(VarGroup[Name]["actual"]=="1")))*/)$(this).show()
					else $(this).hide();
}
				else $(this).hide();
			});

			$("#content").find(".inv_parimg").each(function(){
				var Name="";
				if($(this).attr("id")!=null) Name=$(this).attr("id").replace("_inv_pict","");
				if(VarGroup.hasOwnProperty(Name)){
					if((SrvStat[VarNodes[Name]]["scanning"])&&(Name!="")&&(VarGroup[Name]["value"]=="0")/*&&(((VarGroup[Name]["origin"].includes("line"))&&(VarGroup[Name]["answer"]=="1"))||((VarGroup[Name]["origin"].includes("virtual"))&&(VarGroup[Name]["actual"]=="1")))*/)$(this).show()
					else $(this).hide();
			}
				else $(this).hide();
			});

		setTimeout(function(){FlwChrtPrms();},5000);
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("*:not(input)").disableSelection();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".intheader").text(Description[curr_lang]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Archive data page

$(document).on("change",".avg_calc",function(){
	var Name=$(this).parents(".vararcdt").attr("id");
	var Data=GetVarArcs([Name],ArcDataInit(Name));

	if($(this).val()=="avg")	 {$(this).parents(".vararcdt").find(".avg_val").html(avg_y(Data[Name],VarGroup[Name]["roundto"]))}
	else if($(this).val()=="gmt"){$(this).parents(".vararcdt").find(".avg_val").html(gmt_val(Data[Name],VarGroup[Name]["roundto"]))}
	else if($(this).val()=="grm"){$(this).parents(".vararcdt").find(".avg_val").html(grm_val(Data[Name],VarGroup[Name]["roundto"]))}
	else if($(this).val()=="rms"){$(this).parents(".vararcdt").find(".avg_val").html(rms_val(Data[Name],VarGroup[Name]["roundto"]))}
	else if($(this).val()=="mdn"){$(this).parents(".vararcdt").find(".avg_val").html(mdn_val(Data[Name],VarGroup[Name]["roundto"]))}

	if($(this).parents(".vararcdt").find(".var_calc").val()=='mad')$(this).parents(".vararcdt").find(".ras_val").html(mad_val(Data[Name],$(this).parents(".vararcdt").find(".avg_val").text(),VarGroup[Name]["roundto"]))
	if($(this).parents(".vararcdt").find(".var_calc").val()=='asd')$(this).parents(".vararcdt").find(".ras_val").html(asd_val(Data[Name],$(this).parents(".vararcdt").find(".avg_val").text(),VarGroup[Name]["roundto"]))

});


$(document).on("change",".var_calc",function(){
	var Name=$(this).parents(".vararcdt").attr("id");
	var Data=GetVarArcs([Name],ArcDataInit(Name));

	if($(this).val()=='mad')$(this).parents(".vararcdt").find(".ras_val").html(mad_val(Data[Name],$(this).parents(".vararcdt").find(".avg_val").text(),VarGroup[Name]["roundto"]))
	if($(this).val()=='asd')$(this).parents(".vararcdt").find(".ras_val").html(asd_val(Data[Name],$(this).parents(".vararcdt").find(".avg_val").text(),VarGroup[Name]["roundto"]))
});

$(document).on("click",".csvexp",function(){
var Name=$(this).parents('.vararcdt').attr('id');
var prd=ArcDataInit(Name);
var Data=GetVarArcs([Name],prd);
var CSV='';
if(Data[Name].length>0){
for(var i=0;i<=Data[Name].length-1;i++){CSV=CSV+Data[Name][i][0]+","+Data[Name][i][1]+"\r\n";}
//window.open("data:application/octet-stream;charset=utf-8;base64,"+base64.encode(CSV),"","");
var from=new Date(Date.parse(prd["from"]));
var to=new Date(Date.parse(prd["to"]));
var a=document.createElement('a');
//a.href="data:attachment/csv,"+encodeURI(CSV);
a.href="data:application/octet-stream;charset=utf-8;base64,"+base64.encode(CSV);
a.target='_blank';
a.download=Name+' - '+VarGroup[Name]["description"][curr_lang]+' ['+from.getFullYear()+'.'+(from.getMonth()<10?'0'+from.getMonth():from.getMonth())+'.'+(from.getDay()<10?'0'+from.getDay():from.getDay())+' '+(from.getHours()<10?'0'+from.getHours():from.getHours())+'-'+(from.getMinutes()<10?'0'+from.getMinutes():from.getMinutes())+'-'+(from.getSeconds()<10?'0'+from.getSeconds():from.getSeconds())+' - '+to.getFullYear()+'.'+(to.getMonth()<10?'0'+to.getMonth():to.getMonth())+'.'+(to.getDay()<10?'0'+to.getDay():to.getDay())+' '+(to.getHours()<10?'0'+to.getHours():to.getHours())+'-'+(to.getMinutes()<10?'0'+to.getMinutes():to.getMinutes())+'-'+(to.getSeconds()<10?'0'+to.getSeconds():to.getSeconds())+']'+'.CSV';
document.body.appendChild(a);
a.click();
}});

$(document).on("click",".wnpng",function(){
	var labels={
			"uk":{
				"chrt_exp":"Експорт діаграми"
			},
			"ru":{
				"chrt_exp":"Экспорт диаграммы"			
			},
			"en":{
				"chrt_exp":"Plot Export"	
			}
	};

	var imgelem=$('#'+$(this).parents(".vararcdt").attr('id')+'_plot').jqplotToImageElem();
	var url=imgelem.getAttribute('src');
	var win=window.open("","","width=1000,height=475,status=no,resizable=no");
	win.document.write('<html><head><title>'+labels[curr_lang]['chrt_exp']+' '+$(this).parents(".vararcdt").attr('id')+' - '+VarGroup[$(this).parents(".vararcdt").attr('id')]["description"][curr_lang]+'</title></head>'+
	'<body style=\'text-align:center;margin:0px;padding:0px;\'>'+
	'<img src=\''+url+'\' style=\'margin:0px;padding:0px;\' />'+
	'</body></html>');
});
	
$(document).on("click",".grhzmout",function(){plot[$(this).attr("id").replace("_unzoom","")].resetZoom();});

$(document).on("click",".prdtbl",function(){

	var labels={
			"uk":{	
				"add_info":"Додаткові дані",
				"data_of_arc":"Дані архіву параметра ",
				"per_average":"Середнє значення",
				"per_dev":"Відхилення",
				"min_val":"Мінімальне значення",
				"max_val":"Максимальне значення",
				"per_per":"за період",
				"recom":"Рекомендації з налаштування параметрів друку:\r\n- Формат: А4\r\n- Орієнтація сторінки: Книжна\r\n- Друк тла\r\n- Без колонтитулів\r\n- Поля по 0,5 см.",
				"print_data":"Друк даних архіву ",
				"data_ov_per":"дані за період з ",
				"to":" по ", 
				"doc_created":"Документ створено"
			},
			"ru":{
				"add_info":"Дополнительные данные",
				"data_of_arc":"Данные архива параметра ",
				"per_average":"Середнее значение",
				"per_dev":"Отклонение",
				"min_val":"Минимальное значение",
				"max_val":"Максимальное значение",
				"per_per":"за период",
				"recom":"Рекомендации по настройке параметров печати:\r\n- Формат: А4\r\n- Ориентация страницы: Альбомная\r\n- Печать фона\r\n- Без колонтитулов\r\n- Поля по 0,5 см.",
				"print_data":"Печать данных архива ",
				"data_ov_per":"данные за период с ",
				"to":" по ", 
				"doc_created":"Документ создан"
			},
			"en":{
				"add_info":"Additional Information",
				"data_of_arc":"Archived Data of the Parameter ",
				"per_average":"Average value",
				"per_dev":"Deviation",
				"min_val":"Minimum value",
				"max_val":"Maximum value",
				"per_per":"over the period",
				"recom":"Recommendations for configuring printing options: \r\n- Format: A4 \r\n- Page Orientation: Landscape \r\n- Print Background \r\n- No footers or headers \r\n- Fields 0.5 cm.",
				"print_data":"Print the archived Data ",
				"data_ov_per":"data over the period from ",
				"to":" to ", 
				"doc_created":"Document created"				
			}
	};


var Name=$(this).parents(".vararcdt").attr('id');
alert(labels[curr_lang]['recom']);
var prd=ArcDataInit(Name);
var printWindow = window.open("","","scrollbars=1,width=1000,height=800,status=no,resizable=no");
var str='';
if((curr_auth_lev>1)&&
	(VarGroup[Name]["type"]=='FLOAT'&&
       VarGroup[Name]["plot"]=='1')||
       (VarGroup[Name]["type"]=='FIXED'&&
       VarGroup[Name]["plot"]=='1')||
       (VarGroup[Name]["type"]=='INTEGER'&&
       VarGroup[Name]["plot"]=='1')){
	str='<tr><td colspan=\"2\" align=\"center\">'+labels[curr_lang]['add_info']+'</td></tr>'+
		'<tr style=\'background-color:#f8f8f8;\'><td>'+labels[curr_lang]['per_average']+' ('+$(this).parents(".vararcdt").find(".avg_calc").find("option:selected").text()+'), '+VarGroup[Name]["dataunits"]+'</td><td>'+$(this).parents(".vararcdt").find(".avg_val").text()+'</td></tr>'+
		'<tr style=\'background-color:#f8f8f8;\'><td>'+labels[curr_lang]['per_dev']+' ('+$(this).parents(".vararcdt").find(".var_calc").find("option:selected").text()+'), '+VarGroup[Name]["dataunits"]+'</td><td>'+$(this).parents(".vararcdt").find(".ras_val").text()+'</td></tr>'+
		'<tr style=\'background-color:#f8f8f8;\'><td>'+labels[curr_lang]['min_val']+', '+VarGroup[Name]["dataunits"]+'</td><td>'+$(this).parents(".vararcdt").find(".min_val").text()+'</td></tr>'+
		'<tr style=\'background-color:#f8f8f8;\'><td>'+labels[curr_lang]['max_val']+', '+VarGroup[Name]["dataunits"]+'</td><td>'+$(this).parents(".vararcdt").find(".max_val").text()+'</td></tr>'+
		'<tr style=\'background-color:#f8f8f8;\'><td>Δ '+labels[curr_lang]['per_per']+', '+VarGroup[Name]["dataunits"]+'</td><td>'+$(this).parents(".vararcdt").find(".pdel_val").text()+'</td></tr>';}
printWindow.document.write('<html><head><title>'+labels[curr_lang]['print_data']+Name+' - '+VarGroup[Name]["description"][curr_lang]+'</title>'+
'<style type="text/css" media="all">.arcdatatable{width:100%;background-color:#dddad3;font-size:12px;text-align:center;}.arcdatatablepar{width:50%;background-color:#faf2ea;}</style></head>'+
'<body style=\'text-align:center;margin:0px;padding:0px;\'>'+
'<br /><p style=\"padding:5px;background-color:#e0e0e0;color:#303030;font-size:14px;\">'+labels[curr_lang]['data_of_arc']+Name+' - '+VarGroup[Name]["description"][curr_lang]+(((VarGroup[Name]["type"]=='FLOAT')||(VarGroup[Name]["type"]=='FIXED')||(VarGroup[Name]["type"]=='INTEGER'))?(', '+VarGroup[Name]["dataunits"]):"")+'<br />('+labels[curr_lang]['data_ov_per']+prd["from"]+labels[curr_lang]['to']+prd["to"]+')'+'</p>'+
'<p><table style=\'width:100%;background-color:#f0f0f0;font-size:11px;text-indent:20px;text-align:left;\'>'+
'<tr><td colspan=\"2\" align=\"center\">'+labels[curr_lang]['data_of_arc']+'</td></tr>'+
'<tr><td colspan=\"2\" align=\"center\">'+
$(this).parents(".arcdata").find(".arcdatatablecont").html()+
'</td></tr>'+
str+
'</table></p>'+
'<div style=\"background-color:#e0e0e0;color:#505050;text-align:left;text-indent:30px;font-size:12px;\">&nbsp;SERION System Manager Interface © Sunrise Media 2020&nbsp;['+labels[curr_lang]['doc_created']+': '+(new Date().toLocaleFormat("%y-%m-%d %H:%M:%S"))+']</div>'+
'</body></html>');
printWindow.document.close();
printWindow.print();
printWindow.setTimeout(printWindow.close, 1);});

$(document).on("click",".prpng",function(){

	var labels={
			"uk":{	
				"add_info":"Додаткові дані",
				"data_of_arc":"Дані архіву параметра ",
				"per_average":"Середнє значення",
				"per_dev":"Відхилення",
				"min_val":"Мінімальне значення",
				"max_val":"Максимальне значення",
				"per_per":"за період",
				"recom":"Рекомендації з налаштування параметрів друку:\r\n- Формат: А4\r\n- Орієнтація сторінки: Альбомна\r\n- Друк тла\r\n- Без колонтитулів\r\n- Поля по 0,5 см.",
				"print_graph":"Друк даних архіву ",
				"data_ov_per":"дані за період з ",
				"to":" по ", 
				"doc_created":"Документ створено"
			},
			"ru":{
				"add_info":"Дополнительные данные",
				"data_of_arc":"Данные архива параметра ",
				"per_average":"Середнее значение",
				"per_dev":"Отклонение",
				"min_val":"Минимальное значение",
				"max_val":"Максимальное значение",
				"per_per":"за период",
				"recom":"Рекомендации по настройке параметров печати:\r\n- Формат: А4\r\n- Ориентация страницы: Альбомная\r\n- Печать фона\r\n- Без колонтитулов\r\n- Поля по 0,5 см.",
				"print_graph":"Печать данных архива ",
				"data_ov_per":"данные за период с ",
				"to":" по ", 
				"doc_created":"Документ создан"
			},
			"en":{
				"add_info":"Additional Information",
				"data_of_arc":"Archived Data of the Parameter ",
				"per_average":"Average value",
				"per_dev":"Deviation",
				"min_val":"Minimum value",
				"max_val":"Maximum value",
				"per_per":"over the period",
				"recom":"Recommendations for configuring printing options: \r\n- Format: A4 \r\n- Page Orientation: Landscape \r\n- Print Background \r\n- No footers or headers \r\n- Fields 0.5 cm.",
				"print_graph":"Print the archiver Data ",
				"data_ov_per":"data over the period from ",
				"to":" to ", 
				"doc_created":"Document created"				
			}
	};


var str='<br /><br />';
if(curr_auth_lev>1){
	str='<p><table style=\'width:100%;background-color:#f0f0f0;font-size:12px;text-indent:20px;text-align:left;\'>'+
		'<tr><td colspan=\"2\" align=\"center\">'+labels[curr_lang]['add_info']+'</td></tr>'+
		'<tr style=\'background-color:#f8f8f8;\'><td>'+labels[curr_lang]['per_average']+' ('+$(this).parents(".vararcdt").find(".avg_calc").find("option:selected").text()+'), '+VarGroup[$(this).parents(".vararcdt").attr('id')]["dataunits"]+'</td><td>'+$(this).parents(".vararcdt").find(".avg_val").text()+'</td></tr>'+
		'<tr style=\'background-color:#f8f8f8;\'><td>'+labels[curr_lang]['per_dev']+' ('+$(this).parents(".vararcdt").find(".var_calc").find("option:selected").text()+'), '+VarGroup[$(this).parents(".vararcdt").attr('id')]["dataunits"]+'</td><td>'+$(this).parents(".vararcdt").find(".ras_val").text()+'</td></tr>'+
		'<tr style=\'background-color:#f8f8f8;\'><td>'+labels[curr_lang]['min_val']+', '+VarGroup[$(this).parents(".vararcdt").attr('id')]["dataunits"]+'</td><td>'+$(this).parents(".vararcdt").find(".min_val").text()+'</td></tr>'+
		'<tr style=\'background-color:#f8f8f8;\'><td>'+labels[curr_lang]['max_val']+', '+VarGroup[$(this).parents(".vararcdt").attr('id')]["dataunits"]+'</td><td>'+$(this).parents(".vararcdt").find(".max_val").text()+'</td></tr>'+
		'<tr style=\'background-color:#f8f8f8;\'><td>Δ '+labels[curr_lang]['per_per']+', '+VarGroup[$(this).parents(".vararcdt").attr('id')]["dataunits"]+'</td><td>'+$(this).parents(".vararcdt").find(".pdel_val").text()+'</td></tr>'+
		'</table></p>'}
plot[$(this).parents(".vararcdt").attr('id').replace("_unzoom","")].resetZoom();
alert(labels[curr_lang]['recom']);
var imgelem=$('#'+$(this).parents(".vararcdt").attr('id')+'_plot').jqplotToImageElem();
var prd=ArcDataInit($(this).parents(".vararcdt").attr('id'));
var url=imgelem.getAttribute('src');
var printWindow = window.open("","","width=1000,height=750,status=no,resizable=no");
printWindow.document.write('<html><head><title>'+labels[curr_lang]['print_graph']+$(this).parents(".vararcdt").attr('id')+' - '+VarGroup[$(this).parents(".vararcdt").attr('id')]["description"][curr_lang]+'</title></head>'+
'<body style=\'text-align:center;margin:0px;padding:0px;\'>'+
'<br /><p style=\"padding:5px;background-color:#e0e0e0;color:#303030;font-size:14px;\">'+labels[curr_lang]['data_of_arc']+$(this).parents(".vararcdt").attr('id')+' - '+VarGroup[$(this).parents(".vararcdt").attr('id')]["description"][curr_lang]+', '+VarGroup[$(this).parents(".vararcdt").attr('id')]["dataunits"]+'</br>('+labels[curr_lang]['data_ov_per']+prd["from"]+labels[curr_lang]['to']+prd["to"]+')'+'</p>'+
'<img src=\''+url+'\' style=\'margin:0px;padding:0px;\' />'+
str+
'<div style=\"background-color:#e0e0e0;color:#505050;text-align:left;text-indent:30px;font-size:12px;\">&nbsp;SERION System Manager Interface © Sunrise Media 2020&nbsp;['+labels[curr_lang]['doc_created']+': '+(new Date().toLocaleFormat("%y-%m-%d %H:%M:%S"))+']</div>'+
'</body></html>');
printWindow.document.close();
printWindow.print();
printWindow.setTimeout(printWindow.close, 1);});

$(document).on("click",".addcrv",function(){
var Obj=$(this).parent().parent();
Obj.find(".addcrvgrp").toggle(0);});

$(document).on("click",".addcrvbt",function(){

	var labels={
			"uk":{
				"date_time":"Дата/Час",
				"var_value":"Значення"
			},
			"ru":{
				"date_time":"Дата/Время",
				"var_value":"Значение"				
			},
			"en":{
				"date_time":"Date/Time",
				"var_value":"Value"	
			}
	};

var Obj=$(this).parents(".vararcdt");
var names=[];
$.each(Obj.find("input[type='checkbox']"),function(){if($(this).is(':checked')){names.push($(this).val());}});
names.sort();
var fObj=GetVarArcs([Obj.attr("id")],ArcDataInit(Obj.attr("id")));

if(fObj[Obj.attr("id")].length>0){
	var Prd=ArcDataInit(Obj.attr("id"));
	var minx=min_x(fObj[Obj.attr("id")]);
	var maxx=max_x(fObj[Obj.attr("id")]);

	var aObj=GetVarArcs(names,JSON.parse('{"from":"'+minx+'","to":"'+maxx+'"}'));

	var yiTicks=0.5*(1+Math.round(((Math.round(max_y(fObj[Obj.attr("id")])+0.5)-Math.round(min_y(fObj[Obj.attr("id")])-0.5)))/15));
	var nyTicks=Math.round((Math.round(max_y(fObj[Obj.attr("id")])+0.5)-Math.round(min_y(fObj[Obj.attr("id")])-0.5))/yiTicks+0.5);

	var Axes={xaxis:{
				renderer:$.jqplot.DateAxisRenderer,
				tickRenderer:$.jqplot.CanvasAxisTickRenderer,
				showTicks:true,
				showLabel:false,
				tickOptions:{angle:-90,fontSize:'8pt',formatString:'%Y-%m-%#d %#H:%M:%S'},
				label:labels[curr_lang]['date_time'],
				min:minx,
				max:maxx,
				numberTicks:30},
			yaxis:{
				tickOptions:{fontSize:'8pt'},
				min:Math.round(min_y(fObj[Obj.attr("id")])-0.5),
				max:Math.round(max_y(fObj[Obj.attr("id")])+0.5),
				numberTicks:nyTicks,
				tickInterval:yiTicks,
				showLabel:false,
				label:labels[curr_lang]['var_value']+', '+VarGroup[Obj.attr("id")]["dataunits"],
				labelOptions:{fontSize:'12pt'},
				pad:0}
			};
			
    var grhcursdt={};
    if(curr_auth_lev>1){
    	grhcursdt={zoom:true,looseZoom:true}}
    else{
    	grhcursdt={zoom:false,looseZoom:false}}

	var Series=[];
	Series.push({label:Obj.attr("id")+' ('+VarGroup[Obj.attr("id")]["description"][curr_lang]+', '+VarGroup[Obj.attr("id")]["dataunits"]+')',color:"#A03030",lineWidth:2,yaxis:'yaxis'});

	var ArcData=[];
	ArcData.push(fObj[Obj.attr("id")]);

	var ind='';
	var j=0;
	for(var i=0;i<=names.length-1;i++){
		if(aObj[names[i]].length>0){
		ind=j+2;
		Axes['y'+ind+'axis']={
			tickOptions:{fontSize:'8pt',showGridline:false},
			min:Math.round(min_y(aObj[names[i]])-0.5),
			max:Math.round(max_y(aObj[names[i]])+0.5),
			numberTicks:nyTicks,
			showLabel:false,
			label:labels[curr_lang]['var_value']+', '+VarGroup[names[i]]["dataunits"],
			labelOptions:{fontSize:'12pt'},
			pad:0};
		Series.push({label:names[i]+' ('+VarGroup[names[i]]["description"][curr_lang]+', '+VarGroup[names[i]]["dataunits"]+')',lineWidth:1,yaxis:'y'+ind+'axis'});
		ArcData.push(aObj[names[i]]);
		j++;}
	}			

	$("#"+Obj.attr("id")+"_plot").html("");

	$.jqplot.config.enablePlugins=true;

  	plot[Obj.attr("id")]=$.jqplot(Obj.attr("id")+"_plot",ArcData,{     
		axesDefaults:{labelRenderer:$.jqplot.CanvasAxisLabelRenderer,useSeriesColor:true},	
		axes:Axes,
		seriesDefaults: {showLabel:true,fill:false,shadowAlpha:0.5,shadowDepth:1,rendererOptions:{smooth:true},showMarker:false},
		series:Series,	
		cursor:grhcursdt,
    	legend: {show:true,location:'ne'},
    	grid: {gridLineColor:"#A0A0A0",drawBorder:false,shadow:false,background:"#faf0e8",drawGridLines:true},
    	highlighter: {show:true,tooltipLocation:'ne',sizeAdjust:5,showMarker:true,useAxesFormatters:true}
  	});

	var vel=fn_vel(fObj[Obj.attr("id")],VarGroup[Obj.attr("id")]["roundto"]);


	if($("#"+Obj.attr("id")).find(".avg_calc").val()=='avg')$("#"+Obj.attr("id")).find(".avg_val").html(avg_y(fObj[Obj.attr("id")],VarGroup[Obj.attr("id")]["roundto"]))
	else if($("#"+Obj.attr("id")).find(".avg_calc").val()=='gmt')$("#"+Obj.attr("id")).find(".avg_val").html(gmt_val(fObj[Obj.attr("id")],VarGroup[Obj.attr("id")]["roundto"]))
	else if($("#"+Obj.attr("id")).find(".avg_calc").val()=='grm')$("#"+Obj.attr("id")).find(".avg_val").html(grm_val(fObj[Obj.attr("id")],VarGroup[Obj.attr("id")]["roundto"]))
	else if($("#"+Obj.attr("id")).find(".avg_calc").val()=='rms')$("#"+Obj.attr("id")).find(".avg_val").html(rms_val(fObj[Obj.attr("id")],VarGroup[Obj.attr("id")]["roundto"]))
	else if($("#"+Obj.attr("id")).find(".avg_calc").val()=='mdn')$("#"+Obj.attr("id")).find(".avg_val").html(mdn_val(fObj[Obj.attr("id")],VarGroup[Obj.attr("id")]["roundto"]));
	
	if($("#"+Obj.attr("id")).find(".var_calc").val()=='mad')$("#"+Obj.attr("id")).find(".ras_val").html(mad_val(fObj[Obj.attr("id")],$("#"+Obj.attr("id")).find(".avg_val").text(),VarGroup[Obj.attr("id")]["roundto"]))
	else if($("#"+Obj.attr("id")).find(".var_calc").val()=='asd')$("#"+Obj.attr("id")).find(".ras_val").html(asd_val(fObj[Obj.attr("id")],$("#"+Obj.attr("id")).find(".avg_val").text(),VarGroup[Obj.attr("id")]["roundto"]))
	
	$("#"+Obj.attr("id")).find(".min_val").html(min_y(fObj[Obj.attr("id")]));
	$("#"+Obj.attr("id")).find(".max_val").html(max_y(fObj[Obj.attr("id")]));
	$("#"+Obj.attr("id")).find(".pdel_val").html(pdel_val(fObj[Obj.attr("id")],VarGroup[Obj.attr("id")]["roundto"]));
	$("#"+Obj.attr("id")).find(".prd_grd").html(vel[2]);
	$("#"+Obj.attr("id")).find(".avgp_grd").html(vel[0]);
	$("#"+Obj.attr("id")).find(".avgn_grd").html(vel[1]);}
	$(this).parent().hide();
});

$(document).on("click",".slicedata",function(){


	var labels={
			"uk":{
				"date_time":"Дата/Час",
				"var_value":"Значення",
				"hide":"Приховати",
				"data_cut":"Зріз даних архіву за станом на ",
				"print_table":"Друк таблиці",
				"var_name":"Ім\'я змінної",
				"var_description":"Опис",
				"val_active":"Активний",
				"val_inactive":"Неактивний"
			},
			"ru":{
				"date_time":"Дата/Время",
				"var_value":"Значение",
				"hide":"Скрыть",
				"data_cut":"Срез данных архива по состоянию на ",
				"print_table":"Печать таблицы",
				"var_name":"Имя переменной",
				"var_description":"Описание",
				"val_active":"Активно",
				"val_inactive":"Неактивно"			
			},
			"en":{
				"date_time":"Date/Time",
				"var_value":"Value",
				"hide":"Hide",
				"data_cut":"The Slice of the Archive on ",
				"print_table":"Print the Table",
				"var_name":"Variable Name",
				"var_description":"Description",
				"val_active":"Active",
				"val_inactive":"Inactive"	
			}
	};


	var ArcSlc={};
	var names=[];
	var lines=[];
	var response={};
	
	for(var i=0;i<NodesNames.length;i++){
		response=SendData("getarcslice",curr_auth_req,$(this).text(),NodesNames[i]);		
		lines=response["subsys"]["nodes"][NodesNames[i]]["lines"];

		if(response["subsys"]["nodes"][NodesNames[i]]["lines"]!="joint"){
			if (lines.includes("line1"))$.extend(true,ArcSlc,response["data_server"]["data"]["line1"]);
			if (lines.includes("line2"))$.extend(true,ArcSlc,response["data_server"]["data"]["line2"]);
			if (lines.includes("line3"))$.extend(true,ArcSlc,response["data_server"]["data"]["line3"]);
			if (lines.includes("line4"))$.extend(true,ArcSlc,response["data_server"]["data"]["line4"]);
		}
		else{
			$.extend(true,ArcSlc,response["data_server"]["data"]);
		}
	}	

	for(var name in ArcSlc){if(ArcSlc.hasOwnProperty(name)){names.push(name);}};

	names.sort();

var html='<div style=\"position:absolute;margin-left:925px;margin-top:6px;cursor:pointer;\" onClick=\"$(this).parents(\'.vararcdt\').find(\'.arcslc\').slideUp(100)\" title=\"'+labels[curr_lang]['hide']+'\">[ _ ]</div>'+
'<div style=\"background-color:#fefbfa;padding:5px;\" class=\"arcslicehead\">'+labels[curr_lang]['data_cut']+$(this).text()+'</div>'+
'<table style=\"width:100%;text-align:center;\" class=\"arcslicetable\"><tr><td>'+labels[curr_lang]['var_name']+'</td><td>'+labels[curr_lang]['var_description']+'</td><td>'+labels[curr_lang]['date_time']+'</td><td>'+labels[curr_lang]['var_value']+'</td></tr>';

for(var i=0;i<=names.length-1;i++){
if(!jQuery.isEmptyObject(ArcSlc[names[i]])){
var time = Object.keys(ArcSlc[names[i]])[0];
var value = ArcSlc[names[i]][time];
if((VarGroup[names[i]]["type"]=='FLOAT')||
  (VarGroup[names[i]]["type"]=='FIXED')||
  (VarGroup[names[i]]["type"]=='INTEGER')){
	html=html+'<tr><td class=\"arcdatatablepar\" style=\"width:20%;text-align:left;\">&nbsp;'+names[i]+'</td><td class=\"arcdatatablepar\" style=\"width:45%;text-align:left;\">&nbsp;'+VarGroup[names[i]]["description"][curr_lang]+'</td><td class=\"arcdatatablepar\" style=\"width:20%\">'+time+'</td><td class=\"arcdatatablepar\" style=\"width:15%\">'+value+'</td></tr>';}
else if(VarGroup[names[i]]["type"]=='BOOL'){html=html+'<tr><td class=\"arcdatatablepar\" style=\"width:20%;text-align:left;\">&nbsp;'+names[i]+'</td><td class=\"arcdatatablepar\" style=\"width:45%;text-align:left;\">&nbsp;'+VarGroup[names[i]]["description"][curr_lang]+'</td><td class=\"arcdatatablepar\" style=\"width:20%\">'+time+'</td><td class=\"arcdatatablepar\" style=\"width:15%\">'+(value!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])+'</td></tr>';}
}}
html=html+'</table>';
var Name=$(this).parents(".vararcdt").attr("id");
$(this).parents(".vararcdt").find(".arcslc").html('<div id="'+Name+'_sttadd" class=\"stbl_add\"><img class=\"prstbl\" src=\"Print.ico\" title=\"'+labels[curr_lang]['print_table']+'\" style=\"cursor:pointer;\" /></div>');
$("#"+Name+"_sttadd").css({'margin-top':3});
$("#"+Name+"_sttadd").css({'margin-left':2});
$("#"+Name+"_sttadd").disableSelection();
$(this).parents(".vararcdt").find(".arcslc").append(html);
$(this).parents(".vararcdt").find(".arcslc").slideDown(100);});

$(document).on("click",".jqplot-event-canvas",function(){


	var labels={
			"uk":{
				"date_time":"Дата/Час",
				"var_value":"Значення",
				"hide":"Приховати",
				"data_cut":"Зріз даних архіву за станом на ",
				"print_table":"Друк таблиці",
				"var_name":"Ім\'я змінної",
				"var_description":"Опис",
				"val_active":"Активний",
				"val_inactive":"Неактивний"
			},
			"ru":{
				"date_time":"Дата/Время",
				"var_value":"Значение",
				"hide":"Скрыть",
				"data_cut":"Срез данных архива по состоянию на ",
				"print_table":"Печать таблицы",
				"var_name":"Имя переменной",
				"var_description":"Описание",
				"val_active":"Активно",
				"val_inactive":"Неактивно"			
			},
			"en":{
				"date_time":"Date/Time",
				"var_value":"Value",
				"hide":"Hide",
				"data_cut":"The Slice of the Archive on ",
				"print_table":"Print the Table",
				"var_name":"Variable Name",
				"var_description":"Description",
				"val_active":"Active",
				"val_inactive":"Inactive"	
			}
	};


if(curr_auth_lev>1){
	var tltpdt=$(this).parents(".jqplot-target").find(".jqplot-cursor-tooltip").html();
	var strarr=tltpdt.split("<br>");
	for(var i=0;i<=strarr.length-1;i++){
		strarr[i]=strarr[i].split(", ");}
	var point=strarr[0][0];
	var ArcSlc={};
	var names=[];
	var lines=[];
	var response={};
	
	for(var i=0;i<NodesNames.length;i++){
		response=SendData("getarcslice",curr_auth_req,point,NodesNames[i]);

		lines=response["subsys"]["nodes"][NodesNames[i]]["lines"];
		
		if(response["subsys"]["nodes"][NodesNames[i]]["lines"]!="joint"){
			if (lines.includes("line1"))$.extend(true,ArcSlc,response["data_server"]["data"]["line1"]);
			if (lines.includes("line2"))$.extend(true,ArcSlc,response["data_server"]["data"]["line2"]);
			if (lines.includes("line3"))$.extend(true,ArcSlc,response["data_server"]["data"]["line3"]);
			if (lines.includes("line4"))$.extend(true,ArcSlc,response["data_server"]["data"]["line4"]);
		}
		else{
			$.extend(true,ArcSlc,response["data_server"]["data"]);
		}
	}

	for(var name in ArcSlc){if(ArcSlc.hasOwnProperty(name)){names.push(name);}};

	names.sort();

	var html='<div style=\"position:absolute;margin-left:925px;margin-top:6px;cursor:pointer;\" onClick=\"$(this).parents(\'.vararcdt\').find(\'.arcslc\').slideUp(100)\" title=\"'+labels[curr_lang]['hide']+'\">[ _ ]</div>'+
	'<div style=\"background-color:#fefbfa;padding:5px;\" class=\"arcslicehead\">'+labels[curr_lang]['data_cut']+point+'</div>'+
	'<table style=\"width:100%;text-align:center;\" class=\"arcslicetable\"><tr><td>'+labels[curr_lang]['var_name']+'</td><td>'+labels[curr_lang]['var_description']+'</td><td>'+labels[curr_lang]['date_time']+'</td><td>'+labels[curr_lang]['var_value']+'</td></tr>';
	for(var i=0;i<=names.length-1;i++){
	if(!jQuery.isEmptyObject(ArcSlc[names[i]])){
	var time = Object.keys(ArcSlc[names[i]])[0];
	var value = ArcSlc[names[i]][time];
	if((VarGroup[names[i]]["type"]=='FLOAT')||
  	   (VarGroup[names[i]]["type"]=='FIXED')||
  	   (VarGroup[names[i]]["type"]=='INTEGER')){
		html=html+'<tr><td class=\"arcdatatablepar\" style=\"width:20%;text-align:left;\">&nbsp;'+names[i]+'</td><td class=\"arcdatatablepar\" style=\"width:45%;text-align:left;\">&nbsp;'+VarGroup[names[i]]["description"][curr_lang]+'</td><td class=\"arcdatatablepar\" style=\"width:20%\">'+time+'</td><td class=\"arcdatatablepar\" style=\"width:15%\">'+value+'</td></tr>';}
	else if(VarGroup[names[i]]["type"]=='BOOL'){html=html+'<tr><td class=\"arcdatatablepar\" style=\"width:20%;text-align:left;\">&nbsp;'+names[i]+'</td><td class=\"arcdatatablepar\" style=\"width:45%;text-align:left;\">&nbsp;'+VarGroup[names[i]]["description"][curr_lang]+'</td><td class=\"arcdatatablepar\" style=\"width:20%\">'+time+'</td><td class=\"arcdatatablepar\" style=\"width:15%\">'+(value!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])+'</td></tr>';}
	}}
	html=html+'</table>';
	var Name=$(this).parents(".vararcdt").attr("id");
	$(this).parents(".vararcdt").find(".arcslc").html('<div id="'+Name+'_stgadd" class=\"stbl_add\"><img class=\"prstbl\" src=\"Print.ico\" title=\"'+labels[curr_lang]['print_table']+'\" style=\"cursor:pointer;\" /></div>');
	$("#"+Name+"_stgadd").css({'margin-top':3});
	$("#"+Name+"_stgadd").css({'margin-left':2});
	$("#"+Name+"_stgadd").disableSelection();
	$(this).parents(".vararcdt").find(".arcslc").append(html);
	$(this).parents(".vararcdt").find(".arcslc").slideDown(100);}})

$(document).on("click",".prstbl",function(){

	var labels={
			"uk":{	
				"recom":"Рекомендації з налаштування параметрів друку:\r\n- Формат: А4\r\n- Орієнтація сторінки: Книжна\r\n- Друк тла\r\n- Без колонтитулів\r\n- Поля по 0,5 см.",
				"doc_created":"Документ створено"
			},
			"ru":{
				"recom":"Рекомендации по настройке параметров печати:\r\n- Формат: А4\r\n- Ориентация страницы: Книжная\r\n- Печать фона\r\n- Без колонтитулов\r\n- Поля по 0,5 см.",
				"doc_created":"Документ создан"
			},
			"en":{
				"recom":"Recommendations for configuring printing options: \r\n- Format: A4 \r\n- Page Orientation: Portrait \r\n- Print Background \r\n- No footers or headers \r\n- Fields 0.5 cm.",
				"doc_created":"Document created"				
			}
	};

alert(labels[curr_lang]['recom']);
var printWindow = window.open("","","scrollbars=1,width=1000,height=800,status=no,resizable=no");
printWindow.document.write('<html><head><title>'+$(this).parents(".vararcdt").find(".arcslicehead").text()+'</title>'+
'<style type="text/css" media="all">.arcslicetable{width:100%;background-color:#dddad3;font-size:12px;text-align:center;}.arcdatatablepar{background-color:#faf2ea;}</style></head>'+
'<body style=\'text-align:center;margin:0px;padding:0px;\'>'+
'<br /><p style=\"padding:5px;background-color:#e0e0e0;color:#303030;font-size:14px;\">'+$(this).parents(".vararcdt").find(".arcslicehead").text()+'</p>'+
'<p><table class="arcslicetable" style="width:100%;text-align:center;">'+
$(this).parents(".vararcdt").find(".arcslicetable").html()+
'</table></p>'+
'<div style=\"background-color:#e0e0e0;color:#505050;text-align:left;text-indent:30px;font-size:12px;\">&nbsp;SERION System Manager Interface © Sunrise Media 2020&nbsp;['+labels[curr_lang]['doc_created']+': '+(new Date().toLocaleFormat("%y-%m-%d %H:%M:%S"))+']</div>'+
'</body></html>');
printWindow.document.close();
printWindow.print();
printWindow.setTimeout(printWindow.close, 1);});

$(document).on("click",".refrbt",function(){
	var Obj=$(this).parents('.vararcdt');
	var Name=Obj.attr('id');
	if(Obj.find(".arcdatatable").is(":visible")){
		ArcTable(Name);}
	if(Obj.find("#"+Name+"_plot").is(":visible")){
		ArcGraph(Name);}
});

$(document).on("click",".arctbl",function(){
	if(!$("#"+$(this).attr("name")).is(":visible")){
		$("#"+$(this).attr("name")).slideDown(0);
	}
	ArcTable($(this).attr("name"));});
$(document).on("click",".arcgrh",function(){
	if(!$("#"+$(this).attr("name")).is(":visible")){
		$("#"+$(this).attr("name")).slideDown(0);
	}
	ArcGraph($(this).attr("name"));});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Alarm archive

$(document).on("click",".refrals",function(){
	$(this).parents('#AlarmArchive').find('#AlarmDataCont').html(CreateAlarmArchive());
});

$(document).on("change",".alarm_filter",function(){
	CreateAlarmArchive();
});

/*
$(document).on("keypress","input",function(Obj){
    if ($(this).parents('#AlarmArchive').length) {
		if(Obj.keyCode==13){
			$(this).parents('#AlarmArchive').find('#AlarmDataCont').html(CreateAlarmArchive());
		}
	}
});
*/

$(document).on("click",".arcalslice",function(){


	var labels={
			"uk":{
				"date_time":"Дата/Час",
				"var_value":"Значення",
				"hide":"Приховати",
				"data_cut":"Зріз даних архіву за станом на ",
				"print_table":"Друк таблиці",
				"var_name":"Ім\'я змінної",
				"var_description":"Опис",
				"val_active":"Активний",
				"val_inactive":"Неактивний"
			},
			"ru":{
				"date_time":"Дата/Время",
				"var_value":"Значение",
				"hide":"Скрыть",
				"data_cut":"Срез данных архива по состоянию на ",
				"print_table":"Печать таблицы",
				"var_name":"Имя переменной",
				"var_description":"Описание",
				"val_active":"Активно",
				"val_inactive":"Неактивно"			
			},
			"en":{
				"date_time":"Date/Time",
				"var_value":"Value",
				"hide":"Hide",
				"data_cut":"The Slice of the Archive on ",
				"print_table":"Print the Table",
				"var_name":"Variable Name",
				"var_description":"Description",
				"val_active":"Active",
				"val_inactive":"Inactive"	
			}
	};


	var Obj=$(this).closest('tr').next().find('.alparadd');
	Obj.html("");
	var ArcSlc={};
	var names=[];
	var lines=[];
	var response={};
	
	for(var i=0;i<NodesNames.length;i++){
		response=SendData("getarcslice",curr_auth_req,$(this).text(),NodesNames[i]);

		lines=response["subsys"]["nodes"][NodesNames[i]]["lines"];

		if(response["subsys"]["nodes"][NodesNames[i]]["lines"]!="joint"){
			if (lines.includes("line1"))$.extend(true,ArcSlc,response["data_server"]["data"]["line1"]);
			if (lines.includes("line2"))$.extend(true,ArcSlc,response["data_server"]["data"]["line2"]);
			if (lines.includes("line3"))$.extend(true,ArcSlc,response["data_server"]["data"]["line3"]);
			if (lines.includes("line4"))$.extend(true,ArcSlc,response["data_server"]["data"]["line4"]);
		}
		else{
			$.extend(true,ArcSlc,response["data_server"]["data"]);
		}
	}

	for(var name in ArcSlc){if(ArcSlc.hasOwnProperty(name)){names.push(name);}};

	names.sort();

	var html='<div style=\"position:absolute;margin-left:925px;margin-top:6px;cursor:pointer;\" onClick=\"$(this).parents(\'.alparadd\').slideUp(100);\" title=\"'+labels[curr_lang]['hide']+'\">[ _ ]</div>'+
	'<div style=\"background-color:#fefbfa;padding:5px;\" class=\"arcslicehead\">'+labels[curr_lang]['data_cut']+$(this).text()+'</div>'+
	'<table style=\"width:100%;text-align:center;\" class=\"arcslicetable\"><tr><td>'+labels[curr_lang]['var_name']+'</td><td>'+labels[curr_lang]['var_description']+'</td><td>'+labels[curr_lang]['date_time']+'</td><td>'+labels[curr_lang]['var_value']+'</td></tr>';
	for(var i=0;i<=names.length-1;i++){
	if(!jQuery.isEmptyObject(ArcSlc[names[i]])){
	var time = Object.keys(ArcSlc[names[i]])[0];
	var value = ArcSlc[names[i]][time];
	if((VarGroup[names[i]]["type"]=='FLOAT')||
  	   (VarGroup[names[i]]["type"]=='FIXED')||
  	   (VarGroup[names[i]]["type"]=='INTEGER')){
		html=html+'<tr><td class=\"arcdatatablepar\" style=\"width:20%;text-align:left;\">&nbsp;'+names[i]+'</td><td class=\"arcdatatablepar\" style=\"width:45%;text-align:left;\">&nbsp;'+VarGroup[names[i]]["description"][curr_lang]+'</td><td class=\"arcdatatablepar\" style=\"width:20%\">'+time+'</td><td class=\"arcdatatablepar\" style=\"width:15%\">'+value+'</td></tr>';}
	else if(VarGroup[names[i]]["type"]=='BOOL'){html=html+'<tr><td class=\"arcdatatablepar\" style=\"width:20%;text-align:left;\">&nbsp;'+names[i]+'</td><td class=\"arcdatatablepar\" style=\"width:45%;text-align:left;\">&nbsp;'+VarGroup[names[i]]["description"][curr_lang]+'</td><td class=\"arcdatatablepar\" style=\"width:20%\">'+time+'</td><td class=\"arcdatatablepar\" style=\"width:15%\">'+(value!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])+'</td></tr>';}
	}}
	html=html+'</table>';
	var Name=$(this).parents(".vararcdt").attr("id");
	$(this).parents(".vararcdt").find(".arcslc").html('<div id="'+Name+'_sttadd" class=\"stbl_add\"><img class=\"prstbl\" src=\"Print.ico\" title=\"'+labels[curr_lang]['print_table']+'\" style=\"cursor:pointer;\" /></div>');
	$("#"+Name+"_sttadd").css({'margin-top':3});
	$("#"+Name+"_sttadd").css({'margin-left':2});
	$("#"+Name+"_sttadd").disableSelection();
	Obj.append('<div class=\"alstbl_add\"><img class=\"pralstbl\" src=\"Print.ico\" title=\"'+labels[curr_lang]['print_table']+'\" style=\"cursor:pointer;\" /></div>');
	Obj.append(html);
	Obj.slideDown(100);
});

$(document).on("click",".praltbl",function(){

	var labels={
			"uk":{	
				"recom":"Рекомендації з налаштування параметрів друку:\r\n- Формат: А4\r\n- Орієнтація сторінки: Альбомна\r\n- Друк тла\r\n- Без колонтитулів\r\n- Поля по 0,5 см.",
				"doc_created":"Документ створено"
			},
			"ru":{
				"recom":"Рекомендации по настройке параметров печати:\r\n- Формат: А4\r\n- Ориентация страницы: Альбомная\r\n- Печать фона\r\n- Без колонтитулов\r\n- Поля по 0,5 см.",
				"doc_created":"Документ создан"
			},
			"en":{
				"recom":"Recommendations for configuring printing options: \r\n- Format: A4 \r\n- Page Orientation: Landscape\r\n- Print Background \r\n- No footers or headers \r\n- Fields 0.5 cm.",
				"doc_created":"Document created"				
			}
	};

var Obj=$(this).parents("#AlarmArchive");
alert(labels[curr_lang]['recom']);
var printWindow = window.open("","","scrollbars=1,width=1000,height=800,status=no,resizable=no");
printWindow.document.write('<html><head><title>'+Obj.find("#AlarmArchiveHead").text()+'</title>'+
'<style type="text/css" media="all">table{text-indent:20px;border-spacing:0px;width:100%;background-color:#dddad3;font-size:12px;text-align:center;border-style:none;}.dtpar{text-align:left;text-indent:5px;background-color:#faf2ea;border-right:1px solid #b0b0b0;border-bottom:1px solid #b0b0b0;}</style></head>'+
'<body style=\'text-align:center;margin:0px;padding:0px;\'>'+
'<br /><p style=\"padding:5px;background-color:#e0e0e0;color:#303030;font-size:14px;\">'+Obj.find("#AlarmArchiveHead").text()+'</p>'+
'<p><table>'+
Obj.find("#AlarmDataCont").find("table").html()+
'</table></p>'+
'<div style=\"background-color:#e0e0e0;color:#505050;text-align:left;text-indent:30px;font-size:12px;\">&nbsp;SERION System Manager Interface © Sunrise Media 2020&nbsp;['+labels[curr_lang]['doc_created']+': '+(new Date().toLocaleFormat("%y-%m-%d %H:%M:%S"))+']</div>'+
'</body></html>');
$(printWindow.document).find(".alparadd").remove();
printWindow.document.close();
printWindow.print();
printWindow.setTimeout(printWindow.close, 1);
});

$(document).on("click",".pralstbl",function(){

	var labels={
			"uk":{	
				"recom":"Рекомендації з налаштування параметрів друку:\r\n- Формат: А4\r\n- Орієнтація сторінки: Книжна\r\n- Друк тла\r\n- Без колонтитулів\r\n- Поля по 0,5 см.",
				"doc_created":"Документ створено"
			},
			"ru":{
				"recom":"Рекомендации по настройке параметров печати:\r\n- Формат: А4\r\n- Ориентация страницы: Книжная\r\n- Печать фона\r\n- Без колонтитулов\r\n- Поля по 0,5 см.",
				"doc_created":"Документ создан"
			},
			"en":{
				"recom":"Recommendations for configuring printing options: \r\n- Format: A4 \r\n- Page Orientation: Portrait \r\n- Print Background \r\n- No footers or headers \r\n- Fields 0.5 cm.",
				"doc_created":"Document created"				
			}
	};


alert(labels[curr_lang]['recom']);
var printWindow = window.open("","","scrollbars=1,width=1000,height=800,status=no,resizable=no");
printWindow.document.write('<html><head><title>'+$(this).parents(".alparadd").find(".arcslicehead").text()+'</title>'+
'<style type="text/css" media="all">.arcslicetable{width:100%;background-color:#dddad3;font-size:12px;text-align:center;}.arcdatatablepar{background-color:#faf2ea;}</style></head>'+
'<body style=\'text-align:center;margin:0px;padding:0px;\'>'+
'<br /><p style=\"padding:5px;background-color:#e0e0e0;color:#303030;font-size:14px;\">'+$(this).parents(".alparadd").find(".arcslicehead").text()+'</p>'+
'<p><table class="arcslicetable" style="width:100%;text-align:center;">'+
$(this).parents(".alparadd").find(".arcslicetable").html()+
'</table></p>'+
'<div style=\"background-color:#e0e0e0;color:#505050;text-align:left;text-indent:30px;font-size:12px;\">&nbsp;SERION System Manager Interface © Sunrise Media 2020&nbsp;['+labels[curr_lang]['doc_created']+': '+(new Date().toLocaleFormat("%y-%m-%d %H:%M:%S"))+']</div>'+
'</body></html>');
printWindow.document.close();
printWindow.print();
printWindow.setTimeout(printWindow.close, 1);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Report data page

$(document).on("click",".arcdrep",function(){


	var labels={
			"uk":{
				"date_time":"Дата/Час запису",
				"var_value":"Значення",
				"data_cut":"Звіт щодо значень параметрів системи за станом на ",
				"var_name":"Ім\'я змінної",
				"var_description":"Параметр",
				"val_active":"Активний",
				"val_inactive":"Неактивний",
				"group":"Група параметрів",
				"ungroup":"Негруповані параметри",
				"recom":"Рекомендації з налаштування параметрів друку:\r\n- Формат: А4\r\n- Орієнтація сторінки: Книжна\r\n- Друк тла\r\n- Без колонтитулів\r\n- Поля по 0,5 см.",
				"doc_created":"Документ створено",
				"no_pars":"Не обрано параметри"
			},
			"ru":{
				"date_time":"Дата/Время записи",	
				"var_value":"Значение",	
				"data_cut":"Отчет о значениях параметров системы по состоянию на ",
				"var_name":"Имя переменной",	
				"var_description":"Параметр",
				"val_active":"Активно",
				"val_inactive":"Неактивно",
				"group":"Группа параметров",
				"ungroup":"Негруппированные параметры",
				"recom":"Рекомендации по настройке параметров печати:\r\n- Формат: А4\r\n- Ориентация страницы: Книжная\r\n- Печать фона\r\n- Без колонтитулов\r\n- Поля по 0,5 см.",
				"doc_created":"Документ создан",
				"no_pars":"Не выбраны параметры"
			},
			"en":{	
				"date_time":"Date/Time of record",
				"var_value":"Value",	
				"data_cut":"The Report on System values on ",
				"var_name":"Variable Name",
				"var_description":"Parameter",
				"val_active":"Active",
				"val_inactive":"Inactive",
				"group":"Group of Parameters",
				"ungroup":"Ungrouped Parameters",
				"recom":"Recommendations for configuring printing options: \r\n- Format: A4 \r\n- Page Orientation: Portrait \r\n- Print Background \r\n- No footers or headers \r\n- Fields 0.5 cm.",
				"doc_created":"Document created",
				"no_pars":"Chose the Parameters"	
			}
	};


var now=new Date;

if($("#ReportDataTable").find(".data_sl").val()==''){$("#ReportDataTable").find(".data_sl").val(now.format('yyyy-mm-dd HH:MM:ss'))}

var sl=$("#ReportDataTable").find(".data_sl").val();

var vararr=[];

$("#ReportDataTable").find("input[type='checkbox'].params").each(function(){if($(this).is(':checked')){vararr.push($(this).val().replace("_repvarlist",""));}});

if(vararr.length>0){
	var ArcSlc={};
	var names=[];
	var lines=[];
	var response={};
	
	for(var i=0;i<NodesNames.length;i++){
		response=SendData("getarcslice",curr_auth_req,sl,NodesNames[i]);

		lines=response["subsys"]["nodes"][NodesNames[i]]["lines"];

		if(response["subsys"]["nodes"][NodesNames[i]]["lines"]!="joint"){
			if (lines.includes("line1"))$.extend(true,ArcSlc,response["data_server"]["data"]["line1"]);
			if (lines.includes("line2"))$.extend(true,ArcSlc,response["data_server"]["data"]["line2"]);
			if (lines.includes("line3"))$.extend(true,ArcSlc,response["data_server"]["data"]["line3"]);
			if (lines.includes("line4"))$.extend(true,ArcSlc,response["data_server"]["data"]["line4"]);
		}
		else{
			$.extend(true,ArcSlc,response["data_server"]["data"]);
		}
	}

	for(var name in ArcSlc){if(ArcSlc.hasOwnProperty(name)){names.push(name);}};

	names.sort();

	var ArcRepSlc={};
	for(var i=0;i<=names.length-1;i++){
		for(var j=0;j<=vararr.length-1;j++){
			if(names[i]==vararr[j]){
				ArcRepSlc[names[i]]=ArcSlc[names[i]];
			}
		}
	}
	names=[],name;
	for(name in ArcRepSlc){if(ArcRepSlc.hasOwnProperty(name)){names.push(name);}};
	names.sort();

	var GroupObj={};
	for(var i=0;i<=names.length-1;i++){
	if(VarGroup[names[i]]["group"]!=''){
	if(typeof GroupObj[VarGroup[names[i]]["group"]]!='object'){GroupObj[VarGroup[names[i]]["group"]]=[]}
	GroupObj[VarGroup[names[i]]["group"]].push(names[i]);}
	else{
	if(typeof GroupObj["*"]!='object'){GroupObj["*"]=[]}
	GroupObj["*"].push(names[i]);}}

	var GrNames = [], name;
	for(name in GroupObj){if(GroupObj.hasOwnProperty(name)){GrNames.push(name);}};
	//GrNames.sort();

	var varsls=	"<table class=\"repslicetable\" style=\"min-width:800px;text-align:center;background-color:#e0e0e0;border-spacing:0px;\" align=\"center\">"+
			"<tr style=\"text-align:center;background-color:#BFBAB0;\"><td style=\"padding:10px;\">"+labels[curr_lang]['var_description']+"</td><td style=\"padding:10px;\">"+labels[curr_lang]['var_name']+"</td><td style=\"padding:10px;\">"+labels[curr_lang]['var_value']+"</td><td style=\"padding:10px;\">"+labels[curr_lang]['date_time']+"</td></tr>";
	for(var i=0;i<=GrNames.length-1;i++){
		varsls=varsls+"<tr style=\"background-color:#b0cadb;\"><td colspan=\"4\" style=\"padding:10px;\">"+(GrNames[i]!='*'?labels[curr_lang]['group']+' <b>"'+GrNames[i]+'"</b>':labels[curr_lang]['ungroup'])+"</td></tr>";
		for(var j=0;j<=GroupObj[GrNames[i]].length-1;j++){
			var time = Object.keys(ArcRepSlc[GroupObj[GrNames[i]][j]])[0];
			var value = ArcRepSlc[GroupObj[GrNames[i]][j]][time];
				if(VarGroup[GroupObj[GrNames[i]][j]]["critical"]=="1"){
					if((VarGroup[GroupObj[GrNames[i]][j]]["type"]=='FLOAT')||
    			   	   	   (VarGroup[GroupObj[GrNames[i]][j]]["type"]=='FIXED')||
    			   	   	   (VarGroup[GroupObj[GrNames[i]][j]]["type"]=='INTEGER')){
						if((+value>=+VarGroup[GroupObj[GrNames[i]][j]]["crmaxval"])||
					   	   (+value<=+VarGroup[GroupObj[GrNames[i]][j]]["crminval"])){
							varsls=varsls+"<tr style=\"background-color:#ffc0b5;\"><td style=\"border-bottom:2px solid #ffffff;\">"+VarGroup[GroupObj[GrNames[i]][j]]['description'][curr_lang]+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+GroupObj[GrNames[i]][j]+"</td><td style=\"border-bottom:2px solid #ffffff;font-weight:bold;\">"+value+VarGroup[GroupObj[GrNames[i]][j]]['dataunits']+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+time+"</td></tr>";
						}
						else{
							varsls=varsls+"<tr style=\"background-color:#c0f0b5;\"><td style=\"border-bottom:2px solid #ffffff;\">"+VarGroup[GroupObj[GrNames[i]][j]]['description'][curr_lang]+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+GroupObj[GrNames[i]][j]+"</td><td style=\"border-bottom:2px solid #ffffff;font-weight:bold;\">"+value+VarGroup[GroupObj[GrNames[i]][j]]['dataunits']+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+time+"</td></tr>";
						}
					}	
					if(VarGroup[GroupObj[GrNames[i]][j]]["type"]=='INTEGER'){				
						if(+value==+VarGroup[GroupObj[GrNames[i]][j]]["crvalue"]){
							varsls=varsls+"<tr style=\"background-color:#ffc0b5;\"><td style=\"border-bottom:2px solid #ffffff;\">"+VarGroup[GroupObj[GrNames[i]][j]]['description'][curr_lang]+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+GroupObj[GrNames[i]][j]+"</td><td style=\"border-bottom:2px solid #ffffff;font-weight:bold;\">"+value+VarGroup[GroupObj[GrNames[i]][j]]['dataunits']+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+time+"</td></tr>";
						}
						else{
							varsls=varsls+"<tr style=\"background-color:#c0f0b5;\"><td style=\"border-bottom:2px solid #ffffff;\">"+VarGroup[GroupObj[GrNames[i]][j]]['description'][curr_lang]+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+GroupObj[GrNames[i]][j]+"</td><td style=\"border-bottom:2px solid #ffffff;font-weight:bold;\">"+value+VarGroup[GroupObj[GrNames[i]][j]]['dataunits']+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+time+"</td></tr>";
						}					
					}
					if(VarGroup[GroupObj[GrNames[i]][j]]["type"]=='BOOL'){			
						if(+value==+VarGroup[GroupObj[GrNames[i]][j]]["alarmstate"]){
							varsls=varsls+"<tr style=\"background-color:#ffc0b5;\"><td style=\"border-bottom:2px solid #ffffff;\">"+VarGroup[GroupObj[GrNames[i]][j]]['description'][curr_lang]+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+GroupObj[GrNames[i]][j]+"</td><td style=\"border-bottom:2px solid #ffffff;font-weight:bold;\">"+(value!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+time+"</td></tr>";
						}
						else{
							varsls=varsls+"<tr style=\"background-color:#c0f0b5;\"><td style=\"border-bottom:2px solid #ffffff;\">"+VarGroup[GroupObj[GrNames[i]][j]]['description'][curr_lang]+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+GroupObj[GrNames[i]][j]+"</td><td style=\"border-bottom:2px solid #ffffff;font-weight:bold;\">"+(value!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+time+"</td></tr>";
						}
					}
				}
				else {
					if(VarGroup[GroupObj[GrNames[i]][j]]["type"]=='BOOL')varsls=varsls+"<tr style=\"background-color:#efefef;\"><td style=\"border-bottom:2px solid #ffffff;\">"+VarGroup[GroupObj[GrNames[i]][j]]['description'][curr_lang]+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+GroupObj[GrNames[i]][j]+"</td><td style=\"border-bottom:2px solid #ffffff;font-weight:bold;\">"+(value!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+time+"</td></tr>"; 
					else if((VarGroup[GroupObj[GrNames[i]][j]]["type"]=='FLOAT')||
    			   	   	   	(VarGroup[GroupObj[GrNames[i]][j]]["type"]=='FIXED')||
    			   	   	   	(VarGroup[GroupObj[GrNames[i]][j]]["type"]=='INTEGER')){ varsls=varsls+"<tr style=\"background-color:#efefef;\"><td style=\"border-bottom:2px solid #ffffff;\">"+VarGroup[GroupObj[GrNames[i]][j]]['description'][curr_lang]+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+GroupObj[GrNames[i]][j]+"</td><td style=\"border-bottom:2px solid #ffffff;font-weight:bold;\">"+value+VarGroup[GroupObj[GrNames[i]][j]]['dataunits']+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+time+"</td></tr>";} 
    			   	   	else {varsls=varsls+"<tr style=\"background-color:#efefef;\"><td style=\"border-bottom:2px solid #ffffff;\">"+VarGroup[GroupObj[GrNames[i]][j]]['description'][curr_lang]+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+GroupObj[GrNames[i]][j]+"</td><td style=\"border-bottom:2px solid #ffffff;font-weight:bold;\">"+value+"</td><td style=\"border-bottom:2px solid #ffffff;\">"+time+"</td></tr>";} 
				}
		}
	}
	varsls=varsls+"</table>";
	var html='<html><head><title>'+labels[curr_lang]['data_cut']+sl+'</title>'+
			 '<style type="text/css" media="all">.repslicetable{width:100%;background-color:#dddad3;font-size:12px;text-align:center;}.repdatatablepar{background-color:#faf2ea;}</style></head>'+
			 '<body style=\'text-align:center;margin:0px;padding:0px;\'>'+
			 '<br /><p style=\"padding:5px;background-color:#e0e0e0;color:#303030;font-size:14px;\">'+labels[curr_lang]['data_cut']+sl+'</p>'+
			 '<p>'+
			 varsls+
			 '</p>'+
			 '<div style=\"background-color:#e0e0e0;color:#505050;text-align:left;text-indent:30px;font-size:12px;\">&nbsp;SERION System Manager Interface © Sunrise Media 2020&nbsp;['+labels[curr_lang]['doc_created']+': '+(new Date().toLocaleFormat("%y-%m-%d %H:%M:%S"))+']</div>'+
			 '</body></html>';
	var printWindow = new Object();
	if ($("input[type='checkbox']#RepPrint").is(':checked')){
		alert(labels[curr_lang]['recom']);
		printWindow = window.open("","","scrollbars=1,width=1000,height=800,status=no,resizable=no");
		printWindow.document.write(html);
		printWindow.document.close();
		printWindow.print();
		//printWindow.setTimeout(printWindow.close, 1);
	}
	else {
		printWindow = window.open("","","scrollbars=1,width=1000,height=800,status=no,resizable=no");
		printWindow.document.write(html);
		printWindow.document.close();
	}
}
else alert(labels[curr_lang]['no_pars']);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Configuration Table Page

$(document).on("click",".editval",function(){

	var labels={
			"uk":{	
				"enter_new":"Зазначне нове значення",
				"save":"Зберегти",
				"cancel":"Скасувати",
				"scan_nstrt":"Синхронізацію даних не запущено"
			},
			"ru":{
				"enter_new":"Укажите новое значение",
				"save":"Сохранить",
				"cancel":"Отменить",
				"scan_nstrt":"Синхронизация данных не запущена"
			},
			"en":{
				"enter_new":"Enter the new Value",
				"save":"Save",
				"cancel":"Cancel",
				"scan_nstrt":"The devices data sync is not started"				
			}
	};


	var srvscanng=false;
	for(var Nname in NodeVars)
		srvscanng=SrvStat[Nname]["scanning"];

	if(srvscanng){

		$('.editval').closest('tr').find('td').css({'background-color':''});
		$('.setblock').remove();

		var Name=$(this).closest("tr").find("td:first").text();
		$(this).closest("tr").parent().find("td").css({'background-color':''});
		$(this).closest("tr").find("td").css({'background-color':'#ff8075'});
		var InptElem="";
		if(VarGroup[Name]["type"]=="BOOL"){
			if(VarGroup[Name]["value"]==1)InptElem="<select id=\"NewParValue\"><option selected>ACTIVE</option><option>INACTIVE</option></select>";	
			else InptElem="<select id=\"NewParValue\"><option>ACTIVE</option><option selected>INACTIVE</option></select>";			
		   }
		else InptElem="<input type=\"text\" style=\"width:150px;\" id=\"NewParValue\" value=\""+VarGroup[Name]["value"]+"\"/>";
		if($("#setvarpar_"+Name+"_value").length==0){
			$(this).after("<div style=\"margin-left:-98px;margin-top:16px;\" class=\"setblock\" id=\"setvarpar_"+Name+"_value\">"+labels[curr_lang]['enter_new']+":<br />"+InptElem+"<br /><input type=\"button\" value=\""+labels[curr_lang]['save']+"\" style=\"font-size:11px;width:45%;\" id=\"writenewvalue\" onClick=\"$(this).closest('tr').find('td').css({'background-color':''});WriteVarValue('"+Name+"',$(this).parents('.setblock').find('#NewParValue').val(),$(this).parents('.editval'));$(this).parents('.setblock').remove();\"><input type=\"button\" value=\""+labels[curr_lang]['cancel']+"\" style=\"font-size:11px;width:45%;\" id=\"cancelwritenewvalue\" onClick=\"$(this).closest('tr').find('td').css({'background-color':''});$(this).parents('.setblock').remove();\"></div>");
		}
	    }
	else alert(labels[curr_lang]['scan_nstrt']);
})


$(document).on("click",".prcftbl",function(){

	var labels={
			"uk":{	
				"recom":"Рекомендації з налаштування параметрів друку:\r\n- Формат: А4\r\n- Орієнтація сторінки: Книжна\r\n- Друк тла\r\n- Без колонтитулів\r\n- Поля по 0,5 см.",
				"doc_created":"Документ створено",
				"set_table":"Таблиця налаштувань системи"
			},
			"ru":{
				"recom":"Рекомендации по настройке параметров печати:\r\n- Формат: А4\r\n- Ориентация страницы: Книжная\r\n- Печать фона\r\n- Без колонтитулов\r\n- Поля по 0,5 см.",
				"doc_created":"Документ создан",
				"set_table":"Таблица настроек системы"
			},
			"en":{
				"recom":"Recommendations for configuring printing options: \r\n- Format: A4 \r\n- Page Orientation: Portrait \r\n- Print Background \r\n- No footers or headers \r\n- Fields 0.5 cm.",
				"doc_created":"Document created",
				"set_table":"System settings table"				
			}
	};



alert(labels[curr_lang]['recom']);
$(this).parents("#cnftblcont").find(".hidden_row").show();
var printWindow = window.open("","","scrollbars=1,width=1000,height=800,status=no,resizable=no");
printWindow.document.write('<html><head><title>'+labels[curr_lang]['set_table']+'</title>'+
'<style type="text/css" media="all">table{font-size:12px;}td{font-size:12px;}.conftable{width:100%;background-color:#dddad3;}.dtpar{background-color:#eae5db;text-align:left;}</style></head>'+
'<body style=\'text-align:center;margin:0px;padding:0px;\'>'+
'<br /><p style=\"padding:5px;background-color:#e0e0e0;color:#303030;font-size:14px;text-align:center;\">'+labels[curr_lang]['set_table']+' ('+(new Date().toLocaleFormat("%y-%m-%d %H:%M:%S"))+')</p>'+
'<p><table class="arcslicetable" style="width:100%;text-align:center;">'+
$(this).parents("#cnftblcont").find(".conftable").html()+
'</table></p>'+
'<div style=\"background-color:#e0e0e0;color:#505050;text-align:left;text-indent:30px;font-size:12px;\">&nbsp;SERION System Manager Interface © Sunrise Media 2020&nbsp;['+labels[curr_lang]['doc_created']+': '+(new Date().toLocaleFormat("%y-%m-%d %H:%M:%S"))+']</div>'+
'</body></html>');
$(this).parents("#cnftblcont").find(".hidden_row").hide();
printWindow.document.close();
printWindow.print();
printWindow.setTimeout(printWindow.close, 1);});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Variables register data page

$(document).on("change","select#vargroupreq,select#varsearchreq_lev",function(Obj){
	CreateVarReg();
});

$(document).on("keypress","input#varsearchreq_des,input#varsearchreq_add,input#varsearchreq_nam",function(Obj){
	if(Obj.keyCode==13){
		CreateVarReg();
	}
	if(Obj.keyCode==27){
		$(this).val("");
		CreateVarReg();
	}
});

$(document).on("change",".varflt",function(){

	var nodechk=false;
	for(var Nname in NodeVars)
		nodechk=($(".varflt[name="+Nname+"_node]").prop("checked")||(nodechk));

	if(!nodechk)$(this).prop("checked",true);
	
	if((!$(".varflt[name=virtual]").prop("checked"))&&
	   (!$(".varflt[name=real]").prop("checked")))$(this).prop("checked",true);

	if((!$(".varflt[name=bool]").prop("checked"))&&
	   (!$(".varflt[name=integer]").prop("checked"))&&
	   (!$(".varflt[name=fixed]").prop("checked"))&&
	   (!$(".varflt[name=float]").prop("checked")))$(this).prop("checked",true);

	CreateVarReg();
});




$(document).on("click",".vrlitem",function(){

	var labels={
			"uk":{	
				"val_active":"Активний",
				"val_inactive":"Неактивний",
				"dt_received":"Отримано",
				"dt_not_received":"Не отримано",
				"no_data":"Немає даних",
				"success":"Успішно",
				"fail":"Невдало",
				"allowed":"Дозволено",
				"denied":"Заборонено",
				"inverse":"Інверсія",
				"no_inverse":"Без інверсії",
				"val_actual":"Актуальне",
				"val_not_actual":"Не актуальне",
				"guest":"Гість",
				"supervisor":"Диспетчер",
				"engineer":"Інженер",
				"admin":"Адміністратор"
			},
			"ru":{
				"val_active":"Активно",
				"val_inactive":"Не активно",
				"dt_received":"Получен",
				"dt_not_received":"Не получен",
				"no_data":"Нет данных",
				"success":"Успешно",
				"fail":"Неудачно",
				"allowed":"Разрешено",
				"denied":"Запрещено",
				"inverse":"Инверсия",
				"no_inverse":"Без инверсии",
				"val_actual":"Актуально",
				"val_not_actual":"Не актуально",
				"guest":"Гость",
				"supervisor":"Диспетчер",
				"engineer":"Инженер",
				"admin":"Администратор"
			},
			"en":{
				"val_active":"Active",
				"val_inactive":"Inactive",
				"dt_received":"Received",
				"dt_not_received":"Not received",
				"no_data":"No data",
				"success":"Success",
				"fail":"Fail",
				"allowed":"Allowed",
				"denied":"Denied",
				"inverse":"Inverse",
				"no_inverse":"No inverse",
				"val_actual":"Actual",
				"val_not_actual":"Not actual",
				"guest":"Guest",
				"supervisor":"Supervisor",
				"engineer":"Engineer",
				"admin":"Administrator"				
			}
	};


	var Name=$(this).text();
	var Obj=$(this).parents("#RegVarTable").find("#VarRegData");

	Obj.find("td").css({"background-color":""});

	if((VarGroup[Name]["write"]!=0)&&(!VarGroup[Name]["origin"].includes("virtual"))){
		Obj.find("#RegVarValue").attr('class','editpar');
		Obj.find("#RegVarValue").attr('name','edit_value');
		Obj.find("#RegVarValue").css({'background-color':'#ffffff'});
	}
	else{
		Obj.find("#RegVarValue").css({'background-color':'#eae5db'});
		Obj.find("#RegVarValue").removeAttr('class');
		Obj.find("#RegVarValue").removeAttr('name');
	}

	$(this).parent("#VarRegList").find(".vrlitem").each(function(){$(this).css({'background-color':'#fafafa','font-weight':'normal'});});
	$(this).css({'background-color':'#d0d0d0','font-weight':'bold'});

	Obj.find("#RegVarName").text(Name);
	Obj.find("#RegVarNature").text((VarGroup[Name]["origin"].includes("virtual")?"VIRTUAL":"REAL"));
	Obj.find("#RegVarDescription").text(VarGroup[Name]["description"][curr_lang]);
	Obj.find("#RegVarValue").text((VarGroup[Name]["type"]!="BOOL"?VarGroup[Name]["value"]:(VarGroup[Name]["value"]!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])));
	Obj.find("#RegVarGroup").text(VarGroup[Name]["group"]);
	Obj.find("#RegVarType").text(VarGroup[Name]["type"]);

	$(".editpar").css({'background-color':'#ffffff'});

	Obj.find(".rFLOAT,.rFIXED,.rINTEGER,.rBOOL,.vFLOAT,.vBOOL,.vINTEGER").hide();

	if(VarGroup[Name]["origin"].includes("line"))Obj.find(".r"+VarGroup[Name]["type"]).show();
	if(VarGroup[Name]["origin"].includes("virtual"))Obj.find(".v"+VarGroup[Name]["type"]).show();
	Obj.find("#RegVarNature").text((VarGroup[Name]["origin"].includes("virtual")?"VIRTUAL":"REAL ("+VarGroup[Name]["origin"]+" - "+CommObj[VarNodes[Name]][VarGroup[Name]["origin"]]["Port"]+")"));
	Obj.find("#RegVarAnswer").text(SrvStat[VarNodes[Name]]["scanning"]?((VarGroup[Name]["answer"]!=0?labels[curr_lang]['dt_received']:labels[curr_lang]['dt_not_received'])):labels[curr_lang]['no_data']);
	Obj.find("#RegVarImplement").text(VarGroup[Name]["implement"]);	
	Obj.find("#RegVarLog").text((VarGroup[Name]["log"]!=0?labels[curr_lang]['allowed']:labels[curr_lang]['denied']));	
	Obj.find("#RegVarUnitRtuAddr").text(VarGroup[Name]["unitrtuaddr"]);	
	Obj.find("#RegVarUnitEthAddr").text(VarGroup[Name]["unitethaddr"]);
	Obj.find("#RegVarRegAddr").text(VarGroup[Name]["regaddress"]);
	Obj.find("#RegVarRegType").text((VarGroup[Name]["regtype"]==1?'COILS':(VarGroup[Name]["regtype"]==2?'DISCR_INPUTS':(VarGroup[Name]["regtype"]==3?'HOLDING_REGS':(VarGroup[Name]["regtype"]==4?'INPUT_REGS':labels[curr_lang]['no_data'])))));
	Obj.find("#RegVarCorr").text((VarGroup[Name]["type"]!="BOOL"?VarGroup[Name]["correction"]:(VarGroup[Name]["correction"]!=0?labels[curr_lang]['inverse']:labels[curr_lang]['no_inverse'])));
	Obj.find("#RegVarRegNumb").text(VarGroup[Name]["regsnumber"]);
	Obj.find("#RegVarNegVal").text((VarGroup[Name]["negval"]!=0?labels[curr_lang]['allowed']:labels[curr_lang]['denied']));
	Obj.find("#RegVarErrStr").text(VarGroup[Name]["errorstr"]);
	Obj.find("#RegVarFloatPrec").text(VarGroup[Name]["floatprec"]);
	Obj.find("#RegVarDtUnits").text(VarGroup[Name]["dataunits"]);
	Obj.find("#RegVarWrite").text((VarGroup[Name]["write"]==0?'READ_ONLY':(VarGroup[Name]["write"]==1?'READ_WRITE':(VarGroup[Name]["write"]==2?'WRITE_ONLY':labels[curr_lang]['no_data']))));
	Obj.find("#RegVarFunc").text(VarGroup[Name]["function"]);
	Obj.find("#RegVarWrVar").text(VarGroup[Name]["writetovar"]);
	Obj.find("#RegVarWrStp").text(VarGroup[Name]["writestep"]);
	Obj.find("#RegVarCorrK").text(VarGroup[Name]["multiplier"]);
	Obj.find("#RegVarCorrB").text(VarGroup[Name]["shifting"]);
	Obj.find("#RegVarRndTo").text(VarGroup[Name]["roundto"]);
	Obj.find("#RegVarArc").text((VarGroup[Name]["archive"]!=0?labels[curr_lang]['allowed']:labels[curr_lang]['denied']));
	Obj.find("#RegVarArcStep").text(VarGroup[Name]["arcstep"]);
	Obj.find("#RegVarPlot").text((VarGroup[Name]["plot"]!=0?labels[curr_lang]['allowed']:labels[curr_lang]['denied']));
	Obj.find("#RegVarCrState").text((VarGroup[Name]["critical"]!=0?labels[curr_lang]['allowed']:labels[curr_lang]['denied']));
	Obj.find("#RegVarCrMaxVal").text(VarGroup[Name]["crmaxval"]);
	Obj.find("#RegVarCrMinVal").text(VarGroup[Name]["crminval"]);
	Obj.find("#RegVarCrDiff").text(VarGroup[Name]["crdiffer"]);
	Obj.find("#RegVarCrVal").text((VarGroup[Name]["crvalue"]!=""?(VarGroup[Name]["type"]!="BOOL"?VarGroup[Name]["crvalue"]:(VarGroup[Name]["crvalue"]!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive'])):labels[curr_lang]['no_data']));
	Obj.find("#RegVarCrStVarSt").text((VarGroup[Name]["alarmstate"]!=0?labels[curr_lang]['val_active']:labels[curr_lang]['val_inactive']));
	Obj.find("#RegVarCrStIgn").text((VarGroup[Name]["ignorecritical"]!=0?labels[curr_lang]['allowed']:labels[curr_lang]['denied']));
	Obj.find("#RegVarAcsLev").text((VarGroup[Name]["hidden"]==0?"GUEST":(VarGroup[Name]["hidden"]==1?"SUPERVISOR":(VarGroup[Name]["hidden"]==2?"ENGINEER":(VarGroup[Name]["hidden"]==3?"ADMINISTRATOR":labels[curr_lang]['no_data'])))));
	Obj.find("#RegVarActual").text((VarGroup[Name]["actual"]!=0?labels[curr_lang]['val_actual']:labels[curr_lang]['val_not_actual']));
	Obj.find("#RegVarProc").text((VarGroup[Name]["processing"]!=0?labels[curr_lang]['allowed']:labels[curr_lang]['denied']));

	if(VarGroup[Name]["write"]==0){
		Obj.find(".WriteValue").hide();
	}
	if(VarGroup[Name]["archive"]==0){
		Obj.find(".DataArchive").hide();
	}
	if(VarGroup[Name]["critical"]==0){
		Obj.find(".CrState").hide();
	}
	if(!CommObj[VarNodes[Name]][VarGroup[Name]["origin"]]["Port"].includes("COM")){
		Obj.find(".Rtu485").hide();
	}
	if(!CommObj[VarNodes[Name]][VarGroup[Name]["origin"]]["Port"].includes("ETHERNET")){
		Obj.find(".Ethernet").hide();
	}	

	$("#VarRegList").height($("#RegVarTableCont").height());

});

$(document).on("click",".editpar",function(){

	var labels={
			"uk":{	
				"enter_new":"Зазначне нове значення",
				"save":"Зберегти",
				"cancel":"Скасувати",
				"scan_strt":"Синхронізацію даних запущено, зупиніть та спробуйте знову"
			},
			"ru":{
				"enter_new":"Укажите новое значение",
				"save":"Сохранить",
				"cancel":"Отменить",
				"scan_strt":"Синхронизация данных запущена, остановите и попробуйте снова"
			},
			"en":{
				"enter_new":"Enter the new Value",
				"save":"Save",
				"cancel":"Cancel",
				"scan_strt":"The devices data sync is started, stop it and try again"				
			}
	};

	$(".editpar").closest("tr").find("td").css({"background-color":""});
	$(".setblock").remove();
	var Name=$(this).parents("#RegVarTable").find("#RegVarName").text();
	var Par=$(this).attr("name").replace("edit_","");

	if(Par!="value"){
		var names=[],name;
		for(name in VarGroup){if(VarGroup.hasOwnProperty(name)){names.push(name);}};
		names.sort();
		$(this).closest('tr').find('td').css({'background-color':'#ff8075'});
		var InptElem="";
		if((Par=="plot")||(Par=="critical")||(Par=="ignorecritical")||(Par=="archive")||(Par=="processing")||(Par=="negval")||(Par=="log")){
			if(VarGroup[Name][Par]==1) InptElem="<select id=\"NewParValue\"><option selected>ALLOW</option><option>DENY</option></select>";
			else InptElem="<select id=\"NewParValue\"><option>ALLOW</option><option selected>DENY</option></select>";
		}
		else if(Par=="unitrtuaddr"){
			InptElem="<select id=\"NewParValue\">";
			for(var i=1;i<=256;i++){
				if(VarGroup[Name][Par]!=i)InptElem=InptElem+"<option>"+i+"</option>"
				else InptElem=InptElem+"<option selected>"+i+"</option>";
				
			}
			InptElem=InptElem+"</select>";
		}
		else if(Par=="alarmstate"){
			if(VarGroup[Name][Par]==1)InptElem="<select id=\"NewParValue\"><option selected>ACTIVE</option><option>INACTIVE</option></select>";	
			else InptElem="<select id=\"NewParValue\"><option>ACTIVE</option><option selected>INACTIVE</option></select>";	
		}
		else if(Par=="writetovar"){
			InptElem="<select id=\"NewParValue\">";
			if((VarGroup[Name]["type"]=="BOOL")&&
	       	   (VarGroup[Name]["origin"].includes("virtual"))){
				for(var i=0;i<=names.length-1;i++){
					if((VarGroup[names[i]]["origin"].includes("line"))&&(VarGroup[names[i]]["type"]=="BOOL")&&(VarGroup[names[i]]["write"]!=0)){
						if(VarGroup[Name][Par]!=names[i])InptElem=InptElem+"<option>"+names[i]+"</option>"
						else InptElem=InptElem+"<option selected>"+names[i]+"</option>";
					}
				}
			}
			if((VarGroup[Name]["type"]=="FLOAT")&&
	       	   (VarGroup[Name]["origin"].includes("virtual"))){
				for(var i=0;i<=names.length-1;i++){
					if((VarGroup[names[i]]["origin"].includes("line"))&&((VarGroup[names[i]]["type"]=="FLOAT")||(VarGroup[names[i]]["type"]=="FIXED"))&&(VarGroup[names[i]]["write"]!=0)){
						if(VarGroup[Name][Par]!=names[i])InptElem=InptElem+"<option>"+names[i]+"</option>"
						else InptElem=InptElem+"<option selected>"+names[i]+"</option>";
					}
				}
			}
			if((VarGroup[Name]["type"]=="INTEGER")&&
	       	   (VarGroup[Name]["origin"].includes("virtual"))){
				for(var i=0;i<=names.length-1;i++){
					if((VarGroup[names[i]]["origin"].includes("line"))&&(VarGroup[names[i]]["type"]=="INTEGER")&&(VarGroup[names[i]]["write"]!=0)){
						if(VarGroup[Name][Par]!=names[i])InptElem=InptElem+"<option>"+names[i]+"</option>"
						else InptElem=InptElem+"<option selected>"+names[i]+"</option>";
					}
				}
			}
			InptElem=InptElem+"</select>";
		}
		else if(Par=="write"){
			InptElem="<select id=\"NewParValue\" style=\"width:80px;\">"+
				 "<option"+(VarGroup[Name][Par]==0?" selected":"")+">READ_ONLY</option>"+
				 "<option"+(VarGroup[Name][Par]==1?" selected":"")+">READ_WRITE</option>"+
				 "<option"+(VarGroup[Name][Par]==2?" selected":"")+">WRITE_ONLY</option>"+
				 "</select>";	
		}
		else if(Par=="hidden"){
			InptElem="<select id=\"NewParValue\" style=\"width:80px;\">"+
				 "<option"+(VarGroup[Name][Par]==0?" selected":"")+">GUEST</option>"+
				 "<option"+(VarGroup[Name][Par]==1?" selected":"")+">SUPERVISOR</option>"+
				 "<option"+(VarGroup[Name][Par]==2?" selected":"")+">ENGINEER</option>"+
				 "<option"+(VarGroup[Name][Par]==3?" selected":"")+">ADMINISTRATOR</option>"+
				 "</select>";	
		}
		else if(Par=="regtype"){
			InptElem="<select id=\"NewParValue\" style=\"width:80px;\">"+
				 "<option"+(VarGroup[Name][Par]==1?" selected":"")+">COILS</option>"+
				 "<option"+(VarGroup[Name][Par]==2?" selected":"")+">DISCR_INPUTS</option>"+
				 "<option"+(VarGroup[Name][Par]==3?" selected":"")+">HOLDING_REGS</option>"+
				 "<option"+(VarGroup[Name][Par]==4?" selected":"")+">INPUT_REGS</option>"+
				 "</select>";	
		}
		else if((Par=="multiplier")||(Par=="shifting")||(Par=="arcstep")||(Par=="writestep")||(Par=="crmaxval")||(Par=="crminval")||(Par=="crdiffer")){
			InptElem="<input type=\"text\" style=\"width:150px;\" id=\"NewParValue\" value=\""+VarGroup[Name][Par]+"\"/>";
		}
		else if((Par=="description")||(Par=="function")||(Par=="dataunits")){
			InptElem="<input type=\"text\" style=\"width:150px;\" id=\"NewParValue\" value=\""+VarGroup[Name][Par]+"\"/>";
		}
		else if(Par=="roundto"){
			InptElem="<select id=\"NewParValue\" style=\"width:80px;\">";
			for(var i=0;i<=6;i++){
				if(VarGroup[Name][Par]!=i)InptElem=InptElem+"<option>"+i+"</option>"
				else InptElem=InptElem+"<option selected>"+i+"</option>";
			}
			InptElem=InptElem+"</select>";	
		}
		else if(Par=="crvalue"){
			if(VarGroup[Name]["type"]=="BOOL"){
				if(VarGroup[Name][Par]==1)InptElem="<select id=\"NewParValue\"><option selected>ACTIVE</option><option>INACTIVE</option></select>";	
				else InptElem="<select id=\"NewParValue\"><option>ACTIVE</option><option selected>INACTIVE</option></select>";			
	       	}
			else InptElem="<input type=\"text\" style=\"width:150px;\" id=\"NewParValue\" value=\""+VarGroup[Name][Par]+"\"/>";
		}	
		else if(Par=="correction"){
			if(VarGroup[Name]["type"]=="BOOL"){
				if(VarGroup[Name][Par]==1)InptElem="<select id=\"NewParValue\"><option selected>INVERSE</option><option>NOINVERSE</option></select>";	
				else InptElem="<select id=\"NewParValue\"><option>INVERSE</option><option selected>NOINVERSE</option></select>";			
	       	}
			else InptElem="<input type=\"text\" style=\"width:150px;\" id=\"NewParValue\" value=\""+VarGroup[Name][Par]+"\"/>";
		}
		else{
			InptElem="<input type=\"text\" style=\"width:150px;\" id=\"NewParValue\" value=\""+VarGroup[Name][Par]+"\"/>";
		}
		if($("#setvarpar_"+Name+"_"+Par).length==0){
			$(this).after("<div style=\"margin-left:-200px;margin-top:16px;\" class=\"setblock\" id=\"setvarpar_"+Name+"_"+Par+"\">"+labels[curr_lang]['enter_new']+":<br />"+InptElem+"<br /><input type=\"button\" value=\""+labels[curr_lang]['save']+"\" style=\"font-size:11px;width:45%;\" id=\"writenewvalue\" onClick=\"$(this).closest('tr').find('td').css({'background-color':''});WriteVarData('"+Name+"','"+Par+"',$(this).parents('.setblock').find('#NewParValue').val(),$(this).parents('.editpar'));$(this).parents('.setblock').remove();\"><input type=\"button\" value=\""+labels[curr_lang]['cancel']+"\" style=\"font-size:11px;width:45%;\" id=\"cancelwritenewvalue\" onClick=\"$(this).closest('tr').find('td').css({'background-color':''});$(this).parents('.setblock').remove();\"></div>");
			$(".setblock").width($(this).width()-6);
		}
	}
	else if(Par=="value"){
		$(this).closest('tr').find('td').css({'background-color':'#ff8075'});
		if(VarGroup[Name]["type"]=="BOOL"){
			if(VarGroup[Name][Par]==1)InptElem="<select id=\"NewParValue\"><option selected>ACTIVE</option><option>INACTIVE</option></select>";	
			else InptElem="<select id=\"NewParValue\"><option>ACTIVE</option><option selected>INACTIVE</option></select>";			
	    }
		else InptElem="<input type=\"text\" style=\"width:150px;\" id=\"NewParValue\" value=\""+VarGroup[Name][Par]+"\"/>";
		if($("#setvarpar_"+Name+"_"+Par).length==0){
			$(this).after("<div style=\"margin-left:-200px;margin-top:16px;\" class=\"setblock\" id=\"setvarpar_"+Name+"_"+Par+"\">"+labels[curr_lang]['enter_new']+":<br />"+InptElem+"<br /><input type=\"button\" value=\""+labels[curr_lang]['save']+"\" style=\"font-size:11px;width:45%;\" id=\"writenewvalue\" onClick=\"$(this).closest('tr').find('td').css({'background-color':''});WriteVarValue('"+Name+"',$(this).parents('.setblock').find('#NewParValue').val(),$(this).parents('.editpar'));$(this).parents('.setblock').remove();\"><input type=\"button\" value=\""+labels[curr_lang]['cancel']+"\" style=\"font-size:11px;width:45%;\" id=\"cancelwritenewvalue\" onClick=\"$(this).closest('tr').find('td').css({'background-color':''});$(this).parents('.setblock').remove();\"></div>");
			$(".setblock").width($(this).width()-6);
		}
	}
	else alert(labels[curr_lang]['scan_strt']);
});

$(document).on("keypress","input#NewParValue",function(Obj){
	if(Obj.keyCode==13){
		$(this).parents('.setblock').find('#writenewvalue').click();
	}
	if(Obj.keyCode==27){
		$(this).parents('.setblock').remove();
		$(this).parents(".editpar").closest("tr").find("td").css({'background-color':''});
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Common function

$(window).resize(function(){

	$(".msch,.sch,.parimg").hide();
	if($("#FlowChart").length!=0)
	$("#content").css({'min-height':$(window).height()-$('.intheader').height()-$('#topmenu').height()-25});
	$("img").each(function(){$(this).attr("src",$(this).attr("src")+"?"+Math.random())});
});

$(".topmenuitm").click(function(){
$("#content").html("");
if($(this).attr("class")=="topmenuitm flwchrt"){
	$("#content").attr("name",$(this).attr("id"));
	$(".msch,.sch,.parimg").hide();
	$("body").css({'overflow-y':'auto'});
	$("#content").html("");
	FlowChartCont();
	$("#content").css({'min-height':$(window).height()-$('.intheader').height()-$('#topmenu').height()-25});
	$(".topmenuitm").css({'background-color':''});
	$(this).css({'background-color':'#E07530'});
	//$(".msch,.sch,.parimg").load(function(){
	$(".msch,.sch,.parimg").on("load", function(){
   		$(this).removeAttr("width").removeAttr("height").css({width:"",height:""}); 
		//$(this).width($("#content").width());
		$("#content").css({'min-height':Math.max($(window).height()-$('.intheader').height()-$('#topmenu').height()-25,$(this).height())});
		$(this).css({'top':$("#content").height()*0.5-$(this).height()*0.5+50});
		$(".msch").show();
	});
	$("img").each(function() {
    	var src = $(this).attr('src');
    	$(this).attr('src', '');
    	$(this).attr('src', src);
	});
	$("img").each(function(){
		$(this).attr("src",$(this).attr("src")+"?"+Math.random())
	});
	FlwChrtPrms();
	datetimeElementsinit();
}
else if($(this).attr("id")=='dtarc'){
	$("body").css({'overflow-y':'scroll'});
	$("#content").css({'min-height':$(window).height()-$('.intheader').height()-$('#topmenu').height()-25});
	$("#content").html(DataArchive());
	datetimeElementsinit();}
else if($(this).attr("id")=='alarc'){
	$("body").css({'overflow-y':'scroll'});
	$("#content").html(AlarmArchive());
	$("#content").css({'min-height':$(window).height()-$('.intheader').height()-$('#topmenu').height()-25});
	CreateAlarmArchive();
	datetimeElementsinit();}
else if($(this).attr("id")=='sysrep'){
	$("body").css({'overflow-y':'scroll'});
	$("#content").css({'min-height':$(window).height()-$('.intheader').height()-$('#topmenu').height()-25});
	$("#content").html(SystemDataReport());
	datetimeElementsinit();}
else if($(this).attr("id")=='manlp'){
	$("body").css({'overflow-y':'auto'});
	$("#content").css({'min-height':$(window).height()-$('.intheader').height()-$('#topmenu').height()-25});
	$("#content").html('<br /><br /><div style="width:100%;height:'+($(window).height()-$(".intheader").height()-$("#topmenu").height()-100)+'px;border:2px solid #a0a0a0;"><embed src="'+SubSystem+'/manuals/manual_'+curr_lang+'.pdf" width="100%" height="100%" /></div><br />');}
else if($(this).attr("id")=='conftbl'){
	$("body").css({'overflow-y':'auto'});
	$("#content").css({'min-height':$(window).height()-$('.intheader').height()-$('#topmenu').height()-25});
	$("#content").html(ConfTblContent());}
else if($(this).attr("id")=='infop'){
	$("body").css({'overflow-y':'auto'});
	$("#content").css({'min-height':$(window).height()-$('.intheader').height()-$('#topmenu').height()-25});
	$("#content").load('info.dat');}
else if($(this).attr("id")=='vregp'){
	$("body").css({'overflow-y':'scroll'});
	$("#content").html(VarReg());
	$("#content").css({'min-height':$(window).height()-$('.intheader').height()-$('#topmenu').height()-25});
	CreateVarReg();}
else if($(this).attr("id")=='srvdt'){
	$("body").css({'overflow-y':'scroll'});
	$("#content").css({'min-height':$(window).height()-$('.intheader').height()-$('#topmenu').height()-25});
	$("#content").html(SrvData());}
else{$("#content").html("<br /><p style=\"color:#e03030;font-weight:bold;\">Internal error. Please contact software provider.</p>");}
$(".topmenuitm").css({'background-color':''});
$(this).css({'background-color':'#E07530'});});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$(".msch,.sch,.parimg").hide();
$("body").css({'overflow-y':'auto'});
$("#content").html("");
$("#content").css({'min-height':$(window).height()-$('.intheader').height()-$('#topmenu').height()-25});
$(".topmenuitm").css({'background-color':''});
$(".flwchrt:first").css({'background-color':'#E07530'});
$("#content").attr("name",$(".flwchrt:first").attr("id"));

FlowChartCont();
datetimeElementsinit();


//$(".msch,.sch,.parimg").load(function(){
$(".msch,.sch,.parimg").on("load", function(){
   	$(this).removeAttr("width").removeAttr("height").css({width:"",height:""}); 
	//$(this).width($("#content").width());
	$("#content").css({'min-height':Math.max($(window).height()-$('.intheader').height()-$('#topmenu').height()-25,$(this).height())});
	$(this).css({'top':$("#content").height()*0.5-$(this).height()*0.5+50});
	$(".msch").show();
});
$("img").each(function() {
    var src = $(this).attr('src');
    $(this).attr('src', '');
    $(this).attr('src', src);
});

FlwChrtPrms();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//setTimeout(function(){location.reload(true);},3600000);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
setTimeout(function(){$("#WaitBlock").remove();},3000);
