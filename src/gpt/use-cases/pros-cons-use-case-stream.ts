import OpenAI from "openai";

interface Options {
    prompt: string,

}

export const ProsConsStreamUseCase = async(openai: OpenAI, options: Options) => {
    const {prompt} = options;
    return await openai.chat.completions.create({
        stream: true,
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
        max_tokens: 500
    });


}