
const path = require('path');
const protoloader = require('@grpc/proto-loader');
const grpc = require('grpc');



import { resolve } from 'path';

import { loadSync } from '@grpc/proto-loader';

import { loadPackageDefinition, credentials } from 'grpc';
//import fs from 'fs';




export default async function runClient(req, res, next) {
    console.log("doggo");
    const protoPath = resolve(__dirname, '../proto/expediagroup/greeter/greeter_api.proto')
    const importPath = resolve(__dirname, '../proto');
    
    
    const packageDefinition = loadSync(protoPath, {
      includeDirs: [importPath],
      enums: String,
    });
    
    const loadedApi = loadPackageDefinition(packageDefinition);
    const client = new loadedApi.expediagroup.greeter.Greeter('localhost:6565', credentials.createInsecure());
    client.SayHello({name: 'Gert'}, (err, response) => {
      if (err) console.log(err);
      else(console.log(response));
      res = response;
    });
    return res;
    
}