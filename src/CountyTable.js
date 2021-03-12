import { message, Table } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useState } from 'react';
import { addDecimalPoint } from './helpers';
import InizidenzTag from './InzidenzTag';

const CountyTable = ({ counties }) => {
  const [pressCount, setPressCount] = useState(0);
  const data = counties.map(c => ({ ...c, key: c.id })).sort((a, b) => a.inzidenz - b.inzidenz);

  const handlePressed = row => {
    let newCount = pressCount;
    let content = '';

    switch (row.name) {
      case 'Regensburg':
        newCount = pressCount + 1;
        content = 'Hi Papa, bleib gesund 😉';
        break;
      case 'Cham':
        newCount = pressCount + 1;
        content = 'Hi Mama, hab dich lieb 💓';
        break;
      default:
        return;
    }

    if (newCount % 4 === 0) {
      message.open({ content, icon: '' });
    }

    setPressCount(newCount);
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: row => (
        <span style={{ userSelect: 'none' }} onClick={() => handlePressed(row)}>
          {row.type.includes('kreis') ? (
            <span>
              {row.name}
              <Text type="secondary"> (LK)</Text>
            </span>
          ) : (
            row.name
          )}
        </span>
      ),
    },
    {
      title: 'Inzidenz',
      dataIndex: 'inzidenz',
      key: 'inzidenz',
      render: i => <InizidenzTag inzidenz={i} />,
    },
    {
      title: 'Fälle insges.',
      dataIndex: 'cases',
      key: 'cases',
      render: cases => addDecimalPoint(cases),
    },
    {
      title: 'Tote insges.',
      dataIndex: 'deaths',
      key: 'deaths',
      render: deaths => addDecimalPoint(deaths),
    },
  ];

  return (
    <Table size="small" pagination={false} showHeader={true} dataSource={data} columns={columns} />
  );
};

export default CountyTable;
