package com.sybolt.wcageval.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.graphql.test.tester.HttpGraphQlTester;

import com.sybolt.wcageval.graphql.model.Product;
import com.sybolt.wcageval.graphql.repository.ProductRepository;

import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductTests {

  @Autowired
  ApplicationContext context;

  @Autowired
  ProductRepository productRepository;

  HttpGraphQlTester tester;

  @BeforeEach
  void setUp() {
    // Can autowire + @DirtiesContext this, don't need to setup each time.
    // var context = SpringApplication.run(WcagevalApplication.class);

    WebTestClient client = WebTestClient
        .bindToApplicationContext(context)
        // .bindToController(ProductController.class)
        .configureClient()
        .baseUrl("/graphql")
        .build();

    tester = HttpGraphQlTester.create(client);
  }

  @Test
  @DirtiesContext
  void testCreateProduct() {
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

  @Test
  @DirtiesContext
  void testListProducts() {
    var document = """
      query {
        products {
          id
          name
          type
        }
      }
      """;

    var product1 = productRepository.save(new Product("Workday", "Application"));
    var product2 = productRepository.save(new Product("PI Portal", "Application"));

    tester
      .document(document)
      .execute()
      .path("products")
      .matchesJson(String.format("""
          [
            {
              "id":"%s",
              "name":"Workday",
              "type":"Application"
            },
            {
              "id":"%s",
              "name":"PI Portal",
              "type":"Application"
            }
          ]
        """,
        // Note I'm not making an assumption on indexing method here.
        // Could be UUIDs for all I know.
        product1.getId(),
        product2.getId()
      ));
  }

  // @Test
  // void createProduct() {
  //   var query = """
  //       mutation createProduct($input: ProductInput!) {
  //         createProduct(input: $input) {
  //           id
  //           name
  //           type
  //         }
  //       }
  //       """;

  //   Map<String, Object> variables = Map.of("input", Map.of(
  //     "name", "Workday",
  //     "type", "Application"
  //   ));

  //   var response = client
  //     .document(query)
  //     .variables(variables)
  //     .execute();

  //   StepVerifier.create(response)
  //       .assertNext(res -> {
  //         // TODO: Simpler methodology?
  //         Map<String, Object> data = res.getData();
  //         Map<String, Object> product = (Map<String, Object>)data.get("createProduct");

  //         assertEquals("Workday", product.get("name"));
  //       })
  //       .verifyComplete();
  // }

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
