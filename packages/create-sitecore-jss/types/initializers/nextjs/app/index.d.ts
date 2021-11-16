import { Generator, GenerateArgs, Answer } from '../models';
export declare class NextjsGenerator implements Generator {
    promptUser(): Promise<Answer>;
    generate(args: GenerateArgs): Promise<void>;
}
