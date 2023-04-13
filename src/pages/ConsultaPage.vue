<template>
  <div class="consulta-page">
    <div class="consulta-form q-pa-md">
      <q-input outlined v-model="login" label="Login" dense class="custom-input q-pa-sm q-mb-md" />
      <q-input outlined v-model="startDate" label="Data Inicial" type="date" dense class="custom-input q-pa-sm q-mb-md" />
      <q-input outlined v-model="endDate" label="Data Final" type="date" dense class="custom-input q-pa-sm q-mb-md" />

      <div class="consulta-btn q-mt-lg q-pa-md">
        <q-btn @click="$router.push('/')"
           label="Voltar ao menu"
           color="primary"
           class="q-mr-sm"
    />
        <q-btn color="primary" label="Consultar" @click="consultarDados" />
      </div>
    </div>

    <div class="consulta-table q-mt-lg">
      <table class="table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ponto in pontosDoDia" :key="ponto.id">
            <td>{{ formatDate(ponto.data) }}</td>
            <td>{{ formatTime(ponto.hora) }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="!pontosDoDia.length" class="no-data q-mt-md q-pa-md text-center">Nenhum ponto cadastrado para esse dia.</div>
    </div>
  </div>
</template>

<script>
import { api } from 'boot/axios'
import moment from 'moment'

export default {
  name: 'ConsultaPage',

  data () {
    return {
      login: '',
      startDate: '',
      endDate: '',
      pontosDoDia: []
    }
  },

  methods: {
    consultarDados () {
      const url = 'pontos/consultar'
      const params = {
        login: this.login,
        startDate: this.startDate,
        endDate: this.endDate
      }

      api.get(url, { params })
        .then(response => {
          console.log(response.data)
          this.pontosDoDia = response.data
        })
        .catch(error => {
          console.error(error)
        })
    },

    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },

    formatTime (time) {
      return moment(time, 'HH:mm:ss').format('HH:mm')
    }
  }
}
</script>

<style>
.consulta-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.consulta-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
}

.consulta-form .custom-input {
  width: 100%;
  max-width: 400px;
}

.consulta-btn {
  display: flex;
  justify-content: center;
}

.consulta-table {
  width: 100%;
  max-width: 800px;
}

.table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
}

th {
background-color: #eee;
font-weight: bold;
text-align: center;
font-size: 1.1rem;
padding: 12px;
}

td {
border: 1px solid #ccc;
padding: 8px;
text-align: center;
font-size: 1.05rem;
}

tr:nth-child(even) {
background-color: #f2f2f2;
}

.q-btn {
background-color: #66BB6A;
color: #fff;
font-size: 1.05rem;
text-transform: uppercase;
font-weight: bold;
border-radius: 4px;
padding: 12px;
cursor: pointer;
}

.q-btn:hover {
background-color: #4CAF50;
}

.custom-input {
width: 30%;
font-size: 1.05rem;
border-radius: 4px;
}

label {
font-size: 1.1rem;
font-weight: bold;
margin-bottom: 6px;
}

.q-pa-md {
padding: 20px;
}

.q-mb-md {
margin-bottom: 20px;
}

.q-mt-lg {
margin-top: 40px;
}

.q-mt-md {
margin-top: 20px;
}

.q-pa-sm {
padding: 10px;
}

@media only screen and (max-width: 768px) {
.custom-input {
width: 100%;
}
}
</style>
