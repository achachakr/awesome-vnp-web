<template>
  <div class="work-asset-admin">
    <h3 class="mb-2">작품 갤러리 이미지 / GIF</h3>

    <!-- 업로드 폼 -->
    <form @submit.prevent="handleUpload" class="asset-upload-form">
      <div>
        <label>제목(옵션)</label>
        <input v-model="uploadTitle" type="text" placeholder="이미지 캡션 등" />
      </div>
      <div>
        <input type="file" @change="onFileChange" accept="image/*" />
      </div>
      <button type="submit" :disabled="!uploadFile || uploading">
        {{ uploading ? '업로드 중...' : '업로드' }}
      </button>
    </form>

    <hr class="my-3" />

    <!-- 리스트 -->
    <div v-if="loading">에셋 목록 불러오는 중...</div>
    <div v-else>
      <table v-if="assets.length" class="asset-table">
        <thead>
          <tr>
            <th>#</th>
            <th>섬네일</th>
            <th>제목</th>
            <th>정렬</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(asset, index) in assets" :key="asset.id">
            <td>{{ index + 1 }}</td>
            <td>
              <img :src="asset.url" :alt="asset.title || 'asset'" class="thumb" />
            </td>
            <td>
              {{ asset.title || '-' }}
            </td>
            <td class="sort-buttons">
              <button @click="moveUp(index)" :disabled="index === 0">↑</button>
              <button @click="moveDown(index)" :disabled="index === assets.length - 1">↓</button>
            </td>
            <td>
              <button class="danger" @click="remove(asset.id)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>등록된 에셋이 없습니다.</p>

      <div v-if="assets.length" class="mt-2">
        <button @click="saveOrder" :disabled="savingOrder">
          {{ savingOrder ? '정렬 저장 중...' : '정렬 저장' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  workId: {
    type: Number,
    required: true
  }
})

const assets = ref([])
const loading = ref(false)
const savingOrder = ref(false)

const uploadFile = ref(null)
const uploadTitle = ref('')
const uploading = ref(false)

const fetchAssets = async () => {
  loading.value = true
  try {
    const res = await axios.get(`/api/admin/works/${props.workId}/assets`)
    assets.value = res.data || []
  } catch (e) {
    console.error('에셋 목록 조회 실패', e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchAssets)

const onFileChange = (e) => {
  const files = e.target.files
  if (files && files.length > 0) {
    uploadFile.value = files[0]
  } else {
    uploadFile.value = null
  }
}

const handleUpload = async () => {
  if (!uploadFile.value) return

  const formData = new FormData()
  formData.append('file', uploadFile.value)
  if (uploadTitle.value) {
    formData.append('title', uploadTitle.value)
  }

  uploading.value = true
  try {
    await axios.post(`/api/admin/works/${props.workId}/assets`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    uploadFile.value = null
    uploadTitle.value = ''
    await fetchAssets()
  } catch (e) {
    console.error('업로드 실패', e)
    alert('업로드 중 오류가 발생했습니다.')
  } finally {
    uploading.value = false
  }
}

const moveUp = (index) => {
  if (index === 0) return
  const copy = [...assets.value]
  const tmp = copy[index - 1]
  copy[index - 1] = copy[index]
  copy[index] = tmp
  assets.value = copy
}

const moveDown = (index) => {
  if (index === assets.value.length - 1) return
  const copy = [...assets.value]
  const tmp = copy[index + 1]
  copy[index + 1] = copy[index]
  copy[index] = tmp
  assets.value = copy
}

const saveOrder = async () => {
  savingOrder.value = true
  try {
    const assetIds = assets.value.map(a => a.id)
    await axios.post(`/api/admin/works/${props.workId}/assets/reorder`, {
      assetIds
    })
    alert('정렬이 저장되었습니다.')
    await fetchAssets()
  } catch (e) {
    console.error('정렬 저장 실패', e)
    alert('정렬 저장 중 오류가 발생했습니다.')
  } finally {
    savingOrder.value = false
  }
}

const remove = async (assetId) => {
  if (!confirm('정말 삭제하시겠습니까?')) return
  try {
    await axios.delete(`/api/admin/work-assets/${assetId}`)
    await fetchAssets()
  } catch (e) {
    console.error('삭제 실패', e)
    alert('삭제 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
.work-asset-admin {
  margin-top: 24px;
}

.asset-upload-form {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.asset-table {
  width: 100%;
  border-collapse: collapse;
}

.asset-table th,
.asset-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.sort-buttons button {
  margin-right: 4px;
}

button.danger {
  background-color: #e74c3c;
  color: white;
}
</style>
