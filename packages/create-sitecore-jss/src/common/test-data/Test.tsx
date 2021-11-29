const Test = (): JSX.Element => (
  <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3">
    <h1 className="display-2">Hello from <%- appName%></h1>
      <ul>
        <li><%- destination %></li>
        <li><%- fetchWith %></li>
        <li><%- prerender %></li>
        <li><%- hostName %></li>
      </ul>
  </div>
);

export default Test;
