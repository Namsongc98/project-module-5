import { Body, Controller, Post, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { TopicService } from './topic.service';
import { topicType } from './type/TypeTopic';

@Controller('topic')
export class TopicController {
    constructor(
        private serviteToppic: TopicService
    ) { }

    @Post("inserttopic")
    async insertTopic(@Body() insertTopic: topicType): Promise<topicType> {
        return await this.serviteToppic.insertTopic(insertTopic)
    }

    @Get("getbeginner/:id")
    async getBeinner(@Param("id") id: string) {
        return await this.serviteToppic.selectBeginner(id)
    }

    @Get("getintermediate/:id")
    async getIntermediate(@Param("id") id: string) {
        return await this.serviteToppic.selectIntermediate(id)
    }

    @Get("getadvances/:id")
    async getAdvanced(@Param("id") id: string) {
        return await this.serviteToppic.selectAdvanced(id)
    }

    @Get("getalltopic")
    async getAll() {
        return await this.serviteToppic.selectAll()
    }

    @Put("puttopic")
    async updateTopic(@Body() updateTopic: topicType) {
        return await this.serviteToppic.updateTopic(updateTopic)
    }

    @Delete("delete/:id")
    async delete(@Param("id") id: number) {
        return await this.serviteToppic.delete(id)

    }

    @Get("/searchtopic/search")
    async selectTopic(@Query() searchTopic: any): Promise<any> {
        const { name } = searchTopic
        return this.serviteToppic.selectTopic(name)
    }


}
