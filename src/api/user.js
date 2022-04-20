import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/session',
        method: 'post',
        data
    })
}

export function getInfo() {
    return request({
        url: '/user_info',
        method: 'get'
    })
}

export function logout() {
    return request({
        url: '/session',
        method: 'delete'
    })
}


export function userResetPassword(data) {
    return request({
        url: '/user_info',
        method: 'put',
        data
    })
}
