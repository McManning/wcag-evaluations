package com.sybolt.wcageval.graphql.model;

import java.time.OffsetDateTime;
import java.util.Set;

import com.sybolt.wcageval.graphql.constant.RiskLevel;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "product")
@Getter @Setter @NoArgsConstructor
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String type;

  private String requestedBy;

  private String contact;
  private OffsetDateTime dateRequested;
  private String description;
  private String scopeOfWork;

  @Enumerated(EnumType.STRING)
  private RiskLevel risk;

  // No eager for GQL so I can control batch loading separately.

  @OneToMany(mappedBy = "product") // , fetch = FetchType.EAGER)
  private Set<Evaluation> evaluations;

  public Product(String name, String type) {
    this.name = name;
    this.type = type;
  }

  // public Long getId() {
  //   return id;
  // }

  // public String getName() {
  //   return name;
  // }

  // public void setName(String name) {
  //   this.name = name;
  // }

  // public String getType() {
  //   return type;
  // }

  // public void setType(String type) {
  //   this.type = type;
  // }

  // public String getRequestedBy() {
  //   return requestedBy;
  // }

  // public void setRequestedBy(String requestedBy) {
  //   this.requestedBy = requestedBy;
  // }

  // public String getContact() {
  //   return contact;
  // }

  // public void setContact(String contact) {
  //   this.contact = contact;
  // }

  // public OffsetDateTime getDateRequested() {
  //   return dateRequested;
  // }

  // public void setDateRequested(OffsetDateTime dateRequested) {
  //   this.dateRequested = dateRequested;
  // }

  // public String getDescription() {
  //   return description;
  // }

  // public void setDescription(String description) {
  //   this.description = description;
  // }

  // public RiskLevel getRisk() {
  //   return risk;
  // }

  // public void setRisk(RiskLevel risk) {
  //   this.risk = risk;
  // }
}
