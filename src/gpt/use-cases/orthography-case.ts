import OpenAI from "openai";

interface Options {
    prompt: string,

}

export const OrthographyCase = async( openai : OpenAI, options: Options) => {
    const {prompt} = options;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{
            role: "system", 
            content: `
                Te serán proveídos textos en español con posibles errores ortográficos y gramaticales.
                Las palabras usadas deben de existir en el diccionario de la real academia española.
                Tu tarea es corregirlos y retornar información las soluciones en formato JSON,
                también debes dar un porcentaje de acierto por el usuario.
                Si no hay errores, debes retornar un mensaje de felicitaciones.

                Ejemplo de salida:
                {
                    userScore: number, // en porcentaje
                    errors: string[] // ['error -> solucion']
                    message: string, // usa emojis y texto para felicitar al usuario
                }
            `
        },
        {
            role: 'user',
            content: prompt
        }
        ],
        temperature: 0.3,
        max_tokens: 150,
        response_format: {
            type: 'json_object'
        }
    });

    return JSON.parse(completion.choices[0].message.content);
}