package com.sybolt.wcageval.graphql.controller;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.graphql.test.tester.GraphQlTester;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.sybolt.wcageval.graphql.model.Product;
import com.sybolt.wcageval.graphql.service.ProductService;

@GraphQlTest(ProductController.class)
public class ProductControllerTests {

  @Autowired
  private GraphQlTester tester;

  @MockBean
  private ProductService productService;

  @Test
  void createProduct() {

    /*
    Error creating bean with name 'graphQlSource' defined in class path resource
    [org/springframework/boot/autoconfigure/graphql/GraphQlAutoConfiguration.class]:
    Failed to instantiate [org.springframework.graphql.execution.GraphQlSource]: Factory method 'graphQlSource' threw exception
    with message: errors=[There is no scalar implementation for the named  'Date' scalar type, There is no scalar implementation for the named  'LocalDate' scalar type,
    There is no scalar implementation for the named  'LocalDateTime' scalar type, There is no scalar implementation
    for the named  'LocalTime' scalar type, There is no scalar implementation for the named  'OffsetDateTime' scalar type,
    There is no scalar implementation for the named  'YearMonth' ... etc.

    TODO: Need to deal with GraphQL custom type registration.
    It seems like it should register fine but isn't.

    https://github.com/tailrocks/graphql-java-datetime/issues/137
    Seems like it was fixed but I'm still seeing the issue.
    */
    var document = """
        mutation createProduct($input: ProductInput!) {
          createProduct(input: $input) {
            id
            name
            type
          }
        }
        """;

    var input = Map.of(
      "name", "Workday",
      "type", "Application"
    );

    when(productService.create(null))
      .thenReturn(new Product("Workday", "Application"));

    tester
      .document(document)
      .variable("input", input)
      .execute()
      .path("createProduct")
      .entity(Product.class)
      .satisfies(product -> {
        assertEquals("Workday", product.getName());
        assertEquals("Application", product.getType());
      });
  }

  // @Test
  // void shouldGetAllProducts() {
  //   gqlTester
  //     .documentName("AllProducts")
  //     .execute()
  //     .path("products")
  //     .matchesJson("""
  //       {
  //         "name": "Workday",
  //         "type": "Application"
  //       }
  //     """);
  // }
}
