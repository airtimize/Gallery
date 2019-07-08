import App from '../src/components/App';
import Gallery from '../src/components/Gallery'

describe('<App /> rendering', () => {
  it('should render a <Gallery /> component', () => {
    let wrapper = shallow(<App />);
    expect(wrapper.find(Gallery)).toHaveLength(1);
  });
});
