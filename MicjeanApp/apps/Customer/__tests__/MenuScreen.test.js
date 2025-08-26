import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MenuScreen from '../screens/MenuScreen';

jest.mock('../utils/menu', () => ({
  __esModule: true,
  default: {
    getFullMenu: jest.fn().mockResolvedValue({
      data: [
        { id: 1, name: 'Rice', items: [
          { id: 101, name: 'Jollof Rice', category_id: 1 },
          { id: 102, name: 'Fried Rice', category_id: 1 },
        ] },
        { id: 2, name: 'Salad', items: [
          { id: 201, name: 'Fruit Salad', category_id: 2 },
        ] },
      ],
      error: null,
    }),
  },
}));

jest.mock('../components/CategoryTabs', () => 'CategoryTabs');
jest.mock('../components/DishGrid', () => 'DishGrid');
jest.mock('../components/SearchBar', () => (props) => (
  <input
    testID="search-bar"
    value={props.value}
    onChange={e => props.onChangeText(e.target.value)}
  />
));


describe('MenuScreen', () => {
  it('filters dishes by search', async () => {
    const { getByTestId, queryByText } = render(<MenuScreen />);
    await waitFor(() => expect(queryByText('Jollof Rice')).toBeTruthy());
    const searchBar = getByTestId('search-bar');
    fireEvent.changeText(searchBar, 'Fried');
    await waitFor(() => expect(queryByText('Fried Rice')).toBeTruthy());
    expect(queryByText('Jollof Rice')).toBeNull();
  });
});
