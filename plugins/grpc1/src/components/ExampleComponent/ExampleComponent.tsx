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

import React, { FC } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  pageTheme,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core';
import { BackstageTheme } from '@backstage/theme';
import ExampleFetchComponent from '../ExampleFetchComponent';
import MyTabs from '../MyTabs';
import MyFormContainer from '../MyFormContainer/MyFormContainer';

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
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const ExampleComponent: FC<{}> = () => (
  // const classes = useStyles();

  <Page theme={pageTheme.tool}>
    <Header title="Welcome to grpc1!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="gRPC Plugin :D">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Information card">
            <Typography variant="body1">
              Here is the gRPC plugin, where you can run your gRPC proto files and see the output!  
              Just enter your host name and port, then we'll find your proto file and pre-populate the dropdowns with the services we found.  
              Then you pick your service, and then the appropriate methods will show up.  
              Select which one you want, see your code show up on the left, modify it, and send it to get a response on the right!
            </Typography>
          </InfoCard>
        </Grid>
      </Grid>
      <div>
        <MyFormContainer />
      </div>
    </Content>
  </Page>
);

export default ExampleComponent;
