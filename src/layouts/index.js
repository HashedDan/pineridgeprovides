import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Navigation from '../components/Navigation';
import withAuthentication from '../components/Session/withAuthentication';

import './index.css';
import './bootstrap.min.css';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Pine Ridge Provides"
      meta={[
        { name: 'description', content: 'Pine Ridge Provides' },
        { name: 'keywords', content: 'Pine Ridge Provides' },
      ]}
    />
    <div className="app">
      <Navigation />

      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default withAuthentication(TemplateWrapper)
