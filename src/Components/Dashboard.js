import React, { useState, useEffect } from "react";
import { Row, Col, Button, Drawer, Input, Progress, message } from "antd";
import axios from "axios";
import CreativeList from "./CreativeList";
import CreativeForm from "./CreativeForm";
import { Typography } from 'antd';

const { Title } = Typography;

const Dashboard = () => {
  const [colors, setColors] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [creatives, setCreatives] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const maxCreatives = 5;

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = () => {
    axios
      .get("https://random-flat-colors.vercel.app/api/random?count=5")
      .then((response) => setColors(response.data.colors))
      .catch((error) => console.error("Error fetching colors:", error));
  };

  const addCreative = (values) => {
    if (creatives.length >= maxCreatives) {
      message.error("Cannot create more than 5 creatives.");
      return;
    }
    setCreatives([...creatives, values]);
    setDrawerVisible(false);
  };

  const handleAddCreativeClick = () => {
    if (creatives.length >= maxCreatives) {
      message.error("Cannot create more than 5 creatives.");
      return;
    }
    setDrawerVisible(true);
  };

  return (
    <div style={{ margin: 20 }}>
      <Row gutter={16} justify="start">
        <Col span={24}>
        <Title level={3}>Filter By:</Title>
        </Col>
        <Col span={12}>
        <Title level={5}>Colors</Title>
          <div className="color-container">
            {colors.map((color, index) => (
              <div
                key={index}
                className="creative-preview"
                style={{
                  backgroundColor: color,
                  border:
                    selectedColor === color
                      ? "2px solid black"
                      : "1px solid #eee",
                }}
                onClick={() =>
                  setSelectedColor(color === selectedColor ? "" : color)
                }
              />
            ))}
          </div>
        </Col>
        <Col span={12}>
          <div>Title / Subtitle</div>
          <Input
            placeholder="Filter creatives"
            style={{ width: 200, marginLeft: 10 }}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Col>
        <Col span={24}>
          <div style={{ marginTop: 10 }}>
            <Progress
              percent={(creatives.length / maxCreatives) * 100}
              showInfo={false}
            />
            <span>{`${creatives.length}/${maxCreatives} Creatives`}</span>
          </div>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            onClick={handleAddCreativeClick}
            disabled={drawerVisible || creatives.length >= maxCreatives}
          >
            Add Creative
          </Button>
        </Col>
      </Row>
      <CreativeList
        creatives={creatives}
        filter={filter}
        selectedColor={selectedColor}
      />
      <Drawer
        title="Create a new Creative"
        width="35%"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <CreativeForm onFinish={addCreative} colors={colors} />
      </Drawer>
    </div>
  );
};

export default Dashboard;
