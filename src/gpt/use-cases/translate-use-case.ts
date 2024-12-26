import OpenAI from "openai";

interface Options {
    prompt: string,
    lang: string
}

export const translateUseCase = async(openai: OpenAI, {prompt, lang}: Options) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{
            role: "system", 
            content: `
                Traduce el siguiente texto al idioma ${lang}: ${prompt}. Termina las sentencias con un emoji 🦨
            `
        },
        {
            role: 'user',
            content: prompt
        }
        ],
        temperature: 0.3
    });

    return completion.choices[0].message;
}