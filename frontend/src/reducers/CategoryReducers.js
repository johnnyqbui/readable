import {
	SELECT_CATEGORY,
  GET_CATEGORIES,
} from '../actions/types';

const categoriesState = {
  categories: [],
  selectedCategory: ""
};

export const categoryData = (state = categoriesState, action) => {
  const { categories, category } = action;
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        ...categories
      };

    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: category
      };
    default:
      return state;
  }
};