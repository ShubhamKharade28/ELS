"use client";
import styles from '@/styles/auth.module.css';
import { motion } from 'framer-motion';
import HomeBtn from '@/app/components/homebtn';
import Loader from '@/app/components/loader';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminRegister = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validPass = () => {
        const nums = ['0','1','2','3','4','5','6','7','8','9'];
        let isNum = false;
        nums.every(num => {
            if(password.includes(num)){
                isNum = true;
                return false;
            }
            return true;
        });
        let haveCapitalsAndSmalls = true;
        if(password === password.toLowerCase()){
            haveCapitalsAndSmalls = false;
        }
        if(password === password.toUpperCase()){
            haveCapitalsAndSmalls = false;
        }

        if(!isNum){
            return {
                valid: false,
                message: 'Password should contain atleast 1 number'
            }
        }
        if(!haveCapitalsAndSmalls){
            return {
                valid: false,
                message: 'Password should contain both small and capital letters',
            }
        }
        return {
            valid: true,
        }
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        if(name=='' || email==''){
            alert('Empty input fields');
            return;
        }

        let isPassValid = validPass();
        if(!isPassValid.valid){
            alert(isPassValid.message);
            return;
        }

        setLoading(true);

        let res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name,
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
            alert(res.error);
        }else{
            alert('Successful');
            localStorage.setItem('admin', {
                email: email,
                name: name,
            });
            setName('');
            setEmail('');
            setPassword('');
            router.push('/dashboard/admin');
        }
    }


    return (
        <div className={styles.container}>
            <HomeBtn />
            <motion.h2
                initial={{scale:1.04}}
                animate={{
                    scale:1,
                    transition: { duration: 0.4}
                }}
            >
                Register as admin
            </motion.h2>
            <form>
                <input  onChange={(e) => setEmail(e.target.value)} 
                 type='text' placeholder='Enter your email' value={email}/>
                <input  onChange={(e) => setName(e.target.value)}
                 type='text' placeholder='Enter your name' value={email}/>
                <input  onChange={(e) => setPassword(e.target.value)}
                 type='password' placeholder='Create a password' value={password}/>
                <button onClick={registerHandler}>
                {
                    loading ? <Loader /> : "Register"
                }
                </button>
            </form>
        </div>
    )
}

export default AdminRegister;