import { makeAutoObservable } from "mobx";
import api from "../api";
import { ManagerApi } from "../api/entities";

class ManagerStore{
    root
    token
    data = null;
    update_callback = null;
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
         await ManagerApi.auth(creds);
         await this.root.init();
    }
    async register(creds){
        const id = await ManagerApi.register(creds);
        if(id) await this.auth(creds);
    }
    async logout(){
        await ManagerApi.logout();
        await this.root.init();
    }
    update(data, history){
        this.data = {
            ...this.data,
            ...data
        }
        this.root.changes.add(`managers_update`, ()=>new Promise((resolve, reject) => {
            this.update_callback = resolve;
            history.push(`${history.location.pathname}/confirm_phone/${this.data.phone}`);
        }));
    }
    async init(){
        if(!localStorage.managerToken) {
            this.token = "";
            this.data = null;
            return;
        }
        const manager = await ManagerApi.getManager();
        if (manager) {
            this.token = localStorage.managerToken;
            this.data = manager;
        } else {
            await this.logout();
        }
    }
}

export default ManagerStore;