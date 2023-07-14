# WCAG Evaluation

Application to perform accessibility reviews according to WCAG guidance for applications, PDFs, and other digital media.

This is being built as a proposal project for the Ohio State's Digital Accessibility Center to streamline the evaluation process that accessibility coordinators need to perform as their primary role.

## ⚠ Prototype ⚠

This is a prototype project to learn some new tech I haven't played with in almost a decade (lookin' at you, Java) and doing some other product evaluation for 3rd party libs I haven't integrated into our main stack yet (e.g. Vite).

This application makes use of OpenAI's LLMs to provide suggested citations for WCAG violations and remediation plans.

Final product may or may not be in this stack - if I move forward with this as a real product I'll re-evaluate.


## Stack

Frontend
- Vite + React + TS
- Material UI
- Apollo GraphQL hooks
- Emotion over styled-components for funsies

Backend
- Spring GraphQL
- PostgreSQL in Docker
- OpenAI's API


## Requirements

### Development

This application uses a suggestion system built on top of OpenAI's LLMs. Get a token from OpenAI and set it in the `OPENAI_ACCESS_TOKEN` envvar before starting up the backend.

## Tasks

### Backend Tasks

TBD

### Frontend Tasks

Rebuild the GraphQL TypeScript types from `schemas.graphqls`:

```sh
yarn graphql:build-types
```

## Incomplete features

- Appropriate security model
- Complete test coverage
- UX bells and whistles

