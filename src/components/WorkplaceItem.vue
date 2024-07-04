<template>
  <VaCard class="workplace-item" v-if="workplace.status">
    <VaCardTitle class="wokrplace--id"
      >ID рабочего места: {{ workplace.workPlaceId }}</VaCardTitle
    >
    <VaCardContent class="workplace-content"
      ><div class="workplace--worker">Имя работника: {{ worker?.name }}</div>
      <div v-if="showDetails">
        <div class="workplace--equipment">
          Оборудование: {{ workplace.equipment }}
        </div>
        <div class="workplace--schedule">
          Примерный график: {{ workplace.schedule }}
        </div>
      </div>
    </VaCardContent>
  </VaCard>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { IOffice, IWorkPlace } from "./models/office.model";
import { Office } from "./services/office.service";
import { IWorker } from "./models/worker.model";
const officeService = new Office();
const props = defineProps<{
  workplace: IWorkPlace;
  showDetails: boolean;
}>();
const worker = ref<IWorker | null>();
onBeforeMount(async () => {
  try {
    const workers = await officeService.getWorker(props.workplace.workPlaceId);

    if (workers.length > 0) {
      worker.value = workers[0];
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
<style lang="scss" scoped>
.workplace-item {
  margin: 10px;
  height: 130px;
  .wokrplace--id {
    font-size: 16px;
  }
  .workplace-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>
