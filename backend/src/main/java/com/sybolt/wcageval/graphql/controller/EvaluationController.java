package com.sybolt.wcageval.graphql.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.sybolt.wcageval.graphql.model.Evaluation;
import com.sybolt.wcageval.graphql.model.Product;
import com.sybolt.wcageval.graphql.service.EvaluationService;

@Controller
public class EvaluationController {

  @Autowired
  private EvaluationService evaluationService;

  @QueryMapping
  public Optional<Evaluation> evaluationById(@Argument Long id) {
    return evaluationService.findById(id);
  }

  @QueryMapping
  public Iterable<Evaluation> evaluations() {
    return evaluationService.findAll();
  }
}
