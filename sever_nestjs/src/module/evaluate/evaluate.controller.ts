import { Controller, Post, Body, Get } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';

@Controller('evaluate')
export class EvaluateController {
    constructor(
        private serviceEvaluate: EvaluateService,
    ) { }

    @Post("/postevaluate")
    async postEvaluate(@Body() newEvaluate: EvaluateType): Promise<void> {
        await this.serviceEvaluate.postEvaluate(newEvaluate)
    }

    @Get("getevaluatelimit")
    async getevaluatelimit(): Promise<any> {
        return this.serviceEvaluate.insertLimit()
    }

    @Get("count")
    async count():Promise<any>{
        return this.serviceEvaluate.countEvaluate()
    }
}
