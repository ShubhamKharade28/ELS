
import { CiSquareRemove } from 'react-icons/ci';

import dashboardStyles from '@/styles/dashboard.module.css';
import styles from '@/styles/addelective.module.css';
import Menubar from '@/app/components/menubar';

const AddElective = () => {

    const Students = [
        {
            name: 'Shubham Kharade',
            prn: '2130331246008'
        },
        {
            name: 'Sumit Kadam',
            prn: '2130331246012'
        },
        {
            name: 'Dipak Dakle',
            prn: '2130331246058'
        }
    ];

    const Subjects = [
        'Web-Technology','Digital Logic and Microprocessor'
    ]
    
    
    return (
        <div className={dashboardStyles.dashboardContainer}>
            <Menubar />
            <div className={styles.addElectiveContainer}>
                <input type='text' placeholder='Enter elective title'/>

                <div className={styles.subjectsContainer}>
                    <label>Courses</label>
                    <div className={styles.subjectInputContainer}>
                        <input type='text' placeholder='Course name'/>
                        <button>Add</button>
                    </div>
                    <ul className={styles.subjectsAdded}>
                    {
                        Subjects.map((subject,index) => {
                            return (
                            <li key={subject}>
                                <span>{index+1}.</span>
                                <span className="w-72 md:w-80">{subject}</span>
                                <CiSquareRemove size={30} />
                            </li>
                            );
                        })
                    }
                    </ul>
                </div>

                <div className={styles.studentsContainer}>
                    <label>Students</label>
                    <div className={styles.studentInputContainer}>
                        <input type='text' placeholder='Name'/>
                        <input type='text' placeholder='PRN' />
                        <button>Add</button>
                    </div>
                    <ul className={styles.studentsAdded}>
                    {
                        Students.map((student,index) => {   
                            return (
                                <li key={student.prn}>
                                    <span>{index+1}.</span>
                                    <span className="w-52 md:w-64">{student.name}</span>
                                    <span className="w-36 md:w-52">{student.prn}</span>
                                    <CiSquareRemove size={30}/>
                                </li>
                            );
                        })
                    }
                    </ul>
                </div>

                <button>Submit</button>
            </div>
        </div>
    )
}

export default AddElective;