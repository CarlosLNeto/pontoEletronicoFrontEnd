<template>
  <q-page class="flex flex-center" style="background-color: #1E88E5;">
    <div class="q-pa-md q-gutter-md flex-column items-center" style="background-color: #FFFFFF; border-radius: 10px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">
      <h2 class="text-center" style="color: #1E88E5; margin-bottom: 2rem;">Ponto Eletrônico TJAM</h2>
      <div class="flex justify-center">
        <q-btn color="secondary" label="Cadastrar" class="menu-btn" @click="cadastrar"/>
        <q-btn color="secondary" label="Logar" class="menu-btn" @click="logar"/>
        <q-btn color="secondary" label="Consultar" class="menu-btn" @click="consultar"/>
      </div>
    </div>
  </q-page>
</template>

<style>
.menu-btn {
  font-size: 1.5rem;
  padding: 1.5rem 2rem;
  border-radius: 10px;
  margin: 2rem;
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuPage',
  methods: {
    cadastrar () {
      this.$router.push('/cadastrar')
    },
    logar () {
      this.$router.push('/logar')
    },
    consultar () {
      this.$router.push('/consultar')
    }
  }
})
</script>
