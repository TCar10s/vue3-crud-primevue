<template>
  <Dialog
    header="Header"
    v-model:visible="isOpen"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <form class="formgrid grid p-fluid">
      <div class="field col-12">
        <label for="title">Title</label>
        <InputText id="title" type="text" v-model="state.title" placeholder="Ver curso..." />
      </div>

      <div class="field col-12" v-if="isNewTask">
        <label for="id" style="display: block">Completed</label>
        <InputSwitch v-model="state.completed" />
      </div>
    </form>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="toggleDialog" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="handleSubmit" autofocus />
    </template>
  </Dialog>
</template>
<script setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext/sfc'
import InputSwitch from 'primevue/inputswitch/sfc'
import { reactive, ref, toRaw, watch } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['submitForm'])
watch(
  () => props.task,
  (newTask) => {
    isNewTask.value = Boolean(newTask)

    if (newTask) {
      state.completed = newTask.completed
      state.title = newTask.title
      state.id = newTask.id
      return
    }

    resetForm()
  }
)

const state = reactive({
  id: null,
  title: '',
  completed: false
})

const resetForm = () => {
  state.title = ''
  state.completed = false
}

const isOpen = ref(false)
const isNewTask = ref(false)
const toggleDialog = ref(() => {
  isOpen.value = !isOpen.value

  if (!isOpen.value) {
    resetForm()
  }
})

const handleSubmit = () => {
  emit('submitForm', { form: toRaw(state) })
}

defineExpose({
  toggleDialog
})
</script>
<style scoped></style>
