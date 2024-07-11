<template>
  <div class="cabinet-item">
    <div v-if="!workplaces.length" class="office-placeholder">
      Тут пока пусто, но можно создать новые рабочие места, нажав на кабинет
    </div>
    <WorkplaceItem
      v-for="work in workplaces"
      :key="work.workPlaceId"
      disable-button
      :showDetails="!!route.params.id"
      :workplace="work"
    />
    <VaButton
      v-if="
        props.office.officeId === +route.params.id &&
        workplaces.length != office.maxWorkplaces &&
        store.isAdmin
      "
      class="new-workplace"
      @click="newWorkplace"
      icon="add"
      color="#DEE5F2"
      icon-color="#154EC1"
    />
    <WorkplaceModal
      :show="showModal"
      :isEdit="isEdit"
      :selected-workplace="selectedWorkplace"
      @close="showModal = false"
      @ok="showModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
import WorkplaceItem from "./WorkplaceItem.vue";
import { onBeforeMount, ref } from "vue";
import { IOffice, IWorkPlace } from "./models/office.model";
import router from "@/router";
import WorkplaceModal from "@/components/modals/WorkplaceModal.vue";
import { useUserStore } from "./stores/user";
import { useRoute } from "vue-router";
import { Office } from "./services/office.service";

const showModal = ref(false);
const isEdit = ref(false);
const officeService = new Office();
const selectedWorkplace = ref();
const store = useUserStore();

const route = useRoute();
const props = defineProps<{
  workplaces: Array<IWorkPlace>;
  office: IOffice;
}>();

const emit = defineEmits(["status-updated"]);
const newWorkplace = async () => {
  officeService.createNewWorkplace(
    null,
    {
      workPlaceId: await officeService.getNewWorkplaceId(),
      workerId: null,
      equipment: null,
      officeWork: null,
      schedule: null,
    },
    props.office.officeId
  );
  emit("status-updated");
};
</script>

<style lang="scss">
.cabinet-item {
  min-height: 70px;
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  border: 1px solid black;
  padding: 10px;
}
</style>
