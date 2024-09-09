import Sidebar from "@/components/fragments/Sidebar"
import styles from "./MemberLayouths.module.scss"
import { useRouter } from "next/router"

type PropTypes = {
    children: React.ReactNode
}

const MemberLayout = (props: PropTypes) => {
    const { children } = props
    const { pathname } = useRouter();

    const lists = [
        {
            title: 'Dashboard',
            url: '/member/dashboard',
            active: pathname === '/member/dashboard',
            icon: 'bxs-dashboard'
        },
        {
            title: 'Orders',
            url: '/member/orders',
            active: pathname === '/member/orders',
            icon: 'bxs-cart'
        },
        {
            title: 'Profile',
            url: '/member/profile',
            active: pathname === '/member/profile',
            icon: 'bxs-user'
        },
    ]

    return (
        <div className={styles.member}>
            <Sidebar lists={lists} />
            <div className={styles.member__main}>{children}</div>
        </div>
    )
}
export default MemberLayout