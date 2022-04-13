import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

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
