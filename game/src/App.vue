<script setup lang="ts">
import {
  World,
  Model,
  ThirdPersonCamera,
  Dummy,
  Find,
  Setup,
  types,
  keyboard,
} from "lingo3d-vue";
import { ref } from "vue";
import useColyseus from "./hooks/useColyseus";

const dummyRef = ref<types.Dummy>();

const dummyProxies = useColyseus(dummyRef);

keyboard.onKeyPress = (_, pressed) => {
  const dummy = dummyRef.value;
  if (!dummy) return;

  if (pressed.has("w")) dummy.strideForward = -10;
  if (pressed.has("s")) dummy.strideForward = 10;

  if (pressed.has("a")) dummy.strideRight = 10;
  if (pressed.has("d")) dummy.strideRight = -10;
};

keyboard.onKeyDown = (key) => {
  const dummy = dummyRef.value;
  if (!dummy) return;

  if (key === "Space") dummy.jump(10);
};

keyboard.onKeyUp = (_, pressed) => {
  const dummy = dummyRef.value;
  if (!dummy) return;

  if (!pressed.has("w") && !pressed.has("s")) dummy.strideForward = 0;

  if (!pressed.has("a") && !pressed.has("d")) dummy.strideRight = 0;
};
</script>

<template>
  <World>
    <Model
      :metalness-factor="2"
      :roughness-factor="0.3"
      :scale="200"
      src="map.glb"
      physics="map"
    />
    <Dummy
      v-for="(dummyProxy, sessionId) in dummyProxies"
      :key="sessionId"
      :proxy="dummyProxy"
      preset="rifle"
    />
    <ThirdPersonCamera mouse-control active :inner-x="20">
      <Dummy
        :x="1179.8"
        :y="-575.03"
        :z="1820.55"
        preset="rifle"
        ref="dummyRef"
        stride-move
        physics="character"
      >
        <Find name="mixamorigRightHand">
          <Model
            :x="-2755.01"
            :y="-341.89"
            :z="-161.27"
            :scale="36.09"
            :rotation-x="-160.36"
            :rotation-y="-83.77"
            :rotation-z="103.89"
            src="gun.glb"
          />
        </Find>
      </Dummy>
    </ThirdPersonCamera>
    <Setup default-light="studio" />
  </World>
</template>
