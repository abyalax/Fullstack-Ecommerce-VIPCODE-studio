export type ToasterType = {
    toaster?: {
        variant?: string
        message?: string
    },
    setToaster?: React.Dispatch<React.SetStateAction<{}>>
}

export type VariantToaster = {
    [key: string]: {
        title: string
        icon: string
        color: string
        barColor: string
    }
}