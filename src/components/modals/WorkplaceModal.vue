<template>
  <Modal :show="showModal" @close="closeModal" @ok="okButtonClick">
    <template #header>
      <h3>Заявка на рабочее место</h3>
    </template>

    <template #body>
      <div>
        <p>ФИО сотрудника: <input type="text" v-model="worker.name" /></p>
        <p>
          Роль сотрудника:
          <select name="" id="" v-model="worker.workerRole">
            <option value="aboba">asdasd</option>
          </select>
        </p>
        <p>
          Дата рождения сотрудника:
          <input type="date" name="" id="" v-model="worker.birthday" />
        </p>
        <p>
          Оборудование на этом рабочем месте:
          <input type="text" name="" id="" v-model="workplace.equipment" />
        </p>
        <p>
          Статус:
          <select name="" id="" v-model="workplace.officeWork">
            <option value="true">В офисе</option>
            <option value="false">Удаленная работа</option>
          </select>
        </p>
        <p>
          Примерный режим работы:
          <input type="text" name="" id="" v-model="workplace.schedule" />
        </p>
      </div>
    </template>

    <template #footer>
      <button class="modal-default-button" @click="okButtonClick">
        Закрыть
      </button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from "@/components/modals/Modal.vue";
import { onBeforeMount, ref } from "vue";
import { IWorker } from "../models/worker.model";
import { IWorkPlace } from "../models/office.model";
import { Office } from "../services/office.service";

const office = new Office();
const lastWorkerId = ref<number>();
const newWorkerId = ref<number>();
const lastWorkpalceId = ref<number>();
const newWorkplaceId = ref<number>();

const showModal = ref(false);

const worker = ref<IWorker | null>(null);
const workplace = ref<IWorkPlace | null>(null);

const okButtonClick = () => {
  console.log("Worker:", worker.value);
  console.log("Workplace:", workplace.value);
  showModal.value = false;
};
// это нужно переделать полностью
onBeforeMount(async () => {
  try {
    lastWorkerId.value = await office.getLastWorkerId();
    lastWorkpalceId.value = await office.getLastWorkplaceId();
    if (
      lastWorkerId.value !== undefined &&
      lastWorkpalceId.value !== undefined
    ) {
      newWorkerId.value = lastWorkerId.value + 1;
      newWorkplaceId.value = lastWorkerId.value + 1;
    } else {
      newWorkerId.value = 0;
      newWorkerId.value = 0;
    }

    console.log(newWorkerId.value);

    worker.value = {
      workerId: newWorkerId.value,
      name: "",
      workerRole: "",
      birthday: new Date(),
    };

    workplace.value = {
      workPlaceId: 5,
      workerId: newWorkerId.value,
      equipment: "",
      officeWork: true,
      schedule: "",
      status: false,
    };
  } catch (error) {
    console.error("Failed to fetch last worker Id:", error);
  }
});
</script>
