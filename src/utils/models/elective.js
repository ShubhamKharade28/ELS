import { database } from "../db/db.config";

// const electiveSchema = new mongoose.Schema({
//     name: String,
//     admin_name: String,
//     subjects: [{
//         name: String,
//         count: Number,
//         students: [String]
//     }]
// });

const Elective = database.collection('electives');

export default Elective;