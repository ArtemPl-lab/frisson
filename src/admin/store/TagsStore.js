import { makeAutoObservable } from "mobx";
import { TagsApi } from "../api/entities/Tags";

class TagsStore{
    list = []
    root
    constructor(root){
        this.root = root;
        makeAutoObservable(this, {
            root: false
        });
    }
    load(){
        return TagsApi.load(this.list);
    }
    change(tag){
        const index = this.list.findIndex(el => el.id === tag.id);
        if(index === -1) return;
        this.list[index] = {
            ...tag,
            name: tag.name
        }
        this.root.changes.add(`change_tag_${tag.id}`, ()=>TagsApi.change(this.list, tag));
    }
    async delete(id){
        // this.list = this.list.filter(el => el.id !== id);
        await TagsApi.delete(this.list, id);
    }
    async create(){
        await TagsApi.create(this.list);
    }
    async init(){
        await this.load();
    }
}

export default TagsStore;