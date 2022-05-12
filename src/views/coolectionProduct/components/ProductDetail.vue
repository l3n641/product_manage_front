<template>
  <el-row>
    <el-col :span="24">
      <el-card shadow="never">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="填写商品信息"/>
          <el-step title="填写商品属性"/>
        </el-steps>
        <product-info-detail
            v-show="showStatus[0]"
            :productData="productData"
            @nextStep="nextStep"
        />
        <product-attr-detail
            v-show="showStatus[1]"
            :productData="productData"
            @finishCommit="finishCommit"
            @prevStep="prevStep"
        />
      </el-card>

    </el-col>

  </el-row>

</template>
<script>
import ProductInfoDetail from './ProductInfoDetail.vue'
import ProductAttrDetail from './ProductAttrDetail.vue'
import { reactive, ref } from "vue";
import { getCollectionProductDetail } from "../../../api/collectionProduct";
import { useRouter } from 'vue-router'

const defaultProductParam = {
  spu: '',
  name: '',
  goods_list: [],
  description: '',
  main_picture: '',
  product_extra_image: [],
  product_gallery: [],
}
export default {
  name: 'ProductDetail',
  components: { ProductInfoDetail, ProductAttrDetail },
  setup() {
    const formData = reactive(defaultProductParam)
    let productData = reactive({})
    const active = ref(0)
    const showStatus = reactive([true, false])
    const router = useRouter()

    const getData = () => {
      const collectionProductId = router.currentRoute.value.query.collectionProductId
      getCollectionProductDetail(collectionProductId).then(res => {
        productData.spu = res.spu
        productData.name = res.name
        productData.goods_list = res.goods_list
        productData.description = res.description
        productData.main_picture = res.main_picture
        productData.product_extra_image = res.product_extra_image
        productData.product_gallery = res.product_gallery
        productData.colors = res.colors
        productData.size_chart = res.size_chart
      })
    }

    getData()
    const hideAll = () => {
      for (let i = 0; i < showStatus.length; i++) {
        showStatus[i] = false
      }
    }


    const prevStep = () => {
      if (active.value > 0 && active.value < showStatus.length) {
        active.value = active.value - 1
        hideAll()
        showStatus[active.value] = true
      }
    }

    const nextStep = (data) => {
      if (active.value < showStatus.length - 1) {
        active.value = active.value + 1
        hideAll()
        showStatus[active.value] = true

        formData.spu = data.spu
        formData.name = data.name
      }
    }

    const finishCommit = (data) => {
      formData.goods_list = data.goods_list
      formData.description = data.description
      formData.main_picture = data.main_picture
      formData.product_extra_image = data.product_extra_image
      formData.product_gallery = data.product_gallery

    }
    return {
      active,
      productData,
      formData,
      showStatus,
      prevStep,
      nextStep,
      finishCommit
    }
  },
}
</script>
<style>
</style>

