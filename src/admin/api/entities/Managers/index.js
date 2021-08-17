import { ManagersLocalApi } from "./localApi";
import { ManagersServerApi } from "./serverApi";

export class ManagersApi{
    static async load(managers){
        const mngrs = await ManagersServerApi.load(managers);
        ManagersLocalApi.load(managers, mngrs);
        return mngrs;
    }
    static async search(managers, query){
        const result = await ManagersServerApi.search(query);
        if(result) {
            ManagersLocalApi.search(managers, result);
        } else {
            ManagersLocalApi.search(managers, null);
        }
    }
}