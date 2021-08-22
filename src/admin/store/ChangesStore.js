import { makeAutoObservable } from "mobx";
class ChangesStore{
    hasChanges = false;
    changes = [];
    constructor(){
        makeAutoObservable(this);
    }
    add(slug, callback){
        if(!slug || !callback) throw "Передал не все аргументы в addChange";
        this.changes = this.changes.filter(c => c.slug !== slug);
        this.changes.push({
            slug,
            callback
        });
        this.hasChanges = true;
    }
    remove(slug){
        if(!slug) throw "Передал не все аргументы в removeChange";
        this.changes = this.changes.filter(c => c.slug !== slug);
        if(!this.changes.length) this.hasChanges = false;
    }
    save(){
        if(!this.hasChanges) return;
        this.changes.forEach(c => c.callback());
        this.hasChanges = false;
        alert('Изменения сохранены!');
    }
    clear(){
        this.changes = [];
        this.hasChanges = false;
    }
    async init(){
        this.changes = [];
        this.hasChanges = false;
    }
}

export default ChangesStore;