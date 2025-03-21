const github = JSON.parse(process.env.GITHUB);

/**
 * Transforms a payload object into a Teams message card format.
 *
 * @param {Object} payload - The payload object containing release information.
 */
function transformPayload(payload) {
  const title = `JSS Release: ${payload.tag_name}`;
  const releaseUrl = payload.html_url;
  const publishedBy = payload.author.login;
  const body = payload.body;

  const teamsPayload = {
    '@type': 'MessageCard',
    '@context': 'http://schema.org/extensions',
    themeColor: '0076D7',
    title: title,
    text: `**Release:** ${releaseUrl}\n\n**Published by:** ${publishedBy}\n\n**Changelog:**\n\n${body}`,
  };
  return teamsPayload;
}

(async () => {
  if (!process.env.TEAMS_WEBHOOK_URL) {
    console.log('Skipped teams notification about release.');
    return;
  }

  const event = github.event.release;

  try {
    await fetch(process.env.TEAMS_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify({
        ...transformPayload(event),
      }),
    });
  } catch (error) {
    console.log('Error occurred while trying to post on teams channel', error);
    process.exit(1);
  }
})();
