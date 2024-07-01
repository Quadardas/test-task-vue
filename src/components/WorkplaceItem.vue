<template>
  <div class="workplace-item">
    <div class="wokrpalce--id">{{ workplace.workPlaceId }}</div>
    <div class="workplace--worker">{{ worker?.name }}</div>
    <div v-if="showDetails">
      <div class="workplace--equipment">{{ workplace.equipment }}</div>
      <div class="workplace--schedule">{{ workplace.schedule }}</div>
    </div>
  </div>
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
