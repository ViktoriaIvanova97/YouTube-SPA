import { Card } from 'antd'
import { formatViews } from './formatViews'
import React from 'react'

const API_URL = import.meta.env.VITE_SEARCH_VIDEO_ID

const VideoCardList = ({ video, onVideoClick }) => {
  if (!video?.id?.videoId) return null

  return (
    <Card
      key={video.id.videoId}
      hoverable
      onClick={() => onVideoClick(video)}
      style={{ marginBottom: 16 }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <iframe
          width="300"
          height="180"
          src={`${API_URL}${video.id.videoId}`}
          title={video.snippet?.title || 'Видео'}
          frameBorder="0"
          allowFullScreen
          className="video-thumb"
        />

        <div className="video-meta" style={{ marginLeft: 16, flex: 1 }}>
          <Card.Meta
            title={<div className="video-title">{video.snippet?.title}</div>}
            description={
              <div>
                <div className="video-channel">{video.snippet?.channelTitle}</div>
                <div className="video-channel">{formatViews(video.statistics?.viewCount)}</div>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  )
}

export default React.memo(VideoCardList)
