import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { useI18n } from 'next-localization';
import StyleguideSpecimen from 'components/Styleguide-Specimen';
import { StyleguideComponentWithContextProps, StyleguideSpecimenFields } from 'lib/component-props';

type StyleguideMultilingualProps = StyleguideComponentWithContextProps &
  StyleguideSpecimenFields & {
    fields: {
      sample: Field<string>;
    };
  };

/**
 * Demonstrates using the dictionary functionality and defining route data in
 * multiple languages.
 */
const StyleguideMultilingual = (props: StyleguideMultilingualProps): JSX.Element => {
  const i18n = useI18n();

  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-multilingual">
      <Text field={props.fields.sample} encode={false} tag="p" />

      <p>
        This is a static dictionary entry from <code>/data/dictionary</code>
        :&nbsp;
        {i18n.t('styleguide-sample')}
      </p>

      <p>
        <Link href="/styleguide" locale="en">
          <a>Show in English</a>
        </Link>
        <br />
        <Link href="/styleguide" locale="da-DK">
          <a>Show in Danish</a>
        </Link>
      </p>

      <p>The current language is: {i18n.locale()}</p>
    </StyleguideSpecimen>
  );
};

export default StyleguideMultilingual;
