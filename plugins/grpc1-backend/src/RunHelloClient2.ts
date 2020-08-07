
const path = require('path');
const protoloader = require('@grpc/proto-loader');
const grpc = require('grpc');



import { resolve } from 'path';

import { loadSync } from '@grpc/proto-loader';

import { loadPackageDefinition, credentials } from 'grpc';
//import fs from 'fs';




//export default async function runClient(req, res, next) {
export default function runClient(host, port, method, service, body) {

    console.log("doggo");
    //console.log("req: "+req.body);
    //console.log("res: "+res);

    console.log("I am body "+body);
    //const parsed = JSON.parse(body);

    const protoPath = resolve(__dirname, '../proto/expediagroup/greeter/greeter_api.proto')
    const importPath = resolve(__dirname, '../proto');
    
    
    const packageDefinition = loadSync(protoPath, {
      includeDirs: [importPath],
      enums: String,
    });
    
    const loadedApi = loadPackageDefinition(packageDefinition);
    const client = new loadedApi.expediagroup.greeter.Greeter(''+host+':'+port, credentials.createInsecure());
    return new Promise((good, bad) => {
      client.SayHello({name: body}, (err, response) => {
        if (err) {console.log(err); bad(err)}
        else{console.log(response); good(response)};
        //res = response;
      });   
    }) 
}