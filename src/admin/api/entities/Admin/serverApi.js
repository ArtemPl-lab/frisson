import api from "../..";

export class AdminServerApi{
    static async auth(creds){
        const res = await api.post('/admins/token/', creds);
        return (res.ok ? await res.json() : null);

    }
    static async logout(){
        const res = await api.delete('/admins/delete');
        return (res.ok ? await res.json() : null);
    }
    static async getAdmin(){
        const res = await api.get('/admins/');
        return (res.ok ? await res.json() : null);
    }
}