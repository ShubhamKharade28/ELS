import Link from "next/link";
import styles from '@/styles/auth.module.css';

const Login = () => {
    return (
        <div className={styles.container}>
            <h1>Signin</h1>
            <Link href="/signin/student">Student Login &rArr;</Link>
            <Link href="/signin/admin">Admin Login &rArr;</Link>
        </div>
    )
}

export default Login;