<script setup lang="ts">
import { World, Model, ThirdPersonCamera, Dummy, Find, Setup, types, keyboard } from "lingo3d-vue"
import { ref } from "vue"
import useColyseus from "./hooks/useColyseus"

const dummyRef = ref<types.Dummy>()

const dummyProxies = useColyseus(dummyRef)

keyboard.onKeyPress = (_, pressed) => {
  const dummy = dummyRef.value
  if (!dummy) return

  if (pressed.has("w"))
    dummy.strideForward = -10
  if (pressed.has("s"))
    dummy.strideForward = 10

  if (pressed.has("a"))
    dummy.strideRight = 10
  if (pressed.has("d"))
    dummy.strideRight = -10
}

keyboard.onKeyDown = (key) => {
  const dummy = dummyRef.value
  if (!dummy) return

  if (key === "Space")
    dummy.jump(10)
}

keyboard.onKeyUp = (_, pressed) => {
  const dummy = dummyRef.value
  if (!dummy) return

  if (!pressed.has("w") && !pressed.has("s"))
    dummy.strideForward = 0

  if (!pressed.has("a") && !pressed.has("d"))
    dummy.strideRight = 0
}

</script>

<template>
  <World>
    <Model
      :metalness-factor="1"
      :roughness-factor="0.35"
      pbr
      :x="9.05"
      :y="34.18"
      :z="28.5"
      :width="121.25"
      :depth="84.17"
      :scale-x="150"
      :scale-y="150"
      :scale-z="150"
      src="map.glb"
      physics="map"
    />
    <Dummy
      v-for="(dummyProxy, sessionId) in dummyProxies"
      :key="sessionId"
      :proxy="dummyProxy"
      preset="rifle"
    />
    <ThirdPersonCamera
      :x="1179.8"
      :y="-575.03"
      :z="1820.55"
      :rotation-x="-180"
      :rotation-z="-180"
      :rotation="-180"
      :inner-z="150"
      mouse-control-mode="orbit"
      mouse-control
      active
      :inner-x="20"
    >
      <Dummy
        :animations='{"idle":"https://unpkg.com/lingo3d-dummy@1.0.1/assets/rifle-idle.fbx","running":"https://unpkg.com/lingo3d-dummy@1.0.1/assets/rifle-running.fbx","runningBackwards":"https://unpkg.com/lingo3d-dummy@1.0.1/assets/rifle-running-backwards.fbx","jumping":"https://unpkg.com/lingo3d-dummy@1.0.1/assets/rifle-falling.fbx"}'
        animation="idle"
        pbr
        :x="1179.8"
        :y="-575.03"
        :z="1820.55"
        :width="20"
        :depth="20"
        src="https://unpkg.com/lingo3d-dummy@1.0.1/assets/ybot.fbx"
        preset="rifle"
        ref="dummyRef"
        stride-move
        physics="character"
      >
        <Find name="mixamorigRightHand" :normal-scale='{"x":1,"y":1}'>
          <Model
            :x="-2755.01"
            :y="-341.89"
            :z="-161.27"
            :width="26.63"
            :depth="277.87"
            :scale-x="36.09"
            :scale-y="36.09"
            :scale-z="36.09"
            :rotation-x="-160.36"
            :rotation-y="-83.77"
            :rotation-z="103.89"
            :rotation="103.89"
            src="gun.glb"
          />
        </Find>
      </Dummy>
    </ThirdPersonCamera>
    <Setup default-light="studio" default-orbit-controls />
  </World>
</template>