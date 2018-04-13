import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Image, Text, RichText } from '@sitecore-jss/sitecore-jss-react';
import { Carousel as BootCarousel } from 'react-bootstrap';

const Carousel = ({ style, fields }) => (
  <BootCarousel style={style}>
    {fields.items.map((item, index) => (
      <BootCarousel.Item key={`carouselItem${index}`}>
        <Image
          media={item.fields.image}
          width={null}
          height={null}
          className="carouselImage"
          imageParams={{ as: 1 }}
          style={{ width: '100%' }}
          srcSet={[{ h: 350, w: 650 }, { h: 269, w: 500 }, { h: 195, w: 363 }]}
          sizes="(min-width: 750px) 650px, (min-width: 600px) 500px, 363px"
        />
        <BootCarousel.Caption>
          <a href={item.fields.link.value.href}>
            <Text field={item.fields.title} tag="h3" />
            <RichText field={item.fields.body} tag="div" />
          </a>
        </BootCarousel.Caption>
      </BootCarousel.Item>
    ))}
  </BootCarousel>
);

Carousel.propTypes = {
  style: PropTypes.object,
  fields: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    ),
  }),
};

Carousel.displayName = 'Carousel';

export default commonComponent(Carousel);
