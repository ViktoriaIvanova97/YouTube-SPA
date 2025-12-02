import { Row, Col, Card } from 'antd'

const VideoGrid = ({ items, maxCount }) => {
  return (
    <Row className="video-grid">
      {items.slice(0, maxCount).map((video) => (
        <Col key={video.id.videoId} xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
              className="video-thumb"
            />

            <Card.Meta
              title={<div className="video-title">{video.snippet.title}</div>}
              description={
                <div className="video-channel">
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
