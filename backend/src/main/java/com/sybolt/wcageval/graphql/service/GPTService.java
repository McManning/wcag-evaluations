package com.sybolt.wcageval.graphql.service;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import com.jayway.jsonpath.JsonPath;
import com.sybolt.wcageval.graphql.WCAGEvalProperties;
import com.sybolt.wcageval.graphql.model.AutocompleteResponse;

import reactor.core.publisher.Mono;

@Service
public class GPTService {
  private final WebClient webClient;
  private final WCAGEvalProperties.Openai properties;

  public GPTService(WebClient.Builder webClientBuilder, WCAGEvalProperties properties) {
    this.properties = properties.getOpenai();

    var token = properties.getOpenai().getToken();

    webClient = webClientBuilder
      .baseUrl("https://api.openai.com/v1/chat/completions")
      .defaultHeader("Authorization", "Bearer " + token)
      .build();
  }

  public Mono<AutocompleteResponse> autocompleteIssue(String summary) {
    // TODO: Throttling and all that.
    // TODO: Pull in description and other metadata we can use
    // TODO: Balancing.

    var payload = """
      {
        \"model\": \"gpt-3.5-turbo\",
        \"messages\": [
          {
            \"role\": \"system\",
            \"content\": \"I will prompt you with WCAG violations that I find on a website. You will respond with a simple bulleted list for each violation in the following bulleted list format:\\n* Summary of the violation I found\\n* WCAG success criteria number and name for that violation\\n* A link to the page on https://www.w3.org/WAI/WCAG21 that provides additional detail for that criteria\\n* A suggested remediation plan\"
          },
          {
            \"role\": \"user\",
            \"content\": \"{summary}\"
          }
        ],
        \"temperature\": 1,
        \"max_tokens\": 256,
        \"top_p\": 1,
        \"frequency_penalty\": 0,
        \"presence_penalty\": 0
      }
    """.replace("{summary}", summary);

    return webClient.post()
      .contentType(MediaType.APPLICATION_JSON)
      .body(BodyInserters.fromValue(payload))
      .retrieve()
      .bodyToMono(String.class)
      .map(r -> {
        Integer totalTokens = JsonPath.read(r, "$.usage.total_tokens");
        String response = JsonPath.read(r, "$.choices[0].message.content");

        return new AutocompleteResponse(response);
      });
  }
}
