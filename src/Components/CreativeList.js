import React from 'react';

const CreativeList = ({ creatives, filter, selectedColor }) => {
  const filteredCreatives = creatives.filter(creative => {
    const textMatch = creative.title.toLowerCase().includes(filter.toLowerCase()) || creative.subtitle.toLowerCase().includes(filter.toLowerCase());
    const colorMatch = selectedColor ? creative.color === selectedColor : true;
    return textMatch && colorMatch;
  });

  return (
    <div>
      {filteredCreatives.map((creative, index) => (
        <div key={index} style={{ backgroundColor: creative.color, margin: '10px', padding: '10px' }}>
          <h3>{creative.title}</h3>
          <p>{creative.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default CreativeList;
