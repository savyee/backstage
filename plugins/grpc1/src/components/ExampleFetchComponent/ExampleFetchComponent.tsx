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
    value: 'USD',
    label: 'expediagroup.greeter.Greeter',
  },
  {
    value: 'EUR',
    label: 'expediagroup.helloworld.v1.HelloWorldAPI',
  },
];

const methods = [
  {
    value: 'USD',
    label: 'SayHello',
  },
  {
    value: 'EUR',
    label: 'SayHelloAgain',
  },
];

const ExampleFetchComponent: FC<{}> = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

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
              -   <TextField
-                  required
-                  id="standard-required"
-                  label="Host"
-                  defaultValue="localhost"
-                  variant="outlined"
-                />
                 <Tex
                <TextField
                  required
                  id="standard-required"
                  label="Port"
                  defaultValue="6565"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  select
                  required
                  id="standard-required"
                  label="Service name"
                  defaultValue="expediagroup.greeter.Greeter"
                  variant="outlined"
                  value="bob"
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
                  id="standard-required"
                  label="Method name"
                  defaultValue="expediagroup.greeter.Greeter"
                  variant="outlined"
                  value="bob"
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
                <FetchResponse />
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
