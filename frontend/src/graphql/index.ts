export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  OffsetDateTime: { input: any; output: any; }
};

/** Full manual evaluation of a product */
export type Evaluation = {
  __typename?: 'Evaluation';
  dateCompleted?: Maybe<Scalars['OffsetDateTime']['output']>;
  /**
   * Brief description of the purpose of the service evaluated as well as the
   * technology stack used for evaluation
   */
  executiveSummary: Scalars['String']['output'];
  /** Overall decision on whether or not the product meets standards */
  health?: Maybe<Health>;
  id: Scalars['ID']['output'];
  /** Accessibility issues found during evaluation */
  issues: Array<Issue>;
  /** The Accessibility Coordinator performing the full manual evaluation */
  preparedBy: Scalars['String']['output'];
  /** Product under evaluation */
  product?: Maybe<Product>;
};

export type EvaluationInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  issues?: InputMaybe<Array<IssueInput>>;
  /** Accessibility Coordinator performing this evaluation */
  preparedBy?: InputMaybe<Scalars['String']['input']>;
  /** The product evaluated */
  productId?: InputMaybe<Scalars['ID']['input']>;
};

export enum Health {
  /** Digital info or service has one or more issues that do not completely block access */
  Fair = 'FAIR',
  /** Digital info or service fully meets accessibility standards */
  MeetsStandards = 'MEETS_STANDARDS',
  /** Digital info or service has one or more issues that present barriers to access with no workarounds */
  Poor = 'POOR'
}

export enum Impact {
  /** Site or application wide issue */
  Global = 'GLOBAL',
  /** Page-level issue */
  Page = 'PAGE'
}

/** Accessibility issue within an evaluated product */
export type Issue = {
  __typename?: 'Issue';
  details: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  impact: Impact;
  priority: Priority;
  /** Citations to WCAG standard violations */
  references: Array<WcagReference>;
  /** Suggestion to the developer for remediation */
  remediation: Scalars['String']['output'];
  summary: Scalars['String']['output'];
};

export type IssueInput = {
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  impact?: InputMaybe<Impact>;
  priority?: InputMaybe<Priority>;
  /** Suggestion to the developer for remediation */
  remediation?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvaluation: Evaluation;
  createProduct: Product;
};


export type MutationCreateEvaluationArgs = {
  input: EvaluationInput;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};

export enum Priority {
  /** Blocked content for individuals with disabilities */
  Critical = 'CRITICAL',
  /** May inconvenience a user but will not cause significant frustration */
  Minor = 'MINOR',
  /** Some barriers for individuals with disabilities */
  Moderate = 'MODERATE',
  /** Serious barriers for individuals with disabilities */
  Serious = 'SERIOUS'
}

/**
 * Request for an accessibility evaluation on a product.
 *
 * To be filled out by the department or individual requiring
 * a product evaluation with the assistance of an Accessibility Coordinator.
 */
export type Product = {
  __typename?: 'Product';
  /** Requestor's contact information */
  contact?: Maybe<Scalars['String']['output']>;
  dateRequested: Scalars['OffsetDateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  evaluations?: Maybe<Array<Evaluation>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Person or department requesting the evaluation */
  requestedBy?: Maybe<Scalars['String']['output']>;
  /** Risk is dependent on how many people have access to the application */
  risk?: Maybe<RiskLevel>;
  /**
   * Work that the evaluator should perform, such as evaluating specific
   * pages of a website or individual components.
   */
  scopeOfWork?: Maybe<Scalars['String']['output']>;
  /** Type of product evaluated. E.g. Website, Application, PDF */
  type: Scalars['String']['output'];
  useCases?: Maybe<Array<Scalars['String']['output']>>;
};

export type ProductInput = {
  /** Requestor's contact information */
  contact?: InputMaybe<Scalars['String']['input']>;
  dateRequested?: InputMaybe<Scalars['OffsetDateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Name of the product evaluated. E.g. Workday */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Person or department requesting the evaluation */
  requestedBy?: InputMaybe<Scalars['String']['input']>;
  /** Risk is dependent on how many people have access to the application */
  risk?: InputMaybe<RiskLevel>;
  /**
   * Work that the evaluator should perform, such as evaluating specific
   * pages of a website or individual components.
   */
  scopeOfWork?: InputMaybe<Scalars['String']['input']>;
  /** Type of product evaluated. E.g. Website, Application, PDF */
  type?: InputMaybe<Scalars['String']['input']>;
  useCases?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a specific evaluation by ID */
  evaluationById?: Maybe<Evaluation>;
  /** Retrieve all evaluations the user has access to */
  evaluations?: Maybe<Array<Evaluation>>;
  /** Retrieve a specific product under evaluation by ID */
  productById?: Maybe<Product>;
  /** Retrieve all products that have been or are pending evaluation */
  products: Array<Product>;
};


export type QueryEvaluationByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum RiskLevel {
  /** Low: <= 500 Users */
  A1 = 'A1',
  /** Medium: 501 - 10,000 Users */
  A2 = 'A2',
  /** High: 10,001 - 40,000 Users */
  A3 = 'A3',
  /** Critical: >40,000 Users, or Course-Related, or Open to General Public */
  A4 = 'A4'
}

export type UseCase = {
  __typename?: 'UseCase';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type WcagReference = {
  __typename?: 'WCAGReference';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};
