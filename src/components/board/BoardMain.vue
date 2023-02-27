<template>
  <div class="container mt-3">
    <div class="container-fluid">
      <!-- Page Heading -->
      <h1 class="h3 mb-2 text-gray-800">게시판</h1>
      <p class="mb-4">
        DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the{' '}
        <a target="_blank" href="https://datatables.net"> official DataTables documentation </a>
        .
      </p>

      <!-- DataTales Example -->
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>이름</th>
                  <th>제목</th>
                  <th>날짜</th>
                  <th>히트</th>
                  <th class="text-center">삭제</th>
                </tr>
              </thead>

              <tbody>
                {{
                  boards
                }}
                <tr v-for="board in boards" :key="board.id">
                  <td>{{ board.bid }}</td>
                  <td>{{ board.bname }}</td>
                </tr>
                <!-- {boards && boards.map((board) => (
                <tr key="{board.bid}">
                  <td>{board.bid}</td>
                  <td>{board.bname}</td>

                  <td>
                    <router-link class="nav-link active" aria-current="page" to="/rsp">가위바위보</router-link>
                    <router-link to="/board/" + ${board.bid}>{board.btitle}</router-link>
                  </td>

                  <td>{board.bdate}</td>
                  <td>{board.bhit}</td>
                  <td className="text-center">
                    <button class="btn btn-success" value="{board.bid}" onClick="{deleteBoard}">삭제</button>
                  </td>
                </tr>
                ))} -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  //
  <!-- /.container-fluid -->
</template>

<script>
import { reactive } from 'vue'
import BoardDataService from '@/services/BoardDataService'

export default {
  setup() {
    // let board = {
    //   bid: null,
    //   bname: '',
    //   bdate: '',
    //   bhit: ''
    // }

    /* board */
    let boards

    const getAllBoards = () => {
      console.log('getAllBoards =================')

      BoardDataService.getAll()
        .then((response) => {
          //console.log(response.data)
          boards = reactive(response.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    getAllBoards()
    console.log(boards)
    //console.log(boards.bname)

    return { boards }
  }
}
</script>

<style scoped></style>
