<template>
  <div style="margin-top: 50px">
    <el-form ref="productAttrForm" :model="formData">
      <el-form-item label="商品规格：">
        <el-card shadow="never" class="cardBg">
          <div>
            颜色：
            <el-checkbox-group v-model="formData.colors">
              <el-checkbox :label="item" v-for="(item,index) in productColorAttribute" :key="index"/>
            </el-checkbox-group>
          </div>
          <div>
            尺码：
            <el-checkbox-group v-model="formData.size_chart">
              <el-checkbox :label="item" v-for="(item,index) in productSizeChartAttribute" :key="index">{{ item.key }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>

        <el-table
            class="goods_table"
            style="width: 100%;margin-top: 20px"
            :data="formData.goods_list"
            border
        >
          <el-table-column type="index" width="50"/>
          <el-table-column label="颜色" width="200" align="center">
            <template #default="scope">
              <el-input v-model="scope.row.color"/>
            </template>
          </el-table-column>
          <el-table-column label="尺码" width="200" align="center">
            <template #default="scope">
              <el-input v-model="scope.row.size"/>
            </template>
          </el-table-column>

          <el-table-column label="重量(g)" width="100" align="center">
            <template #default="scope">
              <el-input v-model="scope.row.weight"/>
            </template>
          </el-table-column>
          <el-table-column label="体积(cm)" width="100" align="center">
            <template #default="scope">
              <el-input v-model="scope.row.length" placeholder="长"/>
              <el-input v-model="scope.row.width" placeholder="宽"/>
              <el-input v-model="scope.row.height" placeholder="高"/>
            </template>
          </el-table-column>

          <el-table-column label="SKU编号" width="200" align="center">
            <template #default="scope">
              <el-input v-model="scope.row.sku"/>
            </template>
          </el-table-column>

          <el-table-column label="属性图" align="center" width="150">
            <template #default="scope">
              <el-image style="width: 100px; height: 100px;margin:2px" :src="scope.row.goods_image"/>
              <image-selector
                  :max-quantity="1"
                  :gallery="formData.product_gallery"
                  :extra-data="{index:scope.$index}"
                  @selectImage="handleSelectGoodsImage"
              >
              </image-selector>
            </template>
          </el-table-column>

          <el-table-column label="额外图" align="center">
            <template #default="scope">
              <el-image
                  class="product_gallery"
                  v-for="(image,index) in scope.row.goods_extra_image" :src="image"
                  :key="index"/>
              <image-selector
                  :gallery="formData.product_gallery"
                  :extra-data="{index:scope.$index}"
                  @selectImage="handleSelectGoodsExtraImage">
              </image-selector>
            </template>
          </el-table-column>


          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">

            </template>
          </el-table-column>
        </el-table>
        <el-card shadow="never">
          <el-button @click="handleRefreshProduct">刷新产品列表</el-button>
        </el-card>
      </el-form-item>

      <el-form-item label="产品主图：">
        <el-card shadow="never" class="cardBg">
          <el-image style="width: 100px; height: 100px;margin:2px" :src="formData.main_picture"/>
          <image-selector
              :max-quantity="1"
              :gallery="formData.product_gallery"
              @selectImage="handleSelectProductMainPicture"
          >
          </image-selector>
        </el-card>
      </el-form-item>
      <el-form-item label="额外图：">
        <el-image class="product_gallery" v-for="(image,index) in formData.product_extra_image" :src="image"
                  :key="index"/>
        <image-selector
            :gallery="formData.product_gallery"
            @selectImage="handleSelectProductExtraImage"
        >
        </image-selector>
      </el-form-item>
      <el-form-item label="商品相册：">
        <el-image class="product_gallery" v-for="(image,index) in formData.product_gallery" :src="image" :key="index"/>
      </el-form-item>
      <el-form-item label="详情：">
        <el-tabs type="card">
          <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 30}" v-model="formData.description"></el-input>
        </el-tabs>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import ImageSelector from "@/components/ImageSelector/ImageSelector.vue";

const defaultFormData = {
  goods_list: [],
  description: "",
  main_picture: "",
  product_extra_image: [],
  colors: [],
  size_chart: [],
  product_gallery: [],
}
import { reactive, ref, watch } from "vue";
import { refreshProduct } from "../functions";

export default {
  name: 'ProductAttrDetail',
  components: { ImageSelector },
  props: {
    productData: Object,
  },
  emits: ["prevStep", "finishCommit"],

  setup(props, context) {

    const formData = reactive(defaultFormData)
    const productColorAttribute = ref([])
    const productSizeChartAttribute = ref([])

    watch(props.productData, () => {
      formData.goods_list = props.productData.goods_list
      formData.description = props.productData.description
      formData.main_picture = props.productData.main_picture
      formData.product_extra_image = props.productData.product_extra_image
      formData.colors = props.productData.colors
      formData.size_chart = props.productData.size_chart
      formData.product_gallery = props.productData.product_gallery

      productColorAttribute.value = props.productData.colors
      productSizeChartAttribute.value = props.productData.size_chart

    })
    const handleFinishCommit = () => {
      context.emit("finishCommit", formData)
    }
    const handlePrev = () => {
      context.emit("prevStep")
    }
    const handleSelectProductMainPicture = (images) => {
      formData.main_picture = images ? images[0] : ''
    }
    const handleSelectProductExtraImage = (images) => {
      formData.product_extra_image = images
    }

    const handleRefreshProduct = () => {
      const goodsList = refreshProduct(formData.colors, formData.size_chart)
      formData.goods_list = goodsList
    }

    const handleSelectGoodsImage = (image, { index }) => {
      formData.goods_list[index].goods_image = image[0]
    }

    const handleSelectGoodsExtraImage = (image, { index }) => {
      formData.goods_list[index].goods_extra_image = image
    }

    return {
      formData,
      productColorAttribute,
      productSizeChartAttribute,
      handlePrev,
      handleSelectProductMainPicture,
      handleSelectProductExtraImage,
      handleFinishCommit,
      handleRefreshProduct,
      handleSelectGoodsImage,
      handleSelectGoodsExtraImage
    }
  }
}
</script>

<style scoped>
.product_gallery {
  width: 100px;
  height: 100px;
  margin: 2px;
}

.cardBg {
  background: #F8F9FC;
}

</style>
