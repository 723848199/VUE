<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" @click="exportXlsx">导出Excel</el-button>
            </div>
            <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="物料编码"></el-table-column>
                <el-table-column prop="sno" label="工号"></el-table-column>
                <el-table-column prop="class" label="级别"></el-table-column>
                <el-table-column prop="age" label="位号A"></el-table-column>
                <el-table-column prop="sex" label="位号B"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts" name="export">
import { ref } from 'vue';
import * as XLSX from 'xlsx';

interface TableItem {
    id: number;
    name: string;
    sno: string;
    class: string;
    age: string;
    sex: string;
}

const tableData = ref<TableItem[]>([]);
// 获取表格数据
const getData = () => {
    tableData.value = [
        {
            id: 1,
            name: '4155335',
            sno: 'S001',
            class: '一',
            age: '10',
            sex: 'R111',
        },
        {id: 2,
            name: '15431',
            sno: 'S001',
            class: '二',
            age: '10',
            sex: 'R45',
        },
    ];
};
getData();

const list = [['序号', '物料编码', '位号', '级别', 'A', '位号B']];
const exportXlsx = () => {
    const api ='http://172.16.14.86:8180/new_bom';
    axios({
    method:'post',
    url:api,
      headers:{'content-type':'application/x-www-form-urlencoded'}}).then(res=>({}));

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
.red {
    color: #f56c6c;
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
