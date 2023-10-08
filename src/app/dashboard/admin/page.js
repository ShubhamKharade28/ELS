import styles from '@/styles/dashboard.module.css';
import Menubar from "@/app/components/menubar";
import ElectivePreview from '@/app/components/electivePreview';

const AdminDashboard = () => {

    const useremail = 'admin4email';
    const Electives = [
        {
            name: 'Elective II',
            subjects: ['Data Visualization', 'Network Management'],
            count: 12,
        },{
            name: 'Elective III',
            subjects: ['Programming with Java', 'Human Computer Interaction'],
            count: 20,
        }
    ]

    return (
        <div className={styles.dashboardContainer}>
            <Menubar />
            <div className={styles.electivesContainer}>
                {
                    Electives.map((elective) => {
                        return (
                            <ElectivePreview elective={elective} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminDashboard;