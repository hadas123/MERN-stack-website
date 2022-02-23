import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export function ErrorAlert(props) {
  const classes = useStyles();

  return (
    <div hidden={props.disable} className={classes.root}>
      <Alert  severity="error">{props.errorMsg}</Alert>
    </div>
  );
}

