<template>
  <Modal :show="show" @close="$emit('close')" @ok="handleSaveClick">
    <template #header>
      <h3>Редактирование рабочего места</h3>
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
      <VaButton @click="handleSaveClick">Сохранить</VaButton>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { IWorker } from "../models/worker.model";
import { IWorkPlace } from "../models/office.model";
import { Office } from "../services/office.service";
import { useForm } from "vuestic-ui";

const office = new Office();
const props = defineProps<{
  show: boolean;
  workplace: IWorkPlace;
}>();
const emits = defineEmits(["close", "ok"]);

const worker = ref<IWorker>({});
const { validate, reset } = useForm("formRef");

const userRoles = [
  { value: "admin", text: "Администратор" },
  { value: "worker", text: "Работник" },
];

const validateBirthday = (value: Date | null) => {
  if (!value) {
    return "Необходимо выбрать";
  }
};

const handleSaveClick = async () => {
  if (await validate()) {
    // Emit the ok event with the updated workplace data
    emits("ok", props.workplace.value);
    // Reset the form after saving
    reset();
  }
};

onBeforeMount(async () => {
  // Initialize worker and workplace data
  worker.value = {
    workerId: props.workplace.workerId,
    name: props.workplace.name,
    workerRole: props.workplace.workerRole,
    birthday: props.workplace.birthday,
  };
});
</script>

<style scoped>
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
