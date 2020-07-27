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
  FormHelperText,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Progress, HeaderLabel, InfoCard } from '@backstage/core';
import { BackstageTheme } from '@backstage/theme';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import { Autocomplete } from '@material-ui/lab';

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textBox: {
        width: '100%',
        //height: 300,
    },
    infoCard: {
        width: '100%',
    },
    bodyResponse: {
        width: '50%',
    }
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

export default function MyFormContainer() {
  //const MyFormContainer: FC<{}> = () => {
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);
    const [state, setState] = React.useState({
        newCall: {
            host: 'localhost',
            port: '6565',
            service: 'expediagroup.helloworld.v1.HelloWorldAPI',
            method: 'SayHello',
            body: 'me',
            response: 'Press the send button to get a response! :D',
        },
        methods: methods,
        services: services,
    
    });

    const handleFormSubmit = () => {
        //event.preventDefault();
        let userData = state.newCall;
/*
        fetch("http://example.com", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
        }).then(response => {
        response.json().then(data => {
            console.log("Successful" + data);
        });
        });
*/
        alert('clicked: '+userData.method+","+userData.service+","+userData.host+","+userData.port+","+userData.body);
        let res = userData.method+","+userData.service+","+userData.host+","+userData.port+","+userData.body;
        setState({ ...state, [state.newCall.response]: res });
        state.newCall.response = res;
      }

  const handleChangeHost = (event) => {
    setState({ ...state, [state.newCall.host]: event.target.value });
    state.newCall.host = event.target.value;
  };

  const handleChangePort = (event) => {
    setState({ ...state, [state.newCall.port]: event.target.value });
    state.newCall.port = event.target.value;  
  };

  const handleChangeService = (event) => {
    console.log(event.target.value);
    //setState(event.target.value);
    //setState({ ...state, [state.service]: event.target.value });
    setState({ ...state, [state.newCall.service]: event.target.value });
    state.newCall.service = event.target.value;
    //setState(event.target.value);
  };
  const handleChangeMethod = (event) => {
    console.log(event.target.value);
    setState({ ...state, [state.newCall.method]: event.target.value });
    state.newCall.method = event.target.value;
    //setState(event.target.value);
  };

  const handleChangeBody = (event) => {
    console.log(event.target.value);
    setState({ ...state, [state.newCall.body]: event.target.value });
    state.newCall.body = event.target.value;  
  };

//onSubmit={handleFormSubmit}

    return (
      <form className="container-fluid" >
              <Paper>
      <div className={classes.root}>
        <div className={classes.root}>
        </div>
        <Divider />
        <Card>
          <CardContent>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <FormControl className={classes.formControl}>
                    <TextField
                    name={"host"}
                    required
                    label="Host"
                    //defaultValue='localhost'
                    variant="outlined"
                    value={state.newCall.host}
                    onChange={handleChangeHost}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                    name={"port"}
                    required
                    label="Port"
                    //defaultValue='6565'
                    variant="outlined"
                    value={state.newCall.port}
                    onChange={handleChangePort}
                    />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl}>
                    <TextField
                    name={"service"}
                    fullWidth
                    select
                    required
                    label="Service name"
                    //defaultValue='expediagroup.greeter.Greeter'
                    variant="outlined"
                    value={state.newCall.service}
                    onChange={handleChangeService}
                    >
                    {services.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl}>
                    <TextField
                    name={"method"}
                    fullWidth
                    select
                    required
                    label="Method name"
                    variant="outlined"
                    //defaultValue='sayHello'
                    value={state.newCall.method}
                    onChange={handleChangeMethod}
                    >
                    {methods.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl}>
                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<PlayIcon />}
                    onClick={() => { handleFormSubmit() }}
                    >
                    Send
                    </Button>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Divider />
        <div>
          <Grid container spacing={3} direction="row">
            <Grid item className={classes.bodyResponse}>
                <InfoCard title="Body (raw JSON)" className={classes.infoCard}>
                        <TextField className={classes.textBox}
                        name={"body"}
                        id="outlined-multiline-static"
                        multiline
                        rows={15}
                        variant="outlined"
                        fullWidth
                        value={state.newCall.body}
                        onChange={handleChangeBody}
                        />
                </InfoCard>
            </Grid>
            <Grid item className={classes.bodyResponse}>
                <InfoCard title="Response" className={classes.infoCard}>
                        <TextField className={classes.textBox}
                        id="outlined-read-only-input"
                        multiline
                        rows={15}
                        label="Read Only"
                        value={state.newCall.response}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        />
                </InfoCard>
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
      </form>
    );
  }

//export default MyFormContainer;
