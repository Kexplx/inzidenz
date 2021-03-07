import { Card, Col, Rate, Row, Statistic } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useState } from 'react';

const CountyCard = ({ county, onFavorite, isFavorite = false }) => {
  const [value, setValue] = useState(isFavorite ? 1 : 0);

  return (
    <Card
      size={isFavorite ? 'default' : 'small'}
      loading={!county}
      className="mt-2"
      extra={
        <Rate
          value={value}
          onChange={v => {
            setValue(v);
            onFavorite(county?.id);
          }}
          style={{ opacity: 1, color: 'white' }}
          count={1}
        />
      }
      title={
        <>
          {county?.name}
          {county.type.includes('kreis') && (
            <Text style={{ fontWeight: '400' }} type="secondary">
              {' '}
              ({county?.type})
            </Text>
          )}
        </>
      }
    >
      <Row gutter={8}>
        <Col span={8}>
          <Statistic
            decimalSeparator=","
            title="7-Tage-Inzidenz"
            valueStyle={{
              color:
                county?.inzidenz < 35
                  ? '#27ae60'
                  : county?.inzidenz < 50
                  ? '#f1c40f'
                  : county?.inzidenz < 100
                  ? '#e67e22'
                  : '#c0392b',
            }}
            value={county?.inzidenz}
            precision={2}
            groupSeparator="."
          />
        </Col>
        <Col span={8}>
          <Statistic groupSeparator="." title="Fälle insgesamt" value={county?.cases} />
        </Col>
        <Col span={8}>
          <Statistic groupSeparator="." title="Tote insgesamt" value={county?.deaths} />
        </Col>
      </Row>
    </Card>
  );
};

export default CountyCard;
