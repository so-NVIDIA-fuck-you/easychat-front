const isEmpty=(str)=>{
    if(str==null||str==""||str==undefined)
    {
        return true;
    }
    return false;
}

const getAreaInfo=(data)=>{
    if(isEmpty(data))
    {
        return "-";
    }
    return data.replace(","," ");
}

export default{
    isEmpty,
    getAreaInfo
}