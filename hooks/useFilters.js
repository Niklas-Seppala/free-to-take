import { useEffect, useState } from 'react';

/**
 * @param {Array<any>} data Posts in an array.
 * @param {object} filters filters as a map
 */
export function useFilters(data, filters) {
  const [activeData, setActiveData] = useState([]);
  useEffect(() => {
    if (!data)
      return;
    const filtered = data.filter((item) => {
      Object.keys(filters).map((tag) => {
        if (filters[tag] && item.tags.includes(tag))
          return true;
      });
      return false;
    });
    setActiveData(filtered);
  }, [data, filters]);
  return activeData;
}
