"use client";
import styles from '@/styles/auth.module.css';
import HomeBtn from '@/app/components/homebtn';

const AdminLogin = () => {

    return (
        <div className={styles.container}>
            <HomeBtn />
            <h2>
                Signin as admin
            </h2>
            <form>
                <input type='email' placeholder='Email'/>
                <input type='password' placeholder='Password'/>
                <button>Signin</button>
            </form>
        </div>
    )
}

export default AdminLogin;