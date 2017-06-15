module.exports = function(Competition) {
	Competition.addRegister = function(UserId, CompetitionId, cb){
		Competition.findOne({where:{id: CompetitionId}},
			function(err,instance){
				if(instance===null){
					cb(null,null);
				}else{
					data = instance['register']; //get everyone who has like this Competition
					theRegistersNow = data.toString();
					//if UserId has like this Competition
					if(theRegistersNow.includes(UserId)){
						cb(null,instance);
					}
					//if this is the first Competition he see
					else if(theRegistersNow === ''){
						theRegistersNow = UserId;
						Competition.updateAll({id: CompetitionId}, {register: theRegistersNow}, //update
						function(err,info){
							Competition.findOne({where:{id: CompetitionId}},
								function(err,instance){
									if(instance===null){
										cb(null,null);
									}else{
										cb(null,instance);
									}
								})
						});
					}
					//it's only the last Competition he's seen
					else{
						theRegistersNow = theRegistersNow + ',' + UserId;
						Competition.updateAll({id: CompetitionId}, {register: theRegistersNow}, //update
						function(err,info){
							Competition.findOne({where:{id: CompetitionId}},
								function(err,instance){
									if(instance===null){
										cb(null,null);
									}else{
										cb(null,instance);
									}
								})
						});
					}
				}				
			});
	};


	Competition.remoteMethod(
		'addRegister',
		{
			accepts: [
					{arg: 'UserId', type: 'string'},
					{arg: 'CompetitionId', type: 'string'}
					],
			returns: {arg: 'register', type: 'string', root: true},
			http: {path: '/addRegister', verb: 'put'}
		}
	);

var schema_v1 = {
  "name": "competition",
  "options": {
    "idInjection": false,
    "mysql": {
      "schema": "Compose",
      "table": "COMPETITION"
    }
  },
  "properties": {
    "id": {
      "type": "string",
      "length": 50,
      "id": true
    },
    "comp_name": {
      "type": "string",
      "length": 50,
      "required": true
    },
    "comp_fee": {
      "type": "number",
      "length": 50,
      "required": true
    },
    "comp_regulation": {
      "type": "string",
      "length": 50,
      "required": true
    },
    "comp_type": {
      "type": "string",
      "length": 50,
      "required": true
    },
    "comp_location": {
      "type": "string",
      "length": 50
    },
    "comp_finish": {
      "type": "string",
      "length": 50
    },
    "comp_start": {
      "type": "string",
      "length": 50
    },
    "register": {
      "type": "string",
      "length": 50
    },
    "comp_notes": {
      "type": "string",
      "length": 50
    },
    "comp_teams": {
      "type": "string",
      "length": 50
    },
    "comp_award": {
      "type": "string",
      "length": 50
    }
  }
};

	var ds = Model.app.dataSources.mysql;

	ds.createModel(schema_v1.name, schema_v1.properties, schema_v1.options);

	ds.automigrate(function () {
	  ds.discoverModelProperties('COMPETITION', function (err, props) {
	    console.log(props);
	  });
	});

};






