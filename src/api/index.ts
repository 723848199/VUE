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
        url: '',
        method: 'post',
        data: data
    })
}
