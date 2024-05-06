import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';

import { BookDTO } from "../../DTO/books.dto"
import { BooksService } from 'src/Services/books/books.service';

@Controller('books')
export class BooksController {

    constructor(
        private readonly bookService : BooksService
    ){}
    @Get()
    getAllBooks(): string{
        return "Teste de rota, os livros irao ser retorndos aqui!"
    }
    
    @Post()
    async createBook(@Body() newBook:BookDTO): Promise<BookDTO>{
        return await this.bookService.saveBook(newBook);
    }

    @Patch()
    updateBook(): string{
        return "Teste de rota, a atualização dos livros será aqui!"
    }

    @Delete()
    deleteBook(): string{
        return "Teste de rota, a deleção dos livros será aqui!"
    }
}
