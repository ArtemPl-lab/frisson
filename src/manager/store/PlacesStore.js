import { makeAutoObservable } from "mobx";
import PlacesApi from "../api/entities/Places";

class PlacesStore{
    list = [];
    current = null;
    loadind = false;
    constructor(){
        makeAutoObservable(this);
    }
    async getPlace(id){
        if(id === 'new') {
            this.current = {
                "city_id":1,
                "name":"Новая активность",
                "activity_type_id":4,
                "search_tag_ids":[1],
                "description":"",
                "address":"просп. Ленинградский, д. 80, корп. 11",
                "feature":"Оплата только наличными",
                "latitude":55.22736761564399,
                "longitude":37.17164476680282,
                "phones":[],
                "site_web":"https://example.com",
                "site_facebook":"https://example.com",
                "site_vk":"https://example.com",
                "site_instagram":"https://example.com",
                "site_youtube":"https://example.com",
                "site_twitter":"https://example.com",
                "work_time":"12:00-22:00 ежедневно",
                "id":11,
                "image_ids":[85,86,87,88,89,90,91,92,93,94],
                "rating_average":null,
                "ratings_count":0,
                "reviews":[],
                "badges":["new"],
                "created_at":"2021-08-04",
                "discounts":[{"name":"Больше вкуса!","short_description":"Бесплатный кофе по выходным","full_description":"Каждый год мы стараемся привлечь как можно больше клиентов и зачем резкое снижение количества клиентов по выходным, поэтому решили провести такую акцию","id":17,"image_id":1285},{"name":"Море радости","short_description":"Досуг для детей по высокой скидке","full_description":"Не знаете, чем занять детей? Пока вы отдыхаете, мы присмотрим за ними! Профессиональные аниматоры будут развлекать вашего ребенка часами!","id":18,"image_id":1285}],"amenities":[{"name":"Вход для одного человека","description":"В стоимость входит посещение заведения для одного человека, прокат самоката на 30 минут и обед в местном кафе за счет сервиса","cost_value":1500,"cost_currency":"₽","id":684},{"name":"Вход для семьи","description":"В стоимость входит билет в заведение для всей семьи, бесплатная экскурсия по месту и выделенный фотограф. Стоимость фотоальбома рекомендуем уточнить, связавшись с нами","cost_value":3470,"cost_currency":"₽","id":685}]};
            return;
        };
        this.loadind = true;
        const data = await PlacesApi.getPlace(id);
        this.current = data;
        this.loadind = false;
    }
    load(){
        return PlacesApi.load(this.list);
    }
    init(){
        return this.load();
    }
}

export default PlacesStore;