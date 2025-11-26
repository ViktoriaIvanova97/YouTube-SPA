import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from 'antd'
import { useLocation } from 'react-router-dom'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import {
  selectorItems,
  selectorItemsError,
  selectorItemsLoading,
} from '../selectors/selectors'
import { searchVideos } from '../api/youtubeApi'
import VideoGrid from './shared/VideoGrid'
import VideoList from './shared/VideoList'
import SaveHeart from './shared/SaveHeart'

const { Search } = Input

const SearchPage = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectorItems)
  const loading = useSelector(selectorItemsLoading)
  const error = useSelector(selectorItemsError)

  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const location = useLocation()

  const handleSearch = (value) => {
    setQuery(value)
    dispatch(searchVideos({ query: value }))
  }

  useEffect(() => {
    if (location.state?.query) {
      setQuery(location.state.query)
      dispatch(searchVideos({ query: location.state.query }))
    }
  }, [location.state])

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <Search
        placeholder="Введите запрос"
        enterButton="Поиск"
        size="large"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
        loading={loading}
        style={{ maxWidth: 550, marginBottom: 20 }}
        suffix={<SaveHeart query={query} />}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h3>{query ? `Видео по запросу "${query}"` : ''}</h3>
        <div>
          <Button
            icon={<AppstoreOutlined />}
            type={viewMode === 'grid' ? 'primary' : 'default'}
            onClick={() => setViewMode('grid')}
            style={{ marginRight: 10 }}
          ></Button>
          <Button
            icon={<BarsOutlined />}
            type={viewMode === 'list' ? 'primary' : 'default'}
            onClick={() => setViewMode('list')}
          ></Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <VideoGrid items={items} />
      ) : (
        <VideoList items={items} />
      )}
    </div>
  )
}

export default SearchPage
