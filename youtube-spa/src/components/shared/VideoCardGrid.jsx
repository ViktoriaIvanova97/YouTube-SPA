import { Card, Col } from 'antd'
import { formatViews } from './formatViews'
import React from 'react'

const API_URL = import.meta.env.VITE_SEARCH_VIDEO_ID

const VideoCardGrid = ({ video, onVideoClick }) => {
  if (!video?.id?.videoId) return null

  return (
    <Col key={video.id.videoId} onClick={() => onVideoClick(video)}>
      <Card hoverable>
        <iframe
          src={`${API_URL}${video.id.videoId}`}
          title={video.snippet.title}
          frameBorder="0"
          allowFullScreen
          className="video-thumb"
        />

        <Card.Meta
          title={<div className="video-title">{video.snippet.title}</div>}
          description={
            <div>
              <div className="video-channel">{video.snippet.channelTitle}</div>
              <div className="video-channel">
                {formatViews(video.statistics?.viewCount)}
              </div>
            </div>
          }
        />
      </Card>
    </Col>
  )
}

export default React.memo(VideoCardGrid)
