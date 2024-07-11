<template>
  <div class="container--office">
    <div class="office--id">Номер кабинета {{ office.officeId }}</div>
    <CabinetItem
      :workplaces="workplaces"
      :office="office"
      @status-updated="updateWorkplaces"
    />
  </div>
</template>

<script lang="ts" setup>
import CabinetItem from "@/components/CabinetItem.vue";
import { IOffice, IWorkPlace } from "@/components/models/office.model";
import { Office } from "@/components/services/office.service";
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "./stores/user";
const workplaces = ref<Array<IWorkPlace>>([]);
const officeService = new Office();

const props = defineProps<{
  office: IOffice;
}>();
const updateWorkplaces = async () => {
  workplaces.value = await officeService.getWorkPlacesInOffice(
    props.office?.officeId
  );
};

onBeforeMount(async () => {
  if (props.office) {
    workplaces.value = await officeService.getWorkPlacesInOffice(
      props.office?.officeId
    );
  }
});
</script>
