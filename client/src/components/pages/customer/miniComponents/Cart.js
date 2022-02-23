import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActions, CardHeader, CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';



export function Cart(props) {
    
    return(

        <Card width="100%" style={{position: "sticky",top: "15%"}}> 
            <CardMedia>
                <Container maxWidth="sm">
                <Typography component="h4" variant="h5" align="center" color="Primary" gutterBottom>My Order</Typography>
                </Container>
            </CardMedia>
            <CardContent width="100%" style={{maxHeight: 350, overflow:'auto'}}>
            {(props.order.length==0)&&("no products were added to your order. please select products to your order")}
                {props.order.map((product) => (
                    <Card style={{marginBottom:5}} key={product._id}>
                        <Grid container>
                            <Grid item md={3}>                
                                <img width="30" src={product.urlImage}/>
                            </Grid>
                            <Grid item md={3}>{product.name+" x"+product.amount}</Grid>  
                            <Grid item md={3}>                
                                <IconButton  color="primary" onClick={(e)=>{e.preventDefault();props.onAdd(product);}}aria-label="Add" >
                                    <AddOutlinedIcon />
                                </IconButton>
                            </Grid> 
                            <Grid item  md={3}>
                                <IconButton  color="primary" onClick={(e)=>{e.preventDefault();props.onRemove(product);}}aria-label="Remove" >
                                    <RemoveOutlinedIcon />
                                </IconButton>          
                            </Grid> 
                        </Grid>
                    </Card>
                ))}
            </CardContent>
            <CardActions>
            {(props.order.length>0)&&(
            <Button  style={{textTransform: 'lowercase'}}  type="submit" fullWidth  color="primary"  onClick={(e) => { e.preventDefault();props.onFinishOrder();}}>
            {props.buttonTitle}
          </Button>)}
            </CardActions>    
        </Card>

        
  



    );
}