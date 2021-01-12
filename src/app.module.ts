import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BooksController } from './controllers/books/books.controller';
import { BooksService } from './services/books/books.service';
import config = require('./config.json');
import { BookSchema } from './schemas/book.schema';
import { NotesController } from './controllers/notes/notes.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
      exclude: ['/api*']
    }),
    MongooseModule.forRoot(config.connectionStrings.notified),
    MongooseModule.forFeature([{ name: 'nt_books', schema: BookSchema }]),
  ],
  controllers: [BooksController, NotesController],
  providers: [Logger, BooksService],
})
export class AppModule {}
