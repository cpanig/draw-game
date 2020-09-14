import { post } from './request';


export function getUserList(data){
    return post({
        url:"/getUserList",
        data
    })
}


export function joinInGame(data){
    return post({
        url:"/joinInGame",
        data
    })
}