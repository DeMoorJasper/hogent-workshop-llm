import { openai } from "../openai.mjs";
import { getImageUrl } from "../image.mjs";

import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const ReceiptSchema = z.object({
  companyName: z
    .array(z.string())
    .describe("Array of company names found on the receipt"),
});

const imageUrl = await getImageUrl("data/receipts/de-werf.jpg");

const completion = await openai.beta.chat.completions.parse({
  model: "gpt-4o-mini-2024-07-18",
  // temperature: 2,
  // top_p: 1,
  // seed: 1,
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
  response_format: zodResponseFormat(ReceiptSchema, "receipt"),
});

console.log(completion.choices[0].message.parsed);
