import { Modal, Input, Select, Slider, Form } from 'antd'

const { Option } = Select

const SaveQueryModal = ({
  open,
  query,
  onSave,
  onCancel,
  form,
  maxCount,
  setMaxCount,
}) => {
  return (
    <Modal
      title="Сохранить запрос"
      open={open}
      onOk={form.submit}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Не сохранять"
    >
      <Form form={form} layout="vertical" onFinish={onSave}>
        <Form.Item label="Запрос">
          <Input value={query} disabled />
        </Form.Item>

        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input placeholder="Укажите название" />
        </Form.Item>

        <Form.Item label="Сортировать по" name="sort">
          <Select defaultValue="relevance">
            <Option value="relevance">По релевантности</Option>
            <Option value="date">По дате публикации</Option>
            <Option value="viewCount">По количеству просмотров</Option>
            <Option value="rating">По рейтингу</Option>
            <Option value="title">По названию</Option>
            <Option value="videoCount">
              По количеству видео (для каналов)
            </Option>
          </Select>
        </Form.Item>

        <Form.Item label="Максимальное количество">
          <Slider
            min={1}
            max={50}
            value={maxCount}
            onChange={setMaxCount}
            tooltip={{ open: true }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SaveQueryModal
