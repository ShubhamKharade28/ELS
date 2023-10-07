"use client";
import styles from '@/styles/auth.module.css';
import HomeBtn from '@/app/components/homebtn';
import Loader from '@/app/components/loader';
import { useState } from 'react';

const AdminLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');

    const loginHandler = async (e) => {
        e.preventDefault();
        
        if(email=='' || password==''){
            alert('Empty input fields');
            return;
        }

        setLoading(true);

        let res = await fetch('/api/auth/login/admin', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        res = await res.json();

        setLoading(false);

        if(res.error){
            alert(error);
        }else if(!res.correctPassword){
            alert('Incorrect password');
        }else{
            alert('Successful');
        }
    }

    return (
        <div className={styles.container}>
            <HomeBtn />
            <h2>
                Login as admin
            </h2>
            <form>
                <input type='email' placeholder='Email' 
                    onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='Password' 
                    onChange={(e) =>setPassword(e.target.value)}/>
                <button onClick={(e) => loginHandler(e)}>
                {
                    loading ? <Loader /> : "Register"
                }
                </button>
            </form>
        </div>
    )
}

export default AdminLogin;