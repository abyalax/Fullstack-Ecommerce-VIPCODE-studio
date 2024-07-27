import Button from "@/components/ui/Button"
import Modal from "@/components/ui/Modal"
import styles from "./ModalDeleteProduct.module.scss"
import { Dispatch, SetStateAction, useState } from "react"
import { Product } from "@/types/product.type"
import productServices from "@/services/product"
import { deleteFile } from "@/lib/firebase/service"

type PropTypes = {
    setProductsData: Dispatch<SetStateAction<Product[]>>
    setToaster: Dispatch<SetStateAction<{}>>
    deletedProduct: Product | any
    setDeletedProduct: Dispatch<SetStateAction<{}>>
}

const ModalDeleteProduct = (props: PropTypes) => {
    const { deletedProduct, setDeletedProduct, setProductsData, setToaster } = props
    const [isLoading, setIsLoading] = useState(false)
    

    const handleDelete = async () => {
        setIsLoading(true)
        const result = await productServices.deleteProduct(deletedProduct.id)
        if (result.status === 200) {
            setIsLoading(false);
            deleteFile(`/images/products/${deletedProduct.id}/${deletedProduct.image.split('%2F')[3].split('?')[0]}`, async (status: boolean) => {
                if (status) {
                    setToaster({
                        variant: 'success',
                        message: 'Succes Delete Product'
                    })
                    setDeletedProduct({})
                    const { data } = await productServices.getAllProducts();
                    setProductsData(data.data)
                }
            });
        } else {
            setIsLoading(false);
            setToaster({
                variant: 'danger',
                message: 'Failed Delete Product'
            })
        }
    }

    return (
        <Modal onClose={() => setDeletedProduct({})}>
            <h1 className={styles.modal__title}>Are U Sure ? </h1>
            <Button
                type="button"
                onClick={() => handleDelete()}
                className={styles.modal__button}>
                {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
        </Modal>
    )
}
export default ModalDeleteProduct