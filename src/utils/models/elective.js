import mongoose from "mongoose";

const electiveSchema = new mongoose.Schema({
    name: String,
    admin_name: String,
    subjects: [{
        name: String,
        count: Number,
        students: [String]
    }]
});

const Elective = mongoose.models.elective ? mongoose.model('elective') :
            new mongoose.model('elective', electiveSchema);

export default Elective;