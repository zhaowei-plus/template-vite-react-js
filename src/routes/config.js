import { lazy } from 'react'

export default {
  title: 'formily demo',
  routes: [
    {
      title: '表单定义',
      path: '/form-define',
      children: [
        {
          title: 'jsx',
          path: '/form-define/jsx',
          component: lazy(() => import('@/views/form-define/jsx')),
        },
        {
          title: 'json-schema',
          path: '/form-define/json-schema',
          component: lazy(() => import('@/views/form-define/json-schema')),
        }
      ]
    },
    {
      title: '表单布局',
      path: '/form-layout',
      children: [
        {
          title: '简单布局',
          path: '/form-layout/simple-layout',
          component: lazy(() => import('@/views/form-layout/simple-layout')),
        },
        {
          title: '复杂布局',
          path: '/form-layout/complex-layout',
          component: lazy(() => import('@/views/form-layout/complex-layout')),
        }
      ]
    },
    {
      title: '表单复用',
      path: '/form-reuse',
      children: [
        {
          title: '场景复用',
          path: '/form-reuse/scene-reuse',
          component: lazy(() => import('@/views/form-reuse/scene-reuse')),
        },
        {
          title: 'UI复用',
          path: '/form-reuse/ui-reuse',
          component: lazy(() => import('@/views/form-reuse/ui-reuse')),
        }
      ]
    },
  ],
}
