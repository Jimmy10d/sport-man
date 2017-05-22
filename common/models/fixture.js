'use strict';

module.exports = function(Fixture) {
	Fixture.getMatches = function(fixtureNumber, cb){
		var FixtureMatches = Fixture.app.models.Match;
		var matchesResult = [];
		FixtureMatches.find({where: {fixture_number: fixtureNumber}},
			function (err,instance){
				if (instance===null){
					cb(null,null);
				}else {
					matchesResult = instance;
					cb(null,matchesResult);
				}
			});

	};

	Fixture.remoteMethod(
		'getMatches',
		{
			accepts: {arg: 'fixtureNumber', type: 'string'},
			returns: {arg: 'matches', type: 'string', root: true},
			http: {path: '/getMatches', verb: 'get', source: 'query'},
			description: "Get matches instance by fixture number"
		}
	);
};


