'<%- appName %>'
'<%- destination %>'
'<%- fetchWith %>'
'<%- prerender %>'
'<%- hostName %>'

<% if (prerender === 'SSG') { %>
  "Prerender is SSG"
<% } else if (prerender === 'SSR') { %>
  "Prerender is SSR"
<% } %>