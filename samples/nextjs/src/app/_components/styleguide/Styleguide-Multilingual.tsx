import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { useI18n } from 'next-localization';
import StyleguideSpecimen from './Styleguide-Specimen';
import { ComponentWithContextProps } from 'lib/component-props';
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';

type StyleguideMultilingualProps = ComponentWithContextProps &
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
  const { t, locale } = useI18n();

  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-multilingual">
      <Text field={props.fields.sample} encode={false} tag="p" />

      <p>
        This is a static dictionary entry from <code>/data/dictionary</code>
        :&nbsp;
        {t('styleguide-sample')}
      </p>

      <p>
        {/* In case if href already includes locale: https://nextjs.org/docs/advanced-features/i18n-routing#transition-between-locales */}
        <Link href="/en/styleguide" locale={false}>
          Show in English
        </Link>
        <br />
        <Link href="/styleguide" locale="da-DK">
          Show in da-DK
        </Link>
      </p>

      <p>The current language is: {locale()}</p>
    </StyleguideSpecimen>
  );
};

export default withDatasourceCheck()<StyleguideMultilingualProps>(StyleguideMultilingual);
