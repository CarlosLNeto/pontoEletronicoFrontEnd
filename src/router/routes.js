
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/MenuPage.vue')
      },

      {
        path: '/cadastrar',
        component: () => import('src/pages/CadastroPage.vue')
      },

      {
        path: '/logar',
        component: () => import('src/pages/LoginPage.vue')
      },

      {
        path: '/consultar',
        component: () => import('src/pages/ConsultaPage.vue')
      },

      {
        path: '/cadastrar-ponto',
        component: () => import('src/pages/CadastrarPontoPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
