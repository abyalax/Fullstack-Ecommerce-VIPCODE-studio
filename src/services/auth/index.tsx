import Instance from "@/lib/axios/instance";
const authServices = {
    registerAccount: (data: any) => Instance.post("/api/user/register", data),
}
export default authServices;
