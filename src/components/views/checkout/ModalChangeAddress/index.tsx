import Modal from "@/components/ui/Modal"
import styles from "./ModalChangeAddress.module.scss"
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from "react"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/TextArea"
import userServices from "@/services/user"
import { ToasterContext } from "@/context/ToasterContext"

type PropTypes = {
    profile: any
    setChangeAddress: Dispatch<SetStateAction<boolean>>
    setSelectedAddress: Dispatch<SetStateAction<number>>
    setProfile: Dispatch<SetStateAction<any>>
    selectedAddress: number
}

const ModalChangeAddress = (props: PropTypes) => {
    const { profile, setProfile, setChangeAddress, setSelectedAddress, selectedAddress } = props
    const [loading, setIsLoading] = useState(false)
    const { setToaster } = useContext(ToasterContext)
    const [isAddNew, setIsAddNew] = useState(false)
    const [updateAddress, setUpdateAddress] = useState<number>()

    const handleAddress = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const form = e.target as HTMLFormElement
        let data;
        if (profile.address) {
            data = {
                address: [
                    ...profile.address,
                    {
                        recipient: form.recipient.value,
                        phone: form.phone.value,
                        addressLine: form.addressLine.value,
                        note: form.note.value,
                        isMain: false
                    }
                ]
            }
        } else {
            data = {
                address: [
                    {
                        recipient: form.recipient.value,
                        phone: form.phone.value,
                        addressLine: form.addressLine.value,
                        note: form.note.value,
                        isMain: true
                    }
                ]
            }
        }
        try {
            const result = await userServices.updateProfile(data);
            if (result.status === 200) {
                form.reset();
                setIsLoading(false)
                setIsAddNew(false)
                setProfile({
                    ...profile,
                    address: data.address
                })
                setToaster({
                    variant: 'success',
                    message: 'Success Add New Address'
                })
            }
        } catch (error) {
 
            setIsLoading(false)
            setToaster({
                variant: 'danger',
                message: 'Failed Add New Address'
            })
        }
    }
    const handleDeleteAddress = async (id: number) => {
        const address = profile.address
        address.splice(id, 1)
        const data = {
            address,
        }
        try {
            const result = await userServices.updateProfile(data);
            if (result.status === 200) {
                setIsLoading(false)
                setIsAddNew(false)
                setProfile({
                    ...profile,
                    address: data.address
                })
                setToaster({
                    variant: 'success',
                    message: 'Success Delete Address'
                })
            }
        } catch (error) {
 
            setIsLoading(false)
            setToaster({
                variant: 'danger',
                message: 'Failed Delete Address'
            })
        }
    }
    const handleMainAddress = async (id: number) => {
        const address = profile.address
        address.map((item: any) => {
            item.isMain = false
        })
        address[id].isMain = true
        const data = {
            address,
        }
        try {
            const result = await userServices.updateProfile(data);
            if (result.status === 200) {
                setIsLoading(false)
                setIsAddNew(false)
                setSelectedAddress(id)
                setProfile({
                    ...profile,
                    address: data.address
                })
                setToaster({
                    variant: 'success',
                    message: 'Success Change Main Address'
                })
            }
        } catch (error) {
 
            setIsLoading(false)
            setToaster({
                variant: 'danger',
                message: 'Failed Change Main Address'
            })
        }
    }
    const handleChangeAddress = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setUpdateAddress(undefined)
        const form = e.target as HTMLFormElement
        const address = profile.address
        const id = updateAddress as number
        address[id] = {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: false
        }
        const data = {
            address,
        }
        try {
            const result = await userServices.updateProfile(data);
            if (result.status === 200) {
                form.reset();
                setIsLoading(false)
                setIsAddNew(false)
                setProfile({
                    ...profile,
                    address: data.address
                })
                setToaster({
                    variant: 'success',
                    message: 'Success Update Address'
                })
            }
        } catch (error) {
 
            setIsLoading(false)
            setToaster({
                variant: 'danger',
                message: 'Failed Update Address'
            })
        } finally { setIsLoading(false) }
    }

    return (
        <Modal onClose={() => setChangeAddress(false)}>
            <h1 className={styles.modal__title}>{profile?.address?.length === 0 ? 'Add Address' : 'Change Address'}</h1>
            {profile?.address?.map((item: any, id: number) => (
                <div key={item.addressLine}>
                    <div className={`${styles.modal__address} ${id === selectedAddress && styles.modal__address__active}`}>
                        <div onClick={() => { setSelectedAddress(id); setChangeAddress(false) }} className={styles.modal__address__info}>
                            <h4 className={styles.modal__address__info__title}>
                                Recipient: {item.recipient} {' - '} {item.phone}
                            </h4>
                            <p >Address: {item.addressLine}</p>
                            <p >{item.note ? `Note: ${item.note}` : ''}</p>
                        </div>
                        <div className={styles.modal__address__action}>
                            <Button onClick={() => handleMainAddress(id)} disabled={loading || item.isMain} type="button" className={styles.modal__address__action__change}>
                                <i className='bx bxs-pin' />
                            </Button>
                            <Button onClick={() => id === updateAddress ? setUpdateAddress(undefined) : setUpdateAddress(id)} disabled={id === selectedAddress || loading} type="button" className={styles.modal__address__action__delete}>
                                <i className='bx bxs-edit' />
                            </Button>
                            <Button onClick={() => handleDeleteAddress(id)} disabled={id === selectedAddress || loading} type="button" className={styles.modal__address__action__delete}>
                                <i className='bx bxs-trash' />
                            </Button>
                        </div>
                    </div>
                    {id === updateAddress && (
                        <div className={styles.modal__form}>
                            <form onSubmit={handleChangeAddress} className={styles.modal__form__group}>
                                <Input type="text" placeholder="Insert Recipient" name="recipient" label="Recipient" defaultValue={item.recipient} />
                                <Input type="number" placeholder="Insert Recipient Phone" name="phone" label="Phone" defaultValue={item.phone} />
                                <Textarea placeholder="Insert Address here" name="addressLine" label="Address" defaultValue={item.addressLine} />
                                <Input type="text" placeholder="Insert Note" name="note" label="Note" defaultValue={item.note} />
                                <Button className={styles.modal__button} type="submit">{loading ? 'Loading...' : 'Submit'}</Button>
                            </form>
                        </div>
                    )}
                </div>
            ))}
            {!profile?.address?.[0] ? (
                <>
                    <p>Complete your address first</p>
                    {isAddNew ? ('') : (
                        <Button onClick={() => setIsAddNew(!isAddNew)} className={styles.modal__button} type="button">Add New Address</Button>
                    )}
                </>
            ) : (
                <Button onClick={() => setIsAddNew(!isAddNew)} className={styles.modal__button} type="button">{isAddNew ? 'Cancel' : 'Add New Address'}</Button>
            )}
            {isAddNew && (
                <div className={styles.modal__form}>
                    <form onSubmit={handleAddress} className={styles.modal__form__group}>
                        <Input type="text" placeholder="Insert Recipient" name="recipient" label="Recipient" />
                        <Input type="number" placeholder="Insert Recipient Phone" name="phone" label="Phone" />
                        <Textarea placeholder="Insert Address here" name="addressLine" label="Address" />
                        <Input type="text" placeholder="Insert Note" name="note" label="Note" />
                        <Button className={styles.modal__button} type="submit">{loading ? 'Loading...' : 'Submit'}</Button>
                    </form>
                </div>
            )}
        </Modal>
    )
}
export default ModalChangeAddress