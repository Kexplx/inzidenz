import Text from 'antd/lib/typography/Text';
import { ReactComponent as CovidSvg } from './covid.svg';
import Icon from '@ant-design/icons';

const CovidIcon = <Icon component={CovidSvg} />;
const Faq = () => {
  return (
    <>
      <div style={{ textAlign: 'justify' }}>
        <h3>Was ist die 7-Tage-Inzidenz?</h3>
        Die 7-Tage-Inzidenz ist eine wichtige Grundlage für die Einschätzung der Entwicklung der
        Corona-Pandemie. Der Wert bildet die COVID Fälle pro 100.000 Einwohner*innen in den letzten
        7 Tagen ab.
      </div>
      <div style={{ textAlign: 'justify' }} className="mt-2">
        <h3>Woher stammen die Daten?</h3>
        Diese Webseite verwendet eine Schnittstelle von{' '}
        <a href="https://public.opendatasoft.com/explore/dataset/covid-19-germany-landkreise/api/">
          opendatasoft
        </a>
        . Opendatasoft bezieht die Daten von dem offiziellen{' '}
        <a href="https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0">
          Datenhub
        </a>{' '}
        des Robert-Koch-Instituts. Die Daten werden vom RKI einmal täglich jeweils um 00:00 Uhr
        prozessiert und stehen dann in den frühen Morgenstunden zur Verfügung.
      </div>
      <div style={{ textAlign: 'justify' }} className="mt-2">
        <h3>Kann ich die Landkreise sortieren?</h3>
        Sie können Landkreise favorisieren um sie nach oben zu sortieren. Klicken Sie dazu auf das{' '}
        {CovidIcon} Symbol am oberen rechten Rand der Landkreis Blöcke.
      </div>
      <div style={{ textAlign: 'justify' }} className="mt-2">
        <h3>Wo sind die anderen Landkreise?</h3>
        Sie können jeden Landkreis in Deutschland betrachten. Tragen Sie dazu den Gemeindeschlüssel
        des jeweiligen Landkreises in der URL ein und laden Sie die Seite neu.
        <br />
        <br />
        Mit der URL <Text keyboard>https://kexplx.github.io/inzidenz?q=6412,5112</Text> werden bspw.
        die Daten für Frankfurt (6412) und Duisburg (5112) geladen. Beachten Sie die Trennung der
        Gemeindeschlüssel mit einem Komma!
      </div>{' '}
    </>
  );
};

export default Faq;
