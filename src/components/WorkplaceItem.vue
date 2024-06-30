<template>
  <div
    class="workplace-item"
    v-for="work in workplaces"
    :key="work.workPlaceId"
  >
    <div class="wokrpalce--id">{{ work.workPlaceId }}</div>
    <div class="workplace--worker">{{ work.workerId }}</div>
  </div>
</template>
<script lang="ts" setup>
import { IOffice, IWorkPlace } from "./models/office.model";
import { Office } from "./services/office.service";
const props = defineProps<{
  workplaces: Array<IWorkPlace>;
}>();
console.log(props.workplaces);
</script>
