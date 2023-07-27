/**
 * This script is executed by .github/workflows/create_jira_issue.yml workflow
 */

const github = JSON.parse(process.env.GITHUB);

const formatDescription = (description) => {
  const header = (text) =>
    Array.from(Array(6)).reduce((currText, _, i) => {
      return currText.replace(new RegExp(`^#{${i + 1}}\\s`, 'gm'), `h${i + 1}. `);
    }, text);

  const boldText = (text) => text.replace(/\*\*(.*)\*\*/gm, '*$1*');

  const quote = (text) => text.replace(/^>\s/gm, 'bq. ');

  const link = (text) => text.replace(/\[([^download].*)\]\((.*)\)/gm, '[$1|$2]');

  const image = (text) => text.replace(/!\[download\]\((.*)\)/gm, '!$1!');

  const codeBlock = (text) => text.replace(/```(\w+)([\s\S]*)```/gm, '{code:$1}$2{code}');

  const inlineCodeBlock = (text) => text.replace(/`([^`\n]+)`/gm, '{noformat}$1{noformat}');

  const comment = (text) => text.replace(/^<!---.*-->$/gm, '');

  return [header, boldText, quote, link, image, codeBlock, inlineCodeBlock, comment].reduce(
    (currText, fn) => fn(currText),
    description
  );
};

const JIRA_ISSUE_TYPE = Object.freeze([
  {
    type: 'bug',
    validate: (ev) => ev.issue && ev.issue.labels.some((l) => l.name.includes('bug')),
  },
  {
    type: 'PR',
    validate: (ev) => !!ev.pull_request,
  },
  {
    type: 'doc',
    validate: (ev) => ev.issue && ev.issue.labels.some((l) => l.name.includes('doc')),
  },
]);

(async () => {
  const jiraIssueType = JIRA_ISSUE_TYPE.find((o) => o.validate(github.event)).type;
  const event = github.event.issue || github.event.pull_request;

  let userInfoRes;
  try {
    userInfoRes = await fetch(
      `https://api.github.com/repos/${github.event.repository.owner.login}/${github.event.repository.name}/collaborators/${event.user.login}/permission`,
      {
        headers: {
          Authorization: `Bearer ${github.token}`,
        },
      }
    );

    userInfoRes = await userInfoRes.json();
  } catch (error) {
    console.log('Error occurred while fetching user permission', error);
    process.exit(1);
  }

  // don't create Jira issue if PR is created by admin
  if (github.event.pull_request && userInfoRes.permission === 'admin') {
    console.log('Skipped Jira issue creation. The Pull Request was created by admin user.');
    return;
  }

  try {
    await fetch(process.env.JIRA_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          summary: event.title,
          description: formatDescription(event.body),
          link: event.html_url,
          type: jiraIssueType,
        },
      }),
    });
  } catch (error) {
    console.log('Error occurred while creating Jira issue', error);
    process.exit(1);
  }
})();
