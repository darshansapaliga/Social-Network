var Service = require('../models/Service'),
	Problem = require('../models/Problem');


/*
 |-----------------------------------------------------------
 | GET SERVICE
 |-----------------------------------------------------------
*/

exports.getServices = function(req, res){

	var response  = {};
	Service.find({category: req.categoryId}).exec(function(err, service){

		if(err)
			res(null, response = {err : err, code : "404" });

		if(service) {
			response.code = "200";
			response.data = service;
		}else {
			response.code = "400";
			response.data = null;
		}
		res(null, response);

	});
}

/*
 |-----------------------------------------------------------
 | GET SINGLE SERVICE
 |-----------------------------------------------------------
*/
exports.getSingleService = function(req, res){

	var response  = {};
	Service.findById(req.serviceId)
		.populate('problems')
		.exec(function(err, service){

			if(err)
				res(null, response = {err : err, code : "404" });

			if(service) {
				response.code = "200";
				response.data = service;
			}else {
				response.code = "400";
				response.data = null;
			}

			res(null, response);

	});


}




/*
 |-----------------------------------------------------------
 | ADD SERVICE
 |-----------------------------------------------------------
*/

exports.addService = function(msg, callback){

	var response  = {};

	User.findOne({email: msg.email}).exec(function(err, user) {

		if(err)
			callback(null, response = {err : err, code : "404" });

		servicesGroup.findOne({name: msg.servicesGroupName}, function(err, servicesGroup){

			if(err)
				callback(null, response = {err : err, code : "404" });

			var service = new Service({

			  name: msg.name,    //should be unique check and without spaces
			  description: msg.description,
			  moderator: user._id,
			  servicesGroup: msg.servicesGroup,
			  category: msg.category

			});

			service.save(function(err) {

				if (!err) {
				  response.code = "200";
				}else {
				  response.code = "404";
				}

			});

			callback(null, response);

		});
	});



}



/*
 |-----------------------------------------------------------
 | UPDATE SERVICE
 |-----------------------------------------------------------
*/

exports.updateService = function(req, res){


	//return response
	var response  = {},
		members = [];

	Service.findById(req.serviceId).exec(function(err, service){
		if(err)
			return err;

		if(!service)
			return (response.code = 404);

		service.name = req.name;
		service.address = req.address;
		service.contact = req.contact;
		service.description = req.description;

		members = service.members;
		members.push(req.membersToAdd);
		members = members;

		service.save(function(err){
			if(err)
				return (response.code = 404);
		});

		response.code = 200;
		response.data = service;
		res(null, response);

	}); //end of service find


}




/*
 |-----------------------------------------------------------
 | DELETE SERVICE
 |-----------------------------------------------------------
*/

exports.deleteService = function(req, res){


	var response  = {};
	Service.findOne({name: req.name}).exec(function(err, service){

		if(err)
			res(null, response = {err : err, code : "404" });

		if(service) {
			service.remove(function(err){
				if(err)
					res(null, response = {err : err, code : "404" });
			});
			response.code = "200";
		}else {
			response.code = "404";
			response.data = null;
			response.error = false;
		}
		res(null, response);
	});
}


exports.postUserProblem = function(req, res) {


	Service.find().exec(function(err, services){

		var response = {};
		var problem = new Problem({
			name: req.name,
			contact: req.contact,
			address: req.address,
			description: req.description,
			userId: req.userId,
			categoryId: req.categoryId
		});

		problem.save(function(err){
			if(err)
				res(null, (response.error = err) );
		});

		// for(var i=0; i<services.length; i++) {
		// 	services.specialization.find(function(specializationFound) {
		// 		        return specializationFound == req.specialization;
		// 		    }
		// }

		for(var i=0; i<services.length; i++) {
			for(var j=0; j<services[i].specialization.length; j++) {
				if(services[i].specialization[j] == req.specialization) {
					var problemToAdd = [], clientToAdd = [];
					problemToAdd = services[i].problems;
					clientToAdd = services[i].clients;

					problemToAdd.push(problem);
					clientToAdd.push(req.userId);
					services[i].problems = [], services[i].clients = [];
					services[i].problems = problemToAdd;
					services[i].clients = clientToAdd;
				}
			}
		}

		response.code = 200;
		response.data = problem;
		res(null, response);

	});

}


exports.getModeratorServices = function(req, res) {
	var response = {};

	Service.find({moderator: req.moderatorId}).exec(function(err, services){
		if(err)
			res(null, (response.error = err) );
		response.code = 200;
		response.data = services;
		res(null, response);
	});
}

exports.getServicesForApprovals = function(req, res) {
	var response = {};
	Service.find({approved: false}).exec(function(err, services) {
		if(err)
			return err;
		if(!services)
			return res(null, response.code = 404);

		response.code = 200;
		response.data = services;
		res(null, response);
	});
}


exports.updateServiceStatus = function(req, res) {
	var response = {};
	Service.findById(req.serviceId).exec(function(err, service) {
		if(err)
			return err;
		if(!service)
			return res(null, response.code = 404);

		service.approved = true;

		response.code = 200;
		response.data = service;
		res(null, response);
	});
}
