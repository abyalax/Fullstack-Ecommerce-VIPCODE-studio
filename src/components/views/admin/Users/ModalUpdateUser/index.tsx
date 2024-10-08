import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Modal from "@/components/ui/Modal"
import Select from "@/components/ui/Select"
import userServices from "@/services/user"
import { User } from "@/types/user.type"
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from "react"
import styles from "./ModalUpdateUser.module.scss"
import { ToasterContext } from "@/context/ToasterContext"

type PropTypes = {
    setUsersData: Dispatch<SetStateAction<User[]>>
    updatedUser: User | any
    setUpdatedUser: Dispatch<SetStateAction<{}>>
}

const ModalUpdateUser = (props: PropTypes) => {
    const { updatedUser, setUpdatedUser, setUsersData } = props
    const [isLoading, setIsLoading] = useState(false)
    const {setToaster} = useContext(ToasterContext)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const form = document.getElementById("form") as HTMLFormElement;
        const formData = new FormData(form);
        const data = {
            role:formData.get('role'),
        }
        const result = await userServices.updateUser(updatedUser.id, data);
        if (result.status === 200) {
            setIsLoading(false);
            setUpdatedUser({});
            const {data} = await userServices.getAllUsers()
            setUsersData(data.data)
            setToaster({
                variant:'success',
                message: 'Succes Update User'
            })
        } else {
            setIsLoading(false);
            setToaster({
                variant:'danger',
                message: 'Failed Update User'
            })
        }
    }
    return (
        <Modal onClose={() => setUpdatedUser({})}>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit} id="form" className={styles.form}>
                <Input label="Email" name="email" type="email" defaultValue={updatedUser.email} className={styles.form__input} disabled></Input>
                <Input label="Fullname" name="fullname" type="text" defaultValue={updatedUser.fullname} className={styles.form__input} disabled></Input>
                <Input label="Phone" name="phone" type="number" defaultValue={updatedUser.phone} className={styles.form__input} disabled></Input>
                <Select label="Role" name="role" defaultValue={updatedUser.role} className={styles.form__input} options={
                    [
                        { label: "Admin", value: "admin" },
                        { label: "Member", value: "member" }
                    ]
                }></Select>
                <Button type="submit">
                    {isLoading ? 'Updating...' : 'Update'}
                </Button>
            </form>
        </Modal>
    )
}
export default ModalUpdateUser