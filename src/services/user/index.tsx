import Instance from "@/lib/axios/instance";

const endpoint = {
    user: "/api/user",
    profile: "/api/user/profile",
    cart: "/api/user/cart"
}

const userServices = {
    getAllUsers: () =>
        Instance.get(endpoint.user),

    updateUser: (id: string, data: any) =>
        Instance.put(`${endpoint.user}/${id}`, { data }),

    deleteUser: (id: string) =>
        Instance.delete(`${endpoint.user}/${id}`),

    getProfile: () =>
        Instance.get(endpoint.profile),

    updateProfile: (data: any) =>
        Instance.put(endpoint.profile, { data }),

    getCart: () =>
        Instance.get(endpoint.cart),

    addToCart: (data: any) =>
        Instance.put(endpoint.cart, { data }),
}
export default userServices;