var mq_client = require('../rpc/client');





exports.getCategories = function(req, res){

    console.log("in getCategories queue to be");
    mq_client.make_request('getCategories_queue', {}, function(err, results){
        console.log("in getCategories_queue ");
        console.log(results);

        if(err)
          return (response.error = err);

        res.send(results);

    });
};

exports.postServiceAndCategory = function(req, res) {

    console.log("in postServiceAndCategory");
    console.log(req.body);

    var response = {};
    mq_client.make_request('postServiceAndCategory_queue', {data: req.body}, function(err, results){
        console.log("in postServiceAndCategory_queue ");
        console.log(results);

        if(err)
          return (results.error = err);

        res.send(results);

    });
}
