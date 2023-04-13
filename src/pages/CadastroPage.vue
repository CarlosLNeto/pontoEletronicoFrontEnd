<template>
  <h2 class="text-center" style="font-size: 2.5rem; margin-top: 2rem; color: #1E88E5;">CADASTRO DE USUÁRIO</h2>

  <q-page class="flex flex-center" style="background-color: #F5F5F5;">
    <q-form class="q-pa-md" @submit.prevent="cadastrarUsuario" style="background-color: #FFFFFF; border-radius: 10px; padding: 2rem; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">
      <p class="text-center" style="font-size: 1.2rem; margin-top: 1rem; color: #616161;">Preencha as informações abaixo para criar um novo usuário no sistema.</p>
      <q-input v-model="usuario.name" label="Nome" type="text" outlined required style="border-radius: 5px; margin-bottom: 1rem;"/>
      <q-input v-model="usuario.registration" label="Matrícula" type="text" outlined required style="border-radius: 5px; margin-bottom: 1rem;"/>
      <q-input v-model="usuario.login" label="Login" type="text" outlined required style="border-radius: 5px; margin-bottom: 1rem;"/>
      <q-input v-model="usuario.password" label="Senha" type="password" outlined required style="border-radius: 5px; margin-bottom: 1rem;"/>
      <q-space />

      <q-btn color="secondary" label="Voltar" @click="$router.push('/')" style="margin-left: 1rem; float: left;"/>
      <q-btn color="primary" label="Cadastrar" type="submit" style="margin-right: 1rem; float: right;"/>

    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'CadastroUsuario',
  data () {
    return {
      usuario: {
        name: '',
        registration: '',
        login: '',
        password: ''
      }
    }
  },
  methods: {
    cadastrarUsuario () {
      api.post('/user', this.usuario)
        .then(response => {
          Notify.create({
            message: 'Sucesso ao cadastrar usuário!',
            color: 'positive'
          })
          localStorage.setItem('user', JSON.stringify({ name: response.data.name, registration: response.data.registration, id: response.data.id }))
          this.$router.push('/logar')
        })
        .catch(() => {
          Notify.create({
            message: 'Erro ao realizar o cadastro!',
            color: 'negative'
          })
        })
    }
  }
})
</script>
