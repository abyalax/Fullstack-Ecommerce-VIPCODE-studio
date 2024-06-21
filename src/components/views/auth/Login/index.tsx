import Link from "next/link"
import styles from "./Login.module.scss"
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const {push, query} = useRouter();
 
    const callbackUrl: any  = query.callbackUrl || '/';
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
                    <div className={styles.login__form__item}>
                        <label htmlFor="email">Email</label>
                        <input name="email" id="email" type="email" className={styles.login__form__item__input} />
                    </div>
                    <div className={styles.login__form__item}>
                        <label htmlFor="password">Password</label>
                        <input name="password" id="password" type="password" className={styles.login__form__item__input} />
                    </div>
                    <button type="submit" className={styles.login__form__button}>{isLoading ? 'Loading...' : 'Login'}</button>
                </form>
            </div>
            <p className={styles.login__link}>{"Don't Have an Account ? Sign Up "}<Link href={"/auth/register"}>Here</Link> </p>
        </div>
    )
}
export default LoginView