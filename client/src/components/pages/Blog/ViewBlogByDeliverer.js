import {Post} from './Post';
import { Grid ,Typography,Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React,{useEffect, useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import {useHistory} from 'react-router-dom';
import {GetPosts} from '../../../httpRequests/blog';



const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      padding: theme.spacing(2, 0, 2),
    },
    cardGrid: {
   
  }
  }));

export function ViewBlogByDeliverer(){
    const classes = useStyles();
    const [posts,setPosts]=useState([]);
    const history = useHistory();
    useEffect(()=>{
        GetPosts().then((posts)=>{
            setPosts(posts);
        });
    },[]);
    return (
    <Grid style={{algin:'center'}}>
         <Grid container  className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="Primary" gutterBottom>blog</Typography>
            </Container>
        </Grid>
        <Grid container >
            {posts.map((post) => (
                <Grid container key={post._id}>
                    <Post post={post}/>
                </Grid>
            ))}
        </Grid>
    </Grid>
    );
}