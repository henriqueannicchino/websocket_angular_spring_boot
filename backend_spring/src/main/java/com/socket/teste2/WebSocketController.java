package com.socket.teste2;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/private-message")
    public Void privateMessage(@Payload Message message, @Header("simpSessionId") String sessionId) throws InterruptedException {
        System.out.println("Messagem: "+message);

        Thread.sleep(1000);
        Map<String,String> data = new HashMap<>();
        data.put("location", "123");
        data.put("valor", "12.33");
        data.put("status", "ATIVO");

        simpMessagingTemplate.convertAndSendToUser(sessionId,"/private",data);
        
        Thread.sleep(5000);
        Map<String,String> data2 = new HashMap<>();
        data2.put("location", "123");
        data2.put("valor", "12.33");
        data2.put("status", "CONCLUIDA");
        simpMessagingTemplate.convertAndSendToUser(sessionId,"/private", data2); // /user/nomeusuario/private
        return null;
    }
}
