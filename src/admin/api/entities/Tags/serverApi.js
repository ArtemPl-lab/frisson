import api from "../..";


export class TagsServerApi{
    static async load(){
        const res = await api.get('/search-tags/');
        return (res.ok ? await res.json() : null);
    }
    static async change(tag){
        const res = await api.put('/search-tags/', tag);
        return (res.ok ? await res.json() : null);
    }
    static async delete(id){
        const res = await api.delete('/search-tags/', {
            id
        });
        return (res.ok ? await res.json() : null);
    }
    static async create(){
        const res = await api.post('/search-tags/', {
            name: 'Новый тег'
        });
        return (res.ok ? await res.json() : null);
    }
}