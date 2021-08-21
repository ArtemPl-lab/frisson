import { makeAutoObservable } from "mobx";
import api from "../api";

class TagsStore{
    list = []
    constructor(){
        makeAutoObservable(this);
    }
    async init(){
        const res = await api.get('/search-tags/');
        if(res.ok){
            this.list = await res.json();
            console.log(this.list);
        }
    }
}
export default TagsStore;