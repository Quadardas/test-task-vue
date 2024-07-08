<template>
  <VaCard class="workplace-item">
    <VaCardTitle class="wokrplace--id"
      >ID рабочего места: {{ workplace.workPlaceId }}</VaCardTitle
    >
    <VaCardContent class="workplace-content"
      ><div class="workplace--worker">
        {{
          workplace?.workerId !== null
            ? `Имя работника: ${worker?.name}`
            : "Свободно"
        }}
      </div>
      <div v-if="showDetails">
        <div class="worker--role" v-if="workplace?.workerId !== null">
          Роль сотрудника: {{ worker?.workerRole }}
        </div>
        <div class="workplace--equipment">
          Оборудование: {{ workplace.equipment }}
        </div>
        <div class="workplace--schedule">
          Примерный график: {{ workplace.schedule }}
        </div>
      </div>
      <VaButton
        v-if="!workplace?.workerId && $route.params.id && !store.isAdmin"
        @click.stop="applyWorkplace"
        >Подать заявку</VaButton
      >
      <VaButton
        v-if="!disableButton && !approvable"
        @click.stop="deleteWorplace"
        >Удалить</VaButton
      >
    </VaCardContent>
    <WorkplaceModal
      :show="showModal"
      :workplace-edit="workplace"
      :selected-workplace="workplace"
      @close="showModal = false"
      @ok="showModal = false"
    />
    <VaButtonGroup v-if="approvable" class="button-group">
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
import { useUserStore } from "./stores/user";
const worker = ref<IWorker>();
const officeService = new Office();
const props = defineProps<{
  workplace: IWorkPlace;
  showDetails: boolean;
  disableButton?: boolean;
  approvable?: boolean;
}>();
const showModal = ref(false);
const store = useUserStore();
const isApply = ref(false);

const emit = defineEmits(["status-updated"]);

function deleteWorplace() {
  officeService.deleteWorkplace(props.workplace.workPlaceId);
}

async function acceptRequest(wokrplaceId: number) {
  await officeService.acceptRequest(wokrplaceId);
  emit("status-updated");
}
async function declineRequest(wokrplaceId: number) {
  await officeService.declineRequest(wokrplaceId);
  emit("-updated");
}
const applyWorkplace = (work: IWorkPlace) => {
  isApply.value = true;
  showModal.value = true;
  // console.log(selectedWorkplace.value);
};

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
