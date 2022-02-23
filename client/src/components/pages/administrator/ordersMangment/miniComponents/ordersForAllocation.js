import { Grid,
    Card,CardActions, CardHeader, CardMedia,CardContent,
    Typography } from '@material-ui/core';






export function ordersFoaAllocation(props){
    const {orders,}=props;
    return(
        <>
        {orders.map((order) => (
            <Card style={{marginBottom:5}} key={order._id}>
            
            </Card>
        ))}
        </>
    );
}