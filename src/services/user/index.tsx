import Instance from "@/lib/axios/instance";
const userServices = {
    getAllUsers: () => 
        Instance.get("/api/user"),
    updateUser: (id: string, data: any) => 
        Instance.put("/api/user", { id, data }),
    deleteUser: (id:string) => 
        Instance.delete(`/api/user/${id}`),
}
export default userServices;