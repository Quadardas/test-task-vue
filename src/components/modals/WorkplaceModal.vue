<template>
  <Modal :show="showModal" @ok="okButtonClick">
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
        />
        <VaInput
          v-model="workplace.equipment"
          :rules="[
            (value) => (value && value.length > 0) || 'Обязательное поле',
          ]"
          label="Оборудование"
        />
        <VaInput
          v-model="workplace.schedule"
          :rules="[
            (value) => (value && value.length > 0) || 'Обязательное поле',
          ]"
          label="Примерный режим работы"
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
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { IWorker } from "../models/worker.model";
import { IWorkPlace } from "../models/office.model";
import { Office } from "../services/office.service";
import { useRoute } from "vue-router";
import { useForm } from "vuestic-ui";
import { useUserStore } from "../stores/user";

const office = new Office();
const { reset } = useForm("formRef");
const newWorkerId = ref<number>(0);
const newWorkplaceId = ref<number>(0);
const route = useRoute();
const showModal = ref(false);
const store = useUserStore();
const workplace = ref<IWorkPlace>();
const workplaceEdit = ref<IWorkPlace>();
const workerEdit = ref<IWorker>();
const props = defineProps<{
  isEdit: boolean;
  isApply: boolean;
  selectedWorkplace: IWorkPlace;
  workerEdit: IWorker;
}>();
const worker = ref<IWorker>({
  workerId: props.workerEdit?.workerId || store.user.workerId,
  name: props.workerEdit?.name || store.user?.name,
  workerRole: props.workerEdit?.workerRole || store.user?.workerRole,
  birthday: props.workerEdit?.birthday || store.user?.birthday,
  accessCode: props.workerEdit?.accessCode || store.user?.accessCode,
});
workplace.value = {
  workPlaceId: props.selectedWorkplace?.workPlaceId,
  workerId: worker.value.workerId,
  equipment: props.selectedWorkplace?.equipment,
  officeWork: props.selectedWorkplace?.officeWork,
  schedule: props.selectedWorkplace?.schedule,
};

const { validate } = useForm("formRef");
const workerList = ref();
const userRoles = [
  { value: "admin", text: "Администратор" },
  { value: "worker", text: "Работник" },
];
const validateBirthday = (value: Date | null) => {
  if (!value) {
    return "Необходимо выбрать";
  }
  // const today = new Date();
  // let yearDiff = today.getFullYear() - value.getFullYear();
  // const monthDiff = today.getMonth() - value.getMonth();

  // if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate())) {
  //   yearDiff--;
  // }

  // return yearDiff >= 18 || "You must be at least 18 years old";
};
const emits = defineEmits<{
  (e: "ok"): void;
}>();

// worker.value = {
//   workerId: workerList.value.id || newWorkerId.value,
//   name: workerList.value.name || "",
//   workerRole: props.workerEdit.workerRole || "",
//   birthday: new Date(),
//   accessCode: props.workerEdit.accessCode,
// };

// workplace.value = {
//   workPlaceId: props.selectedWorkplace.workPlaceId || newWorkplaceId.value,
//   workerId: workerList.value.id || newWorkerId.value,
//   equipment: props.selectedWorkplace.equipment || "",
//   officeWork: props.selectedWorkplace.officeWork || false,
//   schedule: props.selectedWorkplace.schedule || "",
//   status: props.selectedWorkplace.status || false,
// };

const okButtonClick = async () => {
  showModal.value = false;

  if (worker.value && workplace.value) {
    worker.value.workerId = newWorkerId.value;
    workplace.value.workPlaceId = newWorkplaceId.value;
    workplace.value.workerId = newWorkerId.value;
    office.createNewWorkplace(worker.value, workplace.value, +route.params.id);
    // await console.log(workplace.value, worker.value);
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
    schedule: "",
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
  workerList.value = await office.getWorkersForSelect();

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
