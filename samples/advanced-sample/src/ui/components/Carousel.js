import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';

import { Image } from '@sitecore-jss/sitecore-jss-react';
import { Carousel as BootCarousel } from 'react-bootstrap';

const Carousel = ({ style, fields }) => (
  <BootCarousel style={style}>
    {
      fields.items.map((item, index) => (
        <BootCarousel.Item key={`carouselItem${index}`}>
          <Image media={item.fields.image} style={{ width: '100%' }} />
          <BootCarousel.Caption>
            <h3 dangerouslySetInnerHTML={{ __html: item.fields.title.editable }} />
            <span dangerouslySetInnerHTML={{ __html: item.fields.body.editable }} />
          </BootCarousel.Caption>
        </BootCarousel.Item>
      ))
    }
  </BootCarousel>
);

Carousel.propTypes = {
  style: PropTypes.object,
  fields: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      fields: PropTypes.shape({
        image: PropTypes.shape({
          value: PropTypes.shape({
            src: PropTypes.string,
          }),
          editable: PropTypes.string,
        }),
        title: PropTypes.shape({
          value: PropTypes.string,
          editable: PropTypes.string,
        }),
        body: PropTypes.shape({
          value: PropTypes.string,
          editable: PropTypes.string,
        }),
      }),
    })),
  }),
};

Carousel.displayName = 'Carousel';

export default commonComponent(Carousel);
