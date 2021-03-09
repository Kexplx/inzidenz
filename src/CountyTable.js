import { Descriptions, Rate, Tag } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const CountyTable = ({ counties, favorites, onFavorite }) => {
  const compare = (a, b) => {
    if (favorites.includes(a.id) && favorites.includes(b.id)) {
      return 0;
    }

    if (favorites.includes(a.id)) {
      return -1;
    }

    if (favorites.includes(b.id)) {
      return 1;
    }

    // If nothing is favorited we sort by inzidenz ascending
    return a.inzidenz - b.inzidenz;
  };

  const data = counties.sort(compare).map(c => ({ ...c, isFavorite: favorites.includes(c.id) }));

  return (
    <Descriptions column={2} size="middle" bordered>
      {data.map(c => (
        <React.Fragment key={c.id}>
          <Descriptions.Item
            label={
              c.type.includes('kreis') ? (
                <>
                  {c.isFavorite ? <Text strong>{c.name}</Text> : c.name}{' '}
                  <Text type="secondary">({c.type})</Text>
                </>
              ) : c.isFavorite ? (
                <Text strong>{c.name}</Text>
              ) : (
                c.name
              )
            }
            contentStyle={{ textAlign: 'center' }}
          >
            <Tag
              style={{ fontSize: '14px' }}
              color={
                c.inzidenz < 35
                  ? 'green'
                  : c.inzidenz < 50
                  ? 'orange'
                  : c.inzidenz < 100
                  ? 'volcano'
                  : 'red'
              }
            >
              {c.inzidenz.toFixed(0)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item contentStyle={{ textAlign: 'center' }}>
            <Rate
              style={{ color: 'white' }}
              onChange={() => onFavorite(c.id)}
              count={1}
              value={c.isFavorite ? 1 : 0}
            ></Rate>
          </Descriptions.Item>
        </React.Fragment>
      ))}
    </Descriptions>
  );
};

export default CountyTable;
