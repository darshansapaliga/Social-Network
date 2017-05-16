var Category = require('../models/Category'),
    User = require('../models/User'),
    Service = require('../models/Service');



exports.getCategories = function(req, res) {

    var response = {};

    Category.find({}, function(err, categories){

        if(err)
            return response.error = err;

        response.data = categories;
        response.code = 200;
        res(null, response);

    });

}


exports.postServiceAndCategory = function(req, res) {

    var response = {};
    User.findOne({_id: req.data.moderator}).exec(function(err, user) {

        if(err)
            res(null, response = {err : err, code : "404" });

        Category.findOne({name: req.data.categorySelected}, function(err, categorySelected){

            if(err)
                res(null, response = {err : err, code : "404" });

            //update updateUserAccessLevel if it is user
            if(user.userAccessLevel == "user") {
                user.userAccessLevel = "moderator";
                user.save(function(err){
                    if(err)
                        return err;
                });
            }

            var response = {
                data : {}
            };

            //if new category is entered crete new category
            if(!req.data.categoryChoice) {

                var category = new Category({
                    name : req.data.categoryEntered
                });

                var specialization = [];
                //if specialization choice selected or entered new
                // if(!req.data.specializationChoice) {
                    specialization.push(req.data.specializationEntered);
                    category.specialization.push(specialization);
                // }
                category.save(function(err){
                    if(err)
                        return res(null, (response.error = err));
                });

                var service = new Service({

                  name: req.data.servicename,    //should be unique check and without spaces
                  address: req.data.address,
                  contact: req.data.contact,
                  description: req.data.description,
                  moderator: user._id,
                  category: category._id,
                  specialization: specialization

                });


                service.save(function(err) {
                    if (!err) {
                      response.code = "200";
                    }else {
                      response.code = "404";
                    }
                });

                response.data.service = service;
                response.data.category = category;
                res(null, response);

            }else{

                var specialization2 = [];
                //if specialization choice selected or entered new
                if(!req.data.specializationChoice) {
                    specialization2.push(req.data.specializationEntered);
                }else {
                    specialization2.push(req.data.specializationSelected);
                }

                var service = new Service({

                  name: req.data.servicename,    //should be unique check and without spaces - checked on frontend
                  address: req.data.address,
                  contact: req.data.contact,
                  description: req.data.description,
                  moderator: user._id,
                  category: categorySelected._id,
                  specialization: specialization2

                });

                service.save(function(err) {

                    if (!err) {
                      response.code = "200";
                    }else {
                      response.code = "404";
                    }

                });

                response.data.service = service;
                response.data.category = categorySelected;
                res(null, response);

            }
        });
    });
}
