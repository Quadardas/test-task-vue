<template>
  <Modal :show="showModal" @close="closeModal" @ok="okButtonClick">
    <template #header>
      <h3>Заявка на рабочее место</h3>
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
          v-model="worker.workerRole"
          :options="userRoles"
          :rules="[(v) => v || 'Обязательное поле']"
          label="Роль сотрудника"
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
        <!-- <VaSelect
            v-model="workplace.officeWork"
            :options="userRoles"
            :rules="[(v) => v || 'Field is required']"
            label="Роль сотрудника"
          /> -->

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
import { onBeforeMount, ref } from "vue";
import { IWorker } from "../models/worker.model";
import { IWorkPlace } from "../models/office.model";
import { Office } from "../services/office.service";
import { useRoute } from "vue-router";
import { useForm } from "vuestic-ui";

const office = new Office();
const newWorkerId = ref<number>(0);
const newWorkplaceId = ref<number>(0);
const route = useRoute();
const showModal = ref(false);
const worker = ref<IWorker>();
const workplace = ref<IWorkPlace>();

const { isValid, validate, reset, resetValidation } = useForm("formRef");
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
  status: false,
};

const okButtonClick = async () => {
  console.log(showModal.value);

  showModal.value = false;
  console.log(showModal.value);

  if (worker.value && workplace.value) {
    worker.value.workerId = newWorkerId.value;
    workplace.value.workPlaceId = newWorkplaceId.value;
    workplace.value.workerId = newWorkerId.value;
    // office.createNewWorkplace(worker.value, workplace.value, +route.params.id);
    console.log(workplace.value, worker.value);
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
    status: false,
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
