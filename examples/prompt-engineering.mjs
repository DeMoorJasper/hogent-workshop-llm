import { openai } from "../openai.mjs";
import { getImageUrl } from "../image.mjs";

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
});

console.log(completion.choices[0].message.content);
