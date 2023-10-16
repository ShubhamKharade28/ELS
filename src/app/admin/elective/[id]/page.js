"use client";

import dashboardStyles from '@/styles/dashboard.module.css';
import styles from '@/styles/electiveinfo.module.css';
import Menubar from '@/app/components/menubar';
import BigLoader from '@/app/components/bigloader';
import { useEffect, useState } from 'react';

const ElectiveInfo = ({params}) => {

    const id = params.id;
    const [title, setTitle] = useState('-ele-title-');
    const [count, setCount] = useState(0);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if(loading){
        return (
            <div className={styles.dashboardContainer}>
                <Menubar />
                <BigLoader />
            </div>
        );
    }

    return (
    <div className={dashboardStyles.dashboardContainer}>
        <Menubar />
        <div className={styles.electiveContainer}>
            <div className={styles.electiveHeading}>
                <h1>{title}</h1>
                <h5>Total Enrolled: {count}</h5>
            </div>
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