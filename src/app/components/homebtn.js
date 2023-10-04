import styles from '@/styles/homebtn.module.css';
import Link from 'next/link';

const HomeBtn = () => {
    return (
        <Link className={styles.homebtn} href="/">
            &lArr;
        </Link>
    )
}

export default HomeBtn;