import styles from "./input.module.scss"

type Propstypes = {
    label?: string;
    name: string;
    type: string;
    placeholder?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    onChange?: (e: any) => void
    className?: string
}

const Input = (props: Propstypes) => {
    const { label, name, type, placeholder, defaultValue, disabled, onChange, className } = props
    return (
        <div className={`${styles.container} ${className}`}>
            {label && <label htmlFor={name} className={styles.container__label}>{label}</label>}
            <input
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={onChange}
                className={styles.container__input}
            />
        </div>
    )
}
export default Input;