import * as vscode from 'vscode';
import { 
    CancellationToken, 
    InlineCompletionContext, 
    InlineCompletionItem, 
    InlineCompletionItemProvider, 
    InlineCompletionList, 
    Position, 
    ProviderResult, 
    TextDocument 
} from 'vscode';

import { sleep } from '../sleep';

export default class InlineSuggestionProvider implements InlineCompletionItemProvider {

    private latestTimestamp: number = 0;

    //@ts-ignore because ASYNC and PROMISE
    public async provideInlineCompletionItems(document: TextDocument, position: Position, context: InlineCompletionContext, token: CancellationToken): ProviderResult<InlineCompletionItem[] | InlineCompletionList> {
        const emptyResponse = Promise.resolve([] as InlineCompletionItem[]);
        const result: vscode.InlineCompletionList = {
            items: [],
        };

        const currentTimestamp = Date.now();
        this.latestTimestamp = currentTimestamp;

        await sleep(3);
        if (currentTimestamp < this.latestTimestamp) {
            console.log(currentTimestamp, this.latestTimestamp)
            return emptyResponse;
        }

        result.items.push({
            insertText: "**** I'm not a pilot ****\ntesteeee caraioa"
        });

        return result;
    }
}