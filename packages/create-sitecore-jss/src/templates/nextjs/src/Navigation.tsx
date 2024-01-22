import config from 'temp/config';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = config.publicUrl;

const Navigation = (): JSX.Element => (
  <div>
    <nav>
      <ul>
        <li>
          <a href="https://sitecore.com">
            <img src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" />
          </a>
        </li>
        <li>
          <a href="https://jss.sitecore.com">JSS Documentation</a>
        </li>
        <li>
          <a href="https://github.com/Sitecore/jss">JSS Repository</a>
        </li>
      </ul>
    </nav>
  </div>
);

export default Navigation;
