import Link from "next/link"
import styles from "./Register.module.scss"
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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
        const result = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data)
        })
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
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            {error && <p className={styles.register__error}>{error}</p>}
            <div className={styles.register__form}>
                <form id="register" onSubmit={handleRegister}>
                    <Input label="Email" name="email" type="email" placholder="Enter your email"></Input>
                    <Input label="Fullname" name="fullname" type="text" placholder="Enter your fullname"/>
                    <Input label="Phone" name="phone" type="number" placholder="Enter your phone"></Input>
                    <Input label="Password" name="password" type="password" placholder="Enter your password"></Input>
                    <Button type="submit" variant="primary" className={styles.register__form__button}>{isLoading ? 'Loading...' : 'Register'}</Button>
                </form>
            </div>
            <p className={styles.register__link}>Have an Account ? Sign in <Link href={"/auth/login"}>Here</Link> </p>
        </div>
    )
}
export default RegisterView