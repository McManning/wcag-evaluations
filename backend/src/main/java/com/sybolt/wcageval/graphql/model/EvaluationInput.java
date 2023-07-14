package com.sybolt.wcageval.graphql.model;

import java.time.OffsetDateTime;

import com.sybolt.wcageval.graphql.constant.RiskLevel;

public record EvaluationInput(
  Long id,
  String preparedBy,
  Long productId
) {}
