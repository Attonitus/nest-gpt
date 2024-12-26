import { IsString } from "class-validator";


export class ProsConsDto{

    @IsString()
    prompt: string;
}