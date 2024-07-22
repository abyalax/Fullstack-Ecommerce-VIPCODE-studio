import Instance from "@/lib/axios/instance";
const productServices = {
    getAllProducts: () =>
        Instance.get("/api/product"),
    addProduct: (data: any, token: string) =>
        Instance.post("/api/product", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    updateProduct: (id: string, data: any, token: string) =>
        Instance.put(`/api/product/${id}`, { data }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    deleteProduct: (id: string, token: string) =>
        Instance.delete(
            `/api/product/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        ),
}
export default productServices