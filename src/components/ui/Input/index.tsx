import styles from "./input.module.scss"

type Propstypes = {
    label?: string;
    name: string;
    type: string;
    placeholder?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    onChange?: (e: any) => void
}

const Input = (props: Propstypes) => {
    const { label, name, type, placeholder, defaultValue, disabled, onChange } = props
    return (
        <div className={styles.container}>
            {label && <label htmlFor={name}>{label}</label>}
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