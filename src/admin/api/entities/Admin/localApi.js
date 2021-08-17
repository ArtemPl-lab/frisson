
export class AdminLocalApi{
    static auth(token){
        localStorage.adminToken = token;
    }
    static logout(){
        localStorage.adminToken = "";
    }
}