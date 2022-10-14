package com.socket.teste2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/private-message")
    public Void privateMessage(@Payload Message message) throws InterruptedException{
        System.out.println("Messagem privata: "+message);
        Thread.sleep(1000);
        simpMessagingTemplate.convertAndSendToUser(message.getNumeroPedido(),"/private", message); //
        Thread.sleep(2000);
        simpMessagingTemplate.convertAndSendToUser(message.getNumeroPedido(),"/private", message); // /user/nomeusuario/private
        return null;
        
        // return message;
    }
}
