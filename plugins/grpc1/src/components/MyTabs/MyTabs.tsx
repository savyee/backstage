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
import React, { FC, useState, Suspense } from 'react';
import { Progress, HeaderLabel } from '@backstage/core';
import { BackstageTheme } from '@backstage/theme';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CloseIcon from '@material-ui/icons/Close';

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
    height: '60px',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background: theme.palette.background.paper,
  },
  flexContainer: {
     display: 'flex',
     flexDirection: 'row',
     padding: 0,
     flexWrap: 'nowrap',
     transform: 'translateZ(0)',
   },
 fakeTabs: {
    button: 'true',
    divider: 'true',
    background: 'gray'
  },
}));

const MyTabs: FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.flexContainer}>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash1" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash2" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash3" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
           </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash4" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash5" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash6" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash76" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash8" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash9" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash10" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash11" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash12" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash13" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash14" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.fakeTabs} button divider>
          <ListItemText primary="Trash15" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <GridList className={classes.gridList} cols={5}></GridList>
        <GridListTile>
          <GridListTileBar
            title="bob"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={
              <IconButton>
                <CloseIcon className={classes.title} />
              </IconButton>
            }
          />
        </GridListTile>
        <GridListTile>
          <GridListTileBar
            title="hello"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={
              <IconButton>
                <CloseIcon className={classes.title} />
              </IconButton>
            }
          />
        </GridListTile>
        <GridListTile>
          <GridListTileBar
            title="greeter"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={
              <IconButton>                
                <CloseIcon className={classes.title} />
              </IconButton>
            }
          />
          </GridListTile>
          <GridListTile>
            <GridListTileBar
              title="greeter2"
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton>
                <CloseIcon className={classes.title} />
              </IconButton>
            }
          />
        </GridListTile>
      </GridList>
    </div>
  );
};

export default MyTabs;
