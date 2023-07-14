package com.sybolt.wcageval.graphql;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

// TODO: Validation on boot to ensure the token is set

@Component
@ConfigurationProperties("wcageval")
public class WCAGEvalProperties {

  private final Openai openai = new Openai();

  public Openai getOpenai() {
    return openai;
  }

  public static class Openai {

    private String token;

    public String getToken() {
      return token;
    }

    public void setToken(String token) {
      this.token = token;
    }
  }
}
