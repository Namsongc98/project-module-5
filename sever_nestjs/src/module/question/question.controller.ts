
import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { TypeQuestion } from './type/questionType';

@Controller('question')
export class QuestionController {
    constructor(private serviceQuesion: QuestionService) { }

    @Get()
    selectAll() {
        return this.serviceQuesion.selectAll()
    }

    @Get("getquestion/:id")
    async selectQuestion(@Param("id", ParseIntPipe) id: number): Promise<any> {
        return await this.serviceQuesion.selectQuestion(id)
    }

    @Get()
    selectPage(
        @Query("page", ParseIntPipe) page: number,
        @Query("limit", ParseIntPipe) limit: number
    ) {
        console.log(page, limit)
        return this.serviceQuesion.paginatequestion(page, limit)
    }


    @Post("postquestion")
    async insertQuestion(@Body() detailquestion: TypeQuestion): Promise<any> {
        return await this.serviceQuesion.insertQuestion(detailquestion)
    }

    @Put("updatequestion")
    async update(@Body() detailquestion: TypeQuestion): Promise<any> {
        return await this.serviceQuesion.updateQuestion(detailquestion)
    }

    @Delete("/:id")
    async deleteQuestion(@Param("id", ParseIntPipe) id: number): Promise<any> {
        this.serviceQuesion.deleteQuestion(id)
    }

    @Get("count")
    async countQuestion(): Promise<number> {
        return this.serviceQuesion.countQuestion()
    }
}
