
export class ManagerLocalApi{
    static auth(token){
        localStorage.managerToken = token;
    }
    static logout(){
        localStorage.managerToken = "";
    }
}