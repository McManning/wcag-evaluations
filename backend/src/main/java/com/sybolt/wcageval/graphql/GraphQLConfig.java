package com.sybolt.wcageval.graphql;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

import graphql.Scalars;
import graphql.schema.GraphQLCodeRegistry;
import graphql.schema.idl.RuntimeWiring;

@Configuration
public class GraphQLConfig {
  // @Bean
  // public RuntimeWiringConfigurer runtimeWiritConfigurer() {
  //   return builder -> builder.scalar(ExtendedScalars.DateTime);
  // }

  // @Bean
  // RuntimeWiring buildWiring(GraphQLCodeRegistry codeRegistry) {
  //   return RuntimeWiring.newRuntimeWiring()
  //     .codeRegistry(codeRegistry)
  //     .scalar(Scalars.localDateTimeType())
  //     .build();
  // }
}

