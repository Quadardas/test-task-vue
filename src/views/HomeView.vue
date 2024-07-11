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

  if (!fetchedOffices || fetchedOffices.length === 0) {
    newOffice();
  }
};

// const aboba = [
//   {
//     officeId: 1,
//     workplacesId: [1, 2, 5, 6],
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
//     schedule: {
//       workStart: "2024-07-11T03:00:00.918Z",
//       workEnd: "2024-07-11T12:00:00.886Z",
//       workDay: [
//         { value: "monday", text: "Понедельник" },
//         { value: "tuesday", text: "Вторник" },
//         { value: "wednesday", text: "Среда" },
//         { value: "thursday", text: "Четверг" },
//       ],
//     },
//   },
//   {
//     workPlaceId: 2,
//     workerId: 2,
//     equipment: "НЕТ КАМПУКТЕРА",
//     officeWork: true,
//     schedule: {
//       workStart: "2024-07-11T03:00:00.918Z",
//       workEnd: "2024-07-11T12:00:00.886Z",
//       workDay: [
//         { value: "monday", text: "Понедельник" },
//         { value: "tuesday", text: "Вторник" },
//         { value: "wednesday", text: "Среда" },
//         { value: "thursday", text: "Четверг" },
//       ],
//     },
//   },
//   {
//     workPlaceId: 3,
//     workerId: 3,
//     equipment: "2 КАМПУКТЕРА",
//     officeWork: true,
//     schedule: {
//       workStart: "2024-07-11T03:00:00.918Z",
//       workEnd: "2024-07-11T12:00:00.886Z",
//       workDay: [
//         { value: "monday", text: "Понедельник" },
//         { value: "tuesday", text: "Вторник" },
//         { value: "wednesday", text: "Среда" },
//         { value: "thursday", text: "Четверг" },
//       ],
//     },
//   },
//   {
//     workPlaceId: 4,
//     workerId: 4,
//     equipment: "3 КАМПУКТЕРА",
//     officeWork: true,
//     schedule: {
//       workStart: "2024-07-11T03:00:00.918Z",
//       workEnd: "2024-07-11T12:00:00.886Z",
//       workDay: [
//         { value: "monday", text: "Понедельник" },
//         { value: "tuesday", text: "Вторник" },
//         { value: "wednesday", text: "Среда" },
//         { value: "thursday", text: "Четверг" },
//       ],
//     },
//   },
//   {
//     workPlaceId: 5,
//     workerId: 5,
//     equipment: "4 КАМПУКТЕРА",
//     officeWork: true,
//     schedule: {
//       workStart: "2024-07-11T03:00:00.918Z",
//       workEnd: "2024-07-11T12:00:00.886Z",
//       workDay: [
//         { value: "monday", text: "Понедельник" },
//         { value: "tuesday", text: "Вторник" },
//         { value: "wednesday", text: "Среда" },
//         { value: "thursday", text: "Четверг" },
//       ],
//     },
//   },
//   {
//     workPlaceId: 6,
//     workerId: null,
//     equipment: "4 КАМПУКТЕРА",
//     officeWork: true,
//     schedule: {},
//   },
// ];

const aboba2 = [
  {
    workerId: 1,
    name: "Александр",
    workerRole: "admin",
    birthday: new Date(1995, 6, 2),
    accessCode: 123456,
  },
  {
    workerId: 2,
    name: "ВИКТОР",
    workerRole: "worker",
    birthday: new Date(1987, 1, 11),
    accessCode: 234567,
  },
  {
    workerId: 3,
    name: "НИКИТА",
    workerRole: "worker",
    birthday: new Date(1989, 6, 10),
    accessCode: 345678,
  },
  {
    workerId: 4,
    name: "АБОБА",
    workerRole: "worker",
    birthday: new Date(1986, 4, 22),
    accessCode: 456789,
  },
  {
    workerId: 5,
    name: "ЖИЖА",
    workerRole: "worker",
    birthday: new Date(1999, 1, 23),
    accessCode: 567890,
  },
];

onBeforeMount(() => {
  updateOffices();
  // localStorage.setItem("office", JSON.stringify(aboba));
  // localStorage.setItem("workplaces", JSON.stringify(aboba1));
  // localStorage.setItem("workers", JSON.stringify(aboba2));
});
</script>

<style lang="scss">
img {
  width: 700px;
  height: 500px;
}
</style>
