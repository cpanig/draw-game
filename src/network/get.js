import { get } from './request'

export function getUserList(){
    return get({
        url:"/getUserList"
    })
}

export function getAvatarList(){
    return get({
        url:"/getAvatarList"
    })
}