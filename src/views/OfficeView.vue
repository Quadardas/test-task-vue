<template>
  <div>
    <OfficeItem v-if="office" :office="office" />
  </div>
</template>

<script lang="ts" setup>
import OfficeItem from "@/components/OfficeItem.vue";
import { useRoute } from "vue-router";
import { IOffice } from "@/components/models/office.model";
import { Office } from "@/components/services/office.service";
import { onBeforeMount, ref } from "vue";

const office = ref<IOffice>();
const officeService = new Office();

const route = useRoute();

onBeforeMount(async () => {
  office.value = await officeService.getOneOffice(+route.params.id);
});
</script>
