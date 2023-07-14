package com.sybolt.wcageval.graphql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sybolt.wcageval.graphql.model.Evaluation;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {

  @Query("SELECT e FROM Evaluation e WHERE e.product.id = :id")
  public List<Evaluation> findByProductId(@Param("id") Long productId);

  @Query("SELECT e FROM Evaluation e WHERE e.product.id IN :ids")
  public List<Evaluation> findByProductIds(@Param("ids") List<Long> productIds);
}
