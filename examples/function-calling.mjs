import { openai } from "../openai.mjs";
import { getImageUrl } from "../image.mjs";

const imageUrl = await getImageUrl("data/receipts/de-werf.jpg");

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini-2024-07-18",
  messages: [
    { role: "system", content: "Extract the receipt information." },
    {
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: { url: imageUrl },
        },
      ],
    },
  ],
  functions: [
    {
      name: "extract_receipt_info",
      description: "Extract information from a receipt",
      parameters: {
        type: "object",
        properties: {
          companyName: {
            type: "array",
            items: { type: "string" },
            description: "Array of company names found on the receipt",
          },
        },
        required: ["companyName"],
      },
    },
  ],
  function_call: { name: "extract_receipt_info" },
});

const functionCall = completion.choices[0].message.function_call;
const extractedData = JSON.parse(functionCall.arguments);

console.log(extractedData);
