"use client";
import styles from '@/styles/auth.module.css';
import { motion } from 'framer-motion';
import HomeBtn from '@/app/components/homebtn';

const inputFocus = {
    scale:1.03,
}

const StudentLogin = () => {

    return (
        <div className={styles.container}>
            <HomeBtn />
            <h2>
                Signin as student
            </h2>
            <form>
                <motion.input type='text' placeholder='PRN'
                    whileFocus={inputFocus}
                />
                <motion.input type='password' placeholder='Password'
                    whileFocus={inputFocus}
                />
                <motion.button
                    whileHover={{ 
                        boxShadow: '1px 1px 5px #4A5365',
                        scale: 1.1
                    }}
                    whileTap={{
                        scale: 0.96
                    }}
                >Signin</motion.button>
            </form>
        </div>
    )
}

export default StudentLogin;