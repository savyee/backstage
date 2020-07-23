const path = require('path');
const protoloader = require('@grpc/proto-loader');
const grpc = require('grpc');


module.exports = async function runClient() {
  //export async function runClient() {
    const protoPath = path.resolve(__dirname, '../proto/expediagroup/greeter/greeter_api.proto')
    const importPath = path.resolve(__dirname, '../proto');
    const packageDefinition = protoloader.loadSync(protoPath, {
      includeDirs: [importPath],
      enums: String,
    });
    
    const loadedApi = grpc.loadPackageDefinition(packageDefinition);
    const client = new loadedApi.expediagroup.greeter.Greeter('localhost:6565', grpc.credentials.createInsecure());
    client.SayHello({name: 'Savanna'}, (err, response) => {
      if (err) console.log(err);
      else(console.log(response));
    });
}