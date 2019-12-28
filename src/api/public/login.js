import axios from "@/axios/api.request.js"


export const login = data =>{
    return axios.request({
        url:"/login",
        method:"post",
        data:data
    })
}