import { useContext, useEffect, useRef, useState } from "react"
import styles from "./Toaster.module.scss"
import { ToasterContext } from "@/context/ToasterContext"
import { ToasterType, VariantToaster } from "@/types/toaster.type"

const toasterVariant: VariantToaster = {
    success: {
        title: 'Success',
        icon: 'bx bx-check-circle',
        color: '#2bff00',
        barColor: '#22a607',
    },
    danger: {
        title: 'Error',
        icon: 'bx bx-check-circle',
        color: '#f39b9a',
        barColor: '#bb2525',
    },
    warning: {
        title: 'Warning',
        icon: 'bx bx-check-circle',
        color: '#f8e3a2',
        barColor: '#e9b949',
    },
}


const Toaster = () => {
    const {toaster, setToaster}: ToasterType = useContext(ToasterContext)
    const [lengthBar, setLengthBar] = useState(100)
    const timerRef = useRef<any>(null)

    const timerStart = () => {
        timerRef.current = setInterval(() => {
            setLengthBar((prevLength) => prevLength - 0.18)
        }, 1)
    }

    useEffect(() => {
        timerStart()
        return () => clearInterval(timerRef.current)
    }, [])

    useEffect(() => {
        if (lengthBar < 0 ) {
            setToaster({})
        }
    }, [lengthBar, setToaster])

    return (
        <div className={`${styles.toaster} ${styles[`toaster--${toaster.variant}`]}`}>
            <div className={styles.toaster__main}>
                <div className={styles.toaster__main__icon}>
                <i className={`bx ${toasterVariant[`${toaster.variant}`].icon}`} style={{color: toasterVariant[`${toaster.variant}`].barColor}}/>
                </div>
                <div className={styles.toaster__main__text}>
                    <p className={styles.toaster__main__title}>{toasterVariant[`${toaster.variant}`].title}</p>
                    <p className={styles.toaster__main__description}>{toaster.message}</p>
                </div>
                <i className={`bx bx-x ${styles.toaster__main__close}`} onClick={() => setToaster({})}/>
            </div>
            <div className={`${styles.toaster__timer}`}
                style={{
                    backgroundColor: toasterVariant[`${toaster.variant}`].color
                }}>
                <div style={{
                    width: `${lengthBar}%`,
                    height: '100%',
                    backgroundColor: toasterVariant[`${toaster.variant}`].barColor
                }}/>
            </div>
        </div>
    )
}
export default Toaster