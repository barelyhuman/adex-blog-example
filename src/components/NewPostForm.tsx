import { signal } from '@preact/signals'

const error$ = signal({
  has: false,
  message: '',
})

export function NewPostForm() {
  const onSumbit = async e => {
    e.preventDefault()
    e.stopPropagation()

    const form = e.target.closest('form')
    const data = new FormData(form)
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: data.get('title'),
        content: data.get('content'),
      }),
    })

    if (!response.ok) {
      error$.value = {
        has: true,
        message: (await response.json()).message,
      }
    } else {
      error$.value = {
        has: false,
        message: '',
      }
      form.reset()
      window.location.reload()
    }
  }
  return (
    <>
      <form onSubmit={onSumbit}>
        <input name="title" />
        <input name="content" />
        {error$.value.has ? error$.value.message : ''}
        <button onClick={onSumbit}>Create</button>
      </form>
    </>
  )
}
