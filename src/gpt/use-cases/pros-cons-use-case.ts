import OpenAI from "openai";

interface Options {
    prompt: string,

}

export const ProsConsUseCase = async(openai: OpenAI, options: Options) => {
    const {prompt} = options;
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
                    Te serán proveidas preguntas tu tarea es dar una 
                    respuesta con pros y contras, la respuesta debe ser
                    en formato markdown
                `
            },
            {
                role: "user",
                content: prompt
            }
        ],
        max_tokens: 400
    });

    return completion.choices[0].message;

}