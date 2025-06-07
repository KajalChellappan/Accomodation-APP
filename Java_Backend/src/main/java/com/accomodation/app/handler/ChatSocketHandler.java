package com.accomodation.app.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.concurrent.CopyOnWriteArraySet;

@Component
public class ChatSocketHandler extends TextWebSocketHandler {

  private final CopyOnWriteArraySet<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    sessions.add(session);
    System.out.println("User connected: " + session.getId());
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    // Broadcast to all connected clients
    for (WebSocketSession s : sessions) {
      s.sendMessage(message);
    }
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    sessions.remove(session);
    System.out.println("User disconnected: " + session.getId());
  }
}
