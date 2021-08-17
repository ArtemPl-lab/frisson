import { makeAutoObservable } from "mobx";
import api from "../../manager/api";

class ActivitiesStore{
    list = [];
    constructor(root){
        makeAutoObservable(this, {
            root: false
        });
    }

    async init(){
        const res = await api.get(`/activities/`);
        if(res.ok){
            this.list = await res.json();
        }
    }
}

export default ActivitiesStore;