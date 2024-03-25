<template>
  <h1>Index page (public)</h1>

  <input placeholder="username" v-model="username" /> <input type="password" placeholder="password"
    v-model="password" /><br /><br />
  <button @click="login">Login</button>
</template>

<script lang="ts" setup>

const username = ref("")
const password = ref("")

async function login() {
  const { authId } = await $fetch("/api/authorize") // Could (and probably should) be merged into the login endpoint
  const session = await $fetch("/api/login", {
    method: "POST",
    body: {
      username: username.value,
      password: password.value,
      authRequestId: authId
    }
  })
}

</script>
