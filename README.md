# Demand Capture & Analysis System

**Business Operations · Process Design · Data Quality · Dashboard Requirements · AI-Assisted Development**

[Open the live portfolio demo](https://luisdelat710.github.io/demand-capture-operations-case-study/)

## Problem

Customer requests for products that were not immediately available were difficult to aggregate consistently. That reduced visibility into recurring demand patterns and useful purchasing signals.

## My role

I defined the information that needed to be captured, the business categories, the workflow logic, normalization rules, and the management views needed to review demand.

I used **AI-assisted development** to accelerate implementation. I do not present this project as evidence of independent software engineering. My contribution was translating the operating problem into business rules, data fields, workflow requirements, and validation criteria, then reviewing the outputs against the intended process.

## Business rules

The workflow captures:

- Salesperson
- Product category
- Format
- Color / tone
- Style
- Approximate square meters
- Optional notes

Controlled options are used where consistency matters, while lightweight normalization reduces common free-text variation.

## Solution

The portfolio demo includes:

- Frontline demand capture
- Basic input normalization
- Dashboard summary of request volume and approximate demand
- Rankings by category and format
- Detailed request table
- Local browser storage for safe demo interaction

## Validation

The implementation was reviewed against the intended operating workflow: whether the right fields were being captured, whether categories remained usable for analysis, and whether the management view answered the operational questions the process was designed to support.

## What I learned

Data quality starts at the point of capture. Free-text input quickly creates duplicate categories and inconsistent labels, so a useful process needs to balance controlled fields with enough flexibility for frontline users.

## Data and confidentiality

This repository is a **sanitized portfolio recreation** of a real operating use case. Names, quantities, requests, and examples are simulated. No production credentials, customer data, employee data, or company database are included.

## Tools

HTML, CSS, JavaScript, browser localStorage, and AI-assisted development.

## What this demonstrates

- Business process analysis
- Operational data capture
- Business-rule definition
- Data-quality thinking
- Dashboard requirements
- Workflow design
- AI-assisted automation
- Validation against business needs
