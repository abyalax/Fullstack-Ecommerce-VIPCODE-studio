import Link from "next/link"
import styles from "./Register.module.scss"
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

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
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname">Fullname</label>
                        <input name="fullname" id="fullname" type="text" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="email">Email</label>
                        <input name="email" id="email" type="email" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="phone">Phone</label>
                        <input name="phone" id="phone" type="text" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="password">Password</label>
                        <input name="password" id="password" type="password" className={styles.register__form__item__input} />
                    </div>
                    <button type="submit" className={styles.register__form__button}>{isLoading ? 'Loading...' : 'Register'}</button>
                </form>
            </div>
            <p className={styles.register__link}>Have an Account ? Sign in <Link href={"/auth/login"}>Here</Link> </p>
        </div>
    )
}
export default RegisterView