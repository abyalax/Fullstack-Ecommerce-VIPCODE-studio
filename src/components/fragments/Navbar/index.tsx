import { signOut, useSession } from "next-auth/react"
import styles from './Navbar.module.scss'
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useState } from "react";

const NavItems = [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'Products',
        url: '/products'
    }
]

const Navbar = () => {
    const { data }: any = useSession();
    const { pathname, push } = useRouter();
    const [dropdown, setDropdown] = useState(false);

    return (
        <div className={styles.navbar}>
            <h1>Toko Sepatu</h1>
            <div className={styles.navbar__nav}>
                {NavItems.map((item, index) => (
                    <Link
                        key={`nav-${item.title}-${index}`}
                        href={item.url}
                        className={`${styles.navbar__nav__item} 
                        ${pathname === item.url && styles['navbar__nav__item--active']}`}>
                        {item.title}
                    </Link>
                ))}
            </div>
            {data ? (
                <div className={styles.navbar__user}>
                    <div className={styles.navbar__user__cart}>
                        <Link href={'/cart'}>
                            <i className={`bx bxs-cart-alt ${styles.navbar__user__cart__icon}`} />
                        </Link>
                    </div>
                    <div className={styles.navbar__user__profile}>
                        <Image
                            width={40}
                            height={40}
                            src={data?.user.image}
                            alt={data?.user.name}
                            onClick={() => setDropdown(!dropdown)}
                            className={styles.navbar__user__profile__image}
                        />
                        <div className={`${styles.navbar__user__profile__dropdown} ${dropdown && styles['navbar__user__profile__dropdown--active']}`}>
                            <button onClick={() => push('/')} className={styles.navbar__user__profile__dropdown__item}>
                                Home
                            </button>
                            <button onClick={() => push('/member/profile')} className={styles.navbar__user__profile__dropdown__item}>
                                Profile
                            </button>
                            <button onClick={() => signOut()} className={styles.navbar__user__profile__dropdown__item}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <Button type="button" onClick={() => push('/auth/login')} className={styles.navbar__button}>
                    Login
                </Button>
            )}

        </div>
    )
}

export default Navbar