import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Input } from 'antd'
import { useState } from 'react'
import {
  selectorItems,
  selectorItemsError,
  selectorItemsLoading,
} from '../selectors/selectors'
import { searchVideos } from '../api/youtubeApi'

const { Search } = Input

const SearchPage = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectorItems)
  const loading = useSelector(selectorItemsLoading)
  const error = useSelector(selectorItemsError)

  const [query, setQuery] = useState('')

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

      <Row gutter={[16, 16]}>
        {items.map((video) => (
          <Col key={video.id.videoId} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              bodyStyle={{ padding: 0 }}
              style={{
                height: 250,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <iframe
                width="100%"
                height="180"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '12px' }}
              />
              <Card.Meta
                description={
                  <div
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '100%',
                      padding: '0 5px',
                    }}
                  >
                    {video.snippet.title}
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SearchPage
