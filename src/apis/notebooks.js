import request from "@/helpers/request.js"

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}
export default {
    getAll() {
        return request(URL.GET)
    },
    updateNotebook(notebookID, { title = "" } = { title: '' }) {
        return request(URL.UPDATE.replace(':id', notebookID), "PATCH", { title })
    },
    deleteNotebook(notebookID) {
        return request(URL.DELETE.replace(':id', notebookID, 'DELETE'))
    },
    addNoteBook({ title = '' } = { title: '' }) {
        return request(URL.ADD, 'POST', { title })
    }
}