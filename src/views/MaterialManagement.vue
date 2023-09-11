<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-select v-model="query.address" placeholder="搜索类型" class="handle-select mr10" >
					<el-option key="1" label="产品编码" value="material_encoding"></el-option>
					<el-option key="2" label="未定义类型1" value="未定义值1"></el-option>
					<el-option key="3" label="未定义类型2" value="未定义值2"></el-option>
					<el-option key="4" label="未定义类型3" value="未定义值3"></el-option>
				</el-select>
				<el-input v-model="query.name" placeholder="产品编码" class="handle-input mr10"></el-input>
        <!--type="primary" element库按钮类型，蓝色 圆角-->
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="Plus" @click="">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="sn" label="产品编码">
          <template >
            ！！！代码未处理 产品描述 读取
          </template>
        </el-table-column>
				<el-table-column prop="description" label="产品描述" align="center">
					<template >
            ！！！代码未处理 产品描述 读取
          </template>
				</el-table-column>
				<el-table-column prop="produc_type" label="产品类型" align="center">
					<template >
            ！！！代码未处理  读取
					</template>
				</el-table-column>
        <el-table-column prop="produc_brand" label="产品品牌" align="center">
					<template >
            ！！！代码未处理  读取
					</template>
				</el-table-column>
				<el-table-column prop="produc_model" label="入网产品型号" align="center">
          <template >
            ！！！代码未处理  读取
					</template>
        </el-table-column>
        <el-table-column prop="produc_line" label="产品线" align="center">
          <template >
            ！！！代码未处理  读取
					</template>
        </el-table-column>
        <el-table-column prop="produc_encoding" label="产品代码" align="center">
          <template >
            ！！！代码未处理  读取
					</template>
        </el-table-column>

				<el-table-column prop="creat_date" label="创建时间">
          <template >
            ！！！代码未处理  读取
					</template>
        </el-table-column>

				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" class="blue" @click="handleEdit(scope.$index, scope.row)">
							编辑
						</el-button>
						<el-button text :icon="List" class="blue" @click="handleDelete(scope.$index)">
							详情
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="editform.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="editform.address"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {Edit, Search, Plus, List} from '@element-plus/icons-vue';
import { fetchData , addMeterialMessage} from '../api';
// import List from "wangeditor/dist/menus/list";

interface TableItem {
	id: number;
	name: string;
	money: string;
	state: string;
	date: string;
	address: string;
}

const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchData().then(res => {
		tableData.value = res.data.list;
		pageTotal.value = res.data.pageTotal || 50;
	});
};
getData();

// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};

// 新增操作
const handleUpdate = () => {
  addMeterialMessage(this.form).then()
};


// 删除操作
const handleDelete = (index: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			tableData.value.splice(index, 1);
		})
		.catch(() => {});
};

//新增数据时弹窗和保存
const updateVisible = ref();
let updateform = reactive({

});


// 表格编辑时弹窗和保存
const editVisible = ref(false);
let editform = reactive({
	name: '',
	address: ''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	editform.name = row.name;
	editform.address = row.address;

	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改已提交`);
	tableData.value[idx].name = editform.name;
	tableData.value[idx].address = editform.address;
};
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
}
.table {
	width: 100%;
	font-size: 14px;
}
.blue {
	color: #409EFF;
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
