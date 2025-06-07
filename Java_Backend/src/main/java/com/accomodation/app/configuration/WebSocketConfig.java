package com.accomodation.app.configuration;

import com.accomodation.app.handler.ChatSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

  private final ChatSocketHandler chatSocketHandler;

  public WebSocketConfig(ChatSocketHandler chatSocketHandler) {
    this.chatSocketHandler = chatSocketHandler;
  }

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(chatSocketHandler, "/chat").setAllowedOrigins("*");
  }
}
