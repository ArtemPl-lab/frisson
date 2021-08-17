import ActivitiesStore from "./ActivitiesStore";
import AdminStore from "./AdminStore";
import ChangesStore from "./ChangesStore";
import ManagersStore from "./ManagersStore";
import TagsStore from "./TagsStore";

class RootStore{
    constructor(){
        this.admin = new AdminStore(this);
        this.managers = new ManagersStore(this);
        this.tags = new TagsStore(this);
        this.activities = new ActivitiesStore(this);
        this.changes = new ChangesStore(this);
        this.load = this.init();
    }
    async init(){
        await this.admin.init();
        await this.managers.init();
        await this.tags.init();
        await this.activities.init();
        await this.changes.init();
    }
}

export default RootStore;
