import { Controller, Get, Post, Patch, Delete, Body, Param, Put } from '@nestjs/common';

import { BookDTO } from "../../DTO/books.dto"
import { BooksService } from 'src/Services/books/books.service';
import { Book } from 'src/Database/MongoDB/Interfaces/book.interface';

@Controller('books')
export class BooksController {

    constructor(
        private readonly bookService : BooksService
    ){}
    @Get()
    async getAllBooks(): Promise<Book[]>{
        return await this.bookService.getAllBooks();
    }   
    
    @Get('id/:bookID')
    async getBookById(@Param("bookID") bookID: string): Promise<Book>{
        return await this.bookService.getBookById(bookID);
    }


    @Get("author/:authorName")
    async getBookByAuthorName(@Param("authorName") authorName: string): Promise<Book[]>{
        return await this.bookService.getBookByAuthorName(authorName);
    }

    @Get("name/:bookName")
    async getBookByName(@Param("bookName") bookName: string): Promise<Book[]>{
        return await this.bookService.getBookByName(bookName);
    }

    @Post()
    async createBook(@Body() newBook:BookDTO): Promise<Book>{
        return await this.bookService.saveBook(newBook);
    }

    @Patch("id/:bookID")
    async updateBookById(@Param("bookID") bookID: string, @Body() newBook: BookDTO): Promise<Book>{
        return await this.bookService.updateBookById(bookID, newBook);
    }

    @Delete('id/:bookID')
    async deleteBookByID(@Param("bookID") bookID: string): Promise<Book>{
        return await this.bookService.deleteBookById(bookID);
    }
}
