import Instance from "@/lib/axios/instance";

const endpoint = {
    transaction: "/api/transaction",
}

const transactionServices = {
    getAllTransaction: () => 
        Instance.get(`${endpoint.transaction}/admin`),
    getTransaction: (order_id: string) =>
        Instance.get(`${endpoint.transaction}?order_id=${order_id}`),
    generateTransaction: (data: any) =>
        Instance.post(endpoint.transaction, data),
    updateTransaction: (order_id: string) =>
        Instance.put(`${endpoint.transaction}?order_id=${order_id}`),
}
export default transactionServices;