import { timer, throwError, BehaviorSubject } from 'rxjs';
import { switchMap, catchError, withLatestFrom } from 'rxjs/operators';

import { GithubApi } from './github-api/github-api';
import { PullRequestModel } from './github-api/models/pull-request.model';
import { TelegaApi } from './telegram-api/telegram-api';

const clientId = process.env.CLIENT_ID || 'f886512117bd29a53157';
const clientSecret = process.env.SECRET_ID || '94bb8b969439d4d88e6472568ee5dd1d7c1cf89f';
const ghOwner = process.env.OWNER || 'grachpower';
const repository = process.env.REPOSITORY || 'github-telegram-bot';
const botToken = process.env.BOT_TOKEN || '677568548:AAGeMPyjKQoR7b2rNWW89tXMecUD7CNlMDg';
const chatId = process.env.CHAT_ID || '160294069';

if (!clientId) {
    throw new Error('No github client ID defined');
}

if (!clientSecret) {
    throw new Error('No github client secret key defined');
}

if (!ghOwner) {
    throw new Error('No github owner provided');
}

if (!repository) {
    throw new Error('No github repository provided');
}

if (!botToken) {
    throw new Error('Bot token is not defined');
}

const ghApi = new GithubApi(clientId, clientSecret);
const telegaApi = new TelegaApi(chatId, botToken);

const pullRequests$ = new BehaviorSubject([]);

timer(0, 10000)
    .pipe(
        switchMap(() => ghApi.getPullRequests(ghOwner, repository)),
        catchError((err) => throwError(err)),
        withLatestFrom(pullRequests$),
    )
    .subscribe(([newPRs, prevPRs]: [PullRequestModel[], PullRequestModel[]]) => {
        const diff = comparePullRequests(prevPRs, newPRs);
        console.log(newPRs);

        diff.forEach((pr: PullRequestModel) => {
            const message = `Pull request "${pr.title}" was created from "${pr.head.ref}" into "${pr.base.ref}" by "${pr.user.login}" \n ${pr.html_url}`;
            telegaApi.sendMessageToChat(message)
                .subscribe();
        })

        pullRequests$.next(newPRs);
    });

function comparePullRequests(prevPullRequests: PullRequestModel[], currentRequests: PullRequestModel[]): PullRequestModel[] {
    return currentRequests
        .reduce((acc: PullRequestModel[], curr: PullRequestModel) => 
            prevPullRequests.find(pr => pr.id === curr.id) ? acc : [...acc, curr], []);
}