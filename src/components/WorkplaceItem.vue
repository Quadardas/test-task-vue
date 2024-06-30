<template>
  <div class="workplace-item">
    <div class="wokrpalce--id">{{ props.workplace.workPlaceId }} aboba1</div>
    <div class="workplace--worker">{{ props.workplace.workerId }}</div>
  </div>
</template>
<script lang="ts" setup>
import { IWorkPlace } from "./models/office.model";
import { Office } from "./services/office.service";
const props = defineProps<{
  workplace: IWorkPlace;
}>();
// console.log(props.workplaces);
</script>
