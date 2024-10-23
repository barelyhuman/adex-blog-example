import { useEffect, useState } from 'preact/hooks'

export function PostsList() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/api/posts')
      .then(d => d.json())
      .then(setData)
  }, [])

  return (
    <ul>
      {data.map(d => {
        return (
          <li>
            <article>
              <h3>{d.title}</h3>
              <div>{d.content}</div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
