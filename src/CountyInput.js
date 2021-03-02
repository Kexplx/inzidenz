import { AutoComplete, Input } from 'antd';
import { Option } from 'antd/lib/mentions';
import Text from 'antd/lib/typography/Text';
import { useEffect, useRef, useState } from 'react';

const COUNTY_BY_NAME =
  'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-germany-landkreise&q=$$$&rows=403&fields=bez,cases7_per_100k,bl,ewz,cases,name,last_update,admunitid';

const CountyInput = ({ onSubmit }) => {
  const [options, setOptions] = useState([]);
  const [getCountiesTimeout, setGetCountiesTimeout] = useState(0);

  const onSearch = value => {
    if (!value.trim()) {
      return;
    }

    clearTimeout(getCountiesTimeout);
    setGetCountiesTimeout(
      setTimeout(() => {
        const url = COUNTY_BY_NAME.replace('$$$', value);
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setOptions(
              data.records.map(r => ({
                id: r.fields.admunitid,
                value: `${r.fields.name} (${r.fields.bez})`,
              })),
            );
          });
      }, 100),
    );
  };

  const onSelect = value => {
    console.log('onSelect', value);
  };

  return (
    <label>
      <Text strong>Deutscher Landkreis:</Text>
      <AutoComplete
        style={{ width: '100%' }}
        options={options}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Regensburg"
      />
    </label>
  );
};

export default CountyInput;
