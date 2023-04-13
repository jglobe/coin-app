import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import { Button } from './button';
import { Input } from './input';
import { FormBuy } from './form-buy';
import { Diagram } from './diagram';
import { Pagination } from './pagination';
import { Modal } from './modal';
import { SingleCoin } from './single-coin';
import { Loader } from './loader';

describe('Components', () => {
  beforeEach(() => {
    cleanup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

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
  });

  describe('Loader', () => {
    it('Existed', () => {
      render( <Loader /> )

      const loader = screen.getByTestId('loader')

      expect(loader).toBeInTheDocument()
    })
  });

  describe('Form', () => {
   it('Form buy', () => {
    const handleSubmit = jest.fn()

    render(
      <FormBuy
        onSubmit={handleSubmit}
        className='some_class'
      />
    );

    const form = screen.getByTestId('form')
    expect(form).toBeInTheDocument()
    expect(form).toHaveClass('some_class')

    fireEvent.submit(form)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
   })
  });

  describe('Diagram', () => {
    const mockData = [
      {"priceUsd":"43523.7446026748729943","time":1649289600000,"date":"2022-04-07T00:00:00.000Z"},
      {"priceUsd":"43361.1193641799483156","time":1649376000000,"date":"2022-04-08T00:00:00.000Z"},
      {"priceUsd":"42545.5567667791201486","time":1649462400000,"date":"2022-04-09T00:00:00.000Z"},
      {"priceUsd":"42853.0578573159617594","time":1649548800000,"date":"2022-04-10T00:00:00.000Z"},
      {"priceUsd":"41291.5379690743041066","time":1649635200000,"date":"2022-04-11T00:00:00.000Z"},
      {"priceUsd":"39994.9145924884004410","time":1649721600000,"date":"2022-04-12T00:00:00.000Z"}
    ];
    it('Diagram empty', () => {
      const handleClick = jest.fn()
      render(
        <Diagram
          history={[]}
          dateInterval='i1'
          intervals={['i1','i2','i3']}
          setDateInterval={handleClick}
        />
      )

      const diagram = screen.getByTestId('diagram')
      const warning = screen.getByTestId('warning')
      const warningText = screen.getByText('No data')

      expect(diagram).toBeInTheDocument()
      expect(warning).toBeInTheDocument()
      expect(warningText).toBeInTheDocument()
    })
    it('Diagram with data', () => {
      const handleClick = jest.fn()
      render(
        <Diagram
          history={mockData}
          dateInterval='i1'
          intervals={['i1','i2']}
          setDateInterval={handleClick}
        />
      )

      const diagram = screen.getByTestId('diagram')
      const inner = screen.getByRole('region')
      const interval = screen.getAllByTestId('interval')

      expect(diagram).toBeInTheDocument()
      expect(inner).toBeInTheDocument()
      expect(interval[0]).toBeInTheDocument()
      expect(interval[1]).toBeInTheDocument()

      fireEvent.click(interval[1])
      expect(handleClick).toBeCalledTimes(1)
    })
  });

  describe('Pagination', () => {
    const prevClick = jest.fn()
    const nextClick = jest.fn()

    it('Disabled "prev" on first page', () => {
      const mockPage = '1'

      render(
        <Pagination
          prev={prevClick}
          next={nextClick}
          page={+mockPage}
          disabledNext={false}
        />
      )

      const pagination = screen.getByTestId('pagination')
      const page = screen.getByTestId('pagination-current')
      const prev = screen.getByText('Prev')
      const next = screen.getByText('Next')

      expect(pagination).toBeInTheDocument()
      expect(page).toBeInTheDocument()
      expect(prev).toBeInTheDocument()
      expect(next).toBeInTheDocument()

      expect(page).toHaveTextContent(mockPage)
      expect(prev).toBeDisabled()
      expect(next).not.toBeDisabled()

      fireEvent.click(prev)
      expect(prevClick).toBeCalledTimes(0)
      fireEvent.click(next)
      expect(nextClick).toBeCalledTimes(1)
    })
    it('Not first and not last pages', () => {
      const mockPage = '2'

      render(
        <Pagination
          prev={prevClick}
          next={nextClick}
          page={+mockPage}
          disabledNext={false}
        />
      )

      const pagination = screen.getByTestId('pagination')
      const page = screen.getByTestId('pagination-current')
      const prev = screen.getByText('Prev')
      const next = screen.getByText('Next')

      expect(pagination).toBeInTheDocument()
      expect(page).toBeInTheDocument()
      expect(prev).toBeInTheDocument()
      expect(next).toBeInTheDocument()

      expect(page).toHaveTextContent(mockPage)
      expect(prev).not.toBeDisabled()
      expect(next).not.toBeDisabled()

      fireEvent.click(next)
      expect(nextClick).toBeCalledTimes(1)
      fireEvent.click(prev)
      expect(prevClick).toBeCalledTimes(1)
    })
    it('Disabled "next" on last page', () => {
      const mockPage = '10'

      render(
        <Pagination
          prev={prevClick}
          next={nextClick}
          page={+mockPage}
          disabledNext={true}
        />
      )

      const pagination = screen.getByTestId('pagination')
      const page = screen.getByTestId('pagination-current')
      const prev = screen.getByText('Prev')
      const next = screen.getByText('Next')

      expect(pagination).toBeInTheDocument()
      expect(page).toBeInTheDocument()
      expect(prev).toBeInTheDocument()
      expect(next).toBeInTheDocument()

      expect(page).toHaveTextContent(mockPage)
      expect(prev).not.toBeDisabled()
      expect(next).toBeDisabled()

      fireEvent.click(next)
      expect(nextClick).toBeCalledTimes(0)
      fireEvent.click(prev)
      expect(prevClick).toBeCalledTimes(1)
    })
  });

  describe('Modal', () => {
    const closeFunc = jest.fn()

    it('Only text without title', () => {
      const mockContent = 'Text content'

      render(
        <Modal
          close={closeFunc}
        >
          {mockContent}
        </Modal>
      )

      const modal = screen.getByTestId('modal')
      const close = screen.getByTestId('modal-close')
      const title = screen.queryByTestId('modal-title')
      const content = screen.getByText(mockContent)

      expect(modal).toBeInTheDocument()
      expect(close).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(title).toBeNull()
    })
    it('With title and content', () => {
      const mockContent = <div data-testid='content'>node</div>
      const mockTitle = 'Text title'

      render(
        <Modal
          close={closeFunc}
          title={mockTitle}
        >
          {mockContent}
        </Modal>
      )

      const modal = screen.getByTestId('modal')
      const close = screen.getByTestId('modal-close')
      const title = screen.queryByTestId('modal-title')
      const content = screen.queryByTestId('content')

      expect(modal).toBeInTheDocument()
      expect(close).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(title).toBeInTheDocument()

      expect(title).toHaveTextContent(mockTitle)
    })
    it('Close click', () => {
      const mockContent = <div data-testid='content'>node</div>

      render(
        <Modal
          close={closeFunc}
        >
          {mockContent}
        </Modal>
      )

      const modal = screen.getByTestId('modal')
      const close = screen.getByTestId('modal-close')

      expect(modal).toBeInTheDocument()
      expect(close).toBeInTheDocument()

      fireEvent.click(close)
      expect(closeFunc).toBeCalledTimes(1)
    })
  });

  describe('Single coin', () => {
    const mockData = {
      "id":"bitcoin",
      "rank":"1",
      "symbol":"BTC",
      "name":"Bitcoin",
      "supply":"19344081.0000000000000000",
      "maxSupply":"21000000.0000000000000000",
      "marketCapUsd":"581658298398.4463182973927856",
      "volumeUsd24Hr":"5485243480.3038482491385684",
      "priceUsd":"30000",
      "changePercent24Hr":"-0.1208993552467776",
      "vwap24Hr":"29969.5376570425039245",
      "explorer":"https://blockchain.info/"
    }
    it('Existed', () => {
      render(
        <SingleCoin
          coin={mockData}
        />
      )

      const coin = screen.getByTestId('coin-full')

      expect(coin).toBeInTheDocument()
    })
  });

});
