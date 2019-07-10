import App from '../src/components/App';
import Gallery from '../src/components/Gallery';

describe('<App /> rendering', () => {
  const wrapper = shallow(<App />);

  it('should render two <Gallery /> components', () => {
    expect(wrapper.find(Gallery)).toHaveLength(2);
  });

  it('should have an inital state where view equals gallery', () => {
    expect(wrapper.state('view')).toEqual('gallery');
  });

  it('should call the onClick function when an image is clicked', () => {
    const mockFunction = jest.fn();
    const component = mount(
      <Gallery onClickFunction={mockFunction} />
    );
    component.find('img').simulate('click');
    expect(mockFunction).toHaveBeenCalled();
    component.unmount();
  });
})
