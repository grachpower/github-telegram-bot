import { Http } from 'request/request';
import { Observable } from 'rxjs';

export class GithubApi {
    private readonly baseUrl: string = 'https://api.github.com/';
    private authToken: any;

    constructor(
        private clientId: string,
        private clientSecret: string,
    ) { }

    public getPullRequests(owner: string, repository: string): Observable<string[]> {
        return Http.get<string[]>(`${this.baseUrl}repos/${owner}/${repository}/pulls`, {
            params: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
            }
        });
    }
}
