-/*
- * Copyright 2020 Spotify AB
- *
- * Licensed under the Apache License, Version 2.0 (the "License");
- * you may not use this file except in compliance with the License.
- * You may obtain a copy of the License at
- *
- *     http://www.apache.org/licenses/LICENSE-2.0
- *
- * Unless required by applicable law or agreed to in writing, software
- * distributed under the License is distributed on an "AS IS" BASIS,
- * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
- * See the License for the specific language governing permissions and
- * limitations under the License.
- */
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
        <AceEditor />
    </div>
  );
};

export default FetchResponse;