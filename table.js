var storage = window.localStorage;

$(document).ready(function(){
		FlipCalendar.placeholder('dob');
		Autocomplete.init();
		CoreTable();
		Table.fetchDataFromStorage();
		
		FieldMultiplier('multiplier',5);
		
		$('td input').on('click',function(){
			var personData = Table.fetchDataById(this.id);
			storage.setItem('currentId',this.id);
			Table.fillForm(personData);
			//FieldMultiplier('multiplier',5);
			$("#dialog").dialog({ modal:true,title:'Редактировать пользователя',minWidth:600});	
		})
		
		$('#add-person').on('click',function(){
			$('.edit-person').val('добавить');
			Table.resetForm();
			//FieldMultiplier('multiplier',5);
				$("#dialog").dialog({ modal:true,title:'Добавить пользователя',minWidth:600});	
		})
		
		$('.edit-person').on('click',function(){
			Table.adder();
		})
		
		//default sorting is ASC by Name
		$("#main-table").tablesorter( {sortList: [[0,0]]} ); 
})

var Table = {

resetForm:function(){
	$('.namesur').val('');
	$('.age').val('');
	$('.salary').val('');
	$('.phone').val('');
	$('.mail').val('');
	$('.www').val('');
	$('.dob').val('');
	$('.autocompl-component').text('');
	$('.descr').val('');
},

fillForm:function(personData){
	$('.namesur').val(personData.namesur);
	$('.age').val(personData.age);
	$('.salary').val(personData.salary);
	//$('.phone').val(personData.phone);
	//$('.mail').val(personData.mail);
	//$('.www').val(personData.www);
	this.arrayFieldFiller(personData.phone,'phone');
	this.arrayFieldFiller(personData.mail,'mail');
	this.arrayFieldFiller(personData.www,'www');
	$('.dob').val(personData.dob);
	$('.autocompl-component').text(personData.city);
	$('.descr').val(personData.descr);
},

arrayFieldFiller:function(fields,css){
	for (var i = 0; i < fields.length; i++){
		if(i==0){
			$('.'+css).val(fields[i]);
		}else {
			var styleClass = $('.'+css).prev().attr('class');
			$('.'+css).last().after('<label class='+styleClass+'>.</label><input class='+css+' value='+fields[i]+'></input>');
		}
	}
},
 
fetchDataById:function(id) {
		return $.parseJSON(storage.getItem('personData'+id));
},

initializeID:function() {
  var lastID = localStorage.getItem('lastID');
  if ( lastID == null ) {
	lastID = 0; 
    localStorage.setItem( 'lastID',lastID);
  } else {
		localStorage.setItem( 'lastID',++lastID);
  }
  return lastID;
},

adder:function(){
	if (storage!=null){
		var phones = new Array();
		var mails = new Array();
		var wwws = new Array();
		
		$('.phone').each(function(i) {
				phones[i] =  $(this).val();
		});
		$('.mail').each(function(i) {
				mails[i] =  $(this).val();
		});
		$('.www').each(function(i) {
				wwws[i] =  $(this).val();
		});	
			
		var personData = {
			'namesur':$('.namesur').val(),
			'age':$('.age').val(),
			'salary':$('.salary').val(),
			'phone':phones,
			'mail':mails,
			'www':wwws,
			'dob':$('.dob').val(),
			'descr':$('.descr').val(),
			'city':$('.autocompl-component').text(),
			'id':(storage.getItem('currentId')=="") || (storage.getItem('currentId')==null)?this.initializeID():storage.getItem('currentId')
		}
		
		storage.setItem('currentId',null);
			
		var data = JSON.stringify(personData);
		storage.setItem('personData'+personData.id,data);
		this.appendTable(data);
		//totally shit
		location.reload(true);
		$('#dialog').dialog('close');
	}
},

fetchDataFromStorage:function(){
 for (var i=0;i<storage.length;i++){
		if (storage.getItem('lastID')!=null && storage.key(i).indexOf('personData')!=-1){
					this.appendTable(storage.getItem(storage.key(i)));
		}
	}
},

appendTable:function(storageData){
	var item = $.parseJSON(storageData);
	$('#main-table').last().append('<tr></tr>');
	this.renderCell(item.namesur);
	this.renderCell(item.age);
	this.renderCell(item.salary);
	this.renderCell(item.phone);
	this.renderCell(item.mail);
	this.renderCell(item.www);
	this.renderCell(item.dob);
	this.renderCell(item.city);
	this.renderCell(item.descr);
	$('#main-table tr').last().append("<td><input type='button' value='edit' id="+item.id +"></td>");
},

renderCell:function(itemProperty){
	$('#main-table tr').last().append('<td></td>');
	if (itemProperty instanceof Array) {
		for (i in itemProperty){
			$('#main-table td').last().append(itemProperty[i]).append(',');
		}
			} else {
		$('#main-table td').last().append(itemProperty);
	}
}

}
