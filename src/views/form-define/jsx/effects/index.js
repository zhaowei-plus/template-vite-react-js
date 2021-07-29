import { FormEffectHooks, createFormActions } from '@formily/antd'

const {
  onFormInit$,
  onFormMount$,
  onFormChange$,
  onFormInputChange$,
  onFieldValueChange$,
  onFieldInputChange$,
} = FormEffectHooks

export default () => {
  const { setFieldState } = createFormActions()

  /**************** form ********************/
  onFormInit$().subscribe(() => {
    console.log('onFormInit$')
  })

  onFormMount$().subscribe(() => {
    console.log('onFormMount$')
  })

  // onFormChange$().subscribe(() => {
  //   console.log('onFormChange$')
  // })
  //
  // onFormInputChange$().subscribe(() => {
  //   console.log('onFormInputChange$')
  // })


  // /**************** field ********************/
  onFieldInputChange$('sex').subscribe(({ value }) => {
    setFieldState('age', state => {
      if (['male'].includes(value)) {
        state.value = ''
        state.props['x-props'].disabled = false
      }

      if (['female'].includes(value)) {
        state.value = 18
        state.props['x-props'].disabled = true
      }
    })
  })

  onFieldValueChange$('openEducateInfo').subscribe(({ value }) => {
    setFieldState('educateInfo', state => {
      state.visible = value
    })
  })
}
