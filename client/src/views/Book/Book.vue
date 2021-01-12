<template>
  <div v-if="book" class="search-container">

    <v-card class="card header-card" elevation="2">
      <div class="book-header">
        <div class="book-title">
          {{book.name}}
          <div class="subtitle">{{book.category}}</div>
        </div>
        <v-btn @click="$router.push(`/Edit/${book._id}`)" style="margin-left: 9px" icon>
          <v-icon style="font-size: 18px" small>mdi-pencil-outline</v-icon>
        </v-btn>
      </div>
    </v-card>

    <v-divider></v-divider>

    <v-text-field
      v-model="searchString"
      class="form-field"
      label="Search Note"
      placeholder="Accounting"
      append-icon="mdi-magnify"
      outlined
    ></v-text-field>

    <div v-if="resultsRows && resultsRows.length > 0" class="results-container">
      <v-container>
        <v-row v-for="(row, idx) in resultsRows" :key="idx">
          <v-col v-for="(note, idx) in row" :key="idx">
            <v-card class="card note">
              <div  class="note-header">
                <div class="note-title">
                  {{note.title ? note.title : `Note (${note.id})`}}
                  <div class="note-subtitle">
                    Page: {{note.pageNumber}},  Article: {{note.article}}
                  </div>
                </div>
                  <v-card-actions style="width: 20px">
                    <v-menu
                      bottom
                      right
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          style=""
                        >
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item @click="selectedNote = note; noteDialog = true">
                          <v-list-item-title>Edit</v-list-item-title>
                          <v-list-item-icon>
                            <v-icon>mdi-pencil-outline</v-icon>
                          </v-list-item-icon>
                        </v-list-item>
                        <v-list-item @click="deleteNote(note)">
                          <v-list-item-title>Delete</v-list-item-title>
                          <v-list-item-icon>
                            <v-icon>mdi-delete</v-icon>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-card-actions>                
              </div>
              <v-divider style="margin: 10px 0"></v-divider>
              <perfect-scrollbar :options="{ wheelSpeed: 0.1 }">
                <p class="note-body"> {{note.note}} </p>
              </perfect-scrollbar>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <note-dialog
      v-if="noteDialog"
      :note="selectedNote"
      @save="noteSave($event)"
      @close="noteDialog = false;
      selectedNote = null;"
    ></note-dialog>

      <v-btn
        @click="noteDialog = true"
        color="primary"
        fab
        style="bottom: 0; position: fixed; bottom: 30px; right: 65px;"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

  </div>
</template>

<script>
import BookService from '@/services/BookService';
import NoteService from '@/services/NoteService';
import NoteDialog from '@/components/NoteDialog';

import { debounce } from '@/helpers/helpers';

export default {
  data() {
    return {
      book: null,
      results: [],
      notes: [],
      searchString: null,
      selectedNote: null,
      noteDialog: false
    }
  },
  components: {
    NoteDialog
  },
  async mounted() {
    this.getBook();
  },
  computed: {
    bookId () {
      return this.$route.params.bookId
    },
    loading: {
      get () {
        return this.$store.getters.loading;
      },
      set (value) {
        this.$store.commit('loading', value);
      }
    },
    resultsRows () {
      const copy = [...this.notes];
      return new Array(Math.ceil(copy.length / 3))
        .fill()
        .map(() => copy.splice(0, 3))
    }
  },
  methods: {
    async getBook() {
      try {
        const book = await BookService.getBooksById(this.$route.params.bookId);
        this.book = book;
        this.notes = book.notes;
      } catch (error) {
        console.error('Error while trying to Get Book', error);
      }
    },
    async noteSave(note) {
      try {
        this.loading = true;
        if (this.selectedNote) {
          note.id = this.selectedNote.id;
          await NoteService.updateNote(note, this.book._id);
          this.$toastr.s('Sucessfully Updated Note!');
        } else {
          await NoteService.postNote(note, this.book._id)
          this.$toastr.s('Sucessfully Added Note!');
        }
      } catch (error) {
        this.$toastr.e('Failed to Add/Update Note.');
         console.error('Error while trying to Update Note', error);
      } finally {
        this.loading = false;
        this.selectedNote = null;
        this.noteDialog = false;
        await this.getBook();
      }
    },
    async deleteNote(note) {
      try {
        this.loading = true;
        await NoteService.deleteNote(note, this.book._id);
        this.$toastr.s('Sucessfully Deleted Note!');
      } catch (error) {
        console.error('Error while trying to delete Note', error);
        this.$toastr.e('Failed to Delete Note.');
      } finally {
        await this.getBook();
        this.loading = false;
      }
    }
  },
  watch: {
    bookId: async function() {
      this.getBook();
    },
    searchString: debounce(function (val) {
      this.notes = this.book.notes;
      if (val && val !== '') {
        this.notes = this.notes.filter(i => {
          const loweredVal = val.toLowerCase();

          if (i.title.toLowerCase().includes(loweredVal))
            return true;
          
          if (i.pageNumber.toLowerCase().includes(loweredVal))
            return true;

          if (i.article.toLowerCase().includes(loweredVal))
            return true;
          
          return false;
        });
      }
    }, 500)
  }
}
</script>

<style scoped>
    .card {
      padding: 15px 40px;
      display: flex;
      justify-content: center;
    }
    .header-card {
      max-width: 500px;
      margin: 0 auto;
      margin-bottom: 25px;
      position: sticky;
    }
    .book-header {
      display: flex;
      align-items: center;
    }
    .book-title {
      margin-top: 7px;
      font-size: 23px;
      font-weight: bold;
      line-height: 1.1;
    }

    .note-body {
      padding: 10px;
    }

    .ps {
      max-height: 250px;
    }

    .note-title {
      font-size: 22px;
      font-weight: bold;
      line-height: 1.5;
    }

    .note {
      flex-direction: column;
    }

    .note-header {
      display: flex;
      justify-content: space-between;
    }
    
    .note-subtitle {
      font-size: 13px;
      opacity: 0.7;
    }

    .subtitle {
      font-size: 15px;
      opacity: 0.7;
      text-align: center;
    }
</style>