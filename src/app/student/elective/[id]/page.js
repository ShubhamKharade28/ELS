"use client";
import { useEffect, useState} from 'react';
import styles from '@/styles/electiveform.module.css';
import dashboardStyles from '@/styles/dashboard.module.css';
import BigLoader from '@/app/components/bigloader';
import Loader from '@/app/components/loader';
import HomeBtn from '@/app/components/homebtn';

const ElectiveForm = ({params}) => {
    const electiveId = params.id;
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);
    const [title, setTitle] = useState('');
    const [maxLimit, setMaxLimit] = useState(1);
    const [courseSelected, setCourseSelected] = useState('');


    const [name,setName] = useState('');
    const [prn, setPrn] = useState('');
    const [btnVal, setBtnVal] = useState('Submit');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const getData = async () => {
            let res = await fetch(`/api/electives/getById/${electiveId}`);
            res = await res.json();

            try {
                if(res.error){
                    console.log(error);
                    alert(res.error);
                }else{
                    setTitle(res.title);
                    setSubjects(res.subjects);
                    setMaxLimit(res.maxLimit);
                }
            }catch(err){
                console.log(err);
            }
            setLoading(false);
        }
        getData();
    },[]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(!name){
            alert("Enter your name");
            return;
        }
        if(!prn){
            alert("Enter your PRN");
            return;
        }
        if(!courseSelected){
            alert("Select a course");
            return;
        }
        
        try{
            setSubmitting(true);
            let res = await fetch('/api/electives/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    electiveId,
                    studentName: name,
                    studentPrn: prn,
                    subjectName: courseSelected,
                })
            });

            res = await res.json();
            if(!!res.success){
                setBtnVal('Submitted Successfully');
            }
            else{
                alert(res.error);
            }
        }catch(error){
            alert('Unknown error occurred');
        }
        setSubmitting(false);
    }


    if(loading){
        return (
            <div className={styles.dashboardContainer}>
                <HomeBtn path="/student" />
                <BigLoader />
            </div>
        );
    }

    if(!title){
        return (
            <div className={styles.dashboardContainer}>
                <HomeBtn path="/student" />
                <h2 className={styles.notfound}>Elective-course not found !</h2>
                <h4 className={styles.notfound}>Try checking elective-id</h4>
            </div>
        )
    }

    return (
        <div className={dashboardStyles.dashboardContainer}>
            <HomeBtn path="/student" />
        <form className={styles.electiveForm}>
            <h1>{title}</h1>
            <input type='text' placeholder="Enter name" value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input type='text' placeholder="Enter PRN" 
                onChange={(e) => setPrn(e.target.value)}
            />

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
            <button onClick={onSubmitHandler}>
            {
                submitting ? <Loader /> : <span>{btnVal}</span>
            }
            </button>
        </form>
        </div>
    )
}

export default ElectiveForm;