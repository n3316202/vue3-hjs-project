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
          <div class="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <button v-if="state.paging.pre" class="page-link" :value="state.paging.makePrevious()" aria-label="Previous" @click="onClickPaging">
                    &laquo;
                  </button>
                </li>
                <li class="page-item" v-for="num in state.paging.range(state.paging.startPage, state.paging.endPage)" :key="num">
                  <button :value="state.paging.makeLink(num)" class="page-link" @click="onClickPaging">{{ num }}</button>
                </li>

                <li class="page-item">
                  <button v-if="state.paging.next" class="page-link" :value="state.paging.makeNext()" aria-label="Next" @click="onClickPaging">&raquo;</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /.container-fluid -->
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import boardDataService from '@/services/BoardDataService'
import Paging from '@/models/Paging'

let state = reactive({
  boards: [],
  paging: new Paging()
})

const getBoards = () => {
  console.log('getBoards =================')

  boardDataService
    .getPagingList()
    .then((response) => {
      state.boards = response.data.boards
      //state.paging = response.data.page
      state.paging = new Paging(response.data.page)
      console.log(response.data.boards)
      console.log(state.paging)
    })
    .catch((e) => {
      console.log(e)
    })
}

onMounted(() => {
  getBoards()
})

const deleteBoard = (e) => {
  console.log('deleteBoard()===============')
  boardDataService
    .remove(e.target.value)
    .then((response) => {
      console.log(response.data)
      //삭제후 화면 업데이트
      e.target.value = state.paging.makeLink(state.paging.cri.pageNum)
      onClickPaging(e)
    })
    .catch((e) => {
      console.log(e)
    })
}

const onClickPaging = (e) => {
  const splits = String(e.target.value).split('?')
  console.log(splits)

  boardDataService
    .getPagingList(splits[0], '?' + splits[1])
    .then((response) => {
      state.boards = response.data.boards
      //state.paging = response.data.page
      state.paging = new Paging(response.data.page)
      console.log(response.data.boards)
      console.log(state.paging)
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>

<style scoped></style>
