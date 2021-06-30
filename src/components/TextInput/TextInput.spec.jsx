import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value in searchValue', () => {
    const fn = jest.fn();
    //const {debug} =
    render(<TextInput handleChange={fn} searchValue="teste" />);
    //debug();
    const input = screen.getByPlaceholderText(/digite sua busca aqui/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('teste');
  });

  it('should call handleChange function on it key pressed', () => {
    const fn = jest.fn();
    //const {debug} =
    render(<TextInput handleChange={fn} />);
    const input = screen.getByPlaceholderText(/digite sua busca aqui/i);
    const typedValue = 'Typed Value';
    userEvent.type(input, typedValue);
    screen.debug(input);

    expect(input.value).toBe(typedValue);
    expect(fn).toBeCalledTimes(typedValue.length);
  });

  it('should match the snapshot', () => {
    const fn = jest.fn();
    //const {debug} =
    const { container } = render(<TextInput handleChange={fn} />);
    expect(container).toMatchSnapshot();
  });
});
