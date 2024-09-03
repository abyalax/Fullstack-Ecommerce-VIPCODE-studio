import { Dispatch, SetStateAction } from "react"
import styles from "./Input.module.scss"

type PropTypes = {
    uploadedImage: File | null
    setUploadedImage: Dispatch<SetStateAction<File | null>>
    name: string
}

const InputFile = (props: PropTypes) => {
    const { uploadedImage, setUploadedImage, name } = props
    return (
        <div className={styles.file}>
            <label htmlFor={name} className={styles.file__label}>
                {uploadedImage?.name ?
                    <p>{uploadedImage.name}</p> :
                    <>
                        <p>Upload a new Image, Larger image will be resized automatically</p>
                        <p>Maximum upload size is <b>1 MB</b></p>
                    </>
                }
            </label>
            <input
                type="file"
                name={name}
                id={name}
                onChange={(e: any) => {
                    e.preventDefault()
                    setUploadedImage(e.currentTarget.files[0])
                }}
                className={styles.file__input}
            />
        </div>
    )
}
export default InputFile