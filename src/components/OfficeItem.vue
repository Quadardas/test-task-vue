<template>
  <div class="container--office">
    <div v-if="office" class="office--id">{{ office.officeId }}</div>
    <CabinetItem :workplaces="workplaces" :office="office" />
  </div>
</template>

<script lang="ts" setup>
import CabinetItem from "@/components/CabinetItem.vue";
import { IOffice, IWorkPlace } from "@/components/models/office.model";
import { Office } from "@/components/services/office.service";
import { onBeforeMount, ref } from "vue";

const workplaces = ref<Array<IWorkPlace>>([]);
const officeService = new Office();

const props = defineProps<{
  office: IOffice;
}>();

onBeforeMount(async () => {
  if (props.office) {
    workplaces.value = await officeService.getWorkPlaces(
      props.office?.officeId
    );
  }
});
</script>
