import Modal from "@/components/ui/Modal"
import styles from "./ModalUpdateProduct.module.scss"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Button from "@/components/ui/Button"
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from "react"
import { Product } from '@/types/product.type'
import { uploadFile } from "@/lib/firebase/service"
import InputFile from "@/components/ui/InputFile"
import productServices from "@/services/product"
import Image from "next/image"
import { ToasterContext } from "@/context/ToasterContext"

type PropTypes = {
    updatedProduct: Product | any
    setUpdatedProduct: Dispatch<SetStateAction<boolean>>
    setProductsData: Dispatch<SetStateAction<Product[]>>
}

const ModalUpdateProduct = (props: PropTypes) => {

    const { setUpdatedProduct, setProductsData, updatedProduct } = props
    const [isLoading, setIsLoading] = useState(false)
    const [stockCount, setStockCount] = useState(updatedProduct.stock)
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const {toaster, setToaster} = useContext(ToasterContext)


    const handleStock = (e: any, i: number, type: string) => {
        const newStockCount: any = [...stockCount];
        newStockCount[i][type] = e.target.value
        setStockCount(newStockCount);
    }

    const updateProduct = async (form: any, newImageURL: string = updatedProduct.image) => {
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
            stock,
            image: newImageURL
        }
        const result = await productServices.updateProduct(updatedProduct.id, data);
        if (result.status === 200) {
            setIsLoading(false);
            setUploadedImage(null);
            form.reset();
            setUpdatedProduct(false);
            const { data } = await productServices.getAllProducts();
            setProductsData(data.data)
            setToaster({
                variant: 'success',
                message: 'Succes Update Product'
            })
        } else {
            setIsLoading(false);
            setToaster({
                variant: 'danger',
                message: 'Failed Update Product'
            })
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const form = document.getElementById("form") as HTMLFormElement;
        const file = form.image.files[0];
        if (file) {
            const newName = 'main.' + file.name.split('.')[1]
            uploadFile(updatedProduct.id, file, newName, 'products', async (status: boolean, newImageURL: string) => {
                if (status) {
                    updateProduct(form, newImageURL)
                } else {
                    setIsLoading(false);
                    setToaster({
                        variant: 'danger',
                        message: 'Failed Update Product'
                    })
                }
            })
        } else {
            updateProduct(form)
        }
    }

    return (
        <Modal onClose={() => setUpdatedProduct(false)}>
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit} id="form" className={styles.form}>
                <Input label="Name" name="name" type="text" defaultValue={updatedProduct.name} className={styles.form__input} />
                <Input label="Price" name="price" type="number" defaultValue={updatedProduct.price} className={styles.form__input}/>
                <Input label="Description" name="description" type="text" defaultValue={updatedProduct.description} className={styles.form__input}/>
                <Select label="Category" name="category" defaultValue={updatedProduct.category} className={styles.form__input} options={
                    [
                        { label: "Men", value: "Men's" },
                        { label: "Women", value: "Women's" }
                    ]
                } />
                <Select label="Status" name="status" defaultValue={updatedProduct.status} className={styles.form__input} options={
                    [
                        { label: "Released", value: "true" },
                        { label: "Not Released", value: "false" }
                    ]
                } />

                <label htmlFor="image">Image</label>
                <div className={styles.form__image}>
                    <Image
                        className={styles.form__image__preview}
                        src={uploadedImage ? URL.createObjectURL(uploadedImage) : updatedProduct.image}
                        alt={updatedProduct.name}
                        width={200}
                        height={200}
                    />
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
                                className={styles.form__input}
                                defaultValue={item.size}
                                onChange={(e) => handleStock(e, i, 'size')} />
                        </div>
                        <div className={styles.form__stock__item}>
                            <Input
                                label="Qty"
                                name="qty"
                                type="number"
                                className={styles.form__input}
                                defaultValue={item.qty}
                                placeholder="Insert Product Quantity"
                                onChange={(e) => handleStock(e, i, 'qty')} />
                        </div>
                    </div>
                ))}
                <Button
                    type="button"
                    className={styles.form__stock__button}
                    onClick={() => setStockCount([...stockCount, { size: '', qty: 0 }])}>
                    <i className="bx bx-plus" />
                    Add New Stock
                </Button>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className={styles.form__stock__submit}>
                    <i className="bx bx-plus" />
                    {isLoading ? 'Loading...' : 'Update Product'}
                </Button>
            </form>
        </Modal>
    )
}
export default ModalUpdateProduct