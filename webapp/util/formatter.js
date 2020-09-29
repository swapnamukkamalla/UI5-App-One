sap.ui.define([],function(){
	return {
		getSatusQuo: function(status){
			switch (status) {
				case "Available":
					return "Success";
				case "Discontinued":
					return "Error";
				case "Out of Stock":
					return "Warning";
				default:
				return "ok";
			}
		}		
	}	;
});