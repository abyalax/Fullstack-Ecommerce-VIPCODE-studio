import Button from "@/components/ui/Button";
import styles from "./MemberOrders.module.scss"
import { useEffect, useState } from "react";
import { convertIDR } from "@/utils/currency";
import Script from "next/script";
import ModalDetailOrder from "./ModalDetailOrder";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import AdminLayout from "@/components/layouts/AdminLayouths";
import transactionServices from "@/services/transaction";

const AdminOrdersView = () => {
    const [detailOrder, setDetailOrder] = useState<any>({})
    const [products, setProducts] = useState<Product[]>([])
    const [transaction, setTransaction] = useState([])

    const getAllProducts = async () => {
        const { data } = await productServices.getAllProducts();
        setProducts(data.data)
    }
    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllTransaction = async () => {
        const {data} = await transactionServices.getAllTransaction()
        const result = data.data
        setTransaction(result)
    }
    
    useEffect(() => {
        getAllTransaction()
    }, [])

    return (
        <>
        <Script src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL} data-client-key = {process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />
            <AdminLayout>
                <div className={styles.orders}>
                    <h1>Management Order</h1>
                    <table className={styles.orders__table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order-ID</th>
                                <th>Username</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transaction?.map((transaction: any, index: number) => (
                                <tr key={transaction.order_id}>
                                    <td>{index + 1}</td>
                                    <td>{transaction.order_id}</td>
                                    <td>{transaction.user.name}</td>
                                    <td>{convertIDR(transaction.total)}</td>
                                    <td>{transaction.status}</td>
                                    <td>
                                        <div className={styles.orders__table__action}>
                                            <Button
                                                type="button"
                                                className={styles.orders__table__action__edit}
                                                onClick={() => setDetailOrder(transaction)}>
                                                <i className='bx bx-dots-vertical-rounded' />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminLayout>
            {Object.keys(detailOrder).length > 0 && (
                <ModalDetailOrder setDetailOrder={setDetailOrder} detailOrder={detailOrder} products= {products}/>
            )}
        </>
    )
}
export default AdminOrdersView