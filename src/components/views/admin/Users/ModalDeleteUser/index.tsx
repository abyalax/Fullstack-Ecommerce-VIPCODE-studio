import Button from "@/components/ui/Button"
import Modal from "@/components/ui/Modal"
import userServices from "@/services/user"
import styles from "./ModalDeleteUser.module.scss"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { User } from "@/types/user.type"
import { ToasterContext } from "@/context/ToasterContext"

type PropTypes = {
    setUsersData: Dispatch<SetStateAction<User[]>>
    deletedUser: User | any
    setDeletedUser: Dispatch<SetStateAction<{}>>
}

const ModalDeleteUser = (props: PropTypes) => {
    const { deletedUser, setDeletedUser, setUsersData } = props
    const [isLoading, setIsLoading] = useState(false)
    const {setToaster} = useContext(ToasterContext)

    const handleDelete = async () => {
        setIsLoading(true)
        const result = await userServices.deleteUser(deletedUser.id)
        if (result.status === 200) {
            setIsLoading(false);
            setToaster({
                variant: 'success',
                message: 'Succes Delete User'
            })
            setDeletedUser({})
            const { data } = await userServices.getAllUsers()
            setUsersData(data.data)
        } else {
            setIsLoading(false);
            setToaster({
                variant: 'danger',
                message: 'Failed Delete User'
            })
        }
    }

    return (
        <Modal onClose={() => setDeletedUser({})}>
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
export default ModalDeleteUser