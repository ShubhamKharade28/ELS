'use client';
import {useRouter} from 'next/router';

export default function Home() {

  //if(!user) then push to page login 
  //if usertype = student then push to student dashboard
  //else if usertype = admin then push to admin dashboard
  const router = useRouter();
  router.push('/signin');
  return (
    <main className="container">
      <h1>Welcome to elective-allotment-system </h1>
    </main>
  )
} 
