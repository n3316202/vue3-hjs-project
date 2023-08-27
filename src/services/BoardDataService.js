import http from '@/services/http-common'

// class BoardDataService {
//   getAll() {
//     return http.get('/rboard/list')
//   }

//   getPagingList(path = '/rboard/list2', search = '') {
//     return http.get(path + search)
//   }

//   get(id) {
//     return http.get(`/rboard/${id}`)
//   }

//   write(data) {
//     return http.post(`/rboard/`, data)
//   }

//   create(data) {
//     return http.post('/tutorials', data)
//   }

//   update(id, data) {
//     return http.put(`/rboard/${id}`, data)
//   }

//   remove(id) {
//     console.log(id)
//     return http.delete(`/rboard/${id}`)
//   }

//   deleteAll() {
//     return http.delete(`/tutorials`)
//   }

//   findByTitle(title) {
//     return http.get(`/tutorials?title=${title}`)
//   }
// }

class BoardDataService {
  getAll() {
    return http.get('/rboard/list')
  }

  get(id) {
    return http.get(`/rboard/${id}`)
  }

  getPagingList = (path = '/rboard/list2', search = '') => {
    return http.get(path + search)
  }

  remove(id) {
    console.log(id)
    return http.delete(`/rboard/${id}`)
  }

  write(data) {
    return http.post(`/rboard/`, data)
  }

  update(id, data) {
    return http.put(`/rboard/${id}`, data)
  }
}

export default new BoardDataService()
