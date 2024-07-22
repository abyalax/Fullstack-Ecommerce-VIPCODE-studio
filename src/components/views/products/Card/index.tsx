import { Product } from "@/types/product.type"
import styles from "./Card.module.scss"
import Image from "next/image"
import { convertIDR } from "@/utils/currency"

type PropTypes = {
    product: Product
    key: string
}

const Card = (props: PropTypes) => {
    const { product, key } = props
    return (
        <div className={styles.card} key={key}>

            <Image className={styles.card__image} src={product.image}
                alt="product"
                width="500"
                height="500"
            />
            <h4 className={styles.card__title}>{product.name}</h4>
            <p className={styles.card__category}>{product.category}</p>
            <p className={styles.card__price}>{convertIDR(product.price)}</p>

        </div>
    )
}
export default Card