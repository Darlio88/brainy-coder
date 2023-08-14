export interface IChallenge {
    title: string;
    description: string;
    output: string;
    creator: string;
    functionDefinition: string;
    accepts?: number;
}
