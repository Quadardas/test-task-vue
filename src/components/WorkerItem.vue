<template>
  <VaCard class="worker" @click="showModalWorker = true">
    <VaCardTitle class="worker-name">{{ props.worker.name }}</VaCardTitle>
    <VaCardContent class="worker-content"
      ><div class="worker-id">ID работника: {{ props.worker?.workerId }}</div>
      <div class="worker-role">Роль: {{ props.worker.workerRole }}</div>
      <div class="worker-birthday">
        День рождения: {{ props.worker.birthday }}
      </div>

      <VaButtonGroup v-if="props.worker.isNew" class="button-group">
        <VaButton @click.stop="acceptWorker"> Принять </VaButton>
        <VaButton @click.stop="deleteWorker" color="danger">
          Отклонить
        </VaButton>
      </VaButtonGroup>
      <VaButton v-else @click.stop="deleteWorker"
        >Удалить</VaButton
      ></VaCardContent
    >
  </VaCard>
  <WorkerCreate
    :show="showModalWorker"
    :worker-edit="worker"
    @close="showModalWorker = false"
    @ok="showModalWorker = false"
  />
</template>
<script lang="ts" setup>
import { IWorker } from "@/components/models/worker.model";
import WorkerCreate from "../components/modals/WorkerCreate.vue";
import { ref } from "vue";
import { Office } from "../components/services/office.service";

const officeService = new Office();
const props = defineProps<{
  worker: IWorker;
}>();
const emit = defineEmits(["status-updated"]);

function acceptWorker() {
  officeService.acceptWorker(props.worker?.workerId);
  emit("status-updated");
}

function deleteWorker() {
  officeService.deleteWorker(props.worker?.workerId);
  emit("status-updated");
}
const showModalWorker = ref(false);
</script>
<style lang="scss" scoped>
.worker {
  margin: 10px;
  height: fit-content;
  .worker-name {
    font-size: 16px !important;
  }
  .worker-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>
