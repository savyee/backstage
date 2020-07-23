
import React, { FC, useState, Suspense } from 'react';
import { Tabs,
  Tab,
  Button,
  makeStyles,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Progress, HeaderLabel } from '@backstage/core';
import { BackstageTheme } from '@backstage/theme';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CloseIcon from '@material-ui/icons/Close';

import AceEditor from 'react-ace';
import RunHelloClient from '../RunHelloClient';

const path = require('path');
const protoloader = require('@grpc/proto-loader');
const grpc = require('grpc');


const useStyles = makeStyles<BackstageTheme>(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
}));




const FetchResponse: FC<{}> = () => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Button variant="contained">{RunHelloClient}</Button>
    </div>
  );
};

export default FetchResponse;