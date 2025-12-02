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
import { setQueryAndCount } from '../slices/videosSlice'

const { Search } = Input

const SearchPage = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectorItems)
  const loading = useSelector(selectorItemsLoading)
  const error = useSelector(selectorItemsError)

  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState('list')
  const [maxCount, setMaxCount] = useState(12)
  const [sort, setSort] = useState('relevance')

  const location = useLocation()

  const handleSearch = (value) => {
    setQuery(value)
    setMaxCount(12)
    dispatch(setQueryAndCount({ query: value, maxCount, sort }))
    dispatch(searchVideos({ query: value, maxCount, sort }))
  }

  useEffect(() => {
    if (location.state?.query) {
      setQuery(location.state.query)
      const count = location.state.maxCount
      const savedSort = location.state.sort || 'relevance'
      setMaxCount(count)
      setSort(savedSort)
      dispatch(
        setQueryAndCount({
          query: location.state.query,
          maxCount: count,
          sort: savedSort,
        })
      )
      dispatch(
        searchVideos({
          query: location.state.query,
          maxCount: count,
          sort: savedSort,
        })
      )
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
            icon={<BarsOutlined />}
            type={viewMode === 'list' ? 'primary' : 'default'}
            onClick={() => setViewMode('list')}
            style={{ marginRight: 10 }}
          ></Button>
          <Button
            icon={<AppstoreOutlined />}
            type={viewMode === 'grid' ? 'primary' : 'default'}
            onClick={() => setViewMode('grid')}
          ></Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <VideoList items={items} maxCount={maxCount} />
      ) : (
        <VideoGrid items={items} maxCount={maxCount} />
      )}
    </div>
  )
}

export default SearchPage
