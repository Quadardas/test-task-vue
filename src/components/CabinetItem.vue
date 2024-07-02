<template>
  <div class="cabinet-item">
    <WorkplaceItem
      v-for="work in workplaces"
      :key="work.workPlaceId"
      :workplace="work"
      @click="editWorkplace"
    />
    <VaButton
      v-if="props.office.officeId === +route.params.id"
      class="new-workplace"
      @click="openWorkplace"
      icon="add"
      color="#DEE5F2"
      icon-color="#154EC1"
    />
    <Modal
      :show="showModal"
      :modal-component="WorkplaceModal"
      @close="showModal = false"
      @ok="showModal = false"
    >
      <template #body> <WorkplaceModal :workplaces="workplaces" /> </template
    ></Modal>
  </div>
</template>

<script lang="ts" setup>
import WorkplaceItem from "./WorkplaceItem.vue";
import { onBeforeMount, ref } from "vue";
import { IOffice, IWorkPlace } from "./models/office.model";
import router from "@/router";
import WorkplaceModal from "@/components/modals/WorkplaceModal.vue";
import { useRoute } from "vue-router";

const showModal = ref(false);

const route = useRoute();
const props = defineProps<{
  workplaces: Array<IWorkPlace>;
  office: IOffice;
}>();

const openWorkplace = () => {
  showModal.value = true;
  console.log(showModal.value);
};
const editWorkplace = () => {
  showModal.value = true;
};
</script>

<style lang="scss">
.cabinet-item {
  margin: 20px;
  display: flex;
  gap: 30px;
  border: 1px solid black;
  padding: 10px;
}
</style>
