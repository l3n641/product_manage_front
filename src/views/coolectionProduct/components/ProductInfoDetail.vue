<template>
  <el-row>
    <el-col :span="24">
      <div style="margin-top: 50px">
        <el-form
            ref="productInfoForm"
            :model="formData"
            :rules="rules"
            label-width="120px"
            style="width: 100%"
            size="small"
        >
          <el-form-item label="商品名称：" prop="name">
            <el-input v-model="formData.name"/>
          </el-form-item>
          <el-form-item label="商品货号：" prop="spu_code">
            <el-input v-model.trim="formData.spu"/>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>

</template>

<script>

import { computed, reactive, watch } from "vue";

const defaultFormData = { spu: "", name: "" }
export default {
  name: 'ProductInfoDetail',
  components: {},
  emits: ["nextStep"],
  props: {
    productData: Object
  },
  setup(props, context) {
    const rules = reactive({})
    const formData = reactive(defaultFormData)

    watch(props.productData, () => {
      formData.spu = props.productData.spu
      formData.name = props.productData.name
    })
    const handleNext = (formName) => {
      context.emit('nextStep', formData)
    }
    return {
      rules,
      formData,
      handleNext
    }
  },
}
</script>

<style scoped>
</style>
