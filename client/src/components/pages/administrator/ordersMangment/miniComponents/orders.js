import React, { useState,useEffect } from 'react';
import {Grid,Card,FormControlLabel,Checkbox,CardContent,CardMedia,Button,TextField} from "@material-ui/core"






export function Orders(props){
    
    return(
        <React.Fragment>
        {props.Orders.map(o=>(
          <Card style={{marginBottom:5}} key={o._id}>
            <Grid container>
                <Grid item sm={2}>
                <Checkbox onChange={(e)=>{e.preventDefault();o.slected=e.target.checked;props.onGetProposal();}} color="primary" /> 
                </Grid>
                <Grid item sm={10}>
                    <Grid container>
                        <Grid container>
                            <Grid item>{"Order Code: "}</Grid>
                            <Grid item>{" "+o._id}</Grid>
                    </Grid>
                        <Grid container>
                            <Grid item>{"address: "}</Grid>
                            <Grid item> <h9>{" "+o?.address?.street+" "+o?.address?.building+", "}</h9></Grid>
                            <Grid item><h9>{o?.address?.city}</h9></Grid>
                        </Grid>
                        <Grid container>
                            <Grid item>{"creation date: "}</Grid>
                            <Grid item>{" "+o?.creationDate?.split('T')[0]}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
          </Grid>
        </Card> 
        ))}
        </React.Fragment>
    );

}