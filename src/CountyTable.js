import { Rate, Table, Tag } from 'antd';
import Text from 'antd/lib/typography/Text';

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

  const columns = [
    {
      title: 'Name',
      render: r =>
        r.type.includes('kreis') ? (
          <>
            {r.isFavorite ? <Text strong>{r.name}</Text> : r.name}{' '}
            <Text type="secondary">({r.type})</Text>
          </>
        ) : r.isFavorite ? (
          <Text strong>{r.name}</Text>
        ) : (
          r.name
        ),
    },
    {
      title: '7-Tage-Inzidenz',
      dataIndex: 'inzidenz',
      key: 'inzidenz',
      align: 'center',
      render: inzidenz => (
        <Tag
          style={{ fontSize: '14px' }}
          color={
            inzidenz < 35 ? 'green' : inzidenz < 50 ? 'orange' : inzidenz < 100 ? 'volcano' : 'red'
          }
        >
          {inzidenz.toFixed(0)}
        </Tag>
      ),
    },
    {
      align: 'center',
      render: r => (
        <Rate onChange={() => onFavorite(r.key)} count={1} value={r.isFavorite ? 1 : 0}></Rate>
      ),
    },
  ];

  const data = counties
    .sort(compare)
    .map(c => ({ ...c, key: c.id, isFavorite: favorites.includes(c.id) }));

  return (
    <Table
      size="middle"
      bordered
      pagination={false}
      locale={{ emptyText: 'Keine Daten' }}
      columns={columns}
      dataSource={data.sort(compare)}
    />
  );
};

export default CountyTable;
