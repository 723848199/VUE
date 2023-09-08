import axios from 'axios'//创建axios实例，简写代码
const request = axios.create({'http://172.16.14.86:8180'});
// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {config.headers['Content-Type'] = 'application/json;charset=utf-8';
// config.headers['token'] = user.token;  // 设置请求头return config
}, error => {return Promise.reject(error)
});// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(response => {let res = response.data;
// 如果是返回的文件
//Blob(Binary long Object)是二进制长对象的意思,Blob通常用于存储大文件,典型的Blob内容是一张图片或者一个声音文件if (response.config.responseType === 'blob') {return res}
// 兼容服务端返回的字符串数据if (typeof res === 'string') {res = res ? JSON.parse(res) : res}return res;},error => {console.log('err' + error)
// for debugreturn Promise.reject(error)}
)
export default request