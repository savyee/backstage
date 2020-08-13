
// const path = require('path');
// const protoloader = require('@grpc/proto-loader');
// const grpc = require('grpc');
// const Metadata = require('grpc/src/metadata');




import { resolve } from 'path';

import { loadSync } from '@grpc/proto-loader';

import { loadPackageDefinition, credentials } from 'grpc';


import path from 'path';
import protoloader from '@grpc/proto-loader';
import grpc from 'grpc';
import Metadata from 'grpc/src/metadata';
//import fs from 'fs';




//export default async function runClient(req, res, next) {
export default function runClient(host, port, method, service, body) {

    console.log("doggo");
    //console.log("req: "+req.body);
    //console.log("res: "+res);

    console.log("I am body "+body);
    console.log("I am method "+method);

    console.log("I am service "+service);

    //const parsed = JSON.parse(body);

    //body = '{name: elmo}';

    //const payload = JSON.parse(body);

    const protoPath = resolve(__dirname, '../proto/expediagroup/greeter/greeter_api.proto')
    const importPath = resolve(__dirname, '../proto');



    
    
    const packageDefinition = loadSync(protoPath, {
      includeDirs: [importPath],
      enums: String,
    });


    
    const loadedApi = loadPackageDefinition(packageDefinition);


    
    const clientBuilder = service.split('.')
    .reduce((o, k) => {return o && o[k]}, loadedApi);


    console.log("doggo2");


    const prototype = clientBuilder.prototype





    const myClient = new clientBuilder(''+host+':'+port, grpc.credentials.createInsecure());



    return new Promise((good, bad) => {
      myClient.makeUnaryRequest(
        '/' + service + '/' + method, 
        prototype[method].requestSerialize,
        prototype[method].requestDeserialize,
        {name: 'meep'},
        new Metadata(),
        {},
        (err, response) => {
        console.log("in callback");
        if (err) {console.log(err); bad(JSON.stringify(err))}
        else{console.log(JSON.stringify(response)); good(JSON.stringify(response))};
      });   
    }) 

      const resp = myClient.makeUnaryRequest(
        '/' + serviceToCall + '/' + methodToCall, 
        prototype[methodToCall].requestSerialize,
        prototype[methodToCall].requestDeserialize,
        payload,
        new Metadata(),
        {},
        (err, resp) => {
          console.log('it worked ' + JSON.stringify(resp));
          return resp;
        }
      );

    
    //(err, resp) => {console.log('it worked ' + JSON.stringify(resp))}
 
    const client = new loadedApi.expediagroup.greeter.Greeter(''+host+':'+port, credentials.createInsecure());
    return new Promise((good, bad) => {
      client.SayHello({name: body}, (err, response) => {
        if (err) {console.log(err); bad(err)}
        else{console.log(response); good(response)};
        //res = response;
      });   
    }) 
}