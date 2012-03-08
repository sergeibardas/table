var FieldMultiplier = function(locator,limit){
	$('.'+locator).click(function(){
	 var container = $(this).parent();
	 var noOfInputs = container.children('input').length;
	 
		 if (noOfInputs < limit){
				var styleClass = $(this).prev().attr('class');
				$(this).after("<input class='remover' value='-' />");
				$(this).after('<input class='+styleClass+'>'+'</input>');
				$(this).after("<label class='form-label'>.</span>");
			}
		})
		
		$('.remover').live('click',function(){
				$(this).prev().remove();
				$(this).prev().remove();
				$(this).remove();
			})
}