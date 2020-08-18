
export function ListServices(host: string, port: string) {
  console.log(`${host} ${port}`);
  
  return [
    'expediagroup.greeter.Greeter',
    'expediagroup.helloworld.v1.HelloWorldAPI'
  ];
}
