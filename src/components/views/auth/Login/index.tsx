import styles from "./Login.module.scss"
import { Dispatch, FormEvent, SetStateAction, useContext } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ToasterContext } from "@/context/ToasterContext";
import Authlayout from "@/components/layouts/AuthLayouts";

const LoginView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push, query } = useRouter();
    const { setToaster } = useContext(ToasterContext)

    const callbackUrl: any = query.callbackUrl || '/';
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const form = document.getElementById("register") as HTMLFormElement;
        const formData = new FormData(form);
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
                setToaster({
                    variant: 'success',
                    message: 'Login Success'
                })
            } else {
                setIsLoading(false);
                setToaster({
                    variant: 'danger',
                    message: 'Email or Password is incorrect'
                })
            }
        } catch (error) {
            setIsLoading(false);
            setToaster({
                variant: 'danger',
                message: 'Login Failed, please call support'
            })
        }
    }
    return (
        <Authlayout
            title="Login"
            link="/auth/register"
            linkText={"Don't Have an Account ? Sign Up "}>
            <form id="register" onSubmit={handleRegister}>
                <Input label="Email" name="email" type="email" placeholder="Masukkan email" className={styles.login__input} />
                <Input label="Pasword" name="password" type="password" placeholder="**********" className={styles.login__input} />
                <Button type="submit" className={styles.login__button}>{isLoading ? 'Loading...' : 'Login'}</Button>
            </form>
            <hr className={styles.login__devider} />
            <div className={styles.login__other}>
                <Button type="button" className={styles.login__other__button} onClick={() => signIn('google', { callbackUrl, redirect: false })}><i className='bx bxl-google' />Login With Google</Button>
            </div>
        </Authlayout>
    )
}
export default LoginView