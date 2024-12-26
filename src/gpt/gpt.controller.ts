import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos';
import { ProsConsDto } from './dtos/pros-cons.dto';
import { Response } from 'express';
import { TranslateDto } from './dtos/translate.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthograpy-check')
  orthograpyCheck(@Body() orthographyDto: OrthographyDto){
    return this.gptService.orthograpyCheck(orthographyDto);
  }

  @Post('pros-cons')
  prosCons(@Body() prosConsDto: ProsConsDto){
    return this.gptService.prosCons(prosConsDto);
  }

  @Post('pros-cons-stream')
  async prosConsStream(@Body() prosConsDto: ProsConsDto, @Res() res: Response){
    const stream = await this.gptService.prosConsStream(prosConsDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      // console.log(piece);
      res.write(piece);
    }

    res.end();
  }

  @Post('translate')
  translate(@Body() translateDto: TranslateDto){
    return this.gptService.translate(translateDto);
  }


}
