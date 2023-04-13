<template>
  <q-layout view="hHh lpR fFf">

    <!-- Topbar -->
    <q-header elevated class="bg-grey-9 text-white">
      <q-toolbar>
        <q-toolbar-title>
          TJAM | DIVISÃO DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Rodapé -->
    <q-footer class="bg-grey-9 text-white">
      <q-toolbar class="flex-center">
        <q-space></q-space>
        <q-toolbar-title class="text-center">
          Desenvolvido por Carlos Alves Lavor Neto
        </q-toolbar-title>
        <q-space></q-space>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<style>
  /* Fundo de cinza escuro */
  .bg-grey-9 {
    background-color: #212121;
  }
</style>

<script>

</script>
