import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const Admin = mongoose.models.admin ? mongoose.model('admin'): 
        new mongoose.model('admin', AdminSchema);
export default Admin;