import { Param } from '@nestjs/common';
import { Body, Controller, Delete, HttpException, HttpStatus, Ip, Logger, Post, Put } from '@nestjs/common';
import { Note } from 'src/schemas/book.schema';
import { BooksService } from 'src/services/books/books.service';

@Controller('api/notes')
export class NotesController {

    constructor(private books: BooksService, private logger: Logger) { }

    /**
     * POST Notes
     * @param searchString Search String to Query
     * @param category OPTIONAL Category Filter
     * @returns List of torrent objects
     */
    @Post(':bookId')
    public async PostNote(@Ip() ip, @Param() params, @Body() note: Note) {
        try
        {
            this.logger.log(`[Notes] <${ip}> called POST /api/notes - With parameters note="${JSON.stringify(note)}"`);

            if (!note || !params.bookId)
                throw new HttpException('Invalid Request.', HttpStatus.BAD_REQUEST);
    
            return await this.books.pushNoteToBook(params.bookId, note);
        } 
        catch (error) 
        {
            if (error && error.status)
                throw error;

            this.logger.error(`[Notes] An unexpected error happened => ${JSON.stringify(error)}`);
            throw new HttpException('An unexpected error happened.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * PUT Notes
     * @param searchString Search String to Query
     * @param category OPTIONAL Category Filter
     * @returns List of torrent objects
     */
    @Put(':bookId')
    public async UpdateNote(@Ip() ip, @Param() params, @Body() note: Note) {
        try
        {
            this.logger.log(`[Notes] <${ip}> called PUT /api/notes - With parameters note="${JSON.stringify(note)}"`);

            if (!note || !params.bookId)
                throw new HttpException('Invalid Request.', HttpStatus.BAD_REQUEST);
    
            return await this.books.updateNoteFromBook(params.bookId, note);
        } 
        catch (error) 
        {
            if (error && error.status)
                throw error;

            this.logger.error(`[Notes] An unexpected error happened => ${JSON.stringify(error)}`);
            throw new HttpException('An unexpected error happened.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * DELETE Notes
     * @param searchString Search String to Query
     * @param category OPTIONAL Category Filter
     * @returns List of torrent objects
     */
    @Put('delete/:bookId')
    public async DeleteDelete(@Ip() ip, @Param() params, @Body() note: Note) {
        try
        {
            this.logger.log(`[Notes] <${ip}> called DELETE /api/notes - With parameters note="${JSON.stringify(note)}"`);

            if (!note || !params.bookId)
                throw new HttpException('Invalid Request.', HttpStatus.BAD_REQUEST);
    
            return await this.books.pullNoteFromBook(params.bookId, note);
        } 
        catch (error) 
        {
            if (error && error.status)
                throw error;

            this.logger.error(`[Notes] An unexpected error happened => ${JSON.stringify(error)}`);
            throw new HttpException('An unexpected error happened.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
