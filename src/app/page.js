"use client";
import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { motion } from 'framer-motion';

const Home = () => {

  //if(!user) then push to page login 
  //if usertype = student then push to student dashboard
  //else if usertype = admin then push to admin dashboard
  
  
  return (
    <main className="container">
      <div className={styles.container}>
      <motion.div
        initial={{
          y:-100,
          opacity:0.7
        }}
        animate={{
          y:0,
          opacity:1
        }}
        transition={{
          duration:0.7
          // type:"spring"
        }}
        className={styles.container}>
        <h2>Choose your electives unambiguously</h2>
        <Link href="/login">Go to signin &rArr;</Link>
      </motion.div>
      </div>
    </main>
  )
} 

export default Home;