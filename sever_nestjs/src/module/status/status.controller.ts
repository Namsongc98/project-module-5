import { Controller, Get, Param } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {

    constructor(
        private serviceStatus: StatusService
    ) { }


    @Get("/topic/:id")
    async getTopic(@Param("id") id: string): Promise<any> {
        return await this.serviceStatus.getTopic(id)
    }
}
