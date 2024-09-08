import Button from '@/components/ui/Button'
import styles from "./Succes.module.scss"
import { useRouter } from 'next/router'

const SuccessView = () => {

    const {push} = useRouter()

    return (
        <div className={styles.success}>
            <h1>Payment Success</h1>
            <Button type='button' onClick={() => push('/member/orders')}>
                Check Your Order here
            </Button>
        </div>
    )
}

export default SuccessView
 