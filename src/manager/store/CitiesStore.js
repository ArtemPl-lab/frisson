import { makeAutoObservable } from "mobx";
import api from "../api";

class CitiesStore{
    list = []
    constructor(){
        makeAutoObservable(this);
    }
    async init(){
        const res = await api.get('/cities');
        if(res.ok){
            this.list = await res.json();
            console.log(this.list);
        }
    }
}

export default CitiesStore;