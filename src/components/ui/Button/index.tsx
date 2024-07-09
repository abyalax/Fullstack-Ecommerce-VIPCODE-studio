import styles from "./Button.module.scss"
type Propstypes = {
    type: "button" | "submit" | "reset"| undefined;
    onClick?: () => void
    children: React.ReactNode
    variant?: string
    className?: string
}
const Button = (props: Propstypes) => {
    const {type, onClick, children, variant = 'primary', className} = props
    return (
        <div className={styles.login__form__other}>
                    <button type={type} onClick={onClick} className={`${styles.button} ${styles[variant]} ${className}`}>{children}</button>
                </div>
    )
}

export default Button