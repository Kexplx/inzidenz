import { Spin } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import CountyCard from "./CountyCard";
import { getGermanDateFormat } from "./date-helpers";

const countyCodes = [9362, 9562, 9162, 9564];
const URL =
  "https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-germany-landkreise&q=($$$)&rows=403&fields=bez,cases7_per_100k,bl,ewz,cases,name,deaths,last_update";

function App() {
  const [counties, setCounties] = useState([]);

  useEffect(() => {
    let query = "";
    for (const code of countyCodes) {
      query += "admunitid:" + code + " OR ";
    }

    query = query.replace(/ OR $/, "");

    fetch(URL.replace("$$$", query))
      .then((resp) => resp.json())
      .then((data) => {
        setCounties(
          data.records
            .map((r) => ({
              id: r.fields.admunitid,
              name: r.fields.name,
              state: r.fields.bl,
              lastUpdated: r.fields.last_update,
              type: r.fields.bez,
              inhabitants: r.fields.ewz,
              casesPer100k: r.fields.cases7_per_100k,
              casesTotal: r.fields.cases,
              deathsTotal: r.fields.deaths,
            }))
            .sort((a, b) => (a.name === "Regensburg" ? -1 : 0))
        );
      });
  }, []);

  return (
    <div className="container">
      <h1>COVID-19 | 7-Tage-Inzidenz</h1>
      {counties.length ? (
        <>
          <Text type="secondary">
            Aktualisiert am:{" "}
            {getGermanDateFormat(new Date(counties[0].lastUpdated))}
          </Text>
          {counties.map((c) => (
            <CountyCard key={c.name} county={c} />
          ))}
        </>
      ) : (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}

export default App;
