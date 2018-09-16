import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Http } from '../request/request';
import { PullRequestModel } from './models/pull-request.model';

export class GithubApi {
    private readonly baseUrl: string = 'https://api.github.com/';

    constructor(
        private clientId: string,
        private clientSecret: string,
        private owner: string,
        private repository: string,
    ) { }

    public getPullRequests(): Observable<PullRequestModel[]> {
        return Http.get<PullRequestModel[]>(`${this.baseUrl}repos/${this.owner}/${this.repository}/pulls`, {
            params: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
            }
        })
        .pipe(
            map((data: PullRequestModel[]) => data.map(pr => new PullRequestModel(pr))),
        );
    }

    public patchPullRequest(pullRequestNumber: string): Observable<PullRequestModel> {
        return Http.patch(`${this.baseUrl}repos/${this.owner}/${this.repository}/pulls/${pullRequestNumber}`, {
            params: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
            }
        })
        .pipe(
            map((data: PullRequestModel) => new PullRequestModel(data)),
        );
    }

    public getPullRequest(pullRequestNumber: number): Observable<PullRequestModel> {
        return Http.get(`${this.baseUrl}repos/${this.owner}/${this.repository}/pulls/${pullRequestNumber}`, {
            params: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
            }
        })
        .pipe(
            map((data: PullRequestModel) => new PullRequestModel(data)),
        );
    }
}
