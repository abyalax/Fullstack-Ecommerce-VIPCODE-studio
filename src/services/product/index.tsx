import Instance from "@/lib/axios/instance";
const productServices = {
    getAllProducts: () =>
        Instance.get("/api/product"),
}
export default productServices