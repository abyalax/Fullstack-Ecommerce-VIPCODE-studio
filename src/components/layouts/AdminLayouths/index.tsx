import Sidebar from "@/components/fragments/Sidebar"
import styles from "./AdminLayout.module.scss"
import { useRouter } from "next/router"

type PropTypes = {
    children: React.ReactNode
}


const AdminLayout = (props: PropTypes) => {

    const { children } = props
    const { pathname } = useRouter();
    const lists = [
        {
            title: 'Dashboard',
            url: '/admin',
            active: pathname === '/admin',
            icon: 'bxs-dashboard'
        },
        {
            title: 'Products',
            url: '/admin/products',
            active: pathname === '/admin/products',
            icon: 'bxs-package'
        },
        {
            title: 'Orders',
            url: '/admin/orders',
            active: pathname === '/admin/orders',
            icon: 'bxs-cart'
        },
        {
            title: 'Users',
            url: '/admin/users',
            active: pathname === '/admin/users',
            icon: 'bxs-group'
        },
        {
            title: 'Profile',
            url: '/admin/profile',
            active: pathname === '/admin/profile',
            icon: 'bxs-user-circle'
        },
    ]
    return (
        <div className={styles.admin}>
            <Sidebar lists={lists} />
            <div className={styles.admin__main}>
                {children}
            </div>
        </div>
    )
}
export default AdminLayout