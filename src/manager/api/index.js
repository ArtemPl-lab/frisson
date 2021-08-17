import { objectToUrl } from "../helpers";

class API{
    address
    constructor(address){
        this.address = address;
    }
    get authHeaders(){
        if(localStorage.managerToken){
            return({
                'X-Auth-Token': localStorage.managerToken
            });
        }
        return( {} );
    }
    get(path, params = {}){
        let query = this.address+path;
        if(Object.keys(params).length){
            query+=`?${objectToUrl(params)}`
        }
        return fetch(query, {
            method: 'GET',
            headers: this.authHeaders
        });
    }
    post(path, params = {}, body = {}){
        let query = this.address+path;
        if(Object.keys(params).length){
            query+=`?${objectToUrl(params)}`
        }
        return fetch(query, {
            method: 'POST',
            headers: this.authHeaders,
            body: JSON.stringify(body)
        }); 
    }
    put(path, params = {},  body = {}){
        let query = this.address+path;
        if(Object.keys(params).length){
            query+=`?${objectToUrl(params)}`
        }
        return fetch(query, {
            method: 'PUT',
            headers: this.authHeaders,
            body: JSON.stringify(body)
        });
    }
    patch(path, params = {}, body = {}){
        let query = this.address+path;
        if(Object.keys(params).length){
            query+=`?${objectToUrl(params)}`
        }
        return fetch(query, {
            method: 'PATCH',
            headers: this.authHeaders,
            body: JSON.stringify(body)
        });
    }
    delete(path, params = {}, body = {}){
        let query = this.address+path;
        if(Object.keys(params).length){
            query+=`?${objectToUrl(params)}`
        }
        return fetch(query, {
            method: 'DELETE',
            headers: this.authHeaders,
            body: JSON.stringify(body)
        });
    }
}

export default new API('https://api.frissonapp.com/v1');