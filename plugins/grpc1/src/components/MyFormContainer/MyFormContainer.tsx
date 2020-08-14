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
//import RunHelloClient from '../../../../grpc1-backend/index';

// import MonacoEditor from 'react-monaco-editor';
// import { ControlledEditor as MonacoEditor } from "@monaco-editor/react";
// import Editor from "@monaco-editor/react";

import { ControlledEditor } from "@monaco-editor/react";

type MyProps = {

};

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

function getServiceTree() {
  return [
    {
      name: 'expediagroup.greeter.Greeter',
      methods: [
        {
          name: 'SayHello'
        },
        {
          name: 'SayHelloAgain'
        }
      ]
    },
    {
      name: 'expediagroup.helloworld.v1.HelloWorldAPI',
      methods: [
        {
          name: 'SayHello'
        }
      ]
    }
  ];
}


type Service = {
  value: string;
  label: string;
};

type Method = {
  value: string;
  label: string;
};

export default function MyFormContainer() {
  //const MyFormContainer: FC<{}> = () => {
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);
    const [state, setState] = React.useState({
      host: "localhost",
      port: "6565",
      service: "expediagroup.helloworld.v1.HelloWorldAPI",
      method: "SayHello",
      body: "{name: me}",
      response: "Press the send button to get a response! :D"
    });
    const [serviceList, setServiceList] = React.useState(new Array<Service>());
    const [methodList, setMethodList] = React.useState(new Array<Method>());
    let serviceTree = [];

    const handleFormSubmit = async() => {
        //event.preventDefault();
        let userData = state;
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
        
        //const response = await fetch('http://localhost:7000/grpc1/grpc1');
        //console.log(response);

        //await fetch('http://localhost:7000/grpc1/grpc1');

        const url = 'http://localhost:7000/grpc1/grpc1';
        //const body = {name: 'bob'};
        const body = {
          //grpcCall: {
            "host": userData.host,
            "port": userData.port,
            "method": userData.method,
            "service": userData.service,
            "body": userData.body,
          //},
        };

   
        
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(body) // body data type must match "Content-Type" header
        });

       const resp = await response.json();
       //console.log("after");
       //console.log(resp);
       const respBox = JSON.stringify(resp);



        //let res = userData.method+","+userData.service+","+userData.host+","+userData.port+","+userData.body;
        setState({ ...state, [state.response]: respBox });
        state.response = respBox;
        //var greet = RunHelloClient;
      }

  const handleChangeHost = (event: any) => {
    setState({ ...state, host: event.target.value });
    //state.newCall.host = event.target.value;
  };

  const handleChangePort = (event: any) => {
    setState({ ...state, port: event.target.value });
    //state.newCall.port = event.target.value;  
  };

  const requestServices = () => {
    serviceTree = getServiceTree();

    const services = new Array<Service>();
    for(const service of serviceTree) {
      services.push({
        label: service.name,
        value: service.name
      });
    }
    setServiceList(services);
    if(services.length > 0) {
      changeService(services[0].label);
    }
  }

  const handleChangeService = (event: any) => {
    changeService(event.target.value);
  };

  const handleChangeMethod = (event: any) => {
    changeMethod(state.service, event.target.value);
  };

  const changeService = (service: string) => {
    setMethodList(methods);
    changeMethod(service, methods[0].label);
  };

  const changeMethod = (service: string, method: string) => {
    setState({ ...state, service: service, method: method });
  }

  const handleChangeBody = (event: any) => {
    setState({ ...state, body: event.target.value });
    //state.newCall.body = event.target.value;  
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
                    value={state.host}
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
                    value={state.port}
                    onChange={handleChangePort}
                    />
                </FormControl>
                <Button 
                  variant="contained"
                  color="primary" 
                  style={{
                    left: '8px',
                    top: '8px',
                    height: '55px',
                    position:'relative'}
                  }
                  onClick={requestServices}
                >
                  Go
                </Button>
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl}>
                    <TextField
                      name={"service"}
                      fullWidth
                      select
                      required
                      label="Service name"
                      variant="outlined"
                      value={state.service}
                      onChange={handleChangeService}
                      disabled={serviceList.length == 0}
                    >
                    {serviceList.map(option => (
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
                      value={state.method}
                      onChange={handleChangeMethod}
                      disabled={methodList.length == 0}
                    >
                    {methodList.map(option => (
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
                    disabled={methodList.length == 0}
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
                        value={state.body}
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
                        value={state.response}
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
