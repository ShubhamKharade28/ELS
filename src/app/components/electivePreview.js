
import Link from 'next/link';

import styles from '@/styles/dashboard.module.css';

const ElectivePreview = ({elective}) => {

    return (
        <Link className={styles.elective} key={elective.name} href="/dashboard/admin/elective/id">
            <h3>{elective.name}</h3>
            <div className={styles.electiveGrid}>
                <div>
                    <label>Subjects</label>
                    <div className={styles.subjects}>
                    {
                        elective.subjects.map((subject,index) => {
                            return <span key={subject}>{index+1} {subject}</span>
                        })
                    }
                    </div>
                </div>

                <div className='px-3'>
                    <label>Students Enrolled</label>
                    <div className="px-10 text-xl"> {elective.count} </div>
                </div>
            </div>
        </Link>
    )
}

export default ElectivePreview;