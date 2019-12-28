import axios from "@/axios/api.request.js"

export const getLikemanList = data =>{
    return axios.request({
        url:"likeman/getLikemanList",
        method:"post",
        data:data
    })
}

export const addLike = data =>{
    return axios.request({
        url:"likeman/add",
        method:"post",
        data:data
    })
}

export const updateLike = data =>{
    return axios.request({
        url:"likeman/update",
        method:"put",
        data:data
    })
}

export const deleteLike = data =>{
    return axios.request({
        url:"likeman/delete",
        method:"delete",
        data:{"id":data}
    })
}

export const getTypeList = () =>{
    return axios.request({
        url:"type/getTypeList",
        method:"get",
        data:null
    })
}

export const getStationList = () =>{
    return axios.request({
        url:"station/getStationList",
        method:"get",
        data:null
    })
}


export const getCompanyList = () =>{
    return axios.request({
        url:"company/getCompanyList",
        method:"get",
        data:null
    })
}