<template>
  <div class="custom-header-container">
  <div class="custom-header">
    <p>Nome: {{ name }}</p>
    <p>Matricula: {{ registration }}</p>
  </div>
  </div>
  <div class="q-pa-md">
    <q-markup-table dark >
      <thead>
        <tr>
          <th>Data</th>
          <th>1 Marc.</th>
          <th>2 Marc.</th>
          <th>3 Marc.</th>
          <th>4 Marc.</th>
          <th>5 Marc.</th>
          <th>6 Marc.</th>
        </tr>
      </thead>
      <tbody>
  <tr>
  <th>{{ today }}</th>
  <th v-for="(ponto, index) in pontos" :key="index">
    {{ horarios[index] }}h
    {{ ponto.observacao }}
  </th>
  <th v-if="horarios.length % 2 !== 0">
      <p class="marcacao">Falta marcação</p>
  </th>
  </tr>

</tbody>

    </q-markup-table>
  </div>
  <div class="text-center">
    <q-btn class="col-2 q-my-md q-mr-md" color="primary" label="Voltar" @click="$router.push('/logar')" />

  <q-btn class="col-2 q-my-md" color="amber" glossy @click="salvarPonto">BATER PONTO</q-btn>
</div>
</template>

<script>

import { api } from 'boot/axios'
import { Notify } from 'quasar'

export default {
  data () {
    return {
      today: new Date().toLocaleDateString(),
      selectedCell: null,
      registration: '',
      name: '',
      userId: null,
      pontos: [],
      horarios: []
    }
  },
  mounted () {
    this.getUserInfo()
    this.getPontosUser()
  },
  methods: {
    getUserInfo () {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        this.name = user.name
        this.registration = user.registration
        this.id = user.id
      }
    },
    salvarPonto () {
      const ponto = {
        userId: this.id
      }

      api.post('/pontos', ponto)
        .then(response => {
          this.$q.dialog({
            title: 'Sucesso!',
            message: 'Ponto batido com sucesso!',
            ok: {
              label: 'OK',
              color: 'positive'
            }
          }).onOk(() => {
            location.reload()
          })
        })
        .catch(error => {
          Notify.create({
            message: `Erro ao bater o ponto! Detalhes do erro: ${error.message}`,
            color: 'negative'
          })
        })
    },

    getPontosUser () {
      api.get(`/pontos/${this.id}`)
        .then(response => {
          this.pontos = response.data

          // adicionado o valor de cada ponto ao array horarios
          this.pontos.forEach((ponto) => {
            const [horas, minutos] = ponto.hora
            this.horarios.push(`${horas}:${minutos}`)
          })

          if (this.horarios.length % 2 !== 0) {
            const lastPonto = this.pontos[this.pontos.length - 1]
            if (!lastPonto.observacao.includes('Falta marcação')) {
              lastPonto.observacao += ' Falta marcação'
            }
          }
        })
        .catch(error => {
          alert(`Erro: ${error.response.data}`)
        })
    }

  }
}
</script>

<style>
.q-mr-md {
  margin-right: 60px;
}

.custom-header-container {
  background-color: #bebebe;
  padding: 10px;
  margin-bottom: 10px;
}

.custom-header {
  font-size: 20px;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.marcacao{
  color: #f5ad42;
  font-size: 14px;
}

table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 5px;
  text-align: center;
}

th {
  background-color: #eee;
}

td button {
  display: block;
  margin: 0 auto;
}
</style>
