import { post } from './request';


export function getUserList(data){
    return post({
        url:"/getUserList",
        data
    })
}


export function register(data){
    return post({
        url:"/joinInGame",
        data
    })
}