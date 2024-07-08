<template>
  <div class="container">
    <OfficeItem
      v-for="office in officeService.getOffices"
      :key="office?.officeId"
      :office="office"
      @click="openOffice(office?.officeId)"
    />
  </div>
</template>

<script lang="ts" setup>
import OfficeItem from "@/components/OfficeItem.vue";
import { Office } from "@/components/services/office.service";
import router from "@/router";
import { onBeforeMount, ref } from "vue";

const openOffice = (id: number) => {
  router.push(`/office/${id}`);
};

const officeService = new Office();

// const aboba = [
//   {
//     officeId: 1,
//     workplacesId: [1, 2, 5],
//     maxWorkplaces: 6,
//   },
//   {
//     officeId: 2,
//     workplacesId: [3, 4],
//     maxWorkplaces: 3,
//   },
// ];
// const aboba1 = [
//   {
//     workPlaceId: 1,
//     workerId: 1,
//     equipment: "КАМПУКТЕР",
//     officeWork: true,
//     schedule: "всегда",
//     status: true,
//   },
//   {
//     workPlaceId: 2,
//     workerId: 2,
//     equipment: "НЕТ КАМПУКТЕРА",
//     officeWork: true,
//     schedule: "по субботам",
//     status: true,
//   },
//   {
//     workPlaceId: 3,
//     workerId: 3,
//     equipment: "2 КАМПУКТЕРА",
//     officeWork: true,
//     schedule: "всегда",
//     status: true,
//   },
//   {
//     workPlaceId: 4,
//     workerId: 4,
//     equipment: "3 КАМПУКТЕРА",
//     officeWork: true,
//     schedule: "по субботам",
//     status: true,
//   },
//   {
//     workPlaceId: 5,
//     workerId: 5,
//     equipment: "4 КАМПУКТЕРА",
//     officeWork: true,
//     schedule: "никогда",
//     status: false,
//   },
// ];

// const aboba2 = [
//   {
//     workerId: 1,
//     name: "Александр",
//     workerRole: "admin",
//     birthday: new Date(),
//     accessCode: 123456,
//   },
//   {
//     workerId: 2,
//     name: "ВИКТОР",
//     workerRole: "worker",
//     birthday: new Date(),
//     accessCode: 234567,
//   },
//   {
//     workerId: 3,
//     name: "НИКИТА",
//     workerRole: "worker",
//     birthday: new Date(),
//     accessCode: 345678,
//   },
//   {
//     workerId: 4,
//     name: "АБОБА",
//     workerRole: "worker",
//     birthday: new Date(),
//     accessCode: 456789,
//   },
//   {
//     workerId: 5,
//     name: "ЖИЖА",
//     workerRole: "worker",
//     birthday: new Date(),
//     accessCode: 567890,
//   },
// ];

// onBeforeMount(() => {
//   localStorage.setItem("office", JSON.stringify(aboba));
//   localStorage.setItem("workplaces", JSON.stringify(aboba1));
//   localStorage.setItem("workers", JSON.stringify(aboba2));
// });
</script>

<style lang="scss">
img {
  width: 700px;
  height: 500px;
}
</style>
