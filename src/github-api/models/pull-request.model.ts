import { PrStateTypes } from '../config/pr-state-types';
import { BrachInterface } from './branch.model';
import { UserModel } from './user.model';

export class PullRequestModel {
    public id: number;
    public url: string;
    public number: number;
    public state: PrStateTypes;
    public title: string;
    public body: string;
    public head: BrachInterface;
    public base: BrachInterface;
    public requested_reviewers: any[];
    public user: UserModel;
    public html_url: string;
    public merged: boolean;

    constructor(params?) {
        Object.assign(this, params);
    }
}
