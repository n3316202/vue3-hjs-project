import { createStore } from 'vuex'
import BoardDataService from '@/services/BoardDataService'
export default createStore({
  state: {
    boards: [],
    paging: {}
  },
  getters: {
    getBoards(state) {
      return state.boards
    },
    getPaging(state) {
      return state.paging
    }
  },
  mutations: {
    //다른 점은 mutations가 동기적 로직을 정의할 수 있는 반면 actions는 비동기적 로직을 정의할 수 있다
    setBoards(state, boards) {
      state.boards = boards
    },
    setPaging(state, paging) {
      state.paging = paging
    }
  },
  actions: {
    async getAllBoards({ commit }) {
      await BoardDataService.getPagingList()
        .then((response) => {
          commit('setBoards', response.data.boards)
          commit('setPaging', response.data.page)

          console.log('여기당')
          console.log(this.state.boards)
          console.log(this.getters.getBoards)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    async deleteBoard(context, payload) {
      console.log('deleteBoard() 번호' + payload)

      await BoardDataService.remove(payload)
        .then((response) => {
          console.log(response.data + '삭제됨')
        })
        .catch((e) => {
          console.log(e)
        })
    },
    async onClickPaging(context, payload) {
      console.log('onClickPaging 스트링' + payload)
      const splits = String(payload).split('?')

      await BoardDataService.getPagingList(splits[0], '?' + splits[1])
        .then((response) => {
          context.commit('setBoards', response.data.boards)
          context.commit('setPaging', response.data.page)

          console.log('')
          console.log(this.state.boards)
          console.log(this.getters.getBoards)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    async updateBoard(context, payload) {
      console.log('업데이트 보드' + payload.board.bid)
      console.log('업데이트 보드' + payload.board.bcontent)
      console.log('업데이트 보드' + payload.board.bname)

      await BoardDataService.update(payload.board.bid, payload.board)
        .then((response) => {
          console.log('업데이트 성공' + response.data)
        })
        .catch((e) => {
          console.log('업데이트 실패' + e)
        })
    }
  }
})
