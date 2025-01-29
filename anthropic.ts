import Anthropic from '@anthropic-ai/sdk';
import * as fs from "node:fs";
import {TextBlock} from "@anthropic-ai/sdk/resources/messages/messages";
import dotenv from 'dotenv'
const config = dotenv.config()
const API_KEY = 'extract key from config' // Replace with your actual API key
const anthropic = new Anthropic({
    apiKey: API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
});

export const ask = async (content: string) => {
    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2048,
        messages: [{role: "user", content}],
    });
    const res = msg.content[0] as TextBlock;
    // store all outputs into response folder
    // check folder for existent cv and adjust name accordingly
    fs.writeFile('output.json', res.text, () => {
        console.log('done')
    })
}
