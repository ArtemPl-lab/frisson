import ChangesStore from "./ChangesStore";
import CitiesStore from "./CitiesStore";
import DirectionsStore from "./DirectionsStore";
import ManagerStore from "./ManagerStore";
import PlacesStore from "./PlacesStore";
import TagsStore from "./TagsStore";

class RootStore{
    constructor(){
        this.changes = new ChangesStore(this);
        this.manager = new ManagerStore(this);
        this.places = new PlacesStore(this);
        this.directions = new DirectionsStore(this);
        this.tags = new TagsStore(this);
        this.cities = new CitiesStore(this);
        this.load = this.init();
    }
    async init(){
        await this.manager.init();
        await this.places.init();
        await this.directions.init();
        await this.tags.init();
        await this.cities.init();
        await this.changes.init();
    }
}

export default new RootStore;
