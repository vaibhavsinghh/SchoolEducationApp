
	function populateForm(formContentJson)
	{
		var form		= document.forms['vm.studentFormForm'];
		try{
				var json = eval(formContentJson);
			}
			catch(err)
			{
				alert('That appears to be invalid JSON!')
				return false;
			}
		$(form).populate(json, {debug:1})
	}
