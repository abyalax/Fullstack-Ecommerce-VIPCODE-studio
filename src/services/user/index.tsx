import Instance from "@/lib/axios/instance";
const userServices = {
    getAllUsers: () => 
        Instance.get("/api/user"),
    updateUser: (id: string, data: any, token: string) => 
        Instance.put(
            `/api/user/${id}`,
             { data },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }),
    deleteUser: (id:string, token: string) => 
        Instance.delete(
            `/api/user/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        ),
    getProfile: (token: string) => 
        Instance.get("/api/user/profile",{
            headers: {
                Authorization: `Bearer ${token}`
            },
        }),

    updateProfile: (data: any, token: string) => 
        Instance.put(
            `/api/user/profile/`,
            { data },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }),
}
export default userServices;