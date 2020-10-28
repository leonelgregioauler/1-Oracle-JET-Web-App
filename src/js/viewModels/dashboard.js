/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(["accUtils",
        "knockout",
        'jquery',
        "ojs/ojarraydataprovider",
        "ojs/ojlabel",
        "ojs/ojselectsingle",
        'ojs/ojchart',
        'ojs/ojlistview'
], function (accUtils, ko, $, ArrayDataProvider) {
  function DashboardViewModel() {
    var self = this;

    var url = "js/store_data.json";  //defines link to local data file
    self.activityDataProvider = ko.observable();  //gets data for Activities list
    // Get Activities objects from file using jQuery method and a method to return a Promise
    $.getJSON(url).then(function(data) {
        // Create variable for Activities list and populate using key attribute fetch
        var activitiesArray = data;
        self.activityDataProvider(new ArrayDataProvider(activitiesArray, { keyAttributes: 'id' }));
      }
    );
    
    // chart type values array and ArrayDataProvider observable
    var types = [
      { value: "pie", label: "Pie" },
      { value: "bar", label: "Bar" },
      { value: "line", label: "Line" },
    ];
    self.chartTypes = new ArrayDataProvider(types, { keyAttributes: "value" });
    // chart selection observable and default value
    self.val = ko.observable("pie");

    // chart data array and  ArrayDataProvider observable
    var chartData = [
      { "id": 0, "series": "Baseball", "group": "Group A", "value": 42 },
      { "id": 1, "series": "Baseball", "group": "Group B", "value": 34 },
      { "id": 2, "series": "Bicycling", "group": "Group A", "value": 55 },
      { "id": 3, "series": "Bicycling", "group": "Group B", "value": 30 },
      { "id": 4, "series": "Skiing", "group": "Group A", "value": 36 },
      { "id": 5, "series": "Skiing", "group": "Group B", "value": 50 },
      { "id": 6, "series": "Soccer", "group": "Group A", "value": 22 },
      { "id": 7, "series": "Soccer", "group": "Group B", "value": 46 }
    ];

    self.chartDataProvider = new ArrayDataProvider(chartData, { keyAttributes: 'id' });  

    self.connected = function () {
      accUtils.announce("Dashboard page loaded.", "assertive");
      document.title = "Dashboard";
      // Implement further logic if needed
    };

    self.disconnected = function () {
      // Implement if needed
    };

    self.transitionCompleted = function () {
      // Implement if needed
    };
  }

  return DashboardViewModel;
});
