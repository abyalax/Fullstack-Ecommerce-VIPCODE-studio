import styles from "./Register.module.scss"
import { Dispatch, FormEvent, SetStateAction, useContext } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import Authlayout from "@/components/layouts/AuthLayouts";
import { ToasterContext } from "@/context/ToasterContext";

const RegisterView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();
    const { setToaster } = useContext(ToasterContext)

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const form = document.getElementById("register") as HTMLFormElement;
        const formData = new FormData(form);
        const data = {
            fullname: formData.get('fullname'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            password: formData.get('password'),
        }
        try {
            const result = await authServices.registerAccount(data);
            if (result.status === 200) {
                form.reset();
                setIsLoading(false);
                push('/auth/login')
                setToaster({
                    variant: 'success',
                    message: 'Register Success'
                })
            }
        } catch (error) {
            setIsLoading(false);
            setToaster({
                variant: 'danger',
                message: 'Register failed, Email is already exists'
            })
        }

    }
    return (
        <Authlayout linkText="Have an Account ? Sign in " title="Register" link="/auth/login" >
            <form id="register" onSubmit={handleRegister}>
                <Input label="Email" name="email" type="email" placeholder="Enter your email" className={styles.register__input} />
                <Input label="Fullname" name="fullname" type="text" placeholder="Enter your fullname" className={styles.register__input} />
                <Input label="Phone" name="phone" type="number" placeholder="Enter your phone" className={styles.register__input} />
                <Input label="Password" name="password" type="password" placeholder="Enter your password" className={styles.register__input} />
                <Button type="submit" variant="primary" className={styles.register__button}>{isLoading ? 'Loading...' : 'Register'}</Button>
            </form>
        </Authlayout>
    )
}
export default RegisterView