<template>
  <Dialog
    v-model:visible="isOpen"
    :style="{ width: '450px' }" header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span>Are you sure you want to delete the selected task?</span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" class="p-button-text" @click="isOpen = false" />
      <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="emit('delete')" />
    </template>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog/sfc'
import Button from 'primevue/button/sfc'
import { ref } from 'vue'

const emit = defineEmits(['delete'])
const isOpen = ref(false)

const toggleDialog = ref(() => (isOpen.value = !isOpen.value))

defineExpose({
  toggleDialog
})
</script>

<style lang=""></style>
