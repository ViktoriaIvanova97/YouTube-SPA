import { Modal, Card } from 'antd'
import { formatViews } from './formatViews'

const VideoModal = ({ open, video, onClose }) => {
  if (!video) return null

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width="90%"
      style={{ maxWidth: 900, top: 60 }}
    >
      <h2>{video.snippet.title}</h2>
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${video.id.videoId}`}
        title={video.snippet.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
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
    </Modal>
  )
}

export default VideoModal
