<template>
  <div class="container">
    <CabinetItem />
  </div>
</template>

<script lang="ts" setup>
import CabinetItem from "@/components/CabinetItem.vue";
import { IWorkPlace } from "@/components/models/office.model";
import { Office } from "@/components/services/office.service";
import { onBeforeMount, ref } from "vue";

const workplaces = ref<Array<IWorkPlace>>([]);
const officeService = new Office();

onBeforeMount(async () => {
  const offices = officeService.getOffices;
  workplaces.value = await officeService.getWorkPlaces(1);
  console.log(offices);
});
// const aboba = [
//   {
//     officeId: 1,
//     workplacesId: [1, 2],
//   },
// ];
// const aboba1 = [
//   {
//     workPlaceId: 1,
//     workerId: 1,
//     equipment: "jija",
//     officeWork: true,
//     schedule: "всегда",
//   },
//   {
//     workPlaceId: 2,
//     workerId: 2,
//     equipment: "jija322",
//     officeWork: true,
//     schedule: "по субботам",
//   },
// ];

// const aboba2 = [
//   {
//     workerId: 1,
//     name: "asdasd",
//     workerRole: "aboba",
//     birthday: new Date(),
//   },
//   {
//     workerId: 2,
//     name: "ahahahah",
//     workerRole: "aboba",
//     birthday: new Date(),
//   },
// ];

// onBeforeMount(() => {
//   localStorage.setItem("office", JSON.stringify(aboba));
//   localStorage.setItem("workplaces", JSON.stringify(aboba1));
//   localStorage.setItem("workers", JSON.stringify(aboba2));
// });
</script>
