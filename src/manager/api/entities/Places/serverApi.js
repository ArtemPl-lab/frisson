import api from "../..";

class PlacesServerApi{
    static async load(){
        const res = await api.get('/managers/places');
        return (res.ok ? await res.json() : null);
    }
    static async getPlace(id){
        const res = await api.get(`/places/${id}`);
        let place = (res.ok ? await res.json() : null);
        if(res.ok){
            try{
                place = {
                    ...place,
                    work_time: JSON.parse(place.work_time)
                }
            }
            catch{
                place = {
                    ...place,
                    work_time: []
                }
            }
        }
        return place;
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
        // const res = await api.post(`/managers/places/${placeId}/images`, {}, fd);
        const res = await fetch(`${api.address}/managers/places/${placeId}/images`, {
            method: 'POST',
            headers: api.authHeaders,
            body: fd
        });
        const { ids } = await res.json();
        const [id] = ids;
        return id;
    }
    static async updatePlace(place){
        place = {
            ...place,
            work_time: JSON.stringify(place.work_time)
        }
        await api.put(`/managers/places/${place.id}?${place.image_ids.map(el => `image_ids=${el}&`).join('')}`, {}, place);
    }
    static async create(data){
        const res = await api.post(`/managers/places/`, {}, JSON.stringify(data));
        return (res.ok ? await res.json() : null);
    }
}
export default PlacesServerApi;