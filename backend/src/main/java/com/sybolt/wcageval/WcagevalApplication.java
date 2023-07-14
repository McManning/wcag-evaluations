package com.sybolt.wcageval;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import graphql.Scalars;
import graphql.schema.GraphQLObjectType;
import graphql.schema.GraphQLSchema;

@SpringBootApplication(scanBasePackages = { "com.sybolt" })
public class WcagevalApplication {

	private static final Logger log = LoggerFactory.getLogger(WcagevalApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(WcagevalApplication.class, args);
	}


	// @Bean
	// GraphQLSchema schema() {
	// return GraphQLSchema.newSchema()
	// 	.query(GraphQLObjectType.newObject()
	// 			.name("query")
	// 			.field(field -> field
	// 					.name("test")
	// 					.type(Scalars.GraphQLString)
	// 					.dataFetcher(environment -> "response")
	// 			)
	// 			.build())
	// 	.build();
	// }
}
