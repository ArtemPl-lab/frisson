import PlacesLocalApi from "./localApi";
import PlacesServerApi from "./serverApi";

class PlacesApi{
    static async load(list){
        const places = await PlacesServerApi.load();
        if(places){
            PlacesLocalApi.load(list, places);
        }
    }
    static async getPlace(id){
        return await PlacesServerApi.getPlace(id);
    }
    static async getReviews(place){
        const reviews = await PlacesServerApi.getReviews(place.id);
        PlacesLocalApi.getReviews(place, reviews);
    }
    static async getFrissonReview(place){
        const review = await PlacesServerApi.getFrissonReview(place.id);
        PlacesLocalApi.getFrissonReview(place, review);
    }
    static async loadImageFromGallery(place, file){
        const imageId = await PlacesServerApi.loadImageFromGallery(place.id, file);
        PlacesLocalApi.loadImageFromGallery(place, imageId);
    }
    static async removeImageFromGallery(place, imageId){
        PlacesLocalApi.removeImageFromGallery(place, imageId);
        await PlacesServerApi.updatePlace(place);
    }
    static async update(prev, next){
        PlacesLocalApi.updatePlace(prev, next);
        await PlacesServerApi.updatePlace(next);
    }
    static create(data){
        return PlacesServerApi.create(data);
    }
}
export default PlacesApi;