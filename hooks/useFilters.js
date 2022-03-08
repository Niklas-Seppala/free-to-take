import {useEffect, useState} from 'react';

const itemTagged = (item, filters) => {
  const keys = Object.keys(filters);
  for (let i = 0; i < keys.length; i++) {
    const tag = keys[i];
    if (filters[tag] && item.tags.includes(tag)) return true;
  }
  return false;
};

/**
 * @param {Array<any>} data Posts in an array.
 * @param {object} filters filters as a map
 */
export function useFilters(data, filters) {
  const [activeData, setActiveData] = useState([]);
  useEffect(() => {
    if (!data) return;
    setActiveData(data.filter((item) => itemTagged(item, filters)));
  }, [data, filters]);
  return activeData;
}
