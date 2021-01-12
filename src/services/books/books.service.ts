import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, Note } from 'src/schemas/book.schema';

@Injectable()
export class BooksService {

    constructor(@InjectModel('nt_books') private booksModel: Model<Book>) {

    }

    public async getBooks(searchString = null, category = null): Promise<Book[]> {
        let books = await this.booksModel.find().exec();

        if (searchString)
            books = books.filter(b => b.name.toLowerCase().includes(searchString.toLowerCase()))

        if (category)
            books = books.filter(b => b.category === category);

        return books;
    }

    public async getBook(bookId: string): Promise<Book> {
        return this.booksModel.findById(bookId);
    }

    
    public async postBook(book: Book): Promise<Book> {
        const bookModel = new this.booksModel(book);
        return bookModel.save();
    }

    public async updateBook(book: Book): Promise<Book> {
        return this.booksModel.findOneAndUpdate({_id: book._id}, {name: book.name, category: book.category}, {
            new: true,
            useFindAndModify: true
        });
    }

    public async deleteBook(bookId: string): Promise<Book> {
        return this.booksModel.findOneAndDelete({_id: bookId});
    }

    public async pushNoteToBook(bookId: string, note: Note): Promise<Book> {
        const book = await this.getBook(bookId);
        note.id = book.notes.length + 1;
        return this.booksModel.findOneAndUpdate(
            { _id: bookId },
            { $push: { notes: note } },
            {
                new: true,
                useFindAndModify: true
            }
        );
    }

    public async pullNoteFromBook(bookId: string, note: Note): Promise<Book> {
        return this.booksModel.findOneAndUpdate(
            { _id: bookId },
            { $pull: { notes: { id: note.id} } },
            {
                new: true,
                useFindAndModify: true
            }
        );
    }

    public async updateNoteFromBook(bookId: string, note: Note): Promise<Book> {
        return this.booksModel.findOneAndUpdate(
            { _id: bookId, 'notes.id': note.id },
            { $set: { 'notes.$': note } },
            {
                new: true,
                useFindAndModify: true
            }
        );
    }
}
