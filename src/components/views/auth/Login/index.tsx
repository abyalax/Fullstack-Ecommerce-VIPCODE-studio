import Link from "next/link"
import styles from "./Login.module.scss"
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const LoginView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { push, query } = useRouter();

    const callbackUrl: any = query.callbackUrl || '/';
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('')
        const form = document.getElementById("register") as HTMLFormElement;
        const formData = new FormData(form);

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: formData.get('email'),
                password: formData.get('password'),
                callbackUrl
            })
            if (!res?.error) {
                setIsLoading(false);
                form.reset()
                push(callbackUrl)
            } else {
                setIsLoading(false);
                setError("Email or Password is incorrect");
            }
        } catch (error) {
            setIsLoading(false);
            setError("Email or Password is incorrect");
        }
    }
    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}>Login</h1>
            {error && <p className={styles.login__error}>{error}</p>}
            <div className={styles.login__form}>
                <form id="register" onSubmit={handleRegister}>
                    <Input label="Email" name="email" type="email" placholder="Masukkan email" />
                    <Input label="Pasword" name="password" type="password" placholder="**********" />
                    <Button type="submit" className={styles.login__form__button}>{isLoading ? 'Loading...' : 'Login'}</Button>
                </form>
                <hr className={styles.login__form__devider} />
                <div className={styles.login__form__other}>
                    <Button type="button" className={styles.login__form__other__button} onClick={() => signIn('google', { callbackUrl, redirect: false })}><i className='bx bxl-google' />Login With Google</Button>
                </div>
            </div>
            <p className={styles.login__link}>{"Don't Have an Account ? Sign Up "}<Link href={"/auth/register"}>Here</Link> </p>
        </div>
    )
}
export default LoginView