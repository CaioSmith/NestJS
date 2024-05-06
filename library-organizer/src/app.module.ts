import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BooksController } from './Controllers/books/books.controller';
import { BooksService } from './Services/books/books.service';
import { BookRepository } from './Database/MongoDB/Repository/book.repository';
import { BookSchema } from './Database/MongoDB/Schemas/book.schema';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://CaioSmith:smithcaio2005@smithdatabase.ozba7ma.mongodb.net/libBook?retryWrites=true&w=majority&appName=smithDatabase"),
    MongooseModule.forFeature([
      { name: "book",  schema : BookSchema}
    ])
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class AppModule {}
