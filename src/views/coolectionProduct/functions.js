import { generateSkuCode } from "@/functions.js";

export function refreshProduct(colors, sizes) {
    let goodsList = []
    if (colors.length > 0 && sizes.length > 0) {
        for (const color of colors) {
            for (const size of sizes) {
                const goods = {
                    sku: generateSkuCode(),
                    size: size.key,
                    color: color,
                    weight: null,
                    length: null,
                    width: null,
                    height: null,
                    price: null,
                    goods_image: null,
                    goods_attrs: {},
                    goods_extra_image: [],
                }
                goodsList.push(goods)
            }
        }
    } else {
        if (colors.length > 0) {
            for (const color of colors) {
                const goods = {
                    sku: generateSkuCode(),
                    size: null,
                    color: color,
                    weight: null,
                    length: null,
                    width: null,
                    height: null,
                    price: null,
                    goods_image: null,
                    goods_attrs: {},
                    goods_extra_image: [],
                }
                goodsList.push(goods)
            }
        }

        if (colors.length > 0) {
            for (const size of sizes) {
                const goods = {
                    sku: generateSkuCode(),
                    size: size.key,
                    color: null,
                    weight: null,
                    length: null,
                    width: null,
                    height: null,
                    price: null,
                    goods_image: null,
                    goods_attrs: {},
                    goods_extra_image: [],
                }
                goodsList.push(goods)
            }
        }
    }

    return goodsList

}


