import request from '../utils/request';

export const fetchData = () => {
    return request({
        url: './table.json',
        method: 'get'
    });
};
// 添加新物料信息接口，未完成
export function addMeterialMessage(data: any){
    return request({
        url: '/api',
        method: 'post',
        data: data
    })
}
// 删除物料信息接口，未完成
export function deleteMeterialMessage(data: any){
    return request({
        url: '/api',
        method: 'post',
        data: data
    })
}
// 编辑物料数据，未完成
export function editMeterialMessage(data: any){
    return request({
        url: '/api',
        method: 'post',
        data: data
    })
}

// 新增工单
export function addBugSchedule(data: any){
    return request({
        url: 'api/bug_create',
        method: 'post',
        data: data
    })
}
// 获取工单信息
export const bugSchedule = (data: any) => {
    return request({
        url: 'api/bug_infos',
        method: 'get',
        data: data
    })
}

// 编辑工单
export function editBugSchedule(data: any){
    return request({
        url: '/bug_infos',
        method: 'get',
        data: data
    })
}