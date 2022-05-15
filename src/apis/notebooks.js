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
                        notebook.createdAtFriendly = friendlyDate(notebook.createdAt)
                        res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt)
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
        return new Promise((resolve, reject) => {
            request(URL.ADD, 'POST', { title })
                .then(res => {
                    res.data.createdAtFriendly = friendlyDate(res.data.createAt)
                    res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })

    }
}