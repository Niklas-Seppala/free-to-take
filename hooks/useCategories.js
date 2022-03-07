import { useState } from 'react';
import { CATEGORY_TAGS } from '../utils/api';

const reduceCategories = (categories, tag) => {
  categories[tag.tag] = true;
  return categories;
};

const toggleCategory = (state, tag, prev) => {
  const copy = { ...prev };
  copy[tag] = !state;
  return copy;
};

/**
 * @returns filters
 */
export function useCategories() {
  const [filters, setFilters] = useState(CATEGORY_TAGS.reduce(reduceCategories, {}));
  return [
    filters,
    (state, tag) => {
      setFilters(toggleCategory(state, tag, filters));
    },
  ];
}
