package com.sybolt.wcageval.graphql.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

import com.sybolt.wcageval.graphql.constant.Health;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Full manual evaluation
 */
@Entity
@Table(name = "evaluation")
@Getter @Setter @NoArgsConstructor
public class Evaluation {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String executiveSummary;
  private String preparedBy;
  private OffsetDateTime dateCompleted;

  /**
   * Evaluated product health
   */
  @Enumerated(EnumType.STRING)
  private Health health;

  /**
   * Product undergoing manual evaluation
   */
  @ManyToOne // (fetch = FetchType.EAGER)
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @Column(name = "product_id", insertable = false, updatable = false)
  private Long productId;
}
