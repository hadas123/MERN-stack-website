export const login=()=>{
    return (dispach)=>{
        dispach({
            type:'login',
            pyload:undefined
        })
    }

}

export const logout=()=>{
    return (dispach)=>{
        dispach({
            type:'logout',
            pyload:undefined
        })
    }

}