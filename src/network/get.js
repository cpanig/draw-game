import { get } from './request'

export function getUserList(){
    return get({
        url:"/getUserList"
    })
}