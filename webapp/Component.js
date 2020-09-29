sap.ui.define(
	["sap/ui/core/UIComponent"],
	function(UIComponent){
		return UIComponent.extend("infy.fin.ap.Component",{
			metadata:{
				manifest: "json"
			},
			init: function(){
				sap.ui.core.UIComponent.prototype.init.apply(this);
				var oRouter = this.getRouter();
				oRouter.initialize();
			},
			// createContent: function(){
			// 	//Step 1: Create object of our app view
			// 	//this has an app container object inside
			// 	var oAppView = new sap.ui.view({
			// 		id: "idApp",
			// 		type: "XML",
			// 		viewName: "infy.fin.ap.view.App"
			// 	});
			// 	//Step 2: Get the app container object from the view with its id
			// 	var oAppContainer = oAppView.byId("idAppCon");
			// 	//Step 3: instantiate/create both of our view objects
			// 	var oView1 = new sap.ui.view({
			// 		id: "idView1",
			// 		type: "XML",
			// 		viewName: "infy.fin.ap.view.View1"
			// 	});
			// 	var oView2 = new sap.ui.view({
			// 		id: "idView2",
			// 		type: "XML",
			// 		viewName: "infy.fin.ap.view.View2"
			// 	});
			// 	var oEmpty = new sap.ui.view({
			// 		id: "idEmpty",
			// 		type: "XML",
			// 		viewName: "infy.fin.ap.view.Empty"
			// 	});
			// 	var oView3 = new sap.ui.view({
			// 		id: "idView3",
			// 		type: "XML",
			// 		viewName: "infy.fin.ap.view.View3"
			// 	});
			// 	//Step 4: Add these newly created view objects inside the 
			// 	//Container Control
			// 	oAppContainer.addMasterPage(oView1);
			// 	oAppContainer.addDetailPage(oEmpty).addDetailPage(oView2).addDetailPage(oView3);
				
			// 	return oAppView;
			// },
			destroy: function(){
				
			}
		});
	}
);