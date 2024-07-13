<template>
  <div v-if="store.isAdmin" class="container-admin">
    <div class="worker-list">
      <p>Список работников</p>
      <WorkerItem
        v-for="worker in workers"
        :key="worker.workerId"
        :worker="worker"
        @status-updated="updateWorkers"
      />
      <VaButton @click="addWorker">Добавить</VaButton>
      <WorkerCreate
        :show="showModalWorker"
        @close="showModalWorker = false"
        @ok="showModalWorker = false && updateWorkers"
      />
    </div>
    <div class="workplace-list">
      <p>Список рабочих мест</p>
      <WorkplaceItem
        v-for="work in workplaces"
        :key="work.workPlaceId"
        :workplace="work"
        :showDetails="true"
        @click="editWorkplace(work)"
        @status-updated="updateWorkplaces"
      />
    </div>
    <div class="request-list">
      <p>Заявки</p>
      <WorkplaceItem
        v-for="workplace in requestWorkplaces"
        :key="workplace.workPlaceId"
        :workplace="workplace"
        approvable
        :showDetails="true"
        @status-updated="updateWorkplaces"
      />
    </div>
    <!-- <WorkplaceModal
      :show="showModal"
      :isEdit="isEdit"
      :workplace="selectedWorkplace"
      @close="showModal = false"
      @ok="showModal = false"
    /> -->
    <WorkplaceEditModal
      v-if="showEditModal"
      :show="showEditModal"
      :isEdit="isEdit"
      :workplaceEdit="selectedWorkplace"
      @close="showEditModal = false"
      @ok="showEditModal = false && updateWorkplaces"
    />
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { IWorker } from "../components/models/worker.model";
import { Office } from "../components/services/office.service";
import WorkerItem from "../components/WorkerItem.vue";
import WorkplaceItem from "../components/WorkplaceItem.vue";
import { IWorkPlace } from "@/components/models/office.model";
import WorkplaceModal from "@/components/modals/WorkplaceModal.vue";
import WorkplaceEditModal from "@/components/modals/WorkplaceEditModal.vue";
import WorkerCreate from "../components/modals/WorkerCreate.vue";
import { useUserStore } from "../components/stores/user";
const office = new Office();
const workers = ref<Array<IWorker>>();
const workplaces = ref<Array<IWorkPlace>>();
const requestWorkplaces = ref<Array<IWorkPlace>>();
const store = useUserStore();
const showModalWorker = ref(false);
const showModal = ref(false);
const showEditModal = ref(false);
const isEdit = ref(false);
const selectedWorkplace = ref();

const editWorkplace = (work: IWorkPlace) => {
  selectedWorkplace.value = work;
  isEdit.value = true;
  showEditModal.value = true;
  // console.log(selectedWorkplace.value, "aboba");
};
const updateWorkplaces = async () => {
  workplaces.value = await office.getAllWorkPlaces();
  requestWorkplaces.value = await office.getRequestWorkplace();
};
const updateWorkers = async () => {
  workers.value = await office.getAllWorkers();
};
function addWorker() {
  showModalWorker.value = true;
}
onBeforeMount(async () => {
  workers.value = await office.getAllWorkers();
  workplaces.value = await office.getAllWorkPlaces();
  requestWorkplaces.value = await office.getRequestWorkplace();

  // console.log(requestWorkplaces.value, "Заявки");
});
</script>
<style lang="scss">
.container-admin {
  display: flex;
  flex-wrap: wrap;
  .worker-list {
    width: 50%;
  }
  .workplace-list {
    width: 50%;
  }
  .request-list {
    width: 50%;
  }
}
</style>
