import Button from "@/components/ui/Button";
import { User } from "@/types/user.type";
import styles from "./MemberOrders.module.scss"
import { useEffect, useState } from "react";
import userServices from "@/services/user";
import { convertIDR } from "@/utils/currency";
import Script from "next/script";
import MemberLayout from "@/components/layouts/MemberLayouths";

const MemberOrdersView = () => {
    const [profile, setProfile] = useState<User | any>({})

    const getProfile = async () => {
        const { data } = await userServices.getProfile()
        setProfile(data.data)
    }

    useEffect(() => {
        getProfile()
    }, [])


    return (
        <>
        <Script src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL} data-client-key = {process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />
            <MemberLayout>
                <div className={styles.orders}>
                    <h1>Order History</h1>
                    <table className={styles.orders__table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order-ID</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profile?.transaction?.map((transaction: any, index: number) => (
                                <tr key={transaction.order_id}>
                                    <td>{index + 1}</td>
                                    <td>{transaction.order_id}</td>
                                    <td>{convertIDR(transaction.total)}</td>
                                    <td>{transaction.status}</td>
                                    <td>
                                        <div className={styles.orders__table__action}>
                                            <Button
                                                type="button"
                                                className={styles.orders__table__action__edit}
                                                onClick={() => {}}>
                                                <i className='bx bx-dots-vertical-rounded' />
                                            </Button>
                                            <Button
                                                type="button"
                                                disabled= {transaction.status !== "pending"}
                                                className={styles.orders__table__action__pay}
                                                onClick={() => window.snap.pay(transaction.token)}>
                                                <i className='bx bx-money' />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MemberLayout>
        </>
    )
}
export default MemberOrdersView