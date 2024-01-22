import Link from 'next/link';
import { useI18n } from 'next-localization';
import config from 'temp/config';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = config.publicUrl;

const Navigation = (): JSX.Element => {
  const { t } = useI18n();

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom">
      <h5 className="my-0 me-md-auto fw-normal">
        <Link href="/" className="text-dark">
          <img src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" />
        </Link>
      </h5>
      <nav className="my-2 my-md-0 me-md-3">
        <a
          className="p-2 text-dark"
          href="https://jss.sitecore.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Documentation')}
        </a>
        <Link className="p-2 text-dark" href="/styleguide">
          {t('Styleguide')}
        </Link>
        <Link className="p-2 text-dark" href="/graphql">
          {t('GraphQL')}
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
