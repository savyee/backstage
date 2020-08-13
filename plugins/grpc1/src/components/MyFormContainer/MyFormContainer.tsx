import React, { FC } from 'react';
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
  
  // const services = [
  //   {
  //     value: 'expediagroup.greeter.Greeter',
  //     label: 'expediagroup.greeter.Greeter',
  //   },
  //   {
  //     value: 'expediagroup.helloworld.v1.HelloWorldAPI',
  //     label: 'expediagroup.helloworld.v1.HelloWorldAPI',
  //   },
  // ];
  
  // const methods = [
  //   {
  //     value: 'SayHello',
  //     label: 'SayHello',
  //   },
  //   {
  //     value: 'SayHelloAgain',
  //     label: 'SayHelloAgain',
  //   },
  // ];

//export default MyFormContainer() {
export const MyFormContainer: FC<MyProps> = ({
}) => {


<<<<<<< HEAD
/*const serviceList = [
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
]*/

type Service = {
  value: string;
  label: string;
};

type Method = {
  value: string;
  label: string;
};

export default function MyFormContainer() {
=======
>>>>>>> 31b41b52ce24257525148de19cde92a724d36d20
  //const MyFormContainer: FC<{}> = () => {
    const classes = useStyles();
    //const [tabIndex, setTabIndex] = useState(0);
    const [state, setState] = React.useState({
        newCall: {
            host: 'localhost',
            port: '6565',
            service: 'expediagroup.helloworld.v1.HelloWorldAPI',
            method: 'SayHello',
            body: '{name: me}',
            response: 'Press the send button to get a response! :D',
        },
<<<<<<< HEAD
        //methods: new Array<Method>(),
        //services: new Array<Service>(),

=======
        services: [
          {
            value: 'expediagroup.greeter.Greeter',
            label: 'expediagroup.greeter.Greeter',
          },
          {
            value: 'expediagroup.helloworld.v1.HelloWorldAPI',
            label: 'expediagroup.helloworld.v1.HelloWorldAPI',
          },
        ],
        
        methods:[
          {
            value: 'SayHello',
            label: 'SayHello',
          },
          {
            value: 'SayHelloAgain',
            label: 'SayHelloAgain',
          },
        ],
    
>>>>>>> 31b41b52ce24257525148de19cde92a724d36d20
    });
    const [serviceList, setServiceList] = React.useState(new Array<Service>());
    const [methodList, setMethodList] = React.useState(new Array<Method>());

    

    const { newCall, methods, services } = state;

    const handleFormSubmit = async() => {
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

        const respJSON = await response.json();
        console.log("meow: "+JSON.stringify(respJSON));

        const respBox = JSON.stringify(respJSON);



        
        
        // }).then(response => {
        //   response.json().then(data => {
        //       console.log("Successful" + JSON.stringify(data));
        //   }).catch(error => alert(error.message));
        //   });        
        
        //.then(response => response)
        //.catch(error => alert(error.message));

        //}).then(response => response.json)
        //}).then(response => alert(JSON.stringify(response.json)))


       //const resp = await response.json();
       //const resp = JSON.stringify(response.json);
       //console.log("response: "+resp);

       //console.log("after");
       //console.log(resp);
       //const respBox = JSON.stringify(resp);



        //let res = userData.method+","+userData.service+","+userData.host+","+userData.port+","+userData.body;
        setState({ ...state, [state.newCall.response]: respBox });
        state.newCall.response = respBox;
        //var greet = RunHelloClient;
      }

  const handleChangeHost = (event: any) => {
    setState({ ...state, [state.newCall.host]: event.target.value });
    state.newCall.host = event.target.value;
  };

  const handleChangePort = (event: any) => {
    setState({ ...state, [state.newCall.port]: event.target.value });
    state.newCall.port = event.target.value;  
  };

  //const requestServices(host: string, port: number) {}

  const handleChangeService = (event: any) => {
    changeService(event.target.value);
  };

  const handleChangeMethod = (event: any) => {
    changeMethod(event.target.value);
  };

  const changeService = (service: string) => {
    state.newCall.service = service;
    setMethodList(methods);
    changeMethod(methods[0].label);
  };

  const changeMethod = (method: string) => {
    state.newCall.method = method;
  }

  const handleChangeBody = (event: any) => {
    setState({ ...state, [state.newCall.body]: event.target.value });
    state.newCall.body = event.target.value;  
  };

  const options = {
    selectOnLineNumbers: true
  };

  const onChange = (e, newValue) => {
    setState({ ...state, [state.newCall.body]: newValue });
    //state.newCall.body = newValue;
    console.log('onChange', newValue, e);
  };

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
                <Button 
                  variant="contained"
                  color="primary" 
                  style={{
                    left: '8px',
                    top: '8px',
                    height: '55px',
                    position:'relative'}
                  }
                  onClick={() => {
                    setServiceList(services);
                    changeService(services[0].label);
                  }}
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
                      //defaultValue='expediagroup.greeter.Greeter'
                      variant="outlined"
                      value={state.newCall.service}
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
                      //defaultValue='sayHello'
                      value={state.newCall.method}
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
                        <ControlledEditor
                          width="800"
                          height="90vh"
                          language="javascript"
                          theme="vs-dark"
                          value={state.newCall.body}
                          options={options}
                          onChange={onChange}
                          // editorDidMount={editorDidMount}
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

export default MyFormContainer;
