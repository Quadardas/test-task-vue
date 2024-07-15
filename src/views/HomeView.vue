<template>
  <div class="container">
    <OfficeItem
      v-for="office in offices"
      :key="office?.officeId"
      :office="office"
      @click="openOffice(office?.officeId)"
    />
    <VaButton
      v-if="store.isAdmin"
      class="new-workplace"
      @click="newOffice"
      icon="add"
      color="#DEE5F2"
      icon-color="#154EC1"
    />
    <OfficeModal
      :show="showModal"
      @close="showModal = false"
      @ok="handleSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import OfficeItem from "@/components/OfficeItem.vue";
import { Office } from "@/components/services/office.service";
import router from "@/router";
import { onBeforeMount, ref } from "vue";
import { format, compareAsc } from "date-fns";
import OfficeModal from "../components/modals/OfficeModal.vue";

import { useUserStore } from "@/components/stores/user";
import { IOffice } from "@/components/models/office.model";
const store = useUserStore();
const showModal = ref(false);
const offices = ref<Array<IOffice>>();

const openOffice = (id: number) => {
  router.push(`/office/${id}`);
};
const officeService = new Office();

const newOffice = () => {
  showModal.value = true;
};

const handleSubmit = () => {
  showModal.value = false;
  updateOffices();
};
const updateOffices = async () => {
  const fetchedOffices = await officeService.getOffices();
  offices.value = fetchedOffices;

  if (!fetchedOffices || (fetchedOffices.length === 0 && store.isAdmin)) {
    newOffice();
  }
};

onBeforeMount(() => {
  updateOffices();
});
</script>

<style lang="scss">
img {
  width: 700px;
  height: 500px;
}
</style>
