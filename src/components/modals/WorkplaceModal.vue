<template>
  <Modal :show="showModal" @close="closeModal" ok-button-text="">
    <template #header>
      <h3>{{ isEdit ? "Редактирование" : "Заявка на рабочее место" }}</h3>
    </template>

    <template #body>
      <VaForm ref="formRef" class="flex flex-col items-baseline gap-6">
        <VaInput
          v-model="worker.name"
          :rules="[
            (value) => (value && value.length > 0) || 'Обязательное поле',
          ]"
          label="ФИО сотрудника"
          disabled
        />
        <VaSelect
          v-if="!isEdit"
          v-model="worker.workerRole"
          :options="userRoles"
          :value-by="(option) => option.value"
          :rules="[(v) => v || 'Обязательное поле']"
          label="Роль сотрудника"
          disabled
        />
        <VaDateInput
          v-model="worker.birthday"
          :rules="[(v) => validateBirthday(v)]"
          label="День рождения"
          manual-input
          clearable
          disabled
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
          :rules="[
            (value) =>
              (value && value.toString().length > 0) || 'Обязательное поле',
          ]"
          label="Рабочие дни"
          placeholder="Выберите дни недели"
          multiple
          clearable
        />
        <VaInput
          v-model="workplace.schedule.workStart"
          :rules="[
            (value) => (value && value.length > 0) || 'Обязательное поле',
          ]"
          label="Начало"
          placeholder="ЧЧ:ММ"
          mask="time"
        />
        <VaInput
          v-model="workplace.schedule.workEnd"
          :rules="[
            (value) => (value && value.length > 0) || 'Обязательное поле',
          ]"
          label="Конец"
          placeholder="ЧЧ:ММ"
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
import { computed, onBeforeMount, onBeforeUnmount, ref } from "vue";
import { IWorker } from "../models/worker.model";
import { IWorkPlace } from "../models/office.model";
import { Office } from "../services/office.service";
import { useRoute } from "vue-router";
import { useForm } from "vuestic-ui";
import { useUserStore } from "../stores/user";

const selectedDays = ref<string>();
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
const newWorkerId = ref<number>(0);
const newWorkplaceId = ref<number>(0);
const route = useRoute();
const showModal = ref(false);
const store = useUserStore();
const workplace = ref<IWorkPlace>();
const props = defineProps<{
  isEdit: boolean;
  isApply: boolean;
  selectedWorkplace: IWorkPlace;
  workerEdit?: IWorker;
}>();
const worker = ref<IWorker>({
  workerId: store.user.workerId,
  name: store.user?.name,
  workerRole: store.user?.workerRole,
  birthday: store.user?.birthday,
  accessCode: store.user?.accessCode,
});

const { validate } = useForm("formRef");
const workerList = ref();

const schedule = () => {};

const userRoles = [
  { value: "admin", text: "Администратор" },
  { value: "worker", text: "Работник" },
];
const validateBirthday = (value: Date | null) => {
  if (!value) {
    return "Необходимо выбрать";
  }
};
const emits = defineEmits<{
  (e: "ok"): void;
}>();

const okButtonClick = async () => {
  showModal.value = false;
  if (props.isApply) {
    workplace.value.schedule.workDay = selectedDays.value;
    await office.createRequest(worker.value, workplace.value, +route.params.id);
  }
};

function clearForm() {
  worker.value = {
    workerId: newWorkerId.value,
    name: "",
    workerRole: "",
    birthday: new Date(),
  };

  workplace.value = {
    workPlaceId: newWorkplaceId.value,
    workerId: newWorkerId.value,
    equipment: "",
    officeWork: true,
    schedule: {},
  };
}

const handleSaveClick = async () => {
  if (await validate()) {
    await okButtonClick();
    emits("ok");
    clearForm();
  }
};
onBeforeMount(async () => {
  workplace.value = {
    workPlaceId: props.selectedWorkplace?.workPlaceId,
    workerId: worker.value.workerId,
    equipment: props.selectedWorkplace?.equipment,
    officeWork: props.selectedWorkplace?.officeWork,
    schedule: props.selectedWorkplace?.schedule || {},
  };

  newWorkerId.value = await office.getNewWorkerId();
  newWorkplaceId.value = await office.getNewWorkplaceId();
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
