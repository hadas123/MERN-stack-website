import React, { useState,useEffect } from 'react';
import {Grid,Card,Checkbox,CardContent,CardMedia,Button,TextField} from "@material-ui/core"
import {ProfileInfo} from '../../../profile/miniComponents/profileInfo';




export function Deliverers(props){
    return(
        <React.Fragment>
        {props.Deliverers?.map(d=>(
        <Card key={d._id} style={{marginBottom:5}}>
            <Grid container>
                <Grid item sm={1}><Checkbox color='primary' onChange={(e)=>{e.preventDefault();d.selected=e.target.checked;props.onGetProposal();}}/></Grid>  
                <Grid item sm={11}><ProfileInfo userId={d._id}/></Grid>
            </Grid>
        </Card>))}
        </React.Fragment>
    );

}