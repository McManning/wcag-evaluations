package com.sybolt.wcageval.graphql.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sybolt.wcageval.graphql.model.Evaluation;
import com.sybolt.wcageval.graphql.model.EvaluationInput;
import com.sybolt.wcageval.graphql.model.Product;
import com.sybolt.wcageval.graphql.repository.EvaluationRepository;
import com.sybolt.wcageval.graphql.repository.ProductRepository;

@Service
public class EvaluationService {
  private final EvaluationRepository evaluationRepository;
  private final ProductRepository productRepository;

  public EvaluationService(
    EvaluationRepository evaluationRepository,
    ProductRepository productRepository
  ) {
    this.evaluationRepository = evaluationRepository;
    this.productRepository = productRepository;
  }

  public Evaluation create(EvaluationInput input) {
    var product = productRepository.findById(input.productId())
      .orElseThrow(() -> new NoSuchElementException(
        "No product exists with ID " + input.productId()
      ));

    var evaluation = new Evaluation();
    evaluation.setPreparedBy(input.preparedBy());
    evaluation.setProduct(product);

    return evaluationRepository.save(evaluation);
  }

  public Optional<Evaluation> findById(Long id) {
    return evaluationRepository.findById(id);
  }

  public Iterable<Evaluation> findAll() {
    return evaluationRepository.findAll();
  }

  public Iterable<Evaluation> getEvaluationsForProduct(Long productId) {
    return evaluationRepository.findByProductId(productId);
  }

  public Map<Product, List<Evaluation>> findByProducts(List<Product> products) {
    var ids = products.stream()
      .map(Product::getId)
      .collect(Collectors.toList());

    // TODO: Can probably do a stream products -> map prefilled with empty eval arrays.

    var evaluations = evaluationRepository.findByProductIds(ids);
    var mapping = new HashMap<Product, List<Evaluation>>();

    for (Evaluation evaluation : evaluations) {
      var product = products.stream()
        .filter(p -> p.getId() == evaluation.getProductId())
        .findFirst()
        .orElseThrow();

      if (!mapping.containsKey(product)) {
        mapping.put(
          product,
          new ArrayList<Evaluation>(Arrays.asList(evaluation))
        );
      } else {
        mapping.get(product).add(evaluation);
      }
    }

    return mapping;
  }
}
