import http from '@/services/http-common'

class BoardDataService {
  getAll() {
    return http.get('/rboard/list')
  }

  async getPagingList(path = '/rboard/list2', search = '') {
    return http.get(path + search)
  }

  get(id) {
    return http.get(`/tutorials/${id}`)
  }

  create(data) {
    return http.post('/tutorials', data)
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data)
  }

  remove(id) {
    console.log(id)
    return http.delete(`/rboard/${id}`)
  }

  deleteAll() {
    return http.delete(`/tutorials`)
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`)
  }
}

export default new BoardDataService()
