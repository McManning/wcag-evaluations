package com.sybolt.wcageval.graphql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sybolt.wcageval.graphql.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
