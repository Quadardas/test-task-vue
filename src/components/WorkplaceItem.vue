<template>
  <VaCard class="workplace-item">
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
      <VaButton v-if="!disableButton" @click.stop="deleteWorplace"
        >Удалить</VaButton
      >
    </VaCardContent>
    <WorkplaceModal
      :show="showModal"
      :isEdit="isEdit"
      @close="showModal = false"
      @ok="showModal = false"
    />
    <VaButtonGroup v-if="!workplace.status" class="button-group">
      <VaButton @click="acceptRequest(workplace.workPlaceId)">
        Принять
      </VaButton>
      <VaButton @click="declineRequest(workplace.workPlaceId)" color="danger">
        Отклонить
      </VaButton>
    </VaButtonGroup>
  </VaCard>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref, watch } from "vue";
import { IOffice, IWorkPlace } from "./models/office.model";
import { Office } from "./services/office.service";
import { IWorker } from "./models/worker.model";
import WorkplaceModal from "../components/modals/WorkplaceModal.vue";
const officeService = new Office();
const props = defineProps<{
  workplace: IWorkPlace;
  showDetails: boolean;
  disableButton?: boolean;
}>();
const worker = ref<IWorker>();
const emit = defineEmits(["status-updated"]);

function deleteWorplace() {
  // officeService.deleteWorkplace(props.workplace.workPlaceId);
}

async function acceptRequest(wokrplaceId: number) {
  await officeService.acceptRequest(wokrplaceId);
  emit("status-updated");
}
async function declineRequest(wokrplaceId: number) {
  await officeService.declineRequest(wokrplaceId);
  emit("status-updated");
}

onBeforeMount(async () => {
  // console.log(props.workplace, "aboba");

  try {
    worker.value = await officeService.getWorker(props.workplace.workPlaceId);
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
.workplace-item {
  margin: 10px;
  height: fit-content;
  padding: 5px;
  .wokrplace--id {
    font-size: 16px;
  }
  .workplace-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  .button-group {
  }
}
</style>
