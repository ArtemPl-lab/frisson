import ChangesStore from "../../admin/store/ChangesStore";
import ManagerStore from "./ManagerStore";
import PlacesStore from "./PlacesStore";

class RootStore{
    constructor(){
        this.changes = new ChangesStore(this);
        this.manager = new ManagerStore(this);
        this.places = new PlacesStore(this);
        this.load = this.init();
    }
    async init(){
        await this.manager.init();
        await this.places.init();
        await this.changes.init();
    }
}

export default RootStore;
