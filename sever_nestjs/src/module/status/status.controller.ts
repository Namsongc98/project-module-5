import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { StatusService } from './status.service';
import { TypeStatus } from './type/statusType';

@Controller('status')
export class StatusController {

    constructor(
        private serviceStatus: StatusService
    ) { }

    @Get("/topic/:id")
    async getTopic(@Param("id") id: string): Promise<TypeStatus> {
        return await this.serviceStatus.getTopic(id)
    }

    @Put("/topic")
    async updatePoin(@Body() updateStatus: { idStatus: number, idTopic: number }): Promise<void> {
        await this.serviceStatus.updateTopic(updateStatus)
    }

    @Put("nexttopic")
    async nextTopic(@Body() nextTopic: { idUser: string, currenLever: string }): Promise<any> {
        await this.serviceStatus.updateNext(nextTopic)
    }

}
