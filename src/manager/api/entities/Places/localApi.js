
class PlacesLocalApi{
    static load(list, places){
        Object.assign(list, places);
    }
    static getReviews(place, reviews){
        Object.assign(place, {
            ...place,
            reviews
        });
    }
    static getFrissonReview(place, frisson_review){
        Object.assign(place, {
            ...place,
            frisson_review
        });
    }
    static loadImageFromGallery(place, imageId){
        Object.assign(place, {
            ...place,
            image_ids: [...place.image_ids, imageId]
        });
    }
    static removeImageFromGallery(place, imageId){
        Object.assign(place, {
            ...place,
            image_ids: place.image_ids.filter(el => el !== imageId)
        });
    }
    static updatePlace(prev, next){
        Object.assign(prev, next);
    }
}
export default PlacesLocalApi;