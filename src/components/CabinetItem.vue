<template>
  <div class="cabinet-item">
    <WorkplaceItem v-for="cab in props.offices" :key="cab.officeId" />
  </div>
</template>

<script lang="ts" setup>
import WorkplaceItem from "./WorkplaceItem.vue";
import { OFFICE } from "@/components/constants/workplace.const";
import { ref } from "vue";
import { IOffice } from "./models/office.model";
const props = defineProps<{
  offices: Array<IOffice>;
}>();
// console.log(props.offices);

// const office = ref<Array<IOffice>>(OFFICE);
</script>
