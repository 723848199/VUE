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

// 编辑物料数据
export function editMeterialMessage(data: any){
    return request({
        url: '/api',
        method: 'post',
        data: data
    })
}