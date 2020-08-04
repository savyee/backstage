import React, { FC, useState, Suspense } from 'react';
import { 
  TextField,
  makeStyles,
} from '@material-ui/core';
import { BackstageTheme } from '@backstage/theme';

/*
import path from 'path';
import protoloader from '@grpc/proto-loader';
import grpc from 'grpc';
*/

/*
const path = require('path');
const protoloader = require('@grpc/proto-loader');
const grpc = require('grpc');
*/

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

const RunHelloClient: FC<{}> = () => {
  console.log("in run hello client");
  const classes = useStyles();

  /*
  const protoPath = path.resolve(__dirname, '../proto/expediagroup/greeter/greeter_api.proto')
  const importPath = path.resolve(__dirname, '../proto');

  console.log(protoPath);
  console.log(importPath);

  
  const packageDefinition = protoloader.loadSync(protoPath, {
    includeDirs: [importPath],
    enums: String,
  });
  
  
  

  const loadedApi = grpc.loadPackageDefinition(packageDefinition);
  const client = new loadedApi.expediagroup.greeter.Greeter('localhost:6565', grpc.credentials.createInsecure());
  client.SayHello({name: 'Savanna'}, (err, response) => {
    if (err) console.log(err);
    else(console.log(response));
  });
  */
  
  
  
  
  return (
    <div className={classes.root}>                
      <TextField
        id="outlined-read-only-input"
        multiline
        rows={50}
        label="Read Only"
        defaultValue="{name: me}"
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default RunHelloClient;

