import React from 'react';
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DateFormatter from './DateFormatter';

Enzyme.configure({ adapter: new Adapter() });

describe('<DateFormatter />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const now = new Date().toDateString();
    ReactDOM.render(<DateFormatter format="DD-MM-YYYY">{now}</DateFormatter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  const dateMock = '2019-02-03T05:00:00';

  it('format by default', () => {
    const wrapper = shallow(<DateFormatter format="ddd MMM DD YYYY HH:mm:ss">{dateMock}</DateFormatter>);
    expect(wrapper.contains('Sun Feb 03 2019 05:00:00')).to.equal(true);
  });

  it('format DD MM', () => {
    const wrapper = shallow(<DateFormatter format="DD MM">{dateMock}</DateFormatter>);
    expect(wrapper.contains('03 02')).to.equal(true);
  });

  it('format DD MM YYYY', () => {
    const wrapper = shallow(<DateFormatter format="DD MM YYYY">{dateMock}</DateFormatter>);
    expect(wrapper.contains('03 02 2019')).to.equal(true);
  });
});
