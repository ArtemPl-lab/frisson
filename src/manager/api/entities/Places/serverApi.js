import api from "../..";

class PlacesServerApi{
    static async load(){
        const res = await api.get('/managers/places');
        return (res.ok ? await res.json() : null);
    }
    static async getPlace(id){
        const res = await api.get(`/places/${id}`);
        return (res.ok ? await res.json() : null);
    }
}
export default PlacesServerApi;