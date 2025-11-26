import { Row, Col, Card } from 'antd'

const VideoGrid = ({ items, maxCount }) => {
  return (
    <Row gutter={[16, 16]}>
      {items.slice(0, maxCount).map((video) => (
        <Col key={video.id.videoId} xs={24} sm={12} md={8} lg={6}>
          <Card hoverable style={{ minHeight: 220 }}>
            <iframe
              width="100%"
              height="150"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: '12px' }}
            />

            <Card.Meta
              title={
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
              description={
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    padding: '0 5px',
                    color: 'gray',
                  }}
                >
                  {video.snippet.channelTitle}
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default VideoGrid
