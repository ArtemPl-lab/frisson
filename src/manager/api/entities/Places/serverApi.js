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
    static async getReviews(placeId){
        const res = await api.get(`/places/${placeId}/reviews`);
        return (res.ok ? await res.json() : null);
    }
    static async getFrissonReview(placeId){
        const res = await api.get(`/places/${placeId}/reviews/frisson`);
        return (res.ok ? await res.json() : null);
    }
    static async loadImageFromGallery(placeId, file){
        const fd = new FormData();
        fd.append('photos', file);
        const res = await api.post(`/managers/places/${placeId}/images`, {}, fd);
        const { ids } = await res.json();
        const [id] = ids;
        return id;
    }
    static async updatePlace(place){
        await api.put(`/managers/places/${place.id}?${place.image_ids.map(el => `image_ids=${el}&`).join('')}`, {}, place);
    }
    static async create(data){
        const res = await api.post(`/managers/places/`, {}, JSON.stringify(data));
        return (res.ok ? await res.json() : null);
    }
}
export default PlacesServerApi;