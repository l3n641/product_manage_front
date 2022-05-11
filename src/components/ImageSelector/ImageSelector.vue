<template>
  <div>
    <el-button type="info" icon="el-icon-plus" @click="handleOpenDialog"/>

    <el-dialog title="图片选择" v-model="dialogVisible">
      <el-row>

        <el-checkbox-group v-model="selectedImages">

          <el-checkbox v-for="(image,index) in gallery" :key="index" :label="image">
            <el-col :span="5" :offset="1">
              <el-image :src="image" fit="contain" class="multi_select_image"/>
            </el-col>
          </el-checkbox>
        </el-checkbox-group>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectImage">确 定</el-button>
      </div>

    </el-dialog>

    <!-- Form -->

  </div>
</template>
<script>
import { ref, toRefs } from "vue";
import { ElMessage } from "element-plus";

export default {
  name: 'ImageSelector',
  props: {
    maxQuantity: {
      default: 0
    },
    gallery: {
      default: []
    },
    extraData: {
      type: Object
    }
  },
  emits: ["selectImage"],
  setup(props, context) {
    const dialogVisible = ref(false)
    const selectedImages = ref([])

    const handleSelectImage = () => {
      if (props.maxQuantity && selectedImages.value.length > props.maxQuantity) {
        ElMessage.warning("图片选择数量过多")
        return false
      }
      dialogVisible.value = false
      context.emit('selectImage', selectedImages.value, props.extraData)
    }

    const handleOpenDialog = () => {
      dialogVisible.value = true
    }
    const { gallery } = toRefs(props)

    return {
      gallery,
      dialogVisible,
      selectedImages,
      handleOpenDialog,
      handleSelectImage
    }
  }

}
</script>

<style>
.multi_select_image {
  height: 150px;
  width: 150px;
}

.el-checkbox__label {
  width: 150px

}

</style>
