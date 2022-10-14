import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private serverUrl = 'http://192.168.0.91:8080/socket-endpoint'
  
  title = 'WebSockets chat';
  sessionIdWebsocket: string = '';
  message: string = '';
  private stompClient;

  constructor() {}

  connected() {
    let ws = new SockJS(this.serverUrl);
    console.log(ws);
    console.log("Conexão criada")
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      
      var url = ws._transport.url;
      this.sessionIdWebsocket = url.split("/")[5];
      
      that.stompClient.subscribe(`/user/${this.sessionIdWebsocket}/private`, (frame) => {
        console.log(frame);
      });
      that.sendMessage();
    });
  }

  disconnectar(){
    console.log("Conexão Finalizada")
    this.stompClient.disconnect();
  }

  sendMessage() {
    console.log(this.message, this.sessionIdWebsocket)
    this.stompClient.send(`/app/private-message`, {}, JSON.stringify({numeroPedido: this.message}));
    //$('#input').val('');
  }
}
