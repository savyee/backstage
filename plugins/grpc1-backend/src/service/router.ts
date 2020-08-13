
import { Logger } from 'winston';
import Router from 'express-promise-router';
import express from 'express';

//import RunHelloClient from '../RunHelloClient';
import RunHelloClient from '../RunHelloClient4';


//const path = require('path');
//const protoloader = require('@grpc/proto-loader');
//const grpc = require('grpc');

type RouterOptions = {
    logger: Logger;
};

export function createRouter(): express.Router {
    const router = Router();
 
    
    router.get('/grpc1', (req, res) => {
        const { id } = req.params;
        const query = req.query;
        //const response = RunHelloClient();
        console.log("I am from router.ts");


        const response = RunHelloClient(req.body.host, req.body.port, req.body.method, req.body.service, req.body.body);
        
        response.then(result => {
            console.log("processed = "+result);
            res.status(200).send(result);

        }, failure => res.status(500));

        //res.status(200).send(response);
        //res.status(200).json({greeting: 'Succesfully gotten'});

    });

    router.post('/grpc1', (req, res) => {
        //const { id } = req.params;
        //const query = req.query;
        const response = RunHelloClient(req.body.host, req.body.port, req.body.method, req.body.service, req.body.body);
        response.then(result => {
            console.log("in router: "+result);
            res.status(200).send(result);
        }, failure => res.status(500));
    

        //console.log(response)
        //res.status(200).json({greeting: "Successfully posted"});
        //res.status(200).json({greeting: req.body});
        //RunHelloClient();

    });



    return router;
}
