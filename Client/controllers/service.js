var mq_client = require('../rpc/client');


exports.getServices = function(req, res) {

    console.log("in get services");
    console.log(req.params);

    mq_client.make_request('getServices_queue', {categoryId: req.params.id} ,function(err, results){
        if(err)
            return res.send(err);

        res.send(results);
    });

}
