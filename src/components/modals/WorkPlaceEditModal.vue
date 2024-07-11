<template>
  <Modal :show="showModal" @close="closeModal">
    <template #header>
      <h3>{{ isEdit ? "Редактирование" : "Заявка на рабочее место" }}</h3>
    </template>

    <template #body>
      <VaForm ref="formRef" class="flex flex-col items-baseline gap-6">
        <VaSelect
          v-model="worker.workerId"
          :options="workerList"
          :value-by="(option) => option.id"
          :text-by="(option) => option.text"
          :rules="[(v) => v || 'Обязательное поле']"
          label="Сотрудник"
        />

        <VaInput
          v-model="workplace.equipment"
          :rules="[
            (value) => (value && value.length > 0) || 'Обязательное поле',
          ]"
          label="Оборудование"
        />
        <VaSelect
          v-model="selectedDays"
          :options="daysOfWeek"
          label="Рабочие дни"
          placeholder="Выберите дни недели"
          multiple
          clearable
        />
        <VaTimeInput
          v-model="workplace.schedule.workStart"
          manual-input
          :messages="['Начало']"
        />
        <VaTimeInput
          v-model="workplace.schedule.workEnd"
          manual-input
          :messages="['Конец']"
        />
        <VaSwitch v-model="workplace.officeWork" label="В офисе" size="small" />
      </VaForm>
    </template>

    <template #footer>
      <VaButton @click="handleSaveClick"> Сохранить </VaButton>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from "@/components/modals/Modal.vue";
import { ref, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
import { useForm } from "vuestic-ui";
import { IWorker } from "../models/worker.model";
import { IWorkPlace } from "../models/office.model";
import { Office } from "../services/office.service";

const selectedDays = ref<string[]>([]);
const workStart = ref<string>("");
const workEnd = ref<string>("");
const daysOfWeek = [
  { value: "monday", text: "Понедельник" },
  { value: "tuesday", text: "Вторник" },
  { value: "wednesday", text: "Среда" },
  { value: "thursday", text: "Четверг" },
  { value: "friday", text: "Пятница" },
  { value: "saturday", text: "Суббота" },
  { value: "sunday", text: "Воскресенье" },
];

const office = new Office();
const { reset, validate } = useForm("formRef");
const route = useRoute();
const showModal = ref(false);
const worker = ref<IWorker>({});
const workplace = ref<IWorkPlace>({
  schedule: { workStart: "", workEnd: "", workDay: [] },
});
function closeModal() {}

const props = defineProps<{
  isEdit: boolean;
  selectedWorkplace: IWorkPlace;
}>();

const workerList = ref<Array<{ id: number; text: string }>>([]);

const emits = defineEmits<{
  (e: "ok"): void;
}>();

const okButtonClick = async () => {
  showModal.value = false;

  if (worker.value && workplace.value) {
    if (props.isEdit) {
      // await office.updateWorkplace(worker.value, workplace.value);
    }
  }
};

function clearForm() {
  worker.value = {
    workerId: 0,
    name: "",
    workerRole: "",
    birthday: new Date(),
  };

  workplace.value = {
    workPlaceId: 0,
    workerId: 0,
    equipment: "",
    officeWork: true,
    schedule: { workStart: "", workEnd: "", workDay: [] },
  };
  selectedDays.value = [];
  workStart.value = "";
  workEnd.value = "";
}

const handleSaveClick = async () => {
  if (await validate()) {
    await okButtonClick();
    emits("ok");
    clearForm();
  }
};

onBeforeMount(async () => {
  workerList.value = await office.getWorkersForSelect();
});

watch(
  () => props.selectedWorkplace,
  (newWorkplace) => {
    if (newWorkplace) {
      worker.value.workerId = newWorkplace.workerId;
      workplace.value = { ...newWorkplace };
      selectedDays.value = newWorkplace.schedule?.workDay || [];
      workStart.value = newWorkplace.schedule?.workStart || "";
      workEnd.value = newWorkplace.schedule?.workEnd || "";
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.va-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .va-switch {
    display: block;
    width: fit-content;
  }
}
</style>
