<template>
  <Modal :show="showModalOffice">
    <template #header>
      <h3>Добавление кабинетов</h3>
    </template>

    <template #body>
      <VaForm ref="formRef" class="flex flex-col items-baseline gap-6">
        <VaInput
          v-model="officeCount"
          :rules="[
            (value) => (value && value.length > 0) || 'Обязательное поле',
          ]"
          label="Количество кабинетов"
          type="number"
        />
        <VaInput
          v-model="maxWorkplaces"
          :rules="[
            (value) => (value && value.length > 0) || 'Обязательное поле',
          ]"
          label="Максимальное количество рабочих мест"
          type="number"
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
import { computed, onBeforeMount, onBeforeUnmount, ref } from "vue";

import { IWorkPlace } from "../models/office.model";
import { Office } from "../services/office.service";
import { useRoute } from "vue-router";
import { useForm } from "vuestic-ui";
import { useUserStore } from "../stores/user";
const officeCount = ref();
const maxWorkplaces = ref();

const office = new Office();

const showModalOffice = ref(false);

const props = defineProps<{}>();
const emit = defineEmits(["ok"]);
const { validate } = useForm("formRef");

const okButtonClick = async () => {
  await office.createNewOffices(officeCount.value, +maxWorkplaces.value);
};

function clearForm() {
  (officeCount.value = 0), (maxWorkplaces.value = 0);
}

const handleSaveClick = async () => {
  if (await validate()) {
    await okButtonClick();
    emit("ok");
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
