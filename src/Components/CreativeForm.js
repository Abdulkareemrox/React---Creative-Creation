import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const CreativeForm = ({ onFinish, colors }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [colorError, setColorError] = useState(false);  // To track if the color error needs to be shown

  const handleSubmit = () => {
    if (!selectedColor) {
      setColorError(true);  // Set the color error if no color is selected
    } else {
      onFinish({
        title: form.getFieldValue('title'),
        subtitle: form.getFieldValue('subtitle'),
        color: selectedColor
      });
      setColorError(false);
    }
  };

  // Initialize the form
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" requiredMark={false} onFinish={handleSubmit}>
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="subtitle"
        label="Subtitle"
        rules={[{ required: true, message: 'Please input the subtitle!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Background Color">
        <div className='color-container'>
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedColor(color);
                setColorError(false);  // Remove error when a color is selected
              }}
              className='creative-preview'
              style={{
                backgroundColor: color,
                border: selectedColor === color ? '2px solid black' : '1px solid #eee',
              }}
            />
          ))}
        </div>
        {colorError && <div style={{ color: 'red' }}>Please select a color!</div>}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Done
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreativeForm;
