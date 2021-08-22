import { makeAutoObservable } from "mobx";
import api from "../api";
import PlacesApi from "../api/entities/Places";

class PlacesStore{
    list = [];
    current = null;
    loadind = false;
    constructor(){
        makeAutoObservable(this);
    }
    async getPlace(id){
        this.loadind = true;
        if(id === 'new') {
            this.current = {
                "city_id":1,
                "name":"",
                "activity_type_id":4,
                "search_tag_ids":[],
                "description":"",
                "address":"",
                "feature":"Оплата только наличными",
                "latitude":55.22736761564399,
                "longitude":37.17164476680282,
                "phones":[],
                "site_web":"",
                "site_facebook":"",
                "site_vk":"",
                "site_instagram":"",
                "site_youtube":"",
                "site_twitter":"",
                "work_time":"12:00-22:00 ежедневно",
                "image_ids":[],
                "rating_average":null,
                "ratings_count":0,
                "reviews":[],
                "badges":["new"],
                "created_at":"2021-08-04",
                "discounts":[]
            };
            this.loadind = false;
            return;
        };
        const data = await PlacesApi.getPlace(id);
        this.current = data;
        await PlacesApi.getReviews(this.current);
        await PlacesApi.getFrissonReview(this.current);
        this.loadind = false;
    }
    load(){
        return PlacesApi.load(this.list);
    }
    loadImageFromGallery(file){
        return PlacesApi.loadImageFromGallery(this.current, file)
    }
    removeImageFromGallery(imageId){
        return PlacesApi.removeImageFromGallery(this.current, imageId);
    }
    update(place){
        return PlacesApi.update(this.current, place);
    }
    async create(data){
        await PlacesApi.create(data);
        this.load();
    }
    delete_current(){
        return this.delete(this.current.id);
    }
    async delete(id){
        const res = await api.delete(`/managers/places/${id}`);
        if(res.ok){
            this.list = this.list.filter(el => el.id !== id);
        }
    }
    async init(){
        this.load();
    }
}

export default PlacesStore;