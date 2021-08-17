import api from "../..";

export class ManagerServerApi{
    static async auth(creds){
        const res = await api.post('/managers/token/', creds);
        return (res.ok ? await res.json() : null);
    }
    static async register(creds){
        const res = await api.post('/managers/', creds);
        return (res.ok ? await res.json() : null);
    }
    static async logout(){
        const res = await api.delete('/managers/delete');
        return (res.ok ? await res.json() : null);
    }
    static async getManager(){
        const res = await api.get('/managers/');
        return (res.ok ? await res.json() : null);
    }
}