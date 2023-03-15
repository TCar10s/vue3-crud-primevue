<template>
  <Toolbar class="mb-4">
    <template #start>
      <Button
        label="New"
        icon="pi pi-plus"
        class="p-button-success mr-2"
        @click="setFormValue()"
      />
    </template>
    <template #end>
      <Button
        label="Delete"
        icon="pi pi-trash"
        class="p-button-danger"
        @click="toggleConfirmDialog"
        :disabled="canSelectedTasks"
      />
    </template>
  </Toolbar>

  <DataTable
    responsiveLayout="scroll"
    :value="tasks"
    :paginator="true"
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50]"
    v-model:selection="selectedTasks"
  >
    <Column style="width: 3rem" selectionMode="multiple" :exportable="false"></Column>
    <Column field="id" header="ID"></Column>
    <Column field="title" header="Title"></Column>
    <Column field="complete" header="Complete">
      <template #body="{ data }">
        <Badge
          :value="isCompletedTask(data.completed)"
          :severity="data.completed ? 'success' : 'danger'"
          class="mr-2"
        >
        </Badge>
      </template>
    </Column>
    <Column header="Edit">
      <template #body="{ data }">
        <Button
          icon="pi pi-pencil"
          class="p-button-rounded p-button-success p-button-text"
          @click="setFormValue(data)"
        ></Button>
      </template>
    </Column>
  </DataTable>

  <TaskForm
    ref="formDialog"
    :task="task"
    @submitForm="handleSubmit"
  />

  <ConfirmDialog
    ref="confirmDialog"
    @delete="handleDelete"
  />
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Badge from 'primevue/badge'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import { computed, ref } from 'vue'

defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['create', 'update', 'delete'])

const selectedTasks = ref([])
const formDialog = ref(null)
const confirmDialog = ref(null)
const task = ref(null)

const isCompletedTask = computed(() => (isCompleted) => isCompleted ? 'Completed' : 'Pending')
const canSelectedTasks = computed(() => !selectedTasks.value.length)

const toggleFormDialog = () => formDialog.value.toggleDialog()
const toggleConfirmDialog = () => confirmDialog.value.toggleDialog()

const setFormValue = (item = null) => {
  task.value = item
  toggleFormDialog()
}

const handleDelete = () => {
  const idSelectedTasks = selectedTasks.value.map((task) => task.id)

  emit('delete', idSelectedTasks)
  toggleConfirmDialog();
}

const handleSubmit = ({ form }) => {
  form.id ? emit('update', form) : emit('create', form)
  toggleFormDialog()
}
</script>

<style scoped></style>
