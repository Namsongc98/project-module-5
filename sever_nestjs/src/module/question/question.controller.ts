
import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { TypeQuestion } from './type/questionType';

@Controller('question')
export class QuestionController {
    constructor(private serviceQuesion: QuestionService) { }

    // lấy toàn bộ dữ liệu question trong admin
    @Get()
    selectAll() {
        return this.serviceQuesion.selectAll()
    }

    // lấy dữ liệu question và topic trong phần admin
    @Get("getquestion/:id")
    async selectQuestion(@Param("id", ParseIntPipe) id: number): Promise<any> {
       
        return await this.serviceQuesion.selectQuestion(id)
    }

    // get question theo tên topic phần bài tập
    @Get("getnamequestion/:id")
    async selectNameQuestion(@Param("id") id: string): Promise<any> {
        return this.serviceQuesion.selectNameQuestion(id)
    }
  
    // thêm question trong admin
    @Post("postquestion")
    async insertQuestion(@Body() detailquestion: TypeQuestion): Promise<any> {
        return await this.serviceQuesion.insertQuestion(detailquestion)
    }

    // update question trong admin question
    @Put("updatequestion")
    async update(@Body() detailquestion: TypeQuestion): Promise<any> {
        return await this.serviceQuesion.updateQuestion(detailquestion)
    }

    // delete question trong admin 
    @Delete("/:id")
    async deleteQuestion(@Param("id", ParseIntPipe) id: number): Promise<any> {
        this.serviceQuesion.deleteQuestion(id)
    }

    // count question trong admin
    @Get("count")
    async countQuestion(): Promise<number> {
        return this.serviceQuesion.countQuestion()
    }
}
