import { useRouter } from 'next/router'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { signOut } from 'next-auth/react'

interface PropTypes {
    lists: { title: string, url: string, active: boolean, icon: string }[]
}

const Sidebar = (props: PropTypes) => {
    const { lists } = props
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__top}>
                <h1 className={styles.sidebar__top__title}>Sidebar </h1>
                <div className={styles.sidebar__top__lists}>
                    {lists.map((list) => (
                        <Link href={list.url} key={list.title} className={`${styles.sidebar__top__lists__item} ${list.active && styles.sidebar__top__lists__item__active}`}>
                            <i className={`bx ${list.icon} ${styles.sidebar__top__lists__item__icon}`} />
                            <h4 className={styles.sidebar__top__lists__item__title}>{list.title}</h4>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.sidebar__bottom}>
                <Button className={styles.sidebar__bottom__button} type='button' variant='secondary' onClick={() => signOut()}>Logout</Button>
            </div>
        </div>
    )
}

const SidebarAdmin = () => {
    const { pathname } = useRouter()
    console.log(pathname);
    
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
        <div className={styles.sidebar}>
            <div className={styles.sidebar__top}>
                <h1 className={styles.sidebar__top__title}>Sidebar </h1>
                <div className={styles.sidebar__top__lists}>
                    {lists.map((list) => (
                        <Link href={list.url} key={list.title} className={`${styles.sidebar__top__lists__item} ${list.active && styles.sidebar__top__lists__item__active}`}>
                            <i className={`bx ${list.icon} ${styles.sidebar__top__lists__item__icon}`} />
                            <h4 className={styles.sidebar__top__lists__item__title}>{list.title}</h4>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.sidebar__bottom}>
                <Button className={styles.sidebar__bottom__button} type='button' variant='secondary' onClick={() => signOut()}>Logout</Button>
            </div>
        </div>
    )
}
const SidebarMember = () => {
    const {pathname} = useRouter()
    console.log(pathname);
    
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
        <div className={styles.sidebar}>
            <div className={styles.sidebar__top}>
                <h1 className={styles.sidebar__top__title}>Sidebar </h1>
                <div className={styles.sidebar__top__lists}>
                    {lists.map((list) => (
                        <Link href={list.url} key={list.title} className={`${styles.sidebar__top__lists__item} ${list.active && styles.sidebar__top__lists__item__active}`}>
                            <i className={`bx ${list.icon} ${styles.sidebar__top__lists__item__icon}`} />
                            <h4 className={styles.sidebar__top__lists__item__title}>{list.title}</h4>
                        </Link>
                    ))}
                        {/* <Link href="/member/orders" className={`${styles.sidebar__top__lists__item} ${ pathname === '/member/orders' && styles.sidebar__top__lists__item__active}`}>
                            <i className={`bx bxs-cart ${styles.sidebar__top__lists__item__icon}`} />
                            <h4 className={styles.sidebar__top__lists__item__title}>Orders</h4>
                        </Link> */}
                </div>
            </div>
            <div className={styles.sidebar__bottom}>
                <Button className={styles.sidebar__bottom__button} type='button' variant='secondary' onClick={() => signOut()}>Logout</Button>
            </div>
        </div>
    )
}

export { Sidebar, SidebarAdmin, SidebarMember }