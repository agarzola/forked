#!/usr/bin/env node
'use strict';

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _github = require('github');

var _github2 = _interopRequireDefault(_github);

var _githubUrlParse = require('github-url-parse');

var _githubUrlParse2 = _interopRequireDefault(_githubUrlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var github = new _github2.default({
    version: '3.0.0',
    protocol: 'https',
    host: 'api.github.com',
    timeout: 5000,
    headers: {
        'user-agent': 'forked'
    }
});

github.authenticate({
    type: 'oauth',
    token: process.env.FORKED_TOKEN
});

// const meta = parser(shell.exec('cat package.json | json repository.url').stdout)

var pkg = _shelljs2.default.cat('package.json');
var meta = void 0;
try {
    meta = JSON.parse(pkg).repository.url;
} catch (e) {
    throw new Error(e);
}

var index = (0, _githubUrlParse2.default)(meta).repo.indexOf('.git');
if (index !== -1) {
    meta.repo = meta.repo.slice(0, index);
}

// github.repos.fork({
//   user: meta.user,
//   repo: meta.repo,
// }, (err, res) => {
//   if (err) {
//     console.log('Hrmm, looks like something went wrong')
//   } else {
//     console.log('Hey it worked!')
//   }
// })

_shelljs2.default.exec('git init && git add . && git commit -m "FORKED_COMMIT" && git push -u origin master');