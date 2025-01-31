import Anthropic from '@anthropic-ai/sdk';
import {TextBlock} from "@anthropic-ai/sdk/resources/messages/messages";

const anthropic = new Anthropic({
    // apiKey: process.env.API_KEY
    apiKey: process.env.API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
});

export const ask = async (content: string, max_tokens: number = 1024) => {
    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens,
        messages: [{role: "user", content}],
    });
    const response = msg.content[0] as TextBlock;
    return response.text;
}

