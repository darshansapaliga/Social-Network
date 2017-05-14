var Service = require('../models/Service'),
	ServiceGroup = require('../models/ServiceGroup');


/*
 |-----------------------------------------------------------
 | GET SERVICE
 |-----------------------------------------------------------
*/

exports.getServices = function(req, res){

	console.log("in get services");
	console.log(req);

	//return response
	var response  = {};

	//find the service and return
	Service.find({category: req.categoryId}).exec(function(err, service){

		console.log("inside service");

		if(err)
			res(null, response = {err : err, code : "404" });


		//if service found
		if(service) {
			response.code = "200";
			response.data = service;
		}else {
			response.code = "400";
			response.data = null;
		}
		console.log(service);
		res(null, response);

	});


}

/*
 |-----------------------------------------------------------
 | GET SINGLE SERVICE
 |-----------------------------------------------------------
*/
exports.getService = function(req, res){


	//return response
	var response  = {};

	//find the service and return
	Service.findOne({category: req.categoryId}).exec(function(err, service){

		if(err)
			res(null, response = {err : err, code : "404" });


		//if service found
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


	console.log("-----------in addService--------");
	console.log(msg);

	//return response
	var response  = {};

	//find moderator
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
				  console.log("service added successfull");
				  response.code = "200";
				}else {
				  response.code = "404";
				}

			});

			console.log(service);
			callback(null, response);

		});
	});



}



/*
 |-----------------------------------------------------------
 | UPDATE SERVICE
 |-----------------------------------------------------------
*/

exports.updateService = function(msg, callback){


	console.log("-----------in updateService--------");
	console.log(msg);

	//return response
	var response  = {},
		members = [];

	//find the service to update
	Service.findOne({name: msg.name}).exec(function(err, service){

		if(err)
			callback(null, response = {err : err, code : "404" });

		//find moderator
		User.findOne({email: msg.email}).exec(function(err, user) {

			if(err)
				callback(null, response = {err : err, code : "404" });

			User.findOne({email: msg.memeberEmail}, function(err, member){

				if(err)
					callback(null, response = {err : err, code : "404" });

				ServiceGroup.findOne({name: msg.servicesGroupName}, function(err, servicesGroup){

					if(err)
						callback(null, response = {err : err, code : "404" });


					service.name = msg.name || service.name;
					service.description = msg.description || service.description;
					service.moderator = user._id;
					service.servicesGroup = msg.servicesGroup || service.servicesGroup;
					service.category = msg.category || service.category;

					//adding members to members list
					members = service.members;
					members.add(member._id);
					service.members = members;


					service.save(function(err) {

						if (!err) {
						  console.log("service updated successfull");
						  response.code = "200";
						}else {
						  response.code = "404";
						}

					});

					console.log(service);
					callback(null, response);


				}); //end of serviceGroup
			});

		});

	}); //end of service find


}




/*
 |-----------------------------------------------------------
 | DELETE SERVICE
 |-----------------------------------------------------------
*/

exports.deleteService = function(msg, callback){


	console.log("-----------in deleteService--------");
	console.log(msg);

	//return response
	var response  = {};

	//find the service and return
	Service.findOne({name: msg.name}).exec(function(err, service){

		if(err)
			callback(null, response = {err : err, code : "404" });


		//if service found
		if(service) {

			user.remove(function(err, user){
				if(err)
					callback(null, response = {err : err, code : "404" });

				response.code = "200";

			});


			response.code = "200";

		}else {
			response.code = "404";
			response.data = null;
			response.error = false;
		}

		console.log(service);


	});


}
