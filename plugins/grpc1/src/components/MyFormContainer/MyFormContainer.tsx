import React from 'react';
import {
  Button,
  Paper,
  makeStyles,
  Divider,
  Grid,
  TextField,
  Card,
  CardContent,
  FormControl,
  MenuItem
} from '@material-ui/core';
import { HeaderLabel, InfoCard } from '@backstage/core';
import { BackstageTheme } from '@backstage/theme';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import { ListServices } from '../../reflection';

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
      minWidth: 160,
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

type Method = {
  name: string
  schema: string
};

type Service = {
  name: string;
  methods: Method[]
};

const sampleSchema = JSON.stringify({
  name: "me"
}, null, 2);

function getServiceTree(host: string, port: string) {
  const services = ListServices(host, port);
  const serviceList = new Array<Service>();
  for(const service of services) {
    const methods = [
      {
        name: 'SayHello',
        schema: sampleSchema
      },
      {
        name: 'SayHelloAgain',
        schema: sampleSchema
      }
    ];
    serviceList.push({
      name: service,
      methods: methods
    });
  }

  return serviceList;
}

const defaultService: Service = { 
  name: "",
  methods: [
    {
      name: "",
      schema: ""
    }
  ]
};

const defaultResponse = "Press the send button to get a response! :D";

export default function MyFormContainer() {
  const classes = useStyles();
  const [host, setHost] = React.useState("localhost");
  const [port, setPort] = React.useState("6565");
  const [errorText, setErrorText] = React.useState("");
  const [service, setService] = React.useState(defaultService);
  const [method, setMethod] = React.useState(service.methods[0]);
  const [body, setBody] = React.useState(method.schema);
  const [response, setResponse] = React.useState(defaultResponse);
  const [serviceList, setServiceList] = React.useState(new Array<Service>());

  const handleFormSubmit = async() => {
    const userData: any = {
      method: method.name,
      service: service.name,
      host: host,
      port: port,
      body: body
    };
    const url = 'http://localhost:7000/grpc1/grpc1';
    const requestBody = {
      "host": userData.host,
      "port": userData.port,
      "method": userData.method,
      "service": userData.service,
      "body": userData.body,
    };
    const resp = await fetch(url, {
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
      body: JSON.stringify(requestBody) // body data type must match "Content-Type" header
    });

    const respContent = await resp.json();
    const respBox = JSON.stringify(respContent, null, 2);
    setResponse(respBox);
  }

  const handleChangeHost = (event: any) => {
    setHost(event.target.value);
  };

  const handleChangePort = (event: any) => {
    setPort(event.target.value);
  };

  const changeMethod = (newMethod: Method) => {
    setMethod(newMethod);
    setBody(newMethod.schema);
  };

  const changeService = (newService: Service) => {
    setService(newService);
    changeMethod(newService.methods[0]);
  };

  const requestServices = () => {
    const services = getServiceTree(host, port);
    setServiceList(services);
    if(services.length > 0) {
      changeService(services[0]);
      setErrorText("");
    } else {
      setErrorText("No services found");
    }
  };

  const handleChangeService = (event: any) => {
    const findService = (serv: Service) => serv.name === event.target.value;
    const newService = serviceList.find(findService);
    if(newService) {
      changeService(newService);
    }
  };

  const handleChangeMethod = (event: any) => {
    const findMethod = (mthd: Method) => mthd.name === event.target.value;
    const newMethod = service.methods.find(findMethod);
    if(newMethod) {
      changeMethod(newMethod);
    }
  };

  const handleChangeBody = (event: any) => {
    setBody(event.target.value);
  };

  return (
    <form className="container-fluid" >
      <Paper>
        <div className={classes.root}>
          <div className={classes.root} />
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
                      variant="outlined"
                      value={host}
                      onChange={handleChangeHost}
                      error={errorText.length > 0}
                      helperText={errorText}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <TextField
                      name={"port"}
                      required
                      label="Port"
                      variant="outlined"
                      value={port}
                      onChange={handleChangePort}
                      error={errorText.length > 0}
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
                      value={service.name}
                      onChange={handleChangeService}
                      disabled={serviceList.length === 0}
                    >
                      {serviceList.map((option, index) => (
                        <MenuItem key={index} value={option.name}>
                        {option.name}
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
                      value={method.name}
                      onChange={handleChangeMethod}
                      disabled={serviceList.length === 0}
                    >
                      {service.methods.map((option, index) => (
                        <MenuItem key={index} value={option.name}>
                        {option.name}
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
                      disabled={serviceList.length === 0}
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
                    value={body}
                    onChange={handleChangeBody}
                    disabled={serviceList.length === 0}
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
                    value={response}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                    fullWidth
                    disabled={serviceList.length === 0}
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
