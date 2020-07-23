/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC, useState, Suspense } from 'react';
import {
  Button,
  Paper,
  Tabs,
  Tab,
  makeStyles,
  Typography,
  Divider,
  Grid,
  TextField,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
  MenuItem,
} from '@material-ui/core';
import { Progress, HeaderLabel } from '@backstage/core';
import { BackstageTheme } from '@backstage/theme';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import FetchResponse from '../FetchResponse';
import RunHelloClient from '../RunHelloClient';


const useStyles = makeStyles<BackstageTheme>(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  tabs: {
    background: theme.palette.background.paper,
  },
  graphiQlWrapper: {
    flex: 1,
    '@global': {
      '.graphiql-container': {
        boxSizing: 'initial',
      },
    },
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListTile: {
    height: 30,
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const services = [
  {
    value: 'expediagroup.greeter.Greeter',
    label: 'expediagroup.greeter.Greeter',
  },
  {
    value: 'expediagroup.helloworld.v1.HelloWorldAPI',
    label: 'expediagroup.helloworld.v1.HelloWorldAPI',
  },
];

const methods = [
  {
    value: 'SayHello',
    label: 'SayHello',
  },
  {
    value: 'SayHelloAgain',
    label: 'SayHelloAgain',
  },
];



const ExampleFetchComponent: FC<{}> = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [state, setState] = React.useState({
    host: 'localhost',
    port: '6565',
    service: 'expediagroup.helloworld.v1.HelloWorldAPI',
    method: 'SayHello',
    body: 'me',
  });
  const handleChangeHost = (event) => {
    setState(event.target.value);
    //setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleChangePort = (event) => {
    //setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleChangeService = (event) => {
    console.log(event.target.value);
    //setState(event.target.value);
    //setState({ ...state, [state.service]: event.target.value });
    state.service = event.target.value;
    //setState(event.target.value);
  };
  const handleChangeMethod = (event) => {
    console.log(event.target.value);
    //setState({ ...state, [state.method]: event.target.value });
    state.method = event.target.value;
    //setState(event.target.value);

  };
  const handleChange = (event) => {
    //setState(event.target.value);
    setState({ ...state, [event.target.name]: event.target.value });
  };

  //console.log(state.body);
  //const { host, port, service, method, body } = state;

  const onSubmit = () => {
    setState({ ...state, [event.target.name]: event.target.checked });
    alert('clicked: '+state.method+","+state.service);
  };

  return (
    <Paper>
      <div className={classes.root}>
        <div className={classes.root}>
        </div>
        <Divider />
        <Card>
          <CardContent>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <TextField
                  required
                  label="Host"
                  //defaultValue='localhost'
                  variant="outlined"
                  value={state.host}
                  onChange={handleChangeHost}
                />
                <TextField
                  required
                  label="Port"
                  //defaultValue='6565'
                  variant="outlined"
                  value={state.port}
                  onChange={handleChangePort}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  select
                  required
                  label="Service name"
                  //defaultValue='expediagroup.greeter.Greeter'
                  variant="outlined"
                  value={state.service}
                  onChange={handleChangeService}
                >
                  {services.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  select
                  required
                  label="Method name"
                  variant="outlined"
                  //defaultValue='sayHello'
                  value={state.method}
                  onChange={handleChangeMethod}
                >
                  {methods.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<PlayIcon />}
                  onClick={() => { onSubmit() }}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Divider />
        <div>
          <Grid container spacing={3} direction="row">
            <Grid item>
              <Tabs
                classes={{ root: classes.tabs }}
                value={tabIndex}
                onChange={(_, value) => setTabIndex(value)}
                indicatorColor="primary"
              >
                <Tab label="Request form" />
                <Tab label="Raw JSON" />
              </Tabs>
              <Paper>    

                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={50}
                  defaultValue="{name: me}"
                  variant="outlined"
                  fullWidth
                />
              </Paper>
            </Grid>
            <Grid item>
              <Typography variant="button" display="block" gutterBottom>
                Response
              </Typography>
              <Paper>
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
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div />
        <Divider />
        <div className={classes.graphiQlWrapper}>
          <HeaderLabel label="Lifecycle" value="Alpha" />
        </div>
      </div>
    </Paper>
  );
};

export default ExampleFetchComponent;
