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
				<el-table-column prop="worker_id" label="工号">
				</el-table-column>
				<el-table-column prop="creat_time" label="创建时间" align="center">
				</el-table-column>
				<el-table-column prop="update_time" label="更新时间" align="center">
				</el-table-column>
				<el-table-column prop="bug_id" label="单号" align="center">
				</el-table-column>
				<el-table-column prop="bug_title" label="工单标题" align="center">
				</el-table-column>
				<el-table-column prop="bug_info" label="工单信息" align="center">
				</el-table-column>
				<el-table-column prop="bug_details" label="工单详细描述">
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
		<el-dialog title="新增工单" v-model="updateVisible" width="30%">
			<el-form :model="updateform" ref="ruleFormRef" label-width="100px" :rules="rules">
				<el-form-item label="工号" prop="worker_id">
					<el-input v-model="updateform.worker_id"></el-input>
				</el-form-item>
				<el-form-item label="更新时间" prop="update_time">
					<el-input v-model="updateform.update_time"></el-input>
				</el-form-item>
				<el-form-item label="工单标题" prop="bug_title">
					<el-input v-model="updateform.bug_title"></el-input>
				</el-form-item>
				<el-form-item label="工单信息" prop="bug_info">
					<el-input v-model="updateform.bug_info"></el-input>
				</el-form-item>
				<el-form-item label="工单详细描述" prop="bug_details">
					<el-input v-model="updateform.bug_details" type="textarea"></el-input>
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
				<el-form-item label="工号" prop="worker_id">
					<el-input v-model="updateform.worker_id"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" prop="creat_time">
					<el-input v-model="updateform.creat_time"></el-input>
				</el-form-item>
				<el-form-item label="更新时间" prop="update_time">
					<el-input v-model="updateform.update_time"></el-input>
				</el-form-item>
				<el-form-item label="工单标题" prop="bug_title">
					<el-input v-model="updateform.bug_title"></el-input>
				</el-form-item>
				<el-form-item label="工单信息" prop="bug_info">
					<el-input v-model="updateform.bug_info"></el-input>
				</el-form-item>
				<el-form-item label="工单详细描述" prop="bug_details">
          <!-- type="textarea" 可伸缩输入框 -->
					<el-input v-model="updateform.bug_details" type="textarea"></el-input>
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
import {fetchData, addBugSchedule, editBugSchedule, bugSchedule} from '../api';
import type { FormInstance, FormRules } from 'element-plus'
// import List from "wangeditor/dist/menus/list";

interface TableItem {
    worker_id: any;
    creat_time: any;
    update_time: any;
    bug_id: any;
    bug_title: any;
    bug_info: any;
    bug_details: any;
}

//新增数据时弹窗
const updateVisible = ref(false);
let updateform = reactive({
	  worker_id: '',
    creat_time: '',
    update_time: '',
    bug_title: '',
    bug_info: '',
    bug_details: '',
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
  worker_id: [
    { required: true, message: 'Please input sn', trigger: 'blur' },
  ],
  creat_time: [
    { required: true, message: 'Please input description', trigger: 'blur' },
  ],
  update_time: [
    { required: false, message: 'Please input produc_type', trigger: 'blur' },
  ],
  bug_title: [
    { required: true, message: 'Please input produc_model', trigger: 'blur' },
  ],
  bug_info: [
    { required: true, message: 'Please input produc_encoding', trigger: 'blur' },
  ],
  bug_details: [
    { required: true, message: 'Please input remark', trigger: 'blur' },
  ],
})

// 获取表格数据
const getData = () => {
	bugSchedule().then(res => {
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
			addBugSchedule(updateform)
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
	worker_id: '',
	creat_time: '',
  update_time: '',
  bug_id: '',
  produc_brand: '',
  bug_title: '',
  bug_info: '',
  bug_details: '',
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	editform.update_time = row.update_time;
	editform.bug_info = row.bug_info;
	editform.bug_details = row.bug_details;

	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改已提交`);
	tableData.value[idx].update_time = editform.update_time;
	tableData.value[idx].bug_info = editform.bug_info;
	tableData.value[idx].bug_details = editform.bug_details;
  editBugSchedule(tableData)
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
