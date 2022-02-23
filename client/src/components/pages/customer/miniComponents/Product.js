import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';


const useStyles = makeStyles((theme) => ({
card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
}));

export function Product(props){
    const {name,urlImage,onAdd,onRemove} =props;
    const classes = useStyles();

    return(
        <Card className={classes.card}>
        <CardMedia className={classes.cardMedia} image={urlImage} title={name}/>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom color="primary" variant="h5" component="h2">{name}</Typography>
        </CardContent>
        <CardActions style={{justifyContent: 'center'}}>
        <IconButton style={{marginLeft:25}} color="primary" onClick={(e)=>{e.preventDefault();onAdd();}}aria-label="Add" >
          <AddOutlinedIcon style={{fontSize:30}}/>
      </IconButton>
      <IconButton style={{marginLeft:25}} color="primary" onClick={(e)=>{e.preventDefault();onRemove();}}aria-label="Remove" >
          <RemoveOutlinedIcon style={{fontSize:30}}/>
      </IconButton>
        </CardActions>
      </Card>
   
    );

}