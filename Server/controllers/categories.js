var Category = require('../models/Category'),
    User = require('../models/User'),
    Service = require('../models/Service');



exports.getCategories = function(req, res) {

    console.log("in get categories");
    console.log(req);
    var response = {};

    Category.find({}, function(err, categories){

        if(err)
            return response.error = err;

        response.data = categories;
        response.code = 200;
        console.log(response);
        res(null, response);

    });

}

// exports.addCategory = function(req, res) {
//
//     console.log("in add category");
//     console.log(req);
//
//     var response = {};
//
//     var category = new Category({
//         name : req.name
//     });
//
//     category.save(function(error){
//         if(error)
//             return response.error = error;
//     });
//
//     response.success = true;
//     res(null, response);
//
// }


exports.postServiceAndCategory = function(req, res) {

    var response = {};

    //find moderator
    User.findOne({_id: req.data.moderator}).exec(function(err, user) {

        if(err)
            res(null, response = {err : err, code : "404" });

        Category.findOne({name: req.data.categorySelected}, function(err, categorySelected){

            if(err)
                res(null, response = {err : err, code : "404" });

            //if new category is entered crete new category
            if(!req.data.categoryChoice) {

                var category = new Category({
                    name : req.data.categoryEntered
                });

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
                  category: category._id

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

                var service = new Service({

                  name: req.data.servicename,    //should be unique check and without spaces - checked on frontend
                  address: req.data.address,
                  contact: req.data.contact,
                  description: req.data.description,
                  moderator: user._id,
                  category: categorySelected._id

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

            console.log(res);

        });
    });


}
