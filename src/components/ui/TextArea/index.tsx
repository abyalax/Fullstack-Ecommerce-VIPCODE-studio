import styles from "./TextArea.module.scss"

type Propstypes = {
    label?: string;
    name: string;
    placeholder?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    onChange?: (e: any) => void
    className?: string
}

const Textarea = (props: Propstypes) => {
    const { label, name, placeholder, defaultValue, disabled, onChange, className } = props
    return (
        <div className={`${styles.container} ${className}`}>
            {label && <label htmlFor={name} className={styles.container__label}>{label}</label>}
            <textarea
                name={name}
                id={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={onChange}
                className={styles.container__input}
            />
        </div>
    )
}
export default Textarea