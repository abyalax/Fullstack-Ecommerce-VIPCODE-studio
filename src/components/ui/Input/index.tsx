import styles from "./input.module.scss"

type Propstypes = {
    label?: string;
    name: string;
    type: string;
    placholder?: string;
    defaultValue?: string;
    disabled?: boolean;
}

const Input = (props: Propstypes) => {
    const {label, name, type, placholder, defaultValue, disabled} = props 
    return (
        <div className={styles.container}>
            {label && <label htmlFor={name}>{label}</label>}
            <input name={name} id={name} type={type} placeholder={placholder} defaultValue={defaultValue} disabled={disabled} className={styles.container__input} />
        </div>
    )
}
export default Input;