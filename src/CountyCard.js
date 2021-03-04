import { Card, Col, Rate, Row, Statistic } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useState } from 'react';
import { ReactComponent as CovidSvg } from './covid.svg';
import Icon from '@ant-design/icons';

const CovidIcon = <Icon component={CovidSvg} />;

const CountyCard = ({ county, onFavorite, isFavorite }) => {
  const { casesPer100k, casesTotal, deathsTotal, id, state, name, type } = county;
  const [value, setValue] = useState(isFavorite ? 1 : 0);

  return (
    <Card
      type="inner"
      size="small"
      className="mt-2"
      extra={
        <Rate
          value={value}
          onChange={v => {
            setValue(v);
            onFavorite(id, v);
          }}
          style={{ opacity: isFavorite ? 1 : 0.2, color: 'transparent' }}
          character={CovidIcon}
          count={1}
        />
      }
      title={
        <>
          {name}{' '}
          <Text style={{ fontWeight: '400' }} type="secondary">
            ({type} in {state})
          </Text>
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
                casesPer100k < 35
                  ? '#27ae60'
                  : casesPer100k < 50
                  ? '#f1c40f'
                  : casesPer100k < 100
                  ? '#e67e22'
                  : '#c0392b',
            }}
            value={casesPer100k}
            precision={2}
            groupSeparator="."
          />
        </Col>
        <Col span={8}>
          <Statistic groupSeparator="." title="Fälle insgesamt" value={casesTotal} />
        </Col>
        <Col span={8}>
          <Statistic groupSeparator="." title="Tode insgesamt" value={deathsTotal} />
        </Col>
      </Row>
    </Card>
  );
};

export default CountyCard;
