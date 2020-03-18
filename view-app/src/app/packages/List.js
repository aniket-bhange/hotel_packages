import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GetPackages, DeletePackage } from '../Services';
import { Grid } from '@material-ui/core';
import * as moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomizedSnackbars from '../partials/Snakbar';

const useStyles = makeStyles(theme =>({
  container_root: {
    flexGrow: 1
  },
  root: {
    margin: theme.spacing(1)
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  valid: {
    marginTop: 12,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const List = ()=>{
  const classes = useStyles();
  

  let [packages, setPackages] = useState([])
  let [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: ""
  })
  useEffect(()=>{
    (async ()=>{
      let result  = await GetPackages();
      setPackages(result.reverse())
    })()
  }, [])

  const deletePackage = async (value)=> {
    
    try{
      await DeletePackage(value)
      setSnackbar({
        open: true,
        severity: "success",
        message: "Success!!"
      })
      setPackages(packages.filter(v=> v._id !== value))
    }catch(err){
      setSnackbar({
        open: true,
        severity: "error",
        message: "Try Again!!"
      })
    }
    
  }
  const onSnackbarClose = ()=>{
    setSnackbar({open: false})
  }
  
  return (
    <>
    <CustomizedSnackbars open={snackbar.open} severity={snackbar.severity} message={snackbar.message} handleClose={onSnackbarClose}/>
    <Grid container className={classes.container_root} spacing={3}>
      <Grid item xs={11} container justify="flex-end">
        <Button
          variant="contained"
          color="primary"
          href={`/create`}
          className={classes.button}
          startIcon={<AddIcon />}
        >
          Create
        </Button>
      </Grid>
      {packages.map((v, idx)=>(
        <Grid item xs={4}  key={idx} className={classes.root}>
          <Card>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {v.hotel_info.name || ""}
              </Typography>
              <Typography variant="h5" component="h2">
                {v.name.toUpperCase()}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {v.duration_days} Days {(v.duration_days-1)||0} Nights
              </Typography>
              <Typography variant="body2" component="p" style={{minHeight: 120}}>
                {v.description}
              </Typography>
              <Typography className={classes.valid}>
                Valid Till:  { moment(v.valid_to).format("Do MMM YYYY") } 
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<EditIcon />}
                href={`/edit?id=${v._id}`}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={()=> deletePackage(v._id)}
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
}


export default List;