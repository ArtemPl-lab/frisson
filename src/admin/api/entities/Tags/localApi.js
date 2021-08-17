
export class TagsLocalApi{
    static load(list, tags){
        Object.assign(list, tags);
    }
    static change(tags, tag){
        const index = tags.findIndex(el => el.id === tag.id);
        if(index === -1) return;
        Object.assign(tags[index], {
            ...this.list[index],
            name: tag.name
        });
    }
    static create(tags, tag){
        tags.push(tag);
    }
    static delete(tags, id){
        const fltr = tags.filter(el => el.id !== id);
        tags.splice(0,tags.length);
        Object.assign(tags, fltr);
    }
}