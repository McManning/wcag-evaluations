package com.sybolt.wcageval.graphql.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.sybolt.wcageval.graphql.model.AutocompleteResponse;
import com.sybolt.wcageval.graphql.service.GPTService;

import reactor.core.publisher.Mono;

/**
 * Expose GPT services for form assistance
 */

@Controller
public class GPTController {

  @Autowired
  private GPTService gptService;

  @QueryMapping
  public Mono<AutocompleteResponse> autocompleteIssue(@Argument String summary) {
    return gptService.autocompleteIssue(summary);
  }
}
