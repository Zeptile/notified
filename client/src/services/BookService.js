import Vue from 'vue'
import store from '@/store';

class BookService {
    baseURL;
    ressource = 'books';

    constructor() {
        this.baseURL = process.env.VUE_APP_API_ENDPOINT;
    }

    async getBooks() {
        return Vue.http.get(`${this.baseURL}/${this.ressource}`)
        .then(result => result.json())
        .catch(err => {
            throw err;
        })
    }

    async getBooksById(id) {
        return Vue.http.get(`${this.baseURL}/${this.ressource}/${id}`)
        .then(result => result.json())
        .catch(err => {
            throw err;
        })
    }

    async postBook(book) {
        return Vue.http.post(`${this.baseURL}/${this.ressource}`, book)
        .then(result => result.json())
        .catch(err => {
            throw err;
        })
    }

    async updateBook(book) {
        return Vue.http.put(`${this.baseURL}/${this.ressource}`, book)
        .then(result => result.json())
        .catch(err => {
            throw err;
        })
    }

    async deleteBook(bookId) {
        return Vue.http.delete(`${this.baseURL}/${this.ressource}/${bookId}`)
        .then(result => result.json())
        .catch(err => {
            throw err;
        });
    }

    async updateBooks() {
        try {
            //store.commit('loading', true);
            const books = await this.getBooks();
            store.commit('bookResults', books);
        } catch (error) {
            store.commit('bookResults', []);
            console.error('Error while trying to load books!', error);
        } finally {
             //store.commit('loading', false);
        }
    }
}

const BookServiceSingleton = new BookService();
Object.freeze(BookServiceSingleton);

export default BookServiceSingleton;