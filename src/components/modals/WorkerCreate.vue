<template>
  <Modal :show="showModal" @ok="okButtonClick">
    <template #header>
      <h3>
        {{ workerEdit ? "Редактирование" : "Создание нового сотрудника" }}
      </h3>
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
        <VaDateInput
          v-model="worker.birthday"
          :rules="[(v) => validateBirthday(v)]"
          label="День рождения"
          manual-input
          clearable
        />
        <VaInput
          v-model="worker.accessCode"
          :rules="[
            (value) => (value && value.length > 0) || 'Обязательное поле',
          ]"
          label="Код доступа"
        />
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
import { useForm, useToast } from "vuestic-ui";
import { EWorkerRoles } from "../enums/workerRole.enum";

const office = new Office();
const { init } = useToast();
const { reset } = useForm("formRef");
const newWorkerId = ref<number>(0);
const newWorkplaceId = ref<number>(0);
const showModal = ref(false);
const worker = ref<IWorker>();

const props = defineProps<{
  workerEdit?: IWorker;
  isNewWorker: boolean;
}>();

const { validate } = useForm("formRef");

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
  workerId: props.workerEdit?.workerId || newWorkerId.value,
  name: props.workerEdit?.name || "",
  workerRole: EWorkerRoles.worker,
  birthday: props.workerEdit?.birthday || new Date(),
  accessCode: props.workerEdit?.accessCode || null,
  isNew: props.isNewWorker,
};

const okButtonClick = async () => {
  if (props.workerEdit) {
    await office.editWorker(worker.value);
  } else {
    worker.value.workerId = await office.getNewWorkerId();
    await office.createNewWorker(worker.value);
    if (props.isNewWorker) {
      init({
        message: "Ваша заявка принята, ожидайте",
        color: "success",
      });
    }
  }
};

function clearForm() {
  worker.value = {
    workerId: null,
    name: "",
    workerRole: "",
    birthday: new Date(),
  };
}
const handleSaveClick = async () => {
  if (await validate()) {
    await okButtonClick();
    emits("ok");
    clearForm();
  }
};
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
