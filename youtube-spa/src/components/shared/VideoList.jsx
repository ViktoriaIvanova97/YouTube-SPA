import { Card } from 'antd'
import { formatViews } from './formatViews'

const VideoList = ({ items, maxCount, onVideoClick }) => {
  return (
    <div className="video-list">
      {items.slice(0, maxCount).map((video) => (
        <Card
          key={video.id.videoId}
          hoverable
          onClick={() => onVideoClick(video)}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <iframe
              width="300"
              height="180"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
              className="video-thumb"
            />

            <div className="video-meta">
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
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default VideoList
