import { Row, Col, Card } from 'antd'
import { formatViews } from './formatViews'

const VideoGrid = ({ items, maxCount, onVideoClick }) => {
  return (
    <Row className="video-grid">
      {items.slice(0, maxCount).map((video) => (
        <Col
          key={video.id.videoId}
          hoverable
          onClick={() => onVideoClick(video)}
        >
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
                <div>
                  <div className="video-channel">
                    {video.snippet.channelTitle}
                  </div>
                  <div className="video-channel">
                    {formatViews(video.statistics?.viewCount)}
                  </div>
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
