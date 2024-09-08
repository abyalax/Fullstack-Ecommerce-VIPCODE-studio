import { SidebarAdmin, SidebarMember } from "@/components/fragments/Sidebar"
import styles from "./MemberLayouths.module.scss"
import { useRouter } from "next/router"

type PropTypes = {
    children: React.ReactNode
}

const MemberLayout = (props: PropTypes) => {
    const {children} = props
    const { pathname } = useRouter();

    // Cek apakah halaman saat ini adalah halaman admin atau member
    const isMemberRoute = pathname.startsWith('/member');
    console.log(isMemberRoute);
    
    if (isMemberRoute === true) {
        return (
            <div className={styles.member}>
                <SidebarMember />
                <div className={styles.member__main}>{children}</div>
            </div>
        )
    } else {
        return (
            <SidebarAdmin />
        )
    }
}
export default MemberLayout