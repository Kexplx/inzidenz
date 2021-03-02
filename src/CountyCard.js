import { Card, Col, Row, Statistic } from "antd";
import Text from "antd/lib/typography/Text";
import { getGermanDateFormat } from "./date-helpers";

const CountyCard = ({ county }) => {
  const { lastUpdated, casesPer100k, casesTotal, deathsTotal } = county;

  const getNiceDate = (isoString) => {
    const date = new Date(isoString);

    return getGermanDateFormat(date);
  };

  return (
    <Card
      className="mt-1"
      title={county.name}
      extra={<Text type="secondary">{getNiceDate(lastUpdated)}</Text>}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            decimalSeparator=","
            title="7 Tage Inzidenz pro 100T"
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
