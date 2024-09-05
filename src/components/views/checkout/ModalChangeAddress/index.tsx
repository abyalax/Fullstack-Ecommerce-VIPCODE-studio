import Modal from "@/components/ui/Modal"
import styles from "./ModalChangeAddress.module.scss"
import { Dispatch, SetStateAction } from "react"

type PropTypes = {
    address: any
    setChangeAddress: Dispatch<SetStateAction<boolean>>
    setSelectedAddress: Dispatch<SetStateAction<number>>
    selectedAddress: number
}

const ModalChangeAddress = (props: PropTypes) => {
    const { address, setChangeAddress, setSelectedAddress, selectedAddress } = props
    return (
        <Modal onClose={() => setChangeAddress(false)}>
            <h1 className={styles.modal__title}>Change Shipping Address</h1>
            {address.map((item: any, id: number) => (
                <div key={item.addressLine} onClick={() => {setSelectedAddress(id); setChangeAddress(false)}} className={`${styles.modal__address} ${id === selectedAddress && styles.modal__address__active}`}>
                    <h4 className={styles.modal__address__title}>
                        Recipient: {item.recipient} {' - '} {item.phone}
                    </h4>
                    <p >Address: {item.addressLine}</p>
                    <p >{item.note ? `Note: ${item.note}` : ''}</p>
                </div>
            ))}
        </Modal>
    )
}
export default ModalChangeAddress