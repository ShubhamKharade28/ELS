'use client';
import { useRouter } from 'next/navigation';

export default function Home() {

  //if(!user) then push to page login 
  //if usertype = student then push to student dashboard
  //else if usertype = admin then push to admin dashboard
  const router = useRouter();
  router.push('/signin');
  return (
    <main className="container">
      
    </main>
  )
} 
