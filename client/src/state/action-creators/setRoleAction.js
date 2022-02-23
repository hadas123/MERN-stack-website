export const setRoleToCustomer=()=>{
    return (dispach)=>{
        dispach({
            type:'setRoleToCustomer',
            pyload:undefined
        })
    }

};

export const setRoleToAdministrator=()=>{
    return (dispach)=>{
        dispach({
            type:'setRoleToAdministrator',
            pyload:undefined
        })
    }

}

export const setRoleToDeliverer=()=>{
    return (dispach)=>{
        dispach({
            type:'setRoleToDeliverer',
            pyload:undefined
        })
    }

}

export const setRoleToGuest=()=>{
    return (dispach)=>{
        dispach({
            type:'setRoleToGuest',
            pyload:undefined
        })
    }

}
