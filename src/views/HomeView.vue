<template>
  <main>
    <Card>
      <template #content>
        <TaskList :tasks="tasks" @create="createTask" @update="updateTask" @delete="handleDelete" />
      </template>
    </Card>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TaskList from '../components/TaskList.vue'
import Card from 'primevue/card/sfc'
import * as taskService from '../services/Task.js'

const tasks = ref([])

onMounted(() => {
  getTasks()
})

async function getTasks() {
  const response = await taskService.getTasks()
  const { data, status } = response

  if (status === 200) {
    console.log(data)
    tasks.value = data.reverse()
  }
}

async function createTask(form) {
  const response = await taskService.createTask(form)
  const { data, status } = response

  if (status === 201) {
    tasks.value.unshift(data)
  }
}

async function updateTask(form) {
  const response = await taskService.updateTask(form)
  const { data, status } = response

  if (status === 200) {
    const index = tasks.value.findIndex((task) => task.id === data.id)
    tasks.value[index] = data
  }
}

const handleDelete = (taskIds) => {
  taskIds.map((id) => {
    deleteTask(id)
  })
}

async function deleteTask(id) {
  const response = await taskService.deleteTask(id)
  const { status } = response

  if (status === 200) {
    const index = tasks.value.findIndex((task) => task.id === id)
    tasks.value.splice(index, 1)
  }
}
</script>
