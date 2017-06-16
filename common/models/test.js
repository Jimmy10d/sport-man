'use strict';

module.exports = function(Test) {
var schema_v1 = {
  "name": "test",
  "options": {
    "idInjection": false,
    "mysql": {
      "schema": "compose",
      "table": "TEST"
    }
  },
  "properties": {
    "id": {
      "type": "string",
      "length": 50,
      "id": true
    },
    "name": {
      "type": "string",
      "length": 50,
      "required": true
    },
    "address": {
      "type": "string",
      "length": 50,
      "required": true
    }
  }
};
	var loopback = require('loopback');
	// var app = loopback();
	// var DataSource = require('loopback-datasource-juggler').DataSource;
	// var mysqlds = new DataSource({
	// 	connector: require('loopback-connector-mysql'),
	// 	host: 'sl-us-south-1-portal.1.dblayer.com',
	// 	port: 17034,
	// 	database: 'compose',
	// 	username: 'admin',
	// 	password: 'DTNXDTJQNQXDYVAZ',
	// });
	// var Model = app.models();
	var ds = Test.app.dataSources.mysql;

	ds.createModel(schema_v1.name, schema_v1.properties, schema_v1.options);

	ds.automigrate(function () {
	  ds.discoverModelProperties('TEST', function (err, props) {
	    console.log(props);
	  });
	});

};
