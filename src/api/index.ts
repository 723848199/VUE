import request from '../utils/request';

export const fetchData = () => {
    return request({
        url: './table.json',
        method: 'get'
    });
};

export function addMeterialMessage(data){
    return request({
        url: '',
        method: 'post',
        data: data
    })
}
