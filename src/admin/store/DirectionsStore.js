import { makeAutoObservable } from "mobx";
import api from "../api";

class DirectionsStore{
    list = []
    root
    constructor(root){
        this.root = root;
        makeAutoObservable(this, {
            root: false
        });
    }
    updateGroup(group){
        this.list = this.list.map(direction => direction.id === group.id ? group : direction);
        this.root.changes.add(`update_group_${group.id}`, () => api.put(`/activities/group/${group.id}`, {
            name: group.name,
            icon: group.icon
        }));
    }
    async createGroup(){
        const res = await api.post(`/activities/group/`, {
            name: 'Новая группа активностей',
            icon: 'unknown'
        });
        const json = await res.json();
        this.list.push({
            id: json,
            icon: 'unknown',
            name: 'Новая группа активностей',
            types: []
        });
    }
    updateType(activity){
        this.list = this.list.map(direction => ({
                ...direction,
                types: direction.types.map(type => {
                    return type.id === activity.id ? activity : type;
                })
            })
        );
        this.root.changes.add(`update_type_${activity.id}`, () => api.put(`/activities/type/${activity.id}`, activity));
    }
    async createType(idGroup){
        const res = await api.post(`/activities/type/`, {
            activity_group_id: idGroup,
            name: 'Новый тип активности'
        });
        if(res.ok){
            const json = await res.json();
            const grupIndex = this.list.findIndex(el => el.id === idGroup);
            this.list[grupIndex].types.push({
                id: json,
                name: 'Новый тип активности'
            });
        }
        else{
            alert('Не удалось добавить активность!');
        }
    }
    async deleteType(id){
        const res = await api.delete(`/activities/type/`, {
            id
        });
        if(res.ok){
            this.list = this.list.map(direction => ({
                    ...direction,
                    types: direction.types.filter(type => type.id !== id)
                })
            );
        }
        else{
            alert('Не удалось удвлить активность!');
        }
    }
    async init(){
        const res = await api.get('/activities/');
        if(res.ok) this.list = await res.json();
    }
}

export default DirectionsStore;