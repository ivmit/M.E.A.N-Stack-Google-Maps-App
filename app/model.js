/**
 * Created by imitrach on 9/22/2016.
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var userSchema = new Schema({
    username: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    favlang: {type: String, required: true},
    location: {type: [Number], required: true},
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

userSchema.pre('save', function(next){
    this.updated_at = new Date();

    if(!this.created_at){
        this.created_at = new Date();
    }
    next();
});

userSchema.index({location: '2dsphere'}); //Crucial for mongodb to run geospatial queries

module.exports = mongoose.model('mean-user', userSchema);