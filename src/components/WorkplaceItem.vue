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
      <div v-if="showDetails" class="workplace--details">
        <div class="worker--role" v-if="workplace?.workerId !== null">
          Роль сотрудника: {{ worker?.workerRole }}
        </div>
        <div class="workplace--equipment">
          Оборудование: {{ workplace.equipment }}
        </div>
        <div class="workplace--office-work">
          Работа {{ workplace.officeWork ? "в офисе" : "удаленная" }}
        </div>
        <div v-if="workplace.schedule?.workDay" class="workplace--schedule">
          Примерный график:
          {{ formatSchedule(workplace.schedule).workDay }}
          С {{ formatSchedule(workplace.schedule).workStart }} до
          {{ formatSchedule(workplace.schedule).workEnd }}
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
      :isApply
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
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

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

const formatSchedule = (schedule) => {
  if (!schedule) return {};
  const formattedWorkDays = Array.isArray(schedule.workDay)
    ? schedule.workDay
        .map((day) => {
          if (day && typeof day.text === "string") {
            return day.text;
          }
          return "";
        })
        .join(", ")
    : "";

  const formattedWorkStart = schedule.workStart
    ? format(parseISO(schedule.workStart), "HH:mm", { locale: ru })
    : "";

  const formattedWorkEnd = schedule.workEnd
    ? format(parseISO(schedule.workEnd), "HH:mm", { locale: ru })
    : "";

  return {
    workDay: formattedWorkDays,
    workStart: formattedWorkStart,
    workEnd: formattedWorkEnd,
  };
};

const emit = defineEmits(["status-updated"]);

function deleteWorplace() {
  officeService.deleteWorkplace(props.workplace.workPlaceId);
  emit("status-updated");
}

async function acceptRequest(wokrplaceId: number) {
  await officeService.acceptRequest(wokrplaceId, worker.value?.workerId);
  emit("status-updated");
}
async function declineRequest(wokrplaceId: number) {
  await officeService.declineRequest(wokrplaceId);
  emit("status-updated");
}
const applyWorkplace = (work: IWorkPlace) => {
  isApply.value = true;
  showModal.value = true;

  // console.log(selectedWorkplace.value);
};

onBeforeMount(async () => {
  // console.log(props.workplace, "aboba");
  // console.log(props.workplace.schedule);

  try {
    worker.value = await officeService.getWorker(
      props.workplace.workPlaceId,
      props.workplace.workerId,
      props.approvable
    );
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
    .workplace--details {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .button-group {
  }
}
</style>
