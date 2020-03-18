import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';

const handleClick = (event)=> {
  console.info('You clicked a breadcrumb.');
}
const useStyle = makeStyles(theme=> ({
  root: {
    margin: theme.spacing(2)
  }
}))

const getName = ()=> {
  let path = window.location.pathname.match(/edit/ig) 
  if(path && path.length){
    return "Edit"
  }
  path = window.location.pathname.match(/create/ig) 
  if(path && path.length){
    return "Create"
  }
  return "List"
}

const Breadcrumb = (...props)=>{
  const classes = useStyle()
  let crum = getName()

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.root}>
      <Link color="inherit" href="/" onClick={handleClick}>
        Package
      </Link>
      <Typography color="textPrimary">{crum}</Typography>
    </Breadcrumbs>
  );
}

export default Breadcrumb;