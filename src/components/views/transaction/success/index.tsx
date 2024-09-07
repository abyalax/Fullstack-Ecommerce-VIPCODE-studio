import Button from '@/components/ui/Button'
import styles from "./Succes.module.scss"

const SuccessView = () => {
    return (
        <div className={styles.success}>
            <h1>Payment Success</h1>
            <Button type='button'>
                Check Your Order here
            </Button>
        </div>
    )
}

export default SuccessView
