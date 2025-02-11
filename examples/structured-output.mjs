import { openai } from "../openai.mjs";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { getImageUrl } from "../image.mjs";

const ReceiptSchema = z.object({
  companyName: z.array(z.string()),
});

const imageUrl = await getImageUrl("data/receipts/de-werf.jpg");

const completion = await openai.beta.chat.completions.parse({
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
  response_format: zodResponseFormat(ReceiptSchema, "receipt"),
});

console.log(completion.choices[0].message.parsed);
