package com.sybolt.wcageval;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sybolt.wcageval.graphql.model.Product;
import com.sybolt.wcageval.graphql.repository.ProductRepository;

@SpringBootTest
class WcagevalApplicationTests {

	@Test
	void contextLoads() {
	}


	@Autowired
	private ProductRepository productRepository;

	// // Test name conventions are a bit verbose, it seems
	// @Test
	// public void givenProductRepo_whenSaveAndRetrieveEntity_thenOK() {
	// 	var product1 = productRepository.save(new Product("Workday", "Application"));
	// 	var found = productRepository.findByName("Workday");

	// 	assertNotNull(found);
	// 	assertEquals(product1.getId(), found.get(0).getId());
	// 	assertEquals(product1.getName(), found.get(0).getName());
	// }
}
