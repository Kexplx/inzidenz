import Text from 'antd/lib/typography/Text';

const Faq = () => {
  return (
    <>
      <div id="firstFaqBlock" style={{ textAlign: 'justify' }}>
        <h4>Was ist die 7-Tage-Inzidenz?</h4>
        Die 7-Tage-Inzidenz ist eine wichtige Grundlage für die Einschätzung der Entwicklung der
        Corona-Pandemie. Der Wert bildet die COVID Fälle pro 100.000 Einwohner*innen in den letzten
        7 Tagen ab.
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
