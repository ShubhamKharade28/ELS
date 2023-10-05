"use client";
import styles from '@/styles/auth.module.css';
import HomeBtn from '@/app/components/homebtn';

const AdminLogin = () => {

    return (
        <div className={styles.container}>
            <HomeBtn />
            <h2>
                Login as admin
            </h2>
            <form>
                <input type='email' placeholder='Email'/>
                <input type='password' placeholder='Password'/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default AdminLogin;