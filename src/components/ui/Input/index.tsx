import styles from "./input.module.scss"

type Propstypes = {
    label?: string;
    name: string;
    type: string;
    placholder: string;
}

const Input = (props: Propstypes) => {
    const {label, name, type, placholder} = props 
    return (
        <div className={styles.container}>
            {label && <label htmlFor={name}>{label}</label>}
            <input name={name} id={name} type={type} placeholder={placholder} className={styles.container__input} />
        </div>
    )
}
export default Input;