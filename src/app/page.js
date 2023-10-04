"use client";
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {

  //if(!user) then push to page login 
  //if usertype = student then push to student dashboard
  //else if usertype = admin then push to admin dashboard
  
  
  return (
    <main className="container">
      <h1>Welcome to elective-allotment-system </h1>
      <Link href="/signin">Go to signin &rArr;</Link>
    </main>
  )
} 

export default Home;