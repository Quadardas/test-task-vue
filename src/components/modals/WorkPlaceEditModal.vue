<template>
  <Modal :show="showModal">
    <template #header>
      <h3>Редактирование</h3>
    </template>

    <template #body>
      <VaForm ref="formRef" class="flex flex-col items-baseline gap-6">
        <VaSelect
          v-model="worker.workerId"
          :options="workerList"
          :placeholder="worker.name"
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
          v-model="workplace.schedule.workDay"
          :options="daysOfWeek"
          label="Рабочие дни"
          placeholder="Выберите дни недели"
          :rules="[
            (value) =>
              (value && value.toString().length > 0) || 'Обязательное поле',
          ]"
          multiple
          clearable
        />

        <VaInput
          v-model="workplace.schedule.workStart"
          label="Начало"
          placeholder="ЧЧ:ММ"
          :rules="[
            (value) => (value && value.length > 0) || 'Обязательное поле',
          ]"
          mask="time"
        />
        <VaInput
          v-model="workplace.schedule.workEnd"
          label="Конец"
          placeholder="ЧЧ:ММ"
          :rules="[
            (value) => (value && value.length > 0) || 'Обязательное поле',
          ]"
          mask="time"
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
import { cloneDeep } from "lodash-es";

const props = defineProps<{
  isEdit: boolean;
  workplaceEdit: IWorkPlace;
}>();
const workplace = ref<IWorkPlace>(cloneDeep(props.workplaceEdit));
const selectedDays = ref<string>();
const workStart = ref<Date>();
const workEnd = ref<Date>();
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

const workerList = ref<Array<{ id: number; text: string }>>([]);

const emits = defineEmits<{
  (e: "ok"): void;
}>();

const okButtonClick = async () => {
  await office.updateWorkplace(worker.value, workplace.value);
  if (worker.value && workplace.value) {
    showModal.value = false;
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
  selectedDays.value = "";
  workStart.value = new Date();
  workEnd.value = new Date();
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
