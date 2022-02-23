import React, { useState,useEffect } from 'react';
import {Grid,Card,FormControlLabel,Checkbox,CardContent,CardMedia,Button,TextField} from "@material-ui/core"






export function Orders(props){
    
    return(
        <React.Fragment>
        {props.Orders.map((o,index)=>(
          <Card style={{marginBottom:5}} key={o._id}>
            <Grid container>
               
                <Grid item sm={10}>
                    <Grid container>
                        <Grid container>
                            <Grid item>{(index+1)+"."}</Grid>
                        </Grid>
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
                            <Grid item>{"status: "}</Grid>
                            <Grid item> <h9>{" "+o?.status[0]}</h9></Grid>
                        </Grid>
                    </Grid>
                </Grid>
          </Grid>
        </Card> 
        ))}
        </React.Fragment>
    );

}