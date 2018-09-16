import { Http } from 'request/request';
import { Observable } from 'rxjs';
import { PullRequestModel } from './models/pull-request.model';

export class GithubApi {
    private readonly baseUrl: string = 'https://api.github.com/';

    constructor(
        private clientId: string,
        private clientSecret: string,
    ) { }

    public getPullRequests(owner: string, repository: string): Observable<PullRequestModel[]> {
        return Http.get<PullRequestModel[]>(`${this.baseUrl}repos/${owner}/${repository}/pulls`, {
            params: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
            }
        });
    }

    public patchPullRequest(owner: string, repository, pullRequestNumber): Observable<PullRequestModel> {
        return Http.patch(`${this.baseUrl}repos/${owner}/${repository}/pulls/${pullRequestNumber}`, {
            params: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
            }
        });
    }
}
