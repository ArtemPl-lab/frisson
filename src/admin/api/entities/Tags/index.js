import { TagsLocalApi } from "./localApi";
import { TagsServerApi } from "./serverApi";

export class TagsApi{
    static async load(list){
        const tags = await TagsServerApi.load();
        TagsLocalApi.load(list, tags);
    }
    static async change(list, tag){
        const ok = await TagsServerApi.change(tag);
        if(ok){
            TagsLocalApi.change(list, tag);
        }
    }
    static async delete(tags, id){
        TagsLocalApi.delete(tags, id);
        await TagsServerApi.delete(id);
    }
    static async create(tags){
        const tag = await TagsServerApi.create();
        if(tag){
            TagsLocalApi.create(tags, {
                id: tag,
                name: 'Новый тег'
            });
        }
    }
}