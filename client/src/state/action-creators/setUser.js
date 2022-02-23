export const setUser=(user)=>{
    return (dispach)=>{
        dispach({
            type:'SetUser',
            pyload:user
        });
    }

};