<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-upload
                    action="#"
                    :limit="1"
                    accept=".xlsx, .xls"
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                    :http-request="handleMany"
                >
                    <el-button class="mr10" type="success">批量导入</el-button>
                </el-upload>
                <el-link href="/bom_auto.xlsx" target="_blank">下载模板</el-link>
            </div>
            <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="level" label="级别"></el-table-column>
                <el-table-column prop="item_encoding" label="项目编号"></el-table-column>
                <el-table-column prop="item_type" label="项目类别"></el-table-column>
                <el-table-column prop="4" label="装配指示符"></el-table-column>
                <el-table-column prop="5" label="对象标识"></el-table-column>
                <el-table-column prop="6" label="替代项目组"></el-table-column>
                <el-table-column prop="7" label="优先级"></el-table-column>
                <el-table-column prop="8" label="使用可能性"></el-table-column>
                <el-table-column prop="9" label="后继物料"></el-table-column>
                <el-table-column prop="10" label="对象描述"></el-table-column>
                <el-table-column prop="11" label="菲菱子件用量"></el-table-column>
                <el-table-column prop="12" label="组件计量单位"></el-table-column>
                <el-table-column prop="13" label="A面位号"></el-table-column>
                <el-table-column prop="14" label="B面位号"></el-table-column>
                <el-table-column prop="15" label="位号"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts" name="import">
import { UploadProps } from 'element-plus';
import { ref, reactive } from 'vue';
import * as XLSX from 'xlsx';

interface TableItem {
    id: number;
    level: string
    item_encoding: string
    item_type: string;
    4: string
    5: string
    6: string
    7: string
    8: string
    9: string
    10: string
    11: string
    12: string
    13: string
    14: string
    15: string
}

const tableData = ref<TableItem[]>([]);
// 获取表格数据
const getData = () => {
    tableData.value = [
        {
            id: 1,
            level: '1',
            item_encoding: '80218559',
            item_type: '10',
            4: 'L',
            5: '10',
            6: '是',
            7:'1',
            8:'50',
            9: '排针排母类',
            10: '3',
            11: '10',
            12: 'L',
            13: '10',
            14: 'R22,R7,R1',
            15:'80218559',
        },
        {
            id: 2,
            level: '2',
            item_encoding: '80218561',
            item_type: '10',
            4: 'L',
            5: '10',
            6: '是',
            7:'1',
            8:'50',
            9: '导热垫片',
            10: '3',
            11: '10',
            12: 'L',
            13: '10',
            14: 'R26,R68',
            15:'80218559',
        },
    ];
};
getData();

const importList = ref<any>([]);
const beforeUpload: UploadProps['beforeUpload'] = async (rawFile) => {
    importList.value = await analysisExcel(rawFile);
    return true;
};
const analysisExcel = (file: any) => {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.onload = function (e: any) {
            const data = e.target.result;
            let datajson = XLSX.read(data, {
                type: 'binary',
            });

            const sheetName = datajson.SheetNames[0];
            const result = XLSX.utils.sheet_to_json(datajson.Sheets[sheetName]);
            resolve(result);
        };
        reader.readAsBinaryString(file);
    });
};

const handleMany = async () => {
    // 把数据传给服务器后获取最新列表，这里只是示例，不做请求
    const list = importList.value.map((item: any, index: number) => {
        return {
            id: index,
            name: item['姓名'],
            sno: item['学号'],
            class: item['班级'],
            age: item['年龄'],
            sex: item['性别'],
        };
    });
    tableData.value.push(...list);
};
</script>

<style scoped>
.handle-box {
    display: flex;
    margin-bottom: 20px;
}

.table {
    width: 100%;
    font-size: 14px;
}
.mr10 {
    margin-right: 10px;
}
</style>
