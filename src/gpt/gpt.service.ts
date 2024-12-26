import { Injectable } from '@nestjs/common';
import { OrthographyCase, ProsConsStreamUseCase, ProsConsUseCase } from './use-cases';
import { OrthographyDto } from './dtos';
import OpenAI from 'openai';
import { ProsConsDto } from './dtos/pros-cons.dto';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translate-use-case';

@Injectable()
export class GptService {

    private openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_KEY
    })

    async orthograpyCheck(orthographyDto: OrthographyDto){
        const {prompt} = orthographyDto;
        return await OrthographyCase( this.openai, {prompt});
    }

    async prosCons(orthographyDto: ProsConsDto){
        const {prompt} = orthographyDto;
        return await ProsConsUseCase( this.openai, {prompt});
    }

    async prosConsStream(orthographyDto: ProsConsDto){
        const {prompt} = orthographyDto;
        return await ProsConsStreamUseCase( this.openai, {prompt});
    }

    async translate(translateDto: TranslateDto){
        const {prompt, lang} = translateDto;
        return await translateUseCase( this.openai, {prompt, lang});
    }

}
