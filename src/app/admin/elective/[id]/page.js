"use client";

import dashboardStyles from '@/styles/dashboard.module.css';
import styles from '@/styles/electiveinfo.module.css';
import Menubar from '@/app/components/menubar';
import BigLoader from '@/app/components/bigloader';
import { RxCopy } from 'react-icons/rx';

import { useEffect, useState } from 'react';

const ElectiveInfo = ({params}) => {

    const id = params.id;
    const [title, setTitle] = useState('');
    const [count, setCount] = useState(0);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copyLinkText, setCopyLinkText] = useState("Copy Link");

    useEffect(() => {
        const getData = async () => {
            let res = await fetch(`/api/electives/getById/${id}`);
            res = await res.json();
            try {
                if(res.error){
                    console.log(res.error);
                }else{
                    setTitle(res.title);
                    setCount(res.count);
                    setCourses(res.subjects);
                }
            }catch(error){
                alert("Unknown error occurred!");
                console.log(error);
            }
            setLoading(false);
        }
        getData();
    }, [])

    const copyLink = (e) => {
        e.preventDefault();
        const domain = 'https://elective-allotment.vercel.app/student/elective/'
        navigator.clipboard.writeText(domain+id);
        setCopyLinkText('Copied');
    }

    if(loading){
        return (
            <div className={styles.dashboardContainer}>
                <Menubar />
                <BigLoader />
            </div>
        );
    }

    if(!title){
        return (
            <div className={dashboardStyles.dashboardContainer}>
                <Menubar />
                <h1 className="text-white font-bold">Elective not found</h1>
            </div>
        )
    }

    return (
    <div className={dashboardStyles.dashboardContainer}>
        <Menubar />
        <div className={styles.electiveContainer}>
            <div className={styles.electiveHeading}>
                <h1>{title}</h1>
                <h5>Total Enrolled: {count}</h5>
            </div>
            <button className={styles.copylink} onClick={copyLink}>
                <span>{copyLinkText}</span>
                <RxCopy />
            </button>
            <div className={styles.courses}>
            {
                courses.map((course) => {

                    return (
                    <div className={styles.courseContainer} key={course.name}>
                        <div className={styles.courseHeading}>
                            <h4>{course.name}</h4>
                            <label>Enrolled: {course.count}</label>
                        </div>
                        <ul className={styles.studentsContainer}>
                        {
                            course.students.map((student,index) => {
                                return (
                                    <li key={index}>
                                        <span>{index+1}.</span>
                                        <span className={styles.stdname}>{student.name}</span>
                                        <span>{student.prn}</span>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>);
                })
            }
                
            </div>
        </div>
    </div>

    )
}

export default ElectiveInfo;