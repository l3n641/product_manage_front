import request from '@/utils/request'

export function getCollectionProduct(params) {
    return request({
        url: '/collection_product',
        method: 'get',
        params
    })
}
