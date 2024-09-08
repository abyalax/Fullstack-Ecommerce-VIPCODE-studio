import { SidebarAdmin } from "@/components/fragments/Sidebar"
import styles from "./AdminLayout.module.scss"
import { useRouter } from "next/router"

type PropTypes = {
    children: React.ReactNode
}
const AdminLayout = (props: PropTypes) => {

    const { children } = props
    const { pathname } = useRouter();

    console.log(pathname);
    
    // Cek apakah halaman saat ini adalah halaman admin atau member
    const isAdminRoute = pathname.startsWith('/admin');
    if (isAdminRoute) {
        return (
            <div className={styles.admin}>
                {/* <Sidebar lists={listSidebarAdmin} /> */}
                <SidebarAdmin />
                <div className={styles.admin__main}>
                    {children}
                </div>
            </div>
        )
    } else {
        return null
    }
}
export default AdminLayout