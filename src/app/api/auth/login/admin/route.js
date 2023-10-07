import client from "@/utils/db/db.config";
import Admin from "@/utils/models/admin";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        req = await req.json();
        if(!req.email || !req.password){
            return NextResponse.json({
                error: 'INVALID_CREDENTIALS',
            },{status:422});
        }

        await client.connect();

        let admin = await Admin.findOne({ email: req.email});
        if(!admin){
            return NextResponse.json({
                error: 'ADMIN_NOT_FOUND'
            }, { status:404 });
        }
        
        let result = await bcryptjs.compare(req.password, admin.password);
        if(result){
            return NextResponse.json({
                correctPassword: true,
                admin: {
                    name: admin.name,
                    email: admin.email,
                }
            });
        }

        return NextResponse.json({
            correctPassword: false,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: 'INTERNAL_SERVER_ERROR',
        }, { status: 500 });
    }
}