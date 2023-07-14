package com.sybolt.wcageval.graphql.service;

import java.time.OffsetDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sybolt.wcageval.graphql.repository.ProductRepository;
import com.sybolt.wcageval.graphql.model.Product;
import com.sybolt.wcageval.graphql.model.ProductInput;;

@Service
public class ProductService {
  private final ProductRepository repo;

  public ProductService(ProductRepository productRepository) {
    this.repo = productRepository;
  }

  public Product create(ProductInput input) {

    var product = new Product();

    // TODO: Don't like this.
    product.setName(input.name());
    product.setType(input.type());
    product.setContact(input.contact());
    product.setDescription(input.description());
    product.setRisk(input.risk());
    product.setRequestedBy(input.requestedBy());

    product.setDateRequested(OffsetDateTime.now());

    return repo.save(product);
  }

  public Optional<Product> findById(Long id) {
    return repo.findById(id);
  }

  public Iterable<Product> findAll() {
    return repo.findAll();
  }
}
