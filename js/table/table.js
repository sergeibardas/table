var Table = (function(){

var fields = ['namesur','age','salary','phone','mail','www','dob','city','descr'];
var storage = window.localStorage;

var init = function(){
		FlipCalendar.placeholder('dob');
		Autocomplete.init('#autocompl-component');
		Autocomplete.init('#autocompl-component-dialog');
		Sorter.init('#headers a');
		Filter.init('#filter-key','keyup',['namesur']);
		Filter.init('#city-filter','click',['city'],'#autocompl-component');
		FieldMultiplier('.multiplier',5);
		tablePopulator(storage,'personData');
		listenersInit();
		sortingInit();
};

var sortingInit = function(){
	//default sorting is ASC by Name
	$("#main-table").tablesorter( {sortList: [[0,0]]} ); 
};	

var listenersInit = function(){
	$('td a').click(function(){
		var personData = Storage.fetchDataById(storage,this.id);
		storage.setItem('currentId',this.id);
		fillForm(personData);
		$("#dialog").dialog({ modal:true,title:'Редактировать пользователя',minWidth:600});	
	})
	
	$('#add-person').click(function(){
		$('.edit-person').val('добавить');
		resetForm();
		$("#dialog").dialog({ modal:true,title:'Добавить пользователя',minWidth:600});	
	})
	
	$('.edit-person').click(function(){
		edit();
	})
	
	$('#filters-reset').click(function(){
		Filter.reset(['#filter-key','#autocompl-component'],['namesur','city']);
	})
};

var resetForm = function(){
var inputs = $('#person-form :input').not(':button');
	inputs.each(function(){
		$(this).val('');
	})
};

var fillForm = function(personData){
	$.each(fields,function(index,value) {
		//TODO make select for css class more stable and error prone
		if (personData[value] instanceof Array){
			arrayFieldFiller(personData[value],value);
		} else {
			$('.'+value).val(personData[value]);
		}
	})
	$('#autocompl-component-dialog').text(personData.city);
};

var arrayFieldFiller = function(fields,css){
	for (var i in fields){
		if(i==0){
			$('.'+css).val(fields[i]);
		}else {
			var styleClass = $('.'+css).prev().attr('class');
			$('.'+css).last().after('<label class='+styleClass+'>.</label><input class='+css+' value='+fields[i]+'></input>');
		}
	}
};

var edit = function(){
	if (storage!=null){
		var phones = new Array();
		var mails = new Array();
		var wwws = new Array();
			
		var personData = {};
			$.each(fields,function(index,value) {
				personData[value] = $('.'+value).val();
				
			})
			var curId = storage.getItem('currentId');
			personData['phone'] = arrayBuilder('.phone',phones);
			personData['mail'] = arrayBuilder('.mail',mails);
			personData['www'] = arrayBuilder('.www',wwws);
			personData['city'] = $('#autocompl-component-dialog').text();
			personData['id'] = (curId=="") || (curId==null)?Storage.initializeID():curId;
		
		storage.setItem('currentId',null);
			
		var data = JSON.stringify(personData);
		storage.setItem('personData'+personData.id,data);
		appendTable(data);
		//totally shit
		location.reload(true);
		$('#dialog').dialog('close');
	}
};

var arrayBuilder = function(locator,arr){
		$(locator).each(function(i) {
				arr[i] =  $(this).val();
		});
	return arr;
}

var tablePopulator = function(storage,dataPrefix){
var item = Storage.fetchDataFromStorage(storage,dataPrefix);
	for (i in item){
		appendTable( $.parseJSON(item[i]));
	}
};

var appendTable = function(item){
	$('#main-table').last().append('<tr></tr>');
	$.each(fields,function(index,value) {
		renderCell(item[value]);
	})
	$('#main-table tr').last().append("<td><a href='#' value='edit' id="+item.id +">редактировать</td>");
};

var renderCell = function(itemProperty){
	$('#main-table tr').last().append('<td></td>');
	if (itemProperty instanceof Array) {
		for (i in itemProperty){
			$('#main-table td').last().append(itemProperty[i]).append(',');
		}
			} else {
		$('#main-table td').last().append(itemProperty);
	}
};

	return {
		init:init
	}

})()
