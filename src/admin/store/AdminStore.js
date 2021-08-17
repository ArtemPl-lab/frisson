import { makeAutoObservable } from "mobx";
import { AdminApi } from "../api/entities";

class AdminStore{
    root
    token
    data = null;
    constructor(root){
        this.root = root;
        this.auth = this.auth.bind(this);
        this.logout = this.logout.bind(this);
        this.init = this.init.bind(this);
        makeAutoObservable(this, {
            root: false
        });
    }
    async auth(creds){
         await AdminApi.auth(creds);
         await this.root.init();
    }
    async logout(){
        await AdminApi.logout();
        await this.root.init();
    }
    async init(){
        if(!localStorage.adminToken) {
            this.token = "";
            this.data = null;
            return;
        }
        const admin = await AdminApi.getAdmin();
        if (admin) {
            this.token = localStorage.adminToken;
            this.data = admin;
        } else {
            await this.logout();
        }
    }
}

export default AdminStore;