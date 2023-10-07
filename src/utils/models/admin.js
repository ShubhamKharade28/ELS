import { database } from "../db/db.config";

// const AdminSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
// });

// export const Admin = mongoose.models.admin ? mongoose.model('admin'): 
//         new mongoose.model('admin', AdminSchema);

const Admin = database.collection('admins');

export default Admin;