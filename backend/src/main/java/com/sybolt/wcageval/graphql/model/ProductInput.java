package com.sybolt.wcageval.graphql.model;

import com.sybolt.wcageval.graphql.constant.RiskLevel;

public record ProductInput(
  Long id,
  String name,
  String type,
  String requestedBy,
  String contact,
  String description,
  RiskLevel risk,
  String scopeOfWork
  // TODO: useCases
) {}
