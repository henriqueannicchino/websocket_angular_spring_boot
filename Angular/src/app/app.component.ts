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
  private stompClient;

  constructor() {}

  connected(id) {
    let ws = new SockJS(this.serverUrl);
    console.log(ws);
    console.log("Conexão criada")
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe(`/user/${id}/private`, (frame) => {
        console.log(frame)
      }
      );
    });
  }

  disconnectar(){
    console.log("Conexão Finalizada")
    this.stompClient.disconnect();
  }

  sendMessage(message) {
    console.log(message)
    this.stompClient.send(`/app/private-message`, {}, JSON.stringify({numeroPedido:message}));
    //$('#input').val('');
  }
}
