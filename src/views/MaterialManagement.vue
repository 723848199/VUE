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
				<el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center">

				</el-table-column>
				<el-table-column prop="sn" label="产品编码">
				</el-table-column>
				<el-table-column prop="description" label="产品描述" align="center">
				</el-table-column>
				<el-table-column prop="produc_type" label="产品类型" align="center">
				</el-table-column>
				<el-table-column prop="produc_brand" label="产品品牌" align="center">
				</el-table-column>
				<el-table-column prop="produc_model" label="入网产品型号" align="center">
				</el-table-column>
				<el-table-column prop="produc_encoding" label="产品代码" align="center">
				</el-table-column>

				<el-table-column prop="creat_date" label="创建时间">
				</el-table-column>

				<el-table-column prop="remark" label="备注信息">
				</el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" class="blue" @click="handleEdit(scope.$index, scope.row)">
							编辑
						</el-button>
						<el-button text :icon="List" class="blue" @click="table = true">
							历史
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

		<el-drawer
			append-to-body
			v-model="table"
			title="修改记录"
			direction="rtl"
			size="50%"
		>
			<el-table :data="gridData">
				<el-table-column property="date" label="Date" width="150" />
				<el-table-column property="name" label="Name" width="200" />
				<el-table-column property="address" label="Address" />
			</el-table>
		</el-drawer>
    <!-- 新增物料弹出框 -->
		<el-dialog title="新增产品信息" v-model="updateVisible" width="30%">
			<el-form :model="updateform" ref="ruleFormRef" label-width="100px" :rules="rules">
				<el-form-item label="产品编码" prop="sn">
					<el-input v-model="updateform.sn" placeholder="80218559"></el-input>
				</el-form-item>
				<el-form-item label="产品描述" prop="description">
					<el-input v-model="updateform.description" placeholder="S5735-XXXX"></el-input>
				</el-form-item>
				<el-form-item label="产品类型" prop="produc_type">
					<el-input v-model="updateform.produc_type" placeholder="管理交换机"></el-input>
				</el-form-item>
				<el-form-item label="产品品牌" prop="produc_brand">
					<el-input v-model="updateform.produc_brand" placeholder="华为"></el-input>
				</el-form-item>
				<el-form-item label="入网成品型号" prop="produc_model">
					<el-input v-model="updateform.produc_model" placeholder="5735系列"></el-input>
				</el-form-item>
				<el-form-item label="产品代码" prop="produc_encoding">
					<el-input v-model="updateform.produc_encoding" placeholder="S5735-XXXX"></el-input>
				</el-form-item>
				<el-form-item label="备注信息" prop="remark">
          <!-- type="textarea" 可伸缩输入框 -->
					<el-input v-model="updateform.remark" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="updateVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveadd(ruleFormRef)">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form :model="updateform" ref="ruleFormRef" label-width="100px" :rules="rules">
				<el-form-item label="产品编码" prop="sn">
					<el-input v-model="updateform.sn" placeholder="80218559"></el-input>
				</el-form-item>
				<el-form-item label="产品描述" prop="description">
					<el-input v-model="updateform.description" placeholder="S5735-XXXX"></el-input>
				</el-form-item>
				<el-form-item label="产品类型" prop="produc_type">
					<el-input v-model="updateform.produc_type" placeholder="管理交换机"></el-input>
				</el-form-item>
				<el-form-item label="产品品牌" prop="produc_brand">
					<el-input v-model="updateform.produc_brand" placeholder="华为"></el-input>
				</el-form-item>
				<el-form-item label="入网成品型号" prop="produc_model">
					<el-input v-model="updateform.produc_model" placeholder="5735系列"></el-input>
				</el-form-item>
				<el-form-item label="产品代码" prop="produc_encoding">
					<el-input v-model="updateform.produc_encoding" placeholder="S5735-XXXX"></el-input>
				</el-form-item>
				<el-form-item label="备注信息" prop="remark">
          <!-- type="textarea" 可伸缩输入框 -->
					<el-input v-model="updateform.remark" type="textarea"></el-input>
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
import {fetchData, addMeterialMessage, editMeterialMessage} from '../api';
import type { FormInstance, FormRules } from 'element-plus'
// import List from "wangeditor/dist/menus/list";

interface TableItem {
    sn: string;
    description: string;
    produc_type: string;
    produc_brand: string;
    produc_model: string;
    produc_encoding: string;
    creat_date: string;
    remark: string;
}

//新增数据时弹窗
const updateVisible = ref(false);
let updateform = reactive({
	sn: '',
	description: '',
  produc_type: '',
	produc_brand: '',
	produc_model: '',
	produc_encoding: '',
  creat_date: '',
	remark: '',
});
const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});
const table = ref(false)



const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  /* required 必填，massage 提示信息, trigger:blur 失去焦点时校验| charnel:数据发生变化时校验 */
  sn: [
    { required: true, message: 'Please input sn', trigger: 'blur' },
  ],
  description: [
    { required: true, message: 'Please input description', trigger: 'blur' },
  ],
  produc_type: [
    { required: true, message: 'Please input produc_type', trigger: 'blur' },
  ],
  produc_brand: [
    { required: true, message: 'Please input produc_brand', trigger: 'blur' },
  ],
  produc_model: [
    { required: true, message: 'Please input produc_model', trigger: 'blur' },
  ],
  produc_encoding: [
    { required: true, message: 'Please input produc_encoding', trigger: 'blur' },
  ],
  remark: [
    { required: true, message: 'Please input remark', trigger: 'blur' },
  ],
})

// 获取表格数据
const getData = () => {
	fetchData().then(res => {
		tableData.value = res.data.list;
		pageTotal.value = res.data.pageTotal || 50;
	});
};

getData();

const handleAdd =() =>{
  updateVisible.value = true;
}
// 保存新增数据
const saveadd = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			addMeterialMessage(updateform)
		} else {
		console.log('error submit!', fields)
		}
	})
};

//获取修改详情
const gridData = [
  {
    date: '2016-05-02',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-04',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-01',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-03',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
]

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

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let editform = reactive({
	sn: '',
	description: '',
  produc_type: '',
	produc_brand: '',
	produc_model: '',
	produc_encoding: '',
  creat_date: '',
	remark: '',
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	editform.sn = row.sn;
	editform.description = row.description;
	editform.produc_type = row.produc_type;
	editform.produc_brand = row.produc_brand;
	editform.produc_model = row.produc_model;
	editform.produc_encoding = row.produc_encoding;
	editform.creat_date = row.creat_date;
	editform.remark = row.remark;

	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改已提交`);
	tableData.value[idx].sn = editform.sn;
	tableData.value[idx].description = editform.description;
	tableData.value[idx].produc_type = editform.produc_type;
	tableData.value[idx].produc_brand = editform.produc_brand;
	tableData.value[idx].produc_model = editform.produc_model;
	tableData.value[idx].produc_encoding = editform.produc_encoding;
	tableData.value[idx].creat_date = editform.creat_date;
	tableData.value[idx].remark = editform.remark;
  editMeterialMessage(tableData)
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
