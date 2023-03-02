<template>
  <div class="container mt-3">
    <div class="container-fluid">
      <!-- Page Heading -->
      <h1 class="text-center h3 mb-2 text-gray-800 mt-4">게시판</h1>
      <!-- <p class="mb-4">
        DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the{' '}
        <a target="_blank" href="https://datatables.net"> official DataTables documentation </a>
        .
      </p> -->
      <!-- DataTales Example -->
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
                <tr class="text-center" v-for="board in state.boards" :key="board.bid">
                  <td>{{ board.bid }}</td>
                  <td>{{ board.bname }}</td>
                  <td>
                    <router-link :to="'/board/' + board.bid">{{ board.btitle }}</router-link>
                  </td>
                  <td>{{ board.bhit }}</td>
                  <td>{{ board.bdate }}</td>
                  <td>
                    <button class="btn btn-success" :value="board.bid" v-on:click="deleteBoard">삭제</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <router-link class="nav-link active" aria-current="page" to="/job">JobList</router-link> -->
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <button v-if="state.paging.pre" class="page-link" :value="makePrevious" aria-label="Previous" @click="onClickPaging">&laquo;</button>
              </li>
              <li class="page-item" v-for="num in range(state.paging.startPage, state.paging.endPage)" :key="num">
                <button :value="makeLink(num)" class="page-link" @click="onClickPaging">{{ num }}</button>
              </li>

              <li class="page-item">
                <button v-if="state.paging.next" class="page-link" :value="makeNext" aria-label="Next" @click="onClickPaging">&raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <!-- /.container-fluid -->
</template>

<script>
import { reactive, computed } from 'vue'
import BoardDataService from '@/services/BoardDataService'

export default {
  setup() {
    let state = reactive({
      boards: [],
      paging: {}
    })

    const getAllBoards = () => {
      console.log('getAllBoards =================')

      BoardDataService.getPagingList()
        .then((response) => {
          state.boards = response.data.boards
          state.paging = response.data.page

          console.log(response.data.boards)
          console.log(response.data.page)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    const deleteBoard = (e) => {
      console.log('deleteBoard()===============')
      BoardDataService.remove(e.target.value)
        .then((response) => {
          console.log(response.data)
          getAllBoards()
        })
        .catch((e) => {
          console.log(e)
        })
    }

    const onClickPaging = (e) => {
      console.log(e.target.value)
      const splits = String(e.target.value).split('?')
      console.log(splits)

      BoardDataService.getPagingList(splits[0], '?' + splits[1])
        .then((response) => {
          state.boards = response.data.boards
          state.paging = response.data.page

          console.log(response.data.boards)
          console.log(response.data.page)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    const range = (start, stop, step = 1) => {
      return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
    }

    const makePrevious = computed(() => {
      console.log('makePrevious ..' + state.paging.startPage + ':' + state.paging.cri.amount)
      return '/rboard/list2' + '?pageNum=' + (state.paging.startPage - 10) + '&' + 'amount=' + state.paging.cri.amount
    })

    const makeNext = computed(() => {
      console.log('makeNext..')
      return '/rboard/list2' + '?pageNum=' + (state.paging.endPage + 1) + '&' + 'amount=' + state.paging.cri.amount
    })

    const makeLink = (i) => {
      console.log('makeLink..')
      return '/rboard/list2' + '?pageNum=' + i + '&' + 'amount=' + state.paging.cri.amount
    }

    getAllBoards()
    console.log(state)

    return { state, deleteBoard, makePrevious, makeNext, range, makeLink, onClickPaging }
  }
}
</script>

<style scoped></style>
