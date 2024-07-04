<template>
  <VaCard class="worker">
    <VaCardTitle class="worker-name">{{ props.worker.name }}</VaCardTitle>
    <VaCardContent class="worker-content"
      ><div class="worker-id">ID работника: {{ props.worker.workerId }}</div>
      <div class="worker-role">Роль: {{ props.worker.workerRole }}</div>
      <div class="worker-birthday">
        День рождения: {{ props.worker.birthday }}
      </div></VaCardContent
    >
  </VaCard>
</template>
<script lang="ts" setup>
import { IWorker } from "@/components/models/worker.model";
const props = defineProps<{
  worker: IWorker;
}>();
</script>
<style lang="scss" scoped>
.worker {
  margin: 10px;
  height: 130px;
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
