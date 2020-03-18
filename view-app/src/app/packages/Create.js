import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as moment from 'moment';
import { GetHotels, GetPackage, UpdatePackage, CreatePackage } from '../Services';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const fetchPreloadData = async (method)=>{
  let __package = {}
  if(method === 'edit'){
    const id = getQueryParams('id')
    __package = await GetPackage(id)
  }
  const hotels = await GetHotels()
  return [hotels, __package];
}

const submitAction = async (mode, state, setState)=> {
  let value = {
    valid_from: new Date(),
    valid_to: moment().add(1,'d').toDate(),
    price: "",
    hotel_id: "",
    duration_days: "",
    name: "",
    description: ""  
  }
  if(mode === 'edit'){
    delete state.hotel_info
    let result = await UpdatePackage(state)
    setState(value)
    return result;
  }
  let result = await CreatePackage(state);
  setState(value)
  return result ;
}

const getQueryParams = (param)=> {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const Create = (props)=>{
  const classes = useStyles();
  const [state, setState] = useState({
    valid_from: new Date(),
    valid_to: moment().add(1,'d').toDate(),
    price: "",
    hotel_id: "",
    duration_days: "",
    name: "",
    description: ""  
  })
  const [hotels, setHotels] = useState([]);

  const handleChange = props => event => {
    if(props === 'valid_from' || props === 'valid_to') {
      event = {target: { value: event }}
    }
    setState({ ...state, [props]: event.target.value})
  }

  useEffect(()=> {
    (async ()=>{
      let [result, __package] = await fetchPreloadData(props.mode)
      let hotelList = result.map(idx=>(<MenuItem key={idx._id} value={idx._id}>{ idx.name }</MenuItem>))
      setHotels(hotelList)
      if(props.mode === 'edit'){
        setState({...__package, valid_from: new Date(__package.valid_from), valid_to: new Date(__package.valid_to)})
      }
    })()
  }, [props.mode])
  
  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left">
            Create Package
          </Typography>
          <Grid style={{marginTop: 30}} container spacing={3}>
            <Grid item xs={12} md={6}>
              {/* <TextField required id="cardName" label="Name od Hote" fullWidth /> */}
              <Select
                label="Name od Hote"
                value={state.hotel_id}
                onChange={ handleChange('hotel_id') }
                fullWidth
              >
              {
                hotels
              }
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField required value={state.name} fullWidth placeholder="Package Name" onChange={ handleChange('name') } />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField required placeholder="Package Price" value={state.price} fullWidth onChange={ handleChange('price') } />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField required placeholder="Package Duration Days" value={state.duration_days} fullWidth onChange={ handleChange('duration_days') }/>
            </Grid>
            <Grid item xs={12} md={6}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Package Valid From"
                format="MM/dd/yyyy"
                value={state.valid_from}
                onChange={ handleChange('valid_from') }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <KeyboardDatePicker
                margin="normal"
                label="Package Valid until"
                format="MM/dd/yyyy"
                value={state.valid_to}
                onChange={ handleChange('valid_to') }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required  multiline rows="4" fullWidth placeholder="Description" value={state.description} onChange={ handleChange('description') }/>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={submitAction.bind(null, props.mode, state, setState)}>
                { props.mode === 'edit'? "Update" : "Save" }
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </>
  );
}

export default Create;