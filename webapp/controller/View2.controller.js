sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"infy/fin/ap/util/formatter",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, MessageBox, MsgToast, Formatter, Fragment, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("infy.fin.ap.controller.View2", {
		formatter: Formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf infy.fin.ap.view.View2
		 */
		onInit: function() {
			this._oRoute = this.getOwnerComponent().getRouter();
			//1. whenever route changes trigger a code
			this._oRoute.getRoute("detail").attachMatched(this.herculis, this);
			//this._Route.attachRoutrePatternMatched(this.herculis, this);
		},
		herculis: function(oEvent){
			//MsgToast.show("aa gaya-herculis was triggered");
			//this-->refer to controller object
	
			var sIndex = oEvent.getParameter("arguments").anubhav;
			var sPath = '/fruits/' + sIndex;
			this.getView().bindElement(sPath);
		},
		onBack: function() {
			//step 1: get the object of the parent control
			var oParent = this.getView().getParent();
			//step 2: navigate to view 1
			oParent.to("idView1");
		},
		selectedInputFieldId: "",
		oDialog: null,
		onConfirm:function(oEvent) {
			var selectedItems = oEvent.getParameter("selectedItems");
			if(selectedItems){
				var aFilter = [];
				for (var i=0; i<selectedItems.length; i++) {
					var sValue = selectedItems[i].getLabel();
					aFilter.push(new Filter("name", FilterOperator.EQ, sValue));
				}
				var oFilter = new Filter({
					filters: aFilter,
					and:false
				});
				this.getView().byId("idTable").getBinding("items").filter([oFilter]);
			}else{
				var oSelectedItem = oEvent.getParameter("selectedItem");
				var sTitle = oSelectedItem.getLabel();
				sap.ui.getCore().byId(this.selectedInputFieldId).setValue(sTitle);
			}
			
		},
		_filterPopup: null,
		onFilter: function(oEvent){
			var that = this;
			if(!this._filterPopup){
				Fragment.load({
					name: 'infy.fin.ap.fragements.popup',
					controller: this
				}).then(function(oDialog){
					that._filterPopup =	oDialog;
					that._filterPopup.bindAggregation("items",{
						path: '/suppliers',
						template: new sap.m.DisplayListItem({
							label: '{name}',
							value: '{contactPerson}'
						})
					});
					that._filterPopup.setTitle("Suppliers");
					that.getView().addDependent(that._filterPopup);
					that._filterPopup.open();
				});
			}else{
				that._filterPopup.open();
			}
		},
		onItemPress: function(){
		/*	//TODO: Navigate to next view*/
			this.getView().getParent().getParent().toDetail("idView3");
		},
		onF4Help: function(oEvent) {
			var oControl = oEvent.getSource();
			this.selectedInputFieldId = oControl.getId();
			//check if already the dialog box is created
			var that = this;
			if (!this.oDialog) {
				// this.oDialog = new sap.ui.xmlfragment("infy.fin.ap.fragements.popup", this);
				// this.oDialog.bindAggregation("items",{
				// 	path: '/cities',
				// 	template: new sap.m.DisplayListItem({
				// 		label: '{name}',
				// 		value: '{otherName}'
				// 	})
				// });
				// this.getView().addDependent(this.oDialog);
				// this.oDialog.open();
				Fragment.load({
					name: 'infy.fin.ap.fragements.popup',
					controller: this
				}).then(function(oDialog) {
					oDialog.open();
					that.getView().addDependent(oDialog);
					oDialog.setTitle("Welcome to Fragment");
					oDialog.bindAggregation("items", {
						path: '/cities',
						template: new sap.m.DisplayListItem({
							label: '{name}',
							value: '{otherName}'
						})
					});
					that.oDialog = oDialog;
				});
			} else {
				this.oDialog.open();
			}

			//MsgToast.show(oControl.getValue());
		},
		onApprove: function() {
				MessageBox.confirm("Do you want to approve the value?", {
					title: "Instead using alert we use MsgBox",
					onClose: function(Status) {
						if (Status === 'OK') {
							MsgToast.show("Your order has been approved successfully");
						} else if (Status === 'CANCEL') {
							MessageBox.error("You have rejected it");
						} else {
							MessageBox.error("You have rejected it");
						}
					}
				});
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf infy.fin.ap.view.View2
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf infy.fin.ap.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf infy.fin.ap.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});