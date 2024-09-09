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


export default Sidebar