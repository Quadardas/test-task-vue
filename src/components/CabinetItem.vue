<template>
  <div class="cabinet-item">
    <WorkplaceItem
      v-for="work in props.workplaces"
      :key="work.workPlaceId"
      :workplace="work"
    />
    aboba
  </div>
</template>

<script lang="ts" setup>
import WorkplaceItem from "./WorkplaceItem.vue";
import { ref } from "vue";
import { IOffice, IWorkPlace } from "./models/office.model";

const props = defineProps<{
  offices: Array<IOffice>;
  workplaces: Array<IWorkPlace>;
}>();
console.log(props.workplaces);

// const office = ref<Array<IOffice>>(OFFICE);
</script>
