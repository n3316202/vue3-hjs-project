<template>
  <div>
    <div class="container mt-3">
      <div class="container">
        <div class="row">
          <div class="card col-md-6 offset-md-3 offset-md-3">
            <h3 class="text-center">업데이트도 할수 있어요</h3>
            <div class="card-body">
              <div class="form-group">
                <label> 게시판 종류 </label>
                <select placeholder="type" class="form-control">
                  <option value="1">자유게시판</option>
                </select>
              </div>
              <div class="form-group">
                <label> 글번호 </label>
                <input type="text" placeholder="글번호" name="bid" class="form-control" v-model="boards.bid" disabled readonly />
              </div>
              <div class="form-group">
                <label> 이름 </label>
                <input type="text" placeholder="이름" name="bname" class="form-control" v-model="boards.bname" />
              </div>
              <div class="form-group">
                <label> 제목 </label>
                <input placeholder="btitle" name="제목" class="form-control" v-model="boards.btitle" />
              </div>
              <div class="form-group">
                <label> 내용 </label>
                <textarea placeholder="bcontent" name="내용" class="form-control" rows="5" v-model="boards.bcontent" />
              </div>
              <div class="mt-3 d-flex justify-content-between">
                <button class="btn btn-success" @click="updateBoard">Update</button>
                <button class="btn btn-danger">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useBoardStore from '@/stores/BoardStore'

const boardStore = useBoardStore()
const { boards, paging } = storeToRefs(boardStore)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  console.log(route.params.id)
  await boardStore.getBoard(route.params.id)
})

const updateBoard = async () => {
  await boardStore.updateBoard(boardStore.boards)

  //or
  await router.push('/board')
  await boardStore.getPagingBoards(boardStore.paging.makeLink(boardStore.paging.cri.pageNum))
}
</script>

<style scoped></style>
