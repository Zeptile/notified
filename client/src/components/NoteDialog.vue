<template>
    <v-dialog
      value="true"
      persistent
      max-width="500"
      :attach="'.search-container'"
      style="left: 134px;"
    >
      <v-card class="card">
        <v-btn @click="close()" style="float:right;" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div class="dialog-content">
          <div class="dialog-title">
            {{note ? 'Editing Note' : 'New Note'}}
          </div>
          <div class="form">
              <div class="line-1">
                  <v-text-field
                      v-model="form.title"
                      class="form-field"
                      label="Note Title"
                      placeholder="Some Note Title"
                      append-icon="mdi-format-text"
                      outlined
                      :diabled="loading"
                  ></v-text-field>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="form.pageNumber"
                        class="form-field"
                        label="Page Number"
                        placeholder="42"
                        append-icon="mdi-book-open-page-variant"
                        outlined
                        :diabled="loading"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="form.article"
                        class="form-field"
                        label="Article"
                        placeholder="1234"
                        append-icon="mdi-format-list-numbered"
                        outlined
                        :diabled="loading"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-textarea
                    v-model="form.note"
                    outlined
                    label="Note Body"
                  ></v-textarea>
              </div>
          </div>
          <v-divider style="margin-bottom:10px;"></v-divider>
          <v-card-actions>
            <v-btn @click="saveNote()" color="success" :disabled="loading || !form.note" :loading="loading">
              <v-icon style="margin-right: 5px">mdi-content-save</v-icon>
              Save Note
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: null,
        pageNumber: null,
        article: null,
        note: null,
      }
    }
  },
  props: [
    'note'
  ],
  mounted() {
    if (this.note) {
      this.form.title = this.note.title;
      this.form.pageNumber = this.note.pageNumber;
      this.form.article = this.note.article;
      this.form.note = this.note.note;
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading;
    }
  },
  methods: {
    saveNote() {
      this.$emit('save', this.form);
    },
    close() {
      this.$emit('close');
    }
  },
}
</script>

<style>
  .v-dialog__content {
    left: 135px !important;
  }
  .form {
    padding: 0 15px;
  }
  .dialog-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .dialog-content {
    padding: 15px;
  }
</style>