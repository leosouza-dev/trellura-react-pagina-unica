import * as signalR from '@microsoft/signalr';

export default () => {
  const conexao = new signalR.HubConnectionBuilder()
  .withUrl('http://localhost:5000/trellurahub')
  .build();

  conexao.start().then(() => {
    console.log(`[App] connectionId = ${conexao.connectionId}`);
  }).catch(() => {console.log('error')})
  return conexao;
}


