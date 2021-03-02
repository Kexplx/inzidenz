import { Card, Col, Row, Statistic } from "antd";

const CountyCard = ({ county }) => {
  const { casesPer100k, casesTotal, deathsTotal } = county;

  return (
    <Card className="mt-1" title={county.name}>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            decimalSeparator=","
            title="7-Tage-Inzidenz"
            valueStyle={{
              color:
                casesPer100k < 35
                  ? "green"
                  : casesPer100k < 50
                  ? "orange"
                  : "red",
            }}
            value={casesPer100k}
            precision={2}
          />
        </Col>
        <Col span={8}>
          <Statistic
            groupSeparator="."
            title="Fälle insgesamt"
            value={casesTotal}
          />
        </Col>

        <Col span={8}>
          <Statistic
            groupSeparator="."
            title="Tode insgesamt"
            value={deathsTotal}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default CountyCard;
