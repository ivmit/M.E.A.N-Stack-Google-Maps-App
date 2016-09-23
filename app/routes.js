/**
 * Created by imitrach on 9/22/2016.
 */
var mongoose = require('mongoose');
var User     = require('./model.js');


module.exports = function(app){

    //Retrieve all user records from db
    app.get('/users', function(req,res){

        var query = User.find({});
        query.exec(function(err, users){
            if(err) res.send(err);

            res.json(users);
        });

    });

    app.post('/users', function(req, res){

        var newUser = new User(req.body);

        newUser.save(function(err){
            if(err) res.send(err);

            res.json(req.body);
        });

    });



}