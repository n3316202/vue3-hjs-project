<template>
  <div class="container mt-3">
    <div class="container-fluid">
      <!-- Page Heading -->
      <h1 class="text-center h3 mb-2 text-gray-800 mt-4">게시판</h1>
      <div class="card shadow mb-4 mt-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr class="text-center">
                  <th>번호</th>
                  <th>이름</th>
                  <th>제목</th>
                  <th>날짜</th>
                  <th>히트</th>
                  <th class="text-center">삭제</th>
                </tr>
              </thead>

              <tbody>
                <tr class="text-center" v-for="board in boards" :key="board.bid">
                  <td>{{ board.bid }}</td>
                  <td>{{ board.bname }}</td>
                  <td>
                    <router-link :to="'/board/' + board.bid">{{ board.btitle }}</router-link>
                  </td>
                  <td>{{ board.bhit }}</td>
                  <td>{{ board.bdate }}</td>
                  <td>
                    <button class="btn btn-success" :value="board.bid" @:click="deleteBoard">삭제</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <button v-if="paging.pre" class="page-link" :value="makePrevious" aria-label="Previous" @click="onClickPaging">&laquo;</button>
                </li>
                <li class="page-item" v-for="num in range(paging.startPage, paging.endPage)" :key="num">
                  <button :value="makeLink(num)" class="page-link" @click="onClickPaging">{{ num }}</button>
                </li>

                <li class="page-item">
                  <button v-if="paging.next" class="page-link" :value="makeNext" aria-label="Next" @click="onClickPaging">&raquo;</button>
                </li>
              </ul>
            </nav>
          </div>
          <hr />
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">글쓰기</button>
            <!-- 모달 스타트 -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sl modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">글쓰기</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button><br />
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">작성자:</label>
                      <input type="text" class="form-control" v-model="board.bname" />
                    </div>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">제목:</label>
                      <input type="text" class="form-control" v-model="board.btitle" />
                    </div>
                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">내용:</label>
                      <textarea class="form-control" rows="8" v-model="board.bcontent"></textarea>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="writeBoard">전송</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 모달 엔드 -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /.container-fluid -->
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
// import BoardDataService from '@/services/BoardDataService'

export default {
  setup() {
    let board = reactive({
      btitle: '',
      bcontent: '',
      bname: ''
    })

    const store = useStore()
    const getBoards = computed(() => {
      console.log('함수 : get 전')
      return store.getters.boards
    })

    const boards = computed(() => {
      console.log('함수 : store.state.boards')
      return store.state.boards
    })

    const paging = computed(() => {
      console.log('함수 : get 전')
      return store.state.paging
    })

    onMounted(() => {
      if (store.state.paging.startPage == undefined) {
        console.log("()'getAllBoards') 호출")
        store.dispatch('getAllBoards')
      }

      console.log('온마운트 호출')
    })

    const deleteBoard = async (e) => {
      console.log(e.target.value)
      await store
        .dispatch('deleteBoard', e.target.value)
        .then((response) => {
          console.log(response)
          store.dispatch('getAllBoards')
        })
        .catch((e) => {
          console.log(e)
        })
    }

    const writeBoard = async () => {
      console.log(board)
      await store
        .dispatch('writeBoard', board)
        .then((response) => {
          console.log(response)
          store.dispatch('getAllBoards')
        })
        .catch((e) => {
          console.log(e)
        })
    }

    const onClickPaging = (e) => {
      console.log(e.target.value)
      store.dispatch('onClickPaging', e.target.value)
    }

    const range = (start, stop, step = 1) => {
      return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
    }

    const makePrevious = computed(() => {
      console.log('makePrevious ..' + store.state.paging.startPage + ':' + store.state.paging.cri.amount)
      return '/rboard/list2' + '?pageNum=' + (store.state.paging.startPage - 10) + '&' + 'amount=' + store.state.paging.cri.amount
    })

    const makeNext = computed(() => {
      console.log('makeNext..')
      return '/rboard/list2' + '?pageNum=' + (store.state.paging.endPage + 1) + '&' + 'amount=' + store.state.paging.cri.amount
    })

    const makeLink = (i) => {
      console.log('makeLink..')
      return '/rboard/list2' + '?pageNum=' + i + '&' + 'amount=' + store.state.paging.cri.amount
    }

    return { board, writeBoard, paging, boards, getBoards, deleteBoard, makePrevious, makeNext, range, makeLink, onClickPaging }
  }
}
</script>

<style scoped></style>
