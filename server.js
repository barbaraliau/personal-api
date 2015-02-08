var express = require('express'),
		bodyParser = require('body-parser');

var app = express();
var port = 9020;

var user = {
		name: "Joe Sandwiches",
		location: "Seattle, WA",
		hobbies: ["swimming", "running", "jumping", "other stuff"],
		occupations: ["pizza delivery boy", "lifeguard", "monkey sign holder", "airplane pilot"],
		mentions: ["www.google.com/awesomeppl", "www.idonntknow.com", "www.thisiscool.com/stuff"],
		references: [{name: "Sally"}, {name: "Bobby"}, {name: "Person"}],
		skills: [
						{
							id: 1,
							name: 'Javascript',
							experience: 'Intermediate'
						},
						{
							id: 2,
							name: 'CSS',
							experience: 'Advanced'
						}
					]
}




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
	res.type('application/json');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/name', function(req, res){
	res.json(user.name);
})

app.get('/location', function(req, res){
	res.json(user.location);
})

app.put('/location', function(req, res){
	user.location = req.body;
	res.json(user.location); 
})

app.get('/hobbies', function(req, res){
	res.json(user.hobbies);
})

app.get('/occupations', function(req, res){
	if(req.query.order === 'desc'){
		res.json(user.occupations.reverse());
	} else if (req.query.order === 'asc'){
		res.json(user.occupations.sort());
	}else {	
		res.json(user.occupations);
		}
})

app.get('/occupations/latest', function(req, res){
	res.json(user.occupations[user.occupations.length-1]);
})

app.get('/mentions', function(req, res){
	res.json(user.mentions)
})

app.post('/mentions', function(req, res){
	user.mentions.push(req.body.story);
	res.json(user.mentions);
});

app.get('/references', function(req, res){
	res.json(user.references);
})

app.post('/references', function(req, res){
	user.references.push(req.body);
	res.json(user.references);
})

app.get('/skills', function(req, res){
	var skillSetSorter = function(level){
		var skillSet = [];
		for (var i = 0; i < user.skills.length; i++) {
				if (user.skills[i].experience === level) {
					skillSet.push(user.skills[i])
				}
		}
		return skillSet;
	};
	
	if(req.query.experience === 'intermediate'){
		var getSkills = skillSetSorter('Intermediate');
		res.json(getSkills); 
	} 
	if(req.query.experience === 'advanced'){
		var getSkills = skillSetSorter('Advanced');
		res.json(getSkills); 
	}
	if(req.query.experience === 'beginner'){
		var getSkills = skillSetSorter('Beginner');
		res.json(getSkills); 
	}
	else {
		res.json(user.skills);
	}
	
})

app.post('/skills', function(req, res){
	user.skills.push(req.body);
	res.json(user.skills);
})




app.listen(port);

