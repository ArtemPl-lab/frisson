import { makeAutoObservable } from "mobx";
import api from "../api";

class DirectionsStore{
    list = []
    constructor(){
        makeAutoObservable(this);
    }
    async init(){
        const res = await api.get('/activities/');
        if(res.ok) this.list = await res.json();
    }
}

export default DirectionsStore;