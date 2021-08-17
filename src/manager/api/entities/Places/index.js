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
}
export default PlacesApi;