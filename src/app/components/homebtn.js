"use style";
import styles from '@/styles/homebtn.module.css';
import { motion } from 'framer-motion';

const HomeBtn = () => {
    return (
        <motion.a
            initial={{x:-200}}
            animate={{x:0}}
            transition={{
                duration: 1,
                type:"spring"
            }}
            href='/'
            className={styles.homebtn}
        >
            &lArr;
        </motion.a>
    )
}

export default HomeBtn;