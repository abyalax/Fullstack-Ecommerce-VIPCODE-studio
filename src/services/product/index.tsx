import Instance from "@/lib/axios/instance";

const endpoint = "/api/product"

const productServices = {
    getAllProducts: () =>
        Instance.get(endpoint),
    getDetailProduct: (id: string) =>
        Instance.get(`${endpoint}/${id}`),

    addProduct: (data: any) =>
        Instance.post(endpoint, data,),

    updateProduct: (id: string, data: any) =>
        Instance.put(`${endpoint}/${id}`, { data }),

    deleteProduct: (id: string) =>
        Instance.delete(`${endpoint}/${id}`),
}
export default productServices