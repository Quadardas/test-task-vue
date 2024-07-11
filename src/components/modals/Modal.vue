<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-container">
          <VaButton
            class="modal-container__close close"
            @click="$emit('close')"
            preset="secondary"
            hover-behavior="opacity"
            :hover-opacity="0.4"
          >
            Закрыть
          </VaButton>
          <div>
            <div class="modal-header">
              <slot name="header">default header</slot>
            </div>
            <component
              v-if="modalComponent"
              :is="modalComponent"
              v-model="componentModelValue"
              v-bind="componentProps"
              @update="onCustomEvent"
            />
            <div v-else class="modal-body">
              <slot name="body">default body</slot>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button
                v-if="!hideOkButton"
                class="modal-default-button"
                @click="$emit('ok', componentModelValue)"
              >
                {{ okButtonText }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { Component, ref } from "vue";
withDefaults(
  defineProps<{
    show: boolean;
    okButtonText: string;
    modalComponent?: Component;
    hideOkButton?: boolean;
    componentProps?: any;
  }>(),
  {
    okButtonText: "Сохранить",
  }
);

const emits = defineEmits<{
  (e: "close"): void;
  (e: "ok", value: null | any): void;
  (e: "update"): void;
}>();

const componentModelValue = ref();

function onCustomEvent() {
  emits("update");
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  height: fit-content;
  width: 50%;
  max-width: 100%;
  min-width: 500px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__close {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.modal-header h3 {
  margin-top: 0;
  color: #333;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
}
.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
