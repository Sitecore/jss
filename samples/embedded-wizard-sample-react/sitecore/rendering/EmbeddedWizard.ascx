<%@ Control Language="c#" AutoEventWireup="true" TargetSchema="http://schemas.microsoft.com/intellisense/ie5" %>

<%
    if (Sitecore.Context.PageMode.IsExperienceEditor) {
%>
        <div>
            <h3>Embedded Wizard</h3>
            <p>Open the wizard app routes directly to edit.</p>
        </div>
<%
    } else {
%>
        <!-- You should include these dynamically somehow in header/footer -->
        <link rel="stylesheet" href="/dist/EmbeddedWizard/client.css" type="text/css" />
        <script src="/dist/EmbeddedWizard/vendor-client.bundle.js"></script>
        <script src="/dist/EmbeddedWizard/client.bundle.js"></script>

        <div id="wizard-app" />
<%
    }
%>