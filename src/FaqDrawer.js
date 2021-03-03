import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Row } from 'antd';
import Text from 'antd/lib/typography/Text';

const FaqDrawer = ({ onClose, isVisible }) => {
  return (
    <Drawer placement="bottom" height="100%" closable={false} visible={isVisible}>
      <div className="drawer-container">
        <Row align="middle" justify="space-between">
          <h1>COVID-19 | 7-Tage-Inzidenz</h1>
          <Button onClick={onClose} type="default" aria-label="Close" shape="circle">
            <CloseOutlined />
          </Button>
        </Row>
        <h2>FAQ</h2>
        <div style={{ textAlign: 'justify' }}>
          <h4>Was ist die 7-Tage-Inzidenz?</h4>
          Die 7-Tage-Inzidenz ist eine wichtige Grundlage für die Einschätzung der Entwicklung der
          Corona-Pandemie. Der Wert bildet die COVID Fälle pro 100.000 Einwohner*innen in den
          letzten 7 Tagen ab.
        </div>
        <div style={{ textAlign: 'justify' }} className="mt-2">
          <h4>Woher stammen die Daten?</h4>
          Diese Anwendung verwendet eine API von{' '}
          <a href="https://public.opendatasoft.com/explore/dataset/covid-19-germany-landkreise/api/">
            opendatasoft
          </a>
          . Opendatasoft bezieht die Daten von dem offiziellen Datenhub des Robert-Koch-Instituts.
        </div>
        <div style={{ textAlign: 'justify' }} className="mt-2">
          <h4>Wo sind die anderen Landkreise?</h4>
          Sie können jeden Landkreis in Deutschland betrachten. Tragen Sie dazu den
          Gemeindeschlüssel des jeweiligen Landkreises in der URL ein und laden Sie die Seite neu.
          <br />
          <br />
          Mit der URL <Text code>https://kexplx.github.io/inzidenz?q=6412,5112</Text> werden bspw.
          die Daten für Frankfurt (6412) und Duisburg (5112) geladen. Beachten Sie die Trennung der
          Gemeindeschlüssel mit einem Komma!
        </div>
      </div>
    </Drawer>
  );
};

export default FaqDrawer;
