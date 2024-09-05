import Modal from "@/components/ui/Modal"
import styles from "./ModalAddProduct.module.scss"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Button from "@/components/ui/Button"
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from "react"
import { Product } from '@/types/product.type'
import InputFile from "@/components/ui/InputFile"
import productServices from "@/services/product"
import { uploadFile } from "@/lib/firebase/service"
import Image from "next/image"
import { ToasterContext } from "@/context/ToasterContext"
type PropTypes = {
    setModalAddProduct: Dispatch<SetStateAction<boolean>>
    setProductsData: Dispatch<SetStateAction<Product[]>>
}

const ModalAddProduct = (props: PropTypes) => {

    const { setModalAddProduct, setProductsData } = props
    const {toaster, setToaster} = useContext(ToasterContext)

    const [isLoading, setIsLoading] = useState(false)
    const [stockCount, setStockCount] = useState([{ size: '', qty: 0 }])
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)


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
                    const result = await productServices.updateProduct(id, data);
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

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const form: any = event.target as HTMLFormElement;
        const stock = stockCount.map((stock: { size: string, qty: number }) => {
            return {
                size: stock.size,
                qty: parseInt(`${stock.qty}`)
            }
        })
        const data = {
            name: form.name.value,
            price: parseInt(form.price.value),
            description: form.description.value,
            category: form.category.value,
            status: form.status.value,
            stock: stock,
            image: ''
        }
        const result = await productServices.addProduct(data);
        if (result.status === 200) {
            uploadImage(result.data.data.id, form);
            setIsLoading(false);
            setModalAddProduct(false);
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
    }

    return (
        <Modal onClose={() => setModalAddProduct(false)}>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label="Name"
                    name="nama"
                    type="text"
                    placeholder="Insert Product Name"
                    className={styles.form__input}
                />
                <Input
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="Insert Product Price"
                    className={styles.form__input}
                />
                <Input
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="Insert Product Description"
                    className={styles.form__input}
                />
                <Select label="Category" name="category" className={styles.form__input} options={
                    [
                        { label: "Men", value: "Men's" },
                        { label: "Women", value: "Women's" }
                    ]
                } />
                <Select label="Status" name="status" className={styles.form__input} options={
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
                                className={styles.form__input}
                                placeholder="Insert Size"
                                onChange={(e) => handleStock(e, i, 'size')} />
                        </div>
                        <div className={styles.form__stock__item}>
                            <Input
                                label="Qty"
                                name="qty"
                                type="number"
                                className={styles.form__input}
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