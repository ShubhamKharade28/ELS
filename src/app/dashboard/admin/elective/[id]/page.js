
import dashboardStyles from '@/styles/dashboard.module.css';
import styles from '@/styles/electiveinfo.module.css';
import Menubar from '@/app/components/menubar';

const ElectiveInfo = ({params}) => {

    const id = params.id;

    return (

    <div className={dashboardStyles.dashboardContainer}>
        <Menubar />
        <div className={styles.electiveContainer}>
            <div className={styles.electiveHeading}>
                <h1>Elective III</h1>
                <h5>Total Enrolled: 30</h5>
            </div>
            <div className={styles.courses}>
                <div className={styles.courseContainer}>
                    <div className={styles.courseHeading}>
                        <h4>Programming with Java</h4>
                        <label>Enrolled: 12</label>
                    </div>
                    <ul className={styles.studentsContainer}>
                        <li>
                            <span>1.</span>
                            <span className={styles.stdname}>Shubham kharade</span>
                            <span>2130331246008</span>
                        </li>
                        <li>
                            <span>2.</span>
                            <span className={styles.stdname}>Sumit Kadam</span>
                            <span>2130331246012</span>
                        </li>
                        <li>
                            <span>3.</span>
                            <span className={styles.stdname}>Dipak Dakle</span>
                            <span>2130331246058</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    )
}

export default ElectiveInfo;