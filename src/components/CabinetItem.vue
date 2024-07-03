<template>
  <div class="cabinet-item">
    <WorkplaceItem
      v-for="work in workplaces"
      :key="work.workPlaceId"
      :workplace="work"
      @click="editWorkplace(work)"
    />
    <VaButton
      v-if="props.office.officeId === +route.params.id"
      class="new-workplace"
      @click="newWorkplace"
      icon="add"
      color="#DEE5F2"
      icon-color="#154EC1"
    />
    <WorkplaceModal
      :show="showModal"
      :isEdit="isEdit"
      :component-props="{
        workplace: selectedWorkplace,
      }"
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

import { useRoute } from "vue-router";

const showModal = ref(false);
const isEdit = ref(false);
const selectedWorkplace = ref();

const route = useRoute();
const props = defineProps<{
  workplaces: Array<IWorkPlace>;
  office: IOffice;
}>();

const newWorkplace = () => {
  isEdit.value = false;
  showModal.value = true;
};
const editWorkplace = (work: IWorkPlace) => {
  selectedWorkplace.value = work;
  isEdit.value = true;
  showModal.value = true;
  console.log(selectedWorkplace.value);
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
