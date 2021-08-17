import { makeAutoObservable } from "mobx";
import { ManagersApi } from "../api/entities/Managers";

class ManagersStore{
    list = [];
    loading = false;
    loadingEnd = false;
    constructor(){
        makeAutoObservable(this);
    }
    async load(){
        if(this.loading || this.loadingEnd) return;
        this.loading = true;
        const newMngrs = await ManagersApi.load(this.list);
        if(!newMngrs.length) this.loadingEnd = true
        this.loading = false;
    }
    delete(id){
        this.list = this.list.filter(el => el.manager_id !== id);
    }
    update(id, changes){
        const index = this.list.findIndex(el => el.manager_id === id);
        this.list[index] = {
            ...this.list[index],
            ...changes
        };
        console.log(this.list[index]);
    }
    search(query){
        if(query === '') {
            this.init();
            return;
        }
        return ManagersApi.search(this.list, query);
    }
    async init(){
        this.list = [];
        this.loading = false;
        this.loadingEnd = false;
        await this.load();
    }
}

export default ManagersStore;