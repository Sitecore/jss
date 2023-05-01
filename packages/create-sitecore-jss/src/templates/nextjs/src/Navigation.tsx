const Navigation = (): JSX.Element => (
  <div>
    <nav>
      <ul>
        <li>
          <a href="https://sitecore.com">
            <img src={`/sc_logo.svg`} alt="Sitecore" />
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
