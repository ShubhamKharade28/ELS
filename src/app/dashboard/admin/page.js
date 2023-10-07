
import styles from '@/styles/dashboard.module.css';
import Menubar from "@/app/components/menubar";


const AdminDashboard = () => {
    return (
        <div className={styles.dashboardContainer}>
            <Menubar />
        </div>
    )
}

export default AdminDashboard;