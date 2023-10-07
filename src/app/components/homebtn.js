"use style";
import styles from '@/styles/homebtn.module.css';
import { motion } from 'framer-motion';

const HomeBtn = () => {
    return (
        // <Link href="/login" className={styles.homebtn}> 
            <motion.a
                // className={styles.homebtn}
                initial={{x:-200}}
                animate={{x:0}}
                transition={{
                    duration: 1,
                    type:"spring"
                }}
                href='/login'
                className={styles.homebtn}
            >
                &lArr;
            </motion.a>
        // </Link>
    )
}

export default HomeBtn;