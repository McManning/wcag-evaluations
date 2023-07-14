package com.sybolt.wcageval.graphql.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.BatchMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.sybolt.wcageval.graphql.model.Evaluation;
import com.sybolt.wcageval.graphql.model.Product;
import com.sybolt.wcageval.graphql.model.ProductInput;
import com.sybolt.wcageval.graphql.service.EvaluationService;
import com.sybolt.wcageval.graphql.service.ProductService;

@Controller
public class ProductController {

  @Autowired
  private ProductService productService;

  @Autowired
  private EvaluationService evaluationService;

  @QueryMapping
  public Optional<Product> productById(@Argument Long id) {
    return productService.findById(id);
  }

  @QueryMapping
  public Iterable<Product> products() {
    return productService.findAll();
  }

  @MutationMapping
  public Product createProduct(@Argument ProductInput input) {
    return productService.create(input);
  }

  // Type mapping

  /**
   * Batch resolver for product.evaluations
   */
  @BatchMapping(typeName = "Product", field = "evaluations")
  public Map<Product, List<Evaluation>> evaluations(List<Product> products) {
    return evaluationService.findByProducts(products);
  }

  // declare DataFetcher for a field.
  // Field name defaults to method name, type name defaults
  // to the simple class name of the parent object injected
  // into the method. Thus a resolver for Book.author.
  // Explicit version: @SchemaMapping(typeName="Book", field="author")
  // @SchemaMapping
  // public Author author(Book book) {
  //   return Author.getById(book.authorId());
  // }

}
