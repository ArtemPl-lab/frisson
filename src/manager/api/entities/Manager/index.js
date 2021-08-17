import { ManagerLocalApi } from "./localApi";
import { ManagerServerApi } from "./serverApi";

export class ManagerApi{
    static async auth(creds){
        const { auth_token } = await ManagerServerApi.auth(creds);
        ManagerLocalApi.auth(auth_token);
    }
    static async register(creds){
        const { manager_id } = await ManagerServerApi.register(creds);
        return manager_id;
    }
    static async logout(){
        // await ManagerServerApi.logout();
        ManagerLocalApi.logout();
    }
    static getManager(){
        return ManagerServerApi.getManager();
    }
}