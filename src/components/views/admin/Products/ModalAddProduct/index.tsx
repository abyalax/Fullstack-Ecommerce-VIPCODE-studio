import Modal from "@/components/ui/Modal"
import styles from "./ModalAddProduct.module.scss"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Button from "@/components/ui/Button"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Product } from '@/types/product.type'
import InputFile from "@/components/ui/InputFile"
import productServices from "@/services/product"
import { useSession } from "next-auth/react"
import { uploadFile } from "@/lib/firebase/service"
import Image from "next/image"
type PropTypes = {
    setModalAddProduct: Dispatch<SetStateAction<boolean>>
    setToaster: Dispatch<SetStateAction<{}>>
    setProductsData: Dispatch<SetStateAction<Product[]>>
}

const ModalAddProduct = (props: PropTypes) => {

    const { setModalAddProduct, setToaster, setProductsData } = props

    const [isLoading, setIsLoading] = useState(false)
    const [stockCount, setStockCount] = useState([{ size: '', qty: 0 }])
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const session: any = useSession();


    const handleStock = (e: any, i: number, type: string) => {
        const newStockCount: any = [...stockCount];
        newStockCount[i][type] = e.target.value
        setStockCount(newStockCount);
    }

    const uploadImage = (id: string, form: any) => {
        const file = form.image.files[0];
        const newName = 'main.' + file.name.split('.')[1]
        if (file) {
            uploadFile(id, file, newName, 'products', async (status: boolean, newImageURL: string) => {
                if (status) {
                    const data = {
                        image: newImageURL
                    }
                    const result = await productServices.updateProduct(id, data, session.data?.accessToken);
                    if (result.status === 200) {
                        setIsLoading(false);
                        setUploadedImage(null);
                        form.reset();
                        setModalAddProduct(false);
                        const { data } = await productServices.getAllProducts();
                        setProductsData(data.data)
                        setToaster({
                            variant: 'success',
                            message: 'Succes Add Product'
                        })
                    } else {
                        setIsLoading(false);
                        setToaster({
                            variant: 'danger',
                            message: 'Failed Add Product'
                        })
                    }
                } else {
                    setIsLoading(false);
                    setToaster({
                        variant: 'danger',
                        message: 'Failed Add Product'
                    })
                }
            })
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const form = document.getElementById("form") as HTMLFormElement;
        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            price: formData.get("price"),
            category: formData.get("category"),
            status: formData.get("status"),
            stock: stockCount,
            image: ''
        }
        const result = await productServices.addProduct(data, session.data?.accessToken);
        if (result.status === 200) {
            uploadImage(result.data.data.id, form);
            setIsLoading(false);
            setModalAddProduct(false);
            setToaster({
                variant: 'success',
                message: 'Succes Add Product'
            })
        }
    }

    return (
        <Modal onClose={() => setModalAddProduct(false)}>
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit} id="form" className={styles.form}>
                <Input label="Name" name="name" type="text" placeholder="Insert Product Name"></Input>
                <Input label="Price" name="price" type="number" placeholder="Insert Product Price"></Input>
                <Select label="Category" name="category" options={
                    [
                        { label: "Men", value: "men" },
                        { label: "Women", value: "women" }
                    ]
                } />
                <Select label="Status" name="status" options={
                    [
                        { label: "Released", value: "true" },
                        { label: "Not Released", value: "false" }
                    ]
                } />

                <label htmlFor="image">Image</label>
                <div className={styles.form__image}>
                    {uploadedImage ? (
                        <Image
                            className={styles.form__image__preview}
                            src={URL.createObjectURL(uploadedImage)}
                            alt="image"
                            width={210}
                            height={210}
                        />) : (
                        <div className={styles.form__image__placeholder}>No Image</div>
                    )}
                    <InputFile
                        name="image"
                        uploadedImage={uploadedImage}
                        setUploadedImage={setUploadedImage}
                    />
                </div>

                <label htmlFor="stock">Stock</label>
                {stockCount.map((item: { size: string, qty: number }, i: number) => (
                    <div className={styles.form__stock} key={i}>
                        <div className={styles.form__stock__item}>
                            <Input
                                label="Size"
                                name="size"
                                type="text"
                                placeholder="Insert Size"
                                onChange={(e) => handleStock(e, i, 'size')} />
                        </div>
                        <div className={styles.form__stock__item}>
                            <Input
                                label="Qty"
                                name="qty"
                                type="number"
                                placeholder="Insert Product Quantity"
                                onChange={(e) => handleStock(e, i, 'qty')} />
                        </div>
                    </div>
                ))}
                <Button
                    type="button"
                    className={styles.form__stock__button}
                    onClick={() => setStockCount([...stockCount, { size: '', qty: 0 }])}>
                    Add New Stock
                </Button>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Add Product'}
                </Button>
            </form>
        </Modal>
    )
}
export default ModalAddProduct