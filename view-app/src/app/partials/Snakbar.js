import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function CustomizedSnackbars(props) {
  return (
    <Snackbar anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }} open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
      <Alert onClose={props.handleClose} severity={props.severity || "success"}>
        { props.message }
      </Alert>
    </Snackbar>
  );
}