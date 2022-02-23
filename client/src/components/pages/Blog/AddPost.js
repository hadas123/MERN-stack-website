
import React, {useState} from 'react';
import BlogWriter from 'react-blog-writer';
import { Button } from '@material-ui/core';
import {AddPostInServer} from '../../../httpRequests/blog';
import "./AddPost.css"
import { useHistory } from 'react-router-dom';




export function AddPost(){
    const [nodes, setNodes] = useState(null);
    const history=useHistory();
    function Add() {
        AddPostInServer('',nodes).then((res)=>{
            if(res)history.push('/administrator/blog');
        });
    }
    return (
        <React.Fragment>
            <BlogWriter  className='root' finalNodes={setNodes}/>
            <Button color="primary"  onClick={Add}>Add Post</Button>
        </React.Fragment>
    );
}