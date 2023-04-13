<template>
  <h2 class="text-center" style="font-size: 2.5rem; margin-top: 2rem; color: #1E88E5;">ACESSO RESTRITO</h2>
    <p class="text-center" style="font-size: 1.2rem; margin-top: 1rem; color: #616161;">Este sistema é para ser usado para cadastrar ponto eletrônico para os funcionários do TJAM</p>
    <q-page class="flex flex-center" style="background-color: #F5F5F5;">

    <q-form class="q-pa-md" @submit.prevent="logarUsuario" style="background-color: #FFFFFF; border-radius: 10px; padding: 2rem; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">
      <p class="text-center" style="font-size: 1.2rem; margin-top: 1rem; color: #616161;">Por favor, entre com suas credenciais para acessar o sistema.</p>
      <q-input v-model="usuario.login" label="Login" type="text" outlined required style="border-radius: 5px; margin-bottom: 1rem;"/>
      <q-input v-model="usuario.password" label="Senha" type="password" outlined required style="border-radius: 5px; margin-bottom: 1rem;"/>
      <q-space />

      <q-btn color="secondary" label="Voltar" @click="$router.push('/')" style="margin-left: 1rem; float: left;"/>
      <q-btn color="primary" label="Logar" type="submit" style="margin-right: 1rem; float: right;"/>

    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'LoginPage',
  data () {
    return {
      usuario: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    logarUsuario () {
      const loginUsuario = {
        login: this.usuario.login,
        password: this.usuario.password
      }

      api.post('/user/login', loginUsuario)
        .then(response => {
          Notify.create({
            message: 'Sucesso ao logar!',
            color: 'positive'
          })
          localStorage.setItem('user', JSON.stringify({ name: response.data.name, registration: response.data.registration, id: response.data.id }))
          this.$router.push('/cadastrar-ponto')
        })
        .catch(() => {
          Notify.create({
            message: 'Erro ao realizar o login.',
            color: 'negative'
          })
        })
    }
  }
})
</script>
