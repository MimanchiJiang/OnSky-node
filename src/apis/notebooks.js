import request from "@/helpers/request.js"
import { friendlyDate } from '@/helpers/util'

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}
export default {
    getAll() {
        return new Promise((resolve, reject) => {
            request(URL.GET)
                .then(res => {
                    res.data = res.data.sort((notebook1, notebook2) => notebook1.createAt < notebook2.createAt ? 1 : -1)
                    res.data.forEach(notebook => {
                        notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt)
                    })
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    updateNotebook(notebookID, { title = "" } = { title: '' }) {
        return request(URL.UPDATE.replace(':id', notebookID), "PATCH", { title })
    },
    deleteNotebook(notebookID) {
        return request(URL.DELETE.replace(':id', notebookID), 'DELETE')
    },
    addNotebook({ title = '' } = { title: '' }) {
        return request(URL.ADD, 'POST', { title })
    }
}