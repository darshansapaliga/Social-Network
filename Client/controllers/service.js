var mq_client = require('../rpc/client');


exports.getServices = function(req, res) {

    mq_client.make_request('getServices_queue', {categoryId: req.params.id} ,function(err, results){
        if(err)
            return res.send(err);

        res.send(results);
    });

}

exports.getSingleService = function(req, res) {

    mq_client.make_request('getSingleService_queue', {serviceId: req.params.serviceId } ,function(err, results){
        if(err)
            return res.send(err);

        res.send(results);
    });

}

exports.updateService = function(req, res) {

    mq_client.make_request('updateService_queue', req.body ,function(err, results){
        if(err)
            return res.send(err);

        res.send(results);
    });

}

exports.postUserProblem = function(req, res) {

    mq_client.make_request('postUserProblem_queue', req.body, function(err, results){
        if(err)
            return res.send(err);

        res.send(results);

    });

}


exports.getModeratorServices = function(req, res) {

    mq_client.make_request('getModeratorServices_queue', {moderatorId: req.params.moderatorId}, function(err, results){
        if(err)
            return res.send(err);

        res.send(results);

    });
}

exports.deleteService = function(req, res) {

    mq_client.make_request('deleteService_queue', req.body, function(err, results){
        if(err)
            return res.send(err);

        res.send(results);

    });
}

exports.getServicesForApprovals = function(req, res) {

    mq_client.make_request('getServicesForApprovals_queue', {}, function(err, results){
        if(err)
            return res.send(err);

        res.send(results);

    });
}

exports.updateServiceStatus = function(req, res) {

    mq_client.make_request('updateServiceStatus_queue', {serviceId: req.params.serviceId}, function(err, results){
        if(err)
            return res.send(err);

        res.send(results);

    });
}
