const { execSync } = require('child_process');
const { randomUUID } = require('crypto');

const hash = randomUUID().slice(0, 7);
const numberOfPrsToCreate = +process.argv[2] || 5;
const projectDirectories = [
  `app/admin/src`,
  `app/admin-data-api/src`,
  `app/admin-dispatch-api/src`,
  `app/user/src`,
  `app/user-data-api/src`,
  `app/user-dispatch-api/src`,
  `libs/admin-data-client/src`,
  `libs/admin-dispatch-client/src`,
  `libs/app-state/src`,
  `libs/events/src`,
  `libs/redis-dispatcher/src`,
  `libs/redis-event-stream/src`,
  `libs/supabase-dispatcher/src`,
  `libs/supabase-event-stream/src`,
  `libs/user-data-client/src`,
  `libs/user-dispatch-client/src`,
];

function createBranch(i) {
  execSync(`git checkout -b pr-${hash}-${i}`);
}

function addFile(i) {
  const randomIndex = Math.floor(Math.random() * projectDirectories.length);
  execSync(`touch ${projectDirectories[randomIndex]}/${hash}-${i}.js`);
}

function commit(i) {
  execSync(`git add . && git commit -m "feat: add ${hash}-${i}.js"`);
}

function push(i) {
  execSync(`git push real pr-${hash}-${i}`);
}

function openPr(i) {
  execSync(
    `gh pr create --title "feat: add ${hash}-${i}.js" --body "This PR adds ${hash}-${i}.js" --base main --head pr-${hash}-${i}`
  );
}

for (let i = 0; i < numberOfPrsToCreate; i++) {
  try {
    createBranch(i);
    addFile(i);
    commit(i);
    push(i);
    openPr(i);
  } catch (e) {
    console.error(`unable to create pr #${i}`);
  }
}
