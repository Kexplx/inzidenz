import { Table } from 'antd';
import Text from 'antd/lib/typography/Text';
import { addDecimalPoint } from './helpers';
import InizidenzTag from './InzidenzTag';

const CountyTable = ({ counties }) => {
  const data = counties.map(c => ({ ...c, key: c.id }));

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
      title: 'Inzidenz',
      dataIndex: 'inzidenz',
      key: 'inzidenz',
      render: i => <InizidenzTag inzidenz={i} />,
      sorter: (a, b) => a.inzidenz - b.inzidenz,
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Fälle insges.',
      dataIndex: 'cases',
      key: 'cases',
      render: cases => addDecimalPoint(cases),
      sorter: (a, b) => a.cases - b.cases,
    },
    {
      title: 'Tote insges.',
      dataIndex: 'deaths',
      key: 'deaths',
      render: deaths => addDecimalPoint(deaths),
      sorter: (a, b) => a.deaths - b.deaths,
    },
  ];

  return (
    <Table size="small" pagination={false} showHeader={true} dataSource={data} columns={columns} />
  );
};

export default CountyTable;
