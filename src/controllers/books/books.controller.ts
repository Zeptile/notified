import { Body, Controller, Delete, Get, HttpException, HttpStatus, Ip, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { Book } from 'src/schemas/book.schema';
import { BooksService } from 'src/services/books/books.service';

@Controller('api/books')
export class BooksController {
    
    constructor(private books: BooksService, private logger: Logger) { }
    
    /**
     * GET Books
     * @param searchString Search String to Query
     * @param category OPTIONAL Category Filter
     * @returns List of torrent objects
     */
    @Get()
    public async GetBooks(@Ip() ip, @Query('searchString') searchString?: string, @Query('category') category?: string) {
        try
        {
            this.logger.log(`[Books] <${ip}> called GET /api/books - With parameters searchString="${searchString}", category="${category}"`);

    
            const books = await this.books.getBooks(searchString, category);
    
            if (!books || books.length < 1)
                throw new HttpException('No result found.', HttpStatus.NOT_FOUND);
    
            this.logger.log(`[Books] Succesfully gathered ${books.length} books.`);
    
            return books;
        } 
        catch (error) 
        {
            if (error && error.status)
                throw error;

            this.logger.error(`[Books] An unexpected error happened => ${JSON.stringify(error)}`);
            throw new HttpException('An unexpected error happened.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * GET Books
     * @param searchString Search String to Query
     * @param category OPTIONAL Category Filter
     * @returns List of torrent objects
     */
    @Get(':bookId')
    public async GetBook(@Ip() ip, @Param() params, @Query('category') category?: string) {
        try
        {
            this.logger.log(`[Books] <${ip}> called GET /api/books - With parameters bookId="${params.bookId}"`);

            return await this.books.getBook(params.bookId);
        } 
        catch (error) 
        {
            if (error && error.status)
                throw error;

            this.logger.error(`[Books] An unexpected error happened => ${JSON.stringify(error)}`);
            throw new HttpException('An unexpected error happened.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * POST Books
     * @param searchString Search String to Query
     * @param category OPTIONAL Category Filter
     * @returns List of torrent objects
     */
    @Post()
    public async PostBook(@Ip() ip, @Body() book: Book) {
        try
        {
            this.logger.log(`[Books] <${ip}> called POST /api/books - With parameters book="${JSON.stringify(book)}"`);

            if (!book)
                throw new HttpException('Invalid Book Object', HttpStatus.BAD_REQUEST);
    
            return await this.books.postBook(book);
        } 
        catch (error) 
        {
            if (error && error.status)
                throw error;

            this.logger.error(`[Books] An unexpected error happened => ${JSON.stringify(error)}`);
            throw new HttpException('An unexpected error happened.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * PUT Books
     * @param searchString Search String to Query
     * @param category OPTIONAL Category Filter
     * @returns List of torrent objects
     */
    @Put()
    public async UpdateBook(@Ip() ip, @Body() book: Book) {
        try
        {
            console.log(book._id)
            this.logger.log(`[Books] <${ip}> called PUT /api/books - With parameters book="${JSON.stringify(book)}"`);

            if (!book)
                throw new HttpException('Invalid Book Object', HttpStatus.BAD_REQUEST);
    
            return await this.books.updateBook(book);
        } 
        catch (error) 
        {
            if (error && error.status)
                throw error;

            this.logger.error(`[Books] An unexpected error happened => ${JSON.stringify(error)}`);
            throw new HttpException('An unexpected error happened.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * DELETE Books
     * @param searchString Search String to Query
     * @param category OPTIONAL Category Filter
     * @returns List of torrent objects
     */
    @Delete(':id')
    public async DeleteBook(@Ip() ip, @Param() params) {
        try
        {
            if (!params.id)
                throw new HttpException('Invalid Book ID', HttpStatus.BAD_REQUEST);
            
            this.logger.log(`[Books] <${ip}> called DELETE /api/books - With parameters bookId="${JSON.stringify(params.id)}"`);
    
            return await this.books.deleteBook(params.id);
        } 
        catch (error) 
        {
            if (error && error.status)
                throw error;

            this.logger.error(`[Books] An unexpected error happened => ${JSON.stringify(error)}`);
            throw new HttpException('An unexpected error happened.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
