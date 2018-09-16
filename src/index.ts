import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GithubApi } from 'github-api/github-api';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.SECRET_ID;
const ghOwner = process.env.OWNER;
const repository = process.env.REPOSITORY;

const ghApi = new GithubApi(clientId, clientSecret);

timer(0, 5000)
    .pipe(
        switchMap(() => ghApi.getPullRequests(ghOwner, repository)),
    )
    .subscribe((res: any) => {
        console.log(res);
    });
