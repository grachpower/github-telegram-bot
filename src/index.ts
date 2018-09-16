import { Observable, timer, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import Telegraf from 'telegraf';

import { GithubApi } from './github-api/github-api';

const clientId = process.env.CLIENT_ID || 'f886512117bd29a53157';
const clientSecret = process.env.SECRET_ID || '94bb8b969439d4d88e6472568ee5dd1d7c1cf89f';
const ghOwner = process.env.OWNER || 'grachpower';
const repository = process.env.REPOSITORY || 'github-telegram-bot';
const botToken = process.env.BOT_TOKEN || '677568548:AAGeMPyjKQoR7b2rNWW89tXMecUD7CNlMDg';

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
const bot = new Telegraf(botToken);

timer(0, 5000)
    .pipe(
        switchMap(() => ghApi.getPullRequests(ghOwner, repository)),
        catchError((err) => {
            console.log(err);
            return throwError(err);
        }),
    )
    .subscribe((res: any) => {
        console.log(res);
    });
