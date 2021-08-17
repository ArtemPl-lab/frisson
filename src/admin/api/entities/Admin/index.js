import { AdminLocalApi } from "./localApi";
import { AdminServerApi } from "./serverApi";

export class AdminApi{
    static async auth(creds){
        const { auth_token } = await AdminServerApi.auth(creds);
        AdminLocalApi.auth(auth_token);
    }
    static async logout(){
        // await adminServerApi.logout();
        AdminLocalApi.logout();
    }
    static getAdmin(){
        return AdminServerApi.getAdmin();
    }
}