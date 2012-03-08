 //RMP(Revealing Module Pattern) approach utilized here //FlipCalendar is module with public API,declared within return{} statement FlipCalendar = (function(){		/*main function for rerendering current month        it fills in already rendered <td> elements with actual month day numbers,        shifting them according what day of week month begins        */        var _rerenderMonth =  function (d) {            var tempDate = new Date(d.getFullYear(),d.getMonth(),0);            var monthStart = tempDate.getDay();                        var daysInMonth = 32 - new Date(d.getFullYear(),d.getMonth(),32).getDate();                        //cleanup td's            for (var c = 1;c<43;c++){                document.getElementById('td'+ c).innerHTML='';            }                        //fill in td's            monthStart=monthStart+1;                        //cleanup 'next' and 'prev' attributes            for (var p = 1 ; p < 43 ; p++ ){                document.getElementById('td'+ p).removeAttribute('prev');                document.getElementById('td'+ p).removeAttribute('next');            }                        for (var i = 1;i<daysInMonth+1;i++){                 document.getElementById('td'+ ++monthStart).innerHTML=i;            }                        //reinit after previous loop            monthStart=tempDate.getDay();                        //style cleanup            for (var c = 1;c<42;c++){                document.getElementById('td'+ c).className='';            }			            document.getElementById('td'+ (parseInt(d.getDate())+monthStart+1)).className='selected-day';                        _buildBoundaryMonths(d,monthStart);                    };                var selectDay = function(day,calInvoker){            for (var i = 1;i<42;i++){                if (document.getElementById('td'+i).className=='selected-day'){                        document.getElementById('td'+i).className='';                }                    if (i==(day.substr(2,day.length-1))){                        document.getElementById(day).className='selected-day';                    }            }                        var year = document.getElementById('actual-year').value;            var month = document.getElementById('actual-month').value;            var monthDay = document.getElementById(day).innerHTML;                        var d1;                        if (document.getElementById(day).getAttribute('prev')){                d1 = new Date(document.getElementById('actual-year').value,month-1,document.getElementById(day).innerHTML);                _rerenderMonth(d1);            } else if (document.getElementById(day).getAttribute('next')){                if (month==11){                    d1 = new Date(parseInt(document.getElementById('actual-year').value)+1,0,document.getElementById(day).innerHTML);                    _rerenderMonth(d1);                } else {                    d1 = new Date(document.getElementById('actual-year').value,parseInt(month)+1,document.getElementById(day).innerHTML);                    _rerenderMonth(d1);                    }                } else {                    d1 = new Date(year,month,monthDay);                }                        _buildDate(d1);			_setDateToInput(calInvoker,d1);        }				var _setDateToInput = function(input,date){			input.value=date.getDate()+" "+_indToMonthConverter(date.getMonth())+" "+date.getFullYear();		}		        var _buildDate = function(d){            var month = document.getElementById('actual-month').value;            var year = document.getElementById('actual-year').value;                        document.getElementById('actual-year').value= d.getFullYear();            document.getElementById('actual-month').value= d.getMonth();            document.getElementById('actual-day').value= d.getDate();            document.getElementById('month-holder').innerHTML = _indToMonthConverter(d.getMonth());            document.getElementById('year-holder').innerHTML = d.getFullYear();			//TEMP comment to ignore right part of calendar            //document.getElementById('day-name').innerHTML = _indToDayConverter(d.getDay());         }                //render grayed number for months after and/or before current in free <td> placeholders        var _buildBoundaryMonths = function(d,monthStart){            //days for previous month            var prevMonth = d.getMonth()-1;            if (prevMonth == -1){                prevMonth = 11;                var prevDate = new Date(parseInt(d.getFullYear())-1,prevMonth);            }                        var prevDate = new Date(parseInt(d.getFullYear()),prevMonth);                        var daysInPrevMonth = 32 - new Date(prevDate.getFullYear(),prevDate.getMonth(),32).getDate();                        monthStartTemp = monthStart+1;            var margin = daysInPrevMonth-monthStart;                        for (var i = daysInPrevMonth ; i > margin-1, monthStartTemp > 0 ; i--){                    document.getElementById('td'+ monthStartTemp).innerHTML = i;                    document.getElementById('td'+ monthStartTemp).className = 'boundary-month';                    //new attr provided,because classname may be unstable                    document.getElementById('td'+ monthStartTemp).setAttribute('prev',true);                    --monthStartTemp;            }                        //days for next month            monthStart = monthStart+1            var daysInCurMonth = 32 - new Date(d.getFullYear(),d.getMonth(),32).getDate();            var mar = 43 - daysInCurMonth;            var t = 0;            for (var y = daysInCurMonth+monthStart + 1;y < 43;y++) {                document.getElementById('td'+ y).innerHTML = ++t;                document.getElementById('td'+ y).className='boundary-month';                //new attr provided,because classname may be unstable                document.getElementById('td'+ y).setAttribute('next',true);            }        }			var _generateHTML = function(calInvoker){		var generalContainer = document.getElementById('container');				if (generalContainer!=null){			generalContainer.setAttribute('style','margin-top:'+parseInt(calInvoker.offsetTop+10)+'px;margin-left:'+calInvoker.offsetLeft);		} else { 			var generalContainer = document.createElement('div');			generalContainer.setAttribute('id','container');			generalContainer.setAttribute('class','general-container');						//set Calendar offset absolutely almost the same) as invoker position			generalContainer.setAttribute('style','margin-top:'+parseInt(calInvoker.offsetTop+10)+'px;margin-left:'+calInvoker.offsetLeft);						var form = document.createElement('form');			generalContainer.appendChild(form);			var div = document.createElement('div');			var table = document.createElement('table');			var topDiv = document.createElement('div');			var yearMonthDiv = document.createElement('div');			var monthBackDiv = document.createElement('div');			var monthForwardDiv = document.createElement('div');			table.setAttribute('id','calend');			table.setAttribute('class','calendar-subcontainer');			table.setAttribute('cellspacing','0');			table.setAttribute('cellpadding','3');						monthBackDiv.setAttribute('id','month-back');			monthBackDiv.setAttribute('class','month-updater generic-arrow decr-arrow');						monthForwardDiv.setAttribute('id','month-forward');			monthForwardDiv.setAttribute('class','month-updater generic-arrow incr-arrow');						yearMonthDiv.setAttribute('class','month-year-caption');						topDiv.appendChild(monthBackDiv);			topDiv.appendChild(yearMonthDiv);			topDiv.appendChild(monthForwardDiv);						var monthCaption = document.createElement('span');			var monthInput = document.createElement('input');			var yearCaption = document.createElement('span');			var yearInput = document.createElement('input');			monthCaption.setAttribute('id','month-holder');			monthInput.setAttribute('id','month-input');			monthInput.setAttribute('class','hidden');			yearCaption.setAttribute('id','year-holder');			yearInput.setAttribute('id','year-input');			yearInput.setAttribute('class','hidden');						yearMonthDiv.appendChild(monthCaption);			yearMonthDiv.appendChild(monthInput);			yearMonthDiv.appendChild(yearCaption);			yearMonthDiv.appendChild(yearInput);						for (var i = 0;i < 7;i++){				var tr = document.createElement('tr');				table.appendChild(tr);					for (var y = 0;y < 7;y++) {						var td = document.createElement('td');						tr.appendChild(td);							if (i > 0) {								td.setAttribute('id','td'+parseInt((i-1)*6+(i+y)));							} 							td.setAttribute('class','day-cell');					}			}								div.setAttribute('id','subcontainer');			div.setAttribute('class','calendar-container gradient');			div.appendChild(topDiv);			div.appendChild(table);			form.appendChild(div);						document.getElementsByTagName("body")[0].appendChild(generalContainer);			//calInvoker.parentNode.insertBefore( generalContainer, calInvoker.nextSibling );								var inputHiddenDate = document.createElement('input');			inputHiddenDate.setAttribute('type','hidden');			inputHiddenDate.setAttribute('id','actual-date');						var inputHiddenYear = document.createElement('input');			inputHiddenYear.setAttribute('type','hidden');			inputHiddenYear.setAttribute('id','actual-year');						var inputHiddenMonth = document.createElement('input');			inputHiddenMonth.setAttribute('type','hidden');			inputHiddenMonth.setAttribute('id','actual-month');						var inputHiddenDay = document.createElement('input');			inputHiddenDay.setAttribute('type','hidden');			inputHiddenDay.setAttribute('id','actual-day');						form.appendChild(inputHiddenDate);			form.appendChild(inputHiddenYear);			form.appendChild(inputHiddenMonth);			form.appendChild(inputHiddenDay);						_monthsIncrDecrListener(monthBackDiv,monthForwardDiv);		}				}		var _monthsIncrDecrListener = function(monthBackDiv,monthForwardDiv) {			if (typeof window.addEventListener === 'function'){						(function(monthBackDiv){							monthBackDiv.addEventListener('click',function(){								FlipCalendar.changeMonth('decr');						})						})(monthBackDiv);						(function(monthForwardDiv){							monthForwardDiv.addEventListener('click',function(){								FlipCalendar.changeMonth('incr');						})						})(monthForwardDiv);					}	}				    var dateInit = function(calInvoker) {				_generateHTML(calInvoker);				//first browser run			if (calInvoker.value == '') {				var d = new Date();				_setDateToInput(calInvoker,d);			}			// read Date from input			// TODO add validation to date input,that date never be as "Invalid Date"			var dateFromInput = calInvoker.value.split(' ');						var day = dateFromInput[0];            var month = _monthToIndConverter(dateFromInput[1]);			var year = dateFromInput[2];						var d = new Date(year,month,day);			            document.getElementById('year-holder').innerHTML = year;            document.getElementById('month-holder').innerHTML = _indToMonthConverter(month);                        document.getElementById('subcontainer').style.display='';						document.getElementById('actual-year').value = year;            document.getElementById('actual-month').value = month;            document.getElementById('actual-day').value = day;            _rerenderMonth(d);                //move to method            var tempDate = new Date(year,month,0);            var monthStart = tempDate.getDay();            document.getElementById('td'+parseInt(d.getDate()+monthStart+1)).className='selected-day';            var day = document.getElementById('actual-day').value;						//listeners				var td;				for (var t=1;t<43;t++){				td = document.getElementById('td'+t);				if (typeof window.addEventListener==='function'){				(function(t){						t.onclick = function(){						selectDay(t.id,calInvoker);						document.getElementById('container').style.display='none';					}					})(td);				}}								var month = document.getElementById('month-holder');				var monthInput = document.getElementById('month-input');				var year = document.getElementById('year-holder');				var yearInput = document.getElementById('year-input');				if (typeof window.addEventListener==='function'){					(function(month,monthInput,year,yearInput){						//TODO refactor year and month listeners to one common function							month.addEventListener('click',function(){								 document.getElementById('month-holder').style.display = 'none';								 document.getElementById('month-input').style.display = 'block';								 var monthNumber = _monthToIndConverter(document.getElementById('month-holder').innerHTML);								 document.getElementById('month-input').value = monthNumber;								 monthInput.focus();						})						monthInput.addEventListener('blur',function(){								 document.getElementById('month-holder').style.display = 'block';								 document.getElementById('month-input').style.display = 'none';								 var monthName = _indToMonthConverter(document.getElementById('month-input').value);								 document.getElementById('month-holder').innerHTML = monthName;								 document.getElementById('actual-month').value = document.getElementById('month-input').value;								 _rerenderMonth(new Date(document.getElementById('actual-year').value,document.getElementById('actual-month').value,document.getElementById('actual-day').value));						})								 year.addEventListener('click',function(){								 document.getElementById('year-holder').style.display = 'none';								 document.getElementById('year-input').style.display = 'block';								 document.getElementById('year-input').value = document.getElementById('year-holder').innerHTML;								 yearInput.focus();						})						yearInput.addEventListener('blur',function(){								 document.getElementById('year-holder').style.display = 'block';								 document.getElementById('year-input').style.display = 'none';								 document.getElementById('actual-year').value = document.getElementById('year-input').value;								  document.getElementById('year-holder').innerHTML = document.getElementById('year-input').value;								 _rerenderMonth(new Date(document.getElementById('actual-year').value,document.getElementById('actual-month').value,document.getElementById('actual-day').value));						})						})(month,monthInput,year,yearInput)				}    }            var _indToDayConverter = function(ind){		return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][ind];	}	    var _indToMonthConverter  = function(ind){		ind = parseInt(ind);			return ['January','February','March','April','May','June','July','August','September','October','November','December'][ind];    }        var _monthToIndConverter = function(month){        switch(month)  {            case 'January': return 0;                break;            case 'February': return 1;                break;            case 'March': return 2;                break;            case 'April': return 3;                break;            case 'May': return 4;                break;            case 'June': return 5;                break;            case 'July': return 6;                break;            case 'August': return 7;                break;            case 'September': return 8;                break;            case 'October': return 9;                break;            case 'November': return 10;                break;            case 'December': return 11;                break;            }    }   var changeMonth = function(operator){         var month = document.getElementById('actual-month').value;         var year = document.getElementById('actual-year').value;         var day = document.getElementById('actual-day').value;                  var monthHolder = document.getElementById('month-holder').innerHTML;         var yearHolder = document.getElementById('year-holder').innerHTML;         var actualYear = document.getElementById('actual-year').value;         var actualMonth = document.getElementById('actual-month').value;                  var d;             if (operator == 'decr'){                if (month == 0){                    actualMonth = 11;                    actualYear = parseInt(year) - 1;                    monthHolder = _indToMonthConverter(11);                    yearHolder = actualYear;                    d = new Date(yearHolder,_monthToIndConverter(monthHolder),day);                    _rerenderMonth(d);                    _buildDate(d);                    //avoid additional re-flip                    if (day!=d.getDate()){                        //top1(day,d.getDate());                    }                    } else {                    actualMonth = parseInt(month) - 1;                    monthHolder = _indToMonthConverter(actualMonth);                    d = new Date(yearHolder,_monthToIndConverter(monthHolder),day);                                        // last-last rule,when change month width different length,                    // example: incr. Jan31 --> got Feb28(or Feb 29 in leap year) instead of March2                    var daysInMonth = 32 - new Date(d.getFullYear(),actualMonth,32).getDate();                        if (daysInMonth<day){                        d = new Date(yearHolder,_monthToIndConverter(monthHolder),daysInMonth);                    }                    //last-last rule END                    _rerenderMonth(d);                    _buildDate(d);                    if (day!=d.getDate()){                        //top1(day,d.getDate());                    }                }             } else if (operator == 'incr'){                if (month == 11){                    actualMonth = 0;                    actualYear = parseInt(year) + 1;                    monthHolder = _indToMonthConverter(0);                    yearHolder = actualYear;                    d = new Date(yearHolder,_monthToIndConverter(monthHolder),day);                    _rerenderMonth(d)                    _buildDate(d);                    if (day!=d.getDate()){                        //top1(day,d.getDate());                    }                } else {                        actualMonth = parseInt(month) + 1;                        monthHolder = _indToMonthConverter(actualMonth);                        d = new Date(yearHolder,_monthToIndConverter(monthHolder),day);                                                // last-last rule,when change month width different length,                        // example: incr. Jan31 --> got Feb28(or Feb 29 in leap year) instead of March2                        var daysInMonth = 32 - new Date(d.getFullYear(),actualMonth,32).getDate();                            if (daysInMonth<day){                            d = new Date(yearHolder,_monthToIndConverter(monthHolder),daysInMonth);                        }                        //last-last rule END                        _rerenderMonth(d);                        _buildDate(d);                        if (day!=d.getDate()){                            //top1(day,d.getDate());                        }                    }                 }         }		//attach calendar component to specific invoker element		var placeholder = function(className){			var elems = document.getElementsByClassName(className);			if (typeof window.addEventListener==='function'){				for (var i=0;i<elems.length;i++){						(function(i){								elems[i].addEventListener('click',function(){								FlipCalendar.init(elems[i]);							});							})(i);						}				}		}		//here public methods declared according to RMP				return {			init:dateInit,			//define as is,without renaming			//top1:top1,			selectDay:selectDay,			changeMonth:changeMonth,			placeholder:placeholder		}})();