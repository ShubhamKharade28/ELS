"use client";
import { useEffect, useState} from 'react';
import styles from '@/styles/electiveform.module.css';
import dashboardStyles from '@/styles/dashboard.module.css';

const ElectiveForm = ({params}) => {
    // const electiveId = params.id;
    // const [loading, setLoading] = useState(true);
    // const [subjects, electiveSubjects] = useState([]);
    // const [title, setTitle] = useState('-no-title-');
    // const [maxLimit, setMaxLimit] = useState(0);
    const [courseSelected, setCourseSelected] = useState('');

    useEffect(() => {
        const getData = async () => {
            
            // setLoading(false);
        }
        getData();
    },[])

    const title = "Elective III";
    const maxLimit = 15;
    const subjects = [
        {
            name: 'c++',
            count: 12,
        },
        {
            name: 'Java',
            count: 17,
        }
    ];

    useEffect(() => {
        console.log(courseSelected);
    }, [courseSelected])

    return (
        <div className={dashboardStyles.dashboardContainer}>
        <form className={styles.electiveForm}>
            <h1>{title}</h1>
            <input type='text' placeholder="Enter name" />
            <input type='text' placeholder="Enter PRN" />

            <h3>Choose course</h3>
            <div className={styles.options}>
            {
                subjects.map((subject) => {
                    return (
                        <div className={subject.count < maxLimit ? styles.enabled : styles.disabled} key={subject.name}
                            onClick={() => {
                                if(subject.count < maxLimit)
                                    setCourseSelected(subject.name);
                            }}
                            data-selected={courseSelected == subject.name}
                        >
                            {subject.name} 
                            { subject.count >= maxLimit && <span className="text-sm"> no seats available</span>}
                        </div>
                    )
                })
            }
            </div>
            <button>Submit</button>
        </form>
        </div>
    )
}

export default ElectiveForm;