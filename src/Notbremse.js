import Text from 'antd/lib/typography/Text';

const Notbremse = () => {
  return (
    <>
      <h2 className="mt-2">§ 28b Infektionsschutzgesetz</h2>
      <h4>
        Überschreitet in einem Landkreis oder einer kreisfreien Stadt an drei aufeinander folgenden
        Tagen die 7-Tage-Inzidenz den Schwellenwert von 100, gelten die folgenden Maßnahmen.
      </h4>
      <ul>
        <li>
          <Text strong>Ausgangsbeschränkungen: </Text>Ausgangsbeschränkung von 22 bis 5 Uhr
          (Spaziergänge und Joggen alleine bleiben bis Mitternacht erlaubt).{' '}
        </li>

        <li>
          <Text strong>Kontaktbeschränkungen: </Text>Im privaten und öffentlichen Raum darf sich ein
          Haushalt mit höchstens einer weiteren Person treffen, wobei Kinder bis 14 Jahre
          ausgenommen sind.
        </li>

        <li>
          <Text strong>Schulen und Kitas: </Text>Ab einer Sieben-Tage-Inzidenz von 165 sollen
          Schulen schließen und auf Distanzunterricht umstellen, bei dem die Schüler mittels
          digitaler Lösungen zu Hause lernen. Kindertagesstätten müssen ab einer 7-Tage-Inzidenz von
          165 in den Notbetrieb umschalten.
        </li>

        <li>
          <Text strong>Einkaufen: </Text> Läden dürfen nur für Kunden öffnen, die einen negativen
          Corona-Test vorlegen und einen Termin gebucht haben. Viele Geschäfte müssen außerdem ab
          einer Inzidenz von 150 dichtmachen und dürfen dann nur noch das Abholen bestellter Waren
          anbieten. Ausgenommen sind unter anderem Supermärkte, Drogerien und Apotheken.
        </li>

        <li>
          <Text strong>Kultur: </Text> Schließen müssen gemäß Notbremse Theater, Opern,
          Konzerthäuser, Museen, Ausstellungen und Gedenkstätten.
        </li>
      </ul>
    </>
  );
};

export default Notbremse;
