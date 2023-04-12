import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button'
import { Input } from './input'

describe('Components', () => {
  describe('Button', () => {
    it('Button disabled', () => {
      render(
        <Button
          disabled={true}
          className='some_class'
        >
          Text
        </Button>
      );

      const button = screen.getByTestId('button')
      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
      expect(button).toHaveClass('some_class')
      expect(button).toHaveTextContent('Text')
    });
    it('Button onClick', () => {
      const handleClick = jest.fn()

      render(
        <Button
          type='button'
          onClick={handleClick}
        >
          Button
        </Button>
      );

      const button = screen.getByTestId('button')

      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('type', 'button')

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1)
    });
  });

  describe('Input', () => {
    it('Text', () => {
      render(
        <Input
          type='text'
          placeholder='...type'
          required={true}
          className='some_class'
        />
      )

      const input = screen.getByTestId('input')

      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'text')
      expect(input).toHaveAttribute('placeholder', '...type')
      expect(input).toHaveClass('some_class')
      expect(input).toBeRequired()
    })
  })

});
