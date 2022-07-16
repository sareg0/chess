<script setup lang="ts">
import { reactive, ref } from "vue";
const props = defineProps<{
  background: "light" | "dark";
  position: string;
  possibleMoves: number[]; //if replaying a game, you don't need to know where to go next
}>();
const state = reactive({ showPopup: false });
const popUpMenu = ref<HTMLElement | null>(null);
const button = ref<HTMLElement | null>(null);
function handleOpenMenu(event: Event) {
  event.preventDefault();
  console.log("handleOpenMenu", props.position, event);
  console.log("possible moves", props.possibleMoves, event);

  state.showPopup ? closePopup() : showPopup();
  // TODO: make sure only one popout menu can be shown at a time

  // const ariaLabel = computed(() => {
  //   return props.position;
  // });
}
function showPopup() {
  state.showPopup = true;
  setFocusToPopup();
}

function closePopup() {
  state.showPopup = false;
  if (popUpMenu.value) {
    popUpMenu.value.style.display = "none";
  }
}

function setFocusToPopup() {
  if (popUpMenu.value) {
    console.log("setFocusToPopup", popUpMenu.value);
    // eslint-disable-next-line no-debugger
    popUpMenu.value.style.display = "block";
    popUpMenu.value.tabIndex = 0;
    toggleButtonFocus();
    popUpMenu.value.focus();
  }
}

function toggleButtonFocus() {
  if (button.value) {
    button.value.tabIndex = -1;
  }
}

function handleMove(event: Event) {
  console.log("handleMove", event.target);
  state.showPopup = false;
}
</script>

<template>
  <b :data-testid="position" class="cell" :class="background">
    <div class="menu-popup" :style="{ position: 'relative' }">
      <template v-if="props.possibleMoves">
        <button
          ref="button"
          @click="handleOpenMenu"
          aria-haspopup="true"
          :aria-expanded="state.showPopup"
          :aria-controls="props.position"
          :aria-label="'Position:' + props.position"
          tabindex="0"
        >
          move
        </button>
        <ul
          aria-label="Possible moves"
          ref="popUpMenu"
          :id="props.position"
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
            v-for="move in props.possibleMoves"
            role="menuitem"
            tabindex="-1"
            :key="move"
            @click="handleMove"
          >
            {{ move }}
          </li>
        </ul>
      </template>
    </div>
    {{ position }}
  </b>
</template>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

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

.light {
  background-color: whitesmoke;
  color: black;
}

.dark {
  background-color: darkblue;
  color: white;
}
</style>
