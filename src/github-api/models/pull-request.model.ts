import { Model, prop } from 'dects';
import { PrStateTypes } from '../config/pr-state-types';

@Model()
export class PullRequestModel {
    @prop public id: number;
    @prop public url: string;
    @prop public number: number;
    @prop public state: PrStateTypes;
    @prop public title: string;
    @prop public body: string;
    @prop public head: string;
    @prop public base: string;
}
