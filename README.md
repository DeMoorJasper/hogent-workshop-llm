# Hogent LLM Content extraction workshop

## Running the code

Setup an `.env` file with an openai api key

Run examples:

```shell
node examples/function-calling.mjs
```

```shell
node examples/prompt-engineering.mjs
```

```shell
node examples/structured-output.mjs
```

## The Receipts

The current examples in function calling / prompt engineering and structured output are all using the receipts folder.

The goal here is to extract the receipt lines, company information and total amounts.

- Line information: description, product code, units, price
- Total
- Tax
- Company information: name, address (street, streetnumber, postalcode)

### Invoices

Similar to receipts, you should extract parties with their information, invoice number, lines, totals.

### Contracts

Here you have multi-page contracts, what you wanna do here is extract parties, clauses, signees

The issue here is that you either send all images to GPT or you can choose to merge them afterwards, I suppose try a couple things and see what works out and maybe how every approach would work, because there is a limit and a 200 page contract will not be as easy.

# Play around

Feel free to play around with various types of prompting, GPT versions and entities to extract.
