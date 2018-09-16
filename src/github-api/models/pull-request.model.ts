import { PrStateTypes } from '../config/pr-state-types';
import { BrachInterface } from './branch.model';

export class PullRequestModel {
    public id: number;
    public url: string;
    public number: number;
    public state: PrStateTypes;
    public title: string;
    public body: string;
    public head: BrachInterface;
    public base: BrachInterface;

    constructor(params?) {
        Object.assign(this, params);
    }
}
