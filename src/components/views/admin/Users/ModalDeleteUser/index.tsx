import Button from "@/components/ui/Button"
import Modal from "@/components/ui/Modal"
import userServices from "@/services/user"
import styles from "./ModalDeleteUser.module.scss"
import { useSession } from "next-auth/react"
import { Dispatch, SetStateAction, useState } from "react"
import { User } from "@/types/user.type"

type PropTypes = {
    setUsersData: Dispatch<SetStateAction<User[]>>
    setToaster: Dispatch<SetStateAction<{}>>
    deletedUser: User | any
    setDeletedUser: Dispatch<SetStateAction<{}>>
    session: any
}

const ModalDeleteUser = (props: PropTypes) => {
    const { deletedUser, setDeletedUser, setUsersData, setToaster, session } = props
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        setIsLoading(true)
        const result = await userServices.deleteUser(deletedUser.id, session.data?.accessToken)
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