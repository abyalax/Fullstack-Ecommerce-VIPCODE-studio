import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Modal from "@/components/ui/Modal"
import Select from "@/components/ui/Select"
import userServices from "@/services/user"
import { FormEvent, useState } from "react"

const ModalUpdateUser = (props: any) => {
    const { updatedUser, setUpdatedUser, setUsersData } = props
    const [isLoading, setIsLoading] = useState(false)
    const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const form:any = event.target as HTMLFormElement;
        const data = {
            role: form.role.value,
        }
        const result = await userServices.updateUser(updatedUser.id, data);
        console.log(result)
    }
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
        } else {
            setIsLoading(false);
        }
    }
    return (
        <Modal onClose={() => setUpdatedUser({})}>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit} id="form">
                <Input label="Email" name="email" type="email" defaultValue={updatedUser.email} disabled></Input>
                <Input label="Fullname" name="fullname" type="text" defaultValue={updatedUser.fullname} disabled></Input>
                <Input label="Phone" name="phone" type="number" defaultValue={updatedUser.phone} disabled></Input>
                <Select label="Role" name="role" defaultValue={updatedUser.role} options={
                    [
                        { label: "Admin", value: "admin" },
                        { label: "Member", value: "member" }
                    ]
                }></Select>
                <Button type="submit">Edit</Button>
            </form>
        </Modal>
    )
}
export default ModalUpdateUser