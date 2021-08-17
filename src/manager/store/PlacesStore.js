import { makeAutoObservable } from "mobx";
import PlacesApi from "../api/entities/Places";

class PlacesStore{
    list = []
    constructor(){
        makeAutoObservable(this);
    }
    load(){
        return PlacesApi.load(this.list);
    }
    init(){
        return this.load();
    }
}

export default PlacesStore;