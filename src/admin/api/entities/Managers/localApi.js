
export class ManagersLocalApi{
    static load(managers, loaded_managers){
        Object.assign(managers, managers.concat(loaded_managers))
    }
    static search(managers, result){
        managers.splice(0,managers.length);
        if(result) managers.push(result);
    }
}