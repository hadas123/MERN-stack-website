import React,{} from 'react';
import {Grid,Card,CardContent,CardMedia,CardActions,Typography} from '@material-ui/core';


export function Post(props) {
    return (
    <Card style={{marginLeft:220,marginRight:140, marginBottom:40}}>
       <CardMedia>
           <Typography component="h1" variant="h6" align="center" color="Primary" gutterBottom>{props.post.title}</Typography>
       </CardMedia>
       <CardContent  style={{display: 'flex',  justifyContent:'left', alignItems:'left',marginLeft:40, minHeight:400, width:700 }}>
           <div  dangerouslySetInnerHTML={{__html: props.post.content}} />
           </CardContent>
       <CardActions>{props.post.creationDate.split('T')[0]}</CardActions>
    </Card>

    );
}