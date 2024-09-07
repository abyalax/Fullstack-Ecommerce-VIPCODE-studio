import Instance from "@/lib/axios/instance";

const endpoint = {
    transaction: "/api/transaction",
}

const transactionServices = {
    generateTransaction: (data: any) =>
        Instance.post(endpoint.transaction, data),
}
export default transactionServices;