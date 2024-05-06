import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BookDTO } from "src/DTO/books.dto";
import { Book } from "../Interfaces/book.interface";

@Injectable()
export class BookRepository{
    constructor(
        @InjectModel('book') private readonly bookModel: Model<Book>
    ){}
    async saveBook(newBook: BookDTO): Promise<BookDTO>{
      const savedBook = new this.bookModel(newBook);
      return await savedBook.save()

    }
} 