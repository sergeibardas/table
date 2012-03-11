var FieldMultiplier = function(locator,limit){
	$('.'+locator).click(function(){
	 var container = $(this).parent();
	 var noOfInputs = container.children('input').length;
		 if (noOfInputs < limit){
				$(this).show();
				var styleClass = $(this).prev().attr('class');
				$(this).after("<span class='remover'/>");
				$(this).after('<input class='+styleClass+'>'+'</input>');
				$(this).after("<label class='form-label'>.</span>");
			} else {
				$(this).hide();
			}
		})
		
		$('.remover').live('click',function(){
				$(this).parent().children('.'+locator).show();
				$(this).prev().remove();
				$(this).prev().remove();
				$(this).remove();
			})
}