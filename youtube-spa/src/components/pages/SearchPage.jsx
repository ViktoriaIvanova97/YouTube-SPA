import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from 'antd'
import { useLocation } from 'react-router-dom'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { useState, useEffect, lazy , Suspense} from 'react'
import {
  selectorItems,
  selectorItemsError,
  selectorItemsLoading,
} from '../../RTK/selectors/selectors'
import { searchVideos} from '../../api/youtubeApi'
import VideoGrid from './VideoGrid'
import VideoList from './VideoList'
import SaveHeart from '../shared/SaveHeart'
import { setQueryAndCount } from '..//../RTK/slices/videosSlice'
const VideoModal = lazy(() => import('../shared/VideoModal'))

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
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const location = useLocation()

  const handleSearch = (value) => {
    setQuery(value)
    setSearchText(value)
    dispatch(setQueryAndCount({ query: value, maxCount, sort }))
    dispatch(searchVideos({ query: value, maxCount, sort }))
  }
  const handleOpenModal = (video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)
  }

  useEffect(() => {
    if (location.state?.query) {
      setQuery(location.state.query)
      setSearchText(location.state.query)
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
  }, [location.state, dispatch])

  return (
    <div className="search-page">
      <Search
        className="custom-search"
        placeholder="Введите запрос"
        enterButton="Поиск"
        size="large"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
        loading={loading}
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
        <div style={{ minHeight: 24 }}>
          <h3
            style={{
              marginTop: 10,
              visibility:
                !loading && searchText && items.length > 0
                  ? 'visible'
                  : 'hidden',
            }}
          >
            Видео по запросу "{searchText}"
          </h3>
        </div>
        <div>
          <Button
            icon={<BarsOutlined />}
            className="view-toggle-btn"
            type={viewMode === 'list' ? 'primary' : 'default'}
            onClick={() => setViewMode('list')}
            style={{ marginRight: 10 }}
          />
          <Button
            icon={<AppstoreOutlined />}
            className="view-toggle-btn"
            type={viewMode === 'grid' ? 'primary' : 'default'}
            onClick={() => setViewMode('grid')}
          />
        </div>
      </div>

      {viewMode === 'list' ? (
        <VideoList items={items} onVideoClick={handleOpenModal} />
      ) : (
        <VideoGrid items={items} onVideoClick={handleOpenModal} />
      )}
      <Suspense fallback={<div>Загрузка...</div>}>
        <VideoModal
          open={isModalOpen}
          video={selectedVideo}
          onClose={handleCloseModal}
        />
      </Suspense>
    </div>
  )
}

export default SearchPage
