import { Table } from 'antd';
import Text from 'antd/lib/typography/Text';
import { addDecimalPoint } from './helpers';
import InizidenzTag from './InzidenzTag';

const CountyTable = ({ counties }) => {
  const data = counties.map(c => ({ ...c, key: c.id })).sort((a, b) => a.inzidenz - b.inzidenz);

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: row =>
        row.type.includes('kreis') ? (
          <>
            {row.name}
            <Text type="secondary"> (LK)</Text>
          </>
        ) : (
          row.name
        ),
    },
    {
      title: '7-Tage-Inzidenz',
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
    <Table size="middle" pagination={false} showHeader={true} dataSource={data} columns={columns} />
  );
};

export default CountyTable;
