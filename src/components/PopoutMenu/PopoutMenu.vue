<!-- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menu_role -->
<script setup lang="ts">
import { reactive, ref } from "vue";
const props = defineProps<{
  list: [];
  label: string;
}>();
// https://vuejs.org/guide/essentials/component-basics.html#listening-to-events
// Similar to defineProps, defineEmits is only usable in <script setup> and doesn't need to be imported. It returns an emit function that is equivalent to the $emit method. It can be used to emit events in the <script setup> section of a component, where $emit isn't directly accessible:
const emit = defineEmits<{
  (e: "update", value: string): void;
}>();
const state = reactive({ isMenuOpen: false, focusedMenuItem: 1 });
const popUpMenu = ref<HTMLElement | null>(null);
const button = ref<HTMLElement | null>(null);

// TODO. If a click is detected anywhere else, close the menu

function toggleMenu() {
  state.isMenuOpen ? closePopup() : openMenu();
}
function openMenu() {
  state.isMenuOpen = true;
  if (popUpMenu.value) {
    popUpMenu.value.style.display = "block";
  }
  state.focusedMenuItem = 1;
  setFocusToPopup();
}

function closePopup() {
  state.isMenuOpen = false;
  if (popUpMenu.value) {
    popUpMenu.value.style.display = "none";
  }
  state.focusedMenuItem = 1;
  setFocusToButton();
}

function setFocusToPopup() {
  if (popUpMenu.value) {
    popUpMenu.value.focus();
  }
}

function setFocusToButton() {
  if (button.value) {
    button.value.focus();
  }
}

function focusNextItem() {
  if (popUpMenu.value) {
    const children = popUpMenu.value?.children;
    children.item(state.focusedMenuItem - 1)?.focus();

    if (state.focusedMenuItem < children.length) {
      state.focusedMenuItem += 1;
    } else {
      state.focusedMenuItem = 1;
    }
  }
}

function handleMove(event: Event) {
  console.log("handleMove", event);
  if (event.target) {
    emit("update", event.target.value);
  }
  closePopup();
}
</script>

<template>
  <button
    ref="button"
    @click="toggleMenu"
    aria-haspopup="true"
    :aria-expanded="state.isMenuOpen"
    :aria-controls="props.label"
    :aria-label="props.label"
    tabindex="0"
    @keydown.down="openMenu"
  >
    {{ props.label }}
  </button>
  <ul
    data-testid="popupmenu"
    @keydown.esc="closePopup"
    @keydown.down="focusNextItem"
    aria-label="menu"
    ref="popUpMenu"
    :id="props.label"
    role="menu"
    tabindex="-1"
    :style="{
      display: 'none',
      position: 'absolute',
      top: '20px',
      zIndex: 1,
      background: 'black',
    }"
  >
    <li
      @click="handleMove"
      role="menuitem"
      tabindex="-1"
      v-for="item in props.list"
      :key="item"
    >
      {{ item }}
    </li>
  </ul>
</template>

<style scoped>
ul:focus {
  border: 2px solid red;
}

ul {
  list-style: none;
  padding: 0;
  color: orange;
}

li:hover {
  background-color: pink;
}
</style>
