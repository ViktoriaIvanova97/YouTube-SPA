import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import LogOut from '../components/LogOut'
import {
  selectorItems,
  selectorItemsError,
  selectorItemsLoading,
} from '../selectors/selectors'
import { searchVideos } from '../api/youtubeApi'

const Home = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectorItems)
  const loading = useSelector(selectorItemsLoading)
  const error = useSelector(selectorItemsError)

  const [query, setQuery] = useState('')

  const handleSearch = () => {
    dispatch(searchVideos({ query }))
  }

  console.log(items)
  return (
    <>
      <h2>Поиск</h2>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Идёт поиск...' : 'Поиск'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div
           style={{
			maxHeight: '70vh',
			overflowY: 'auto',
			display: 'grid',
			gridTemplateColumns: 'repeat(4, 1fr)',
			gap: '20px',
			paddingTop: '10px',
		  }}
        >
          {items.map((video) => (
            <div key={video.id.videoId}>
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p>{video.snippet.title}</p>
            </div>
          ))}
        </div>
      </div>
      <LogOut />
    </>
  )
}
export default Home
