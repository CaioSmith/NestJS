import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDTO } from 'src/DTO/books.dto';
import { Book } from 'src/Database/MongoDB/Interfaces/book.interface';
import { BookRepository } from 'src/Database/MongoDB/Repository/book.repository';

@Injectable()
export class BooksService {
    constructor(
        private readonly bookRepository : BookRepository
    ){}

   async saveBook(newBook: BookDTO): Promise<Book>{
    return await this.bookRepository.saveBook(newBook);
   }

   async getAllBooks(): Promise<Book[]>{
    const allBooks = await this.bookRepository.getAllBooks();

    if(!allBooks.length){
        throw new BadRequestException("Não há livros cadastrados.");
    };

    return allBooks;
   }

   async getBookById(bookID: string): Promise<Book>{
    try{
        const existBook = await this.bookRepository.getBookById(bookID);
        if(!existBook)
            throw new BadRequestException("Nenhum registro encontrado")
        
        return existBook;

    }catch(e){
        throw new BadRequestException("Nenhum registro encontrado");
    }
   }

   async deleteBookById(bookID: string): Promise<Book>{
    try{
        return await this.bookRepository.deleteBookByID(bookID);
    }catch(e){
        throw new BadRequestException("Não foi possível deletar o livro.");
    }
   }

   async updateBookById(bookID: string, newBook: BookDTO): Promise<Book>{
    const existBook = await this.bookRepository.getBookById(bookID);
    if(!existBook)
        throw new BadRequestException("Nenhum registro encontrado")
    
    const updatedBook = await this.bookRepository.updateBookById(bookID, newBook);
    if(updatedBook)
        return await this.bookRepository.getBookById(bookID);
    else
        throw new BadRequestException("Erro ao atualizar o documento")
   }

   async getBookByAuthorName(authorName: string): Promise<Book[]>{
    const splitedAuthorName = authorName.split(' ')
    const foundBooks = await this.bookRepository.getBookByAuthorName(splitedAuthorName);
    
    if(!foundBooks.length)
        throw new BadRequestException("Nenhum registro encontrado para este autor")

    return foundBooks;

    return 
    }

    async getBookByName(bookName: string): Promise<Book[]>{
        const foundBooks = await this.bookRepository.getBookByName(bookName);
        if(!foundBooks.length)
            throw new BadRequestException("Nenhum registro para esse livro")
        return foundBooks;
    }
}
