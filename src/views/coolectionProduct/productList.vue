<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades">产品列表</i>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.spu_code" placeholder="spu 编号" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="ID" width="200" align="center"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="100"></el-table-column>
        <el-table-column label="主图" width="120">
          <template #default="scope">
            <el-image class="product_main_image" :src="scope.row.main_picture" fit="cover"/>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" align="center">
          <template #default="scope">
            <div class="product_info">
              <div>spu:{{ scope.row.spu }}</div>
              <div>
                <el-link :href="scope.row.product_source" target="_blank">{{ scope.row.name }}</el-link>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="供应商信息" width="200" align="center">
          <template #default="scope">
            <div class="supplier_info">
              <div>
                <el-tag class="ml-2" type="success">{{ scope.row.supplier.supplier_platform }}</el-tag>
              </div>
              <div>店铺:{{ scope.row.supplier.supplier_name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit( scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.page"
            :page-size="query.page_size"
            :total="pageTotal"
            @current-change="handlePageChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { timestampFormat } from "@/functions"
import { getCollectionProduct } from "../../api/collectionProduct";
import { useRouter } from "vue-router";


export default {
  name: "ProductList",
  components: {},
  methods: {},
  setup() {
    const query = reactive({
      spu_code: null,
      page: 1,
      page_size: 20,
    })
    const tableData = ref([])
    const pageTotal = ref(0)
    const router = useRouter();

    // 获取表格数据
    const getData = () => {
      getCollectionProduct(query).then(res => {
        tableData.value = res.data
        pageTotal.value = res.total
      })
    }
    getData()
    // 查询操作
    const handleSearch = () => {
      query.page = 1
      getData()
    }
    // 分页导航
    const handlePageChange = (val) => {
      query.page = val
      getData()
    }
    const handleEdit = (product) => {
      const { href } = router.resolve({
        path: '/collection_product_update',
        query: {
          collectionProductId: product.id
        }
      });
      window.open(href, "_blank");

    }

    return {
      query,
      tableData,
      pageTotal,
      timestampFormat,
      handleEdit,
      handleSearch,
      handlePageChange,
      getData,
    }
  }
}
</script>

<style scoped>
.product_info div {
  margin-bottom: 5px;
}

.product_main_image {
  width: 100px;
  height: 100px;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
