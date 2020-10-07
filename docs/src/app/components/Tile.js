import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image } from '@sitecore-jss/sitecore-jss-react';
import RouteLinkedRichText from './RouteLinkedRichText';
import RoutableSitecoreLink from './RoutableSitecoreLink';

const Tile = ({ fields }) => (
  <div className="col mt-4 mt-md-0">
    <div className={fields.cssclass.value}>
      <Image field={fields.image} className="mb-4" />
    </div>
    <Text field={fields.title} tag="h4" className="pb-2" />
    <RouteLinkedRichText field={fields.text} tag="p" />

    <RoutableSitecoreLink className="text-secondary font-weight-bold" field={fields.linkUrl} />
  </div>
);

Tile.propTypes = {
  fields: PropTypes.shape({
    cssclass: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    title: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    text: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    linkUrl: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    linkText: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    image: PropTypes.shape({
      value: PropTypes.shape({
        src: PropTypes.string,
      }),
      editable: PropTypes.string,
    }),
  }),
};

export default Tile;
