import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { useState } from 'react'
import {
  selectorItems,
  selectorItemsError,
  selectorItemsLoading,
} from '../selectors/selectors'
import { searchVideos } from '../api/youtubeApi'
import VideoGrid from './shared/VideoGrid'
import VideoList from './shared/VideoList'

const { Search } = Input

const SearchPage = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectorItems)
  const loading = useSelector(selectorItemsLoading)
  const error = useSelector(selectorItemsError)

  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const handleSearch = (value) => {
    dispatch(searchVideos({ query: value }))
    setQuery('')
  }

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
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
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

      {viewMode === 'grid' ? (
        <VideoGrid items={items} />
      ) : (
        <VideoList items={items} />
      )}
    </div>
  )
}

export default SearchPage
