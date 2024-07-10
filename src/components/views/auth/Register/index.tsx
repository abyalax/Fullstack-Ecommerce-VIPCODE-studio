import styles from "./Register.module.scss"
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import Authlayout from "@/components/layouts/AuthLayouts";

const RegisterView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const {push} = useRouter();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('')
        const form = document.getElementById("register") as HTMLFormElement;
        const formData = new FormData(form);

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        const data = {
            fullname:formData.get('fullname'),
            email:formData.get('email'),
            phone:formData.get('phone'),
            password:formData.get('password'),
        }
        const result = await authServices.registerAccount(data);
        if (result.status === 200) {
            form.reset();
            setIsLoading(false);
            push('/auth/login')
        } else {
            setIsLoading(false);
            setError('Email is already registered');
        }
    }



    return (
        <Authlayout linkText="Have an Account ? Sign in " title="Register" link="/auth/login" error={error}>
            <form id="register" onSubmit={handleRegister}>
                    <Input label="Email" name="email" type="email" placholder="Enter your email"></Input>
                    <Input label="Fullname" name="fullname" type="text" placholder="Enter your fullname"/>
                    <Input label="Phone" name="phone" type="number" placholder="Enter your phone"></Input>
                    <Input label="Password" name="password" type="password" placholder="Enter your password"></Input>
                    <Button type="submit" variant="primary" className={styles.register__button}>{isLoading ? 'Loading...' : 'Register'}</Button>
                </form>
        </Authlayout>
    )
}
export default RegisterView