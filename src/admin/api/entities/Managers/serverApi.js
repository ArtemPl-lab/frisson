import api from "../..";

export class ManagersServerApi{
    static async load(managers){
        const res = await api.get('/admins/search/', {
            limit: 20,
            offset: managers.length
        });
        return (res.ok ? await res.json() : null);
    }
    static async search(query){
        const res = await api.get('/admins/search/by-manager-or-place-id', {
            some_id : query
        });
        return (res.ok ? await res.json() : null);
    }
}