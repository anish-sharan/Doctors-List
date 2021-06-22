const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        maxlength:  50
    },
    speciality: {
        type: String
    },
    qualification: {
        type: String
    }
})
doctorSchema.index({"$*":"text"});

const Doctor = mongoose.model('doctor',doctorSchema);
module.exports = Doctor;