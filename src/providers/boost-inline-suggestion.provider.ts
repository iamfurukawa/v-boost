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
import VBoostService, { Message } from '../services/vboost.service';

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
            return emptyResponse;
        }

        const editor = vscode.window.activeTextEditor;

        if (!editor)
            return emptyResponse;

        const language = document.languageId;
        const line = editor.selection.active.line;
        const lineContent = document.lineAt(line).text;

        //Outra ideia de prompt
        const prompt = `Considering that:
            1) I need an answer that contains only code;
            2) The answer should have only the code completion, without the code snippet that I sent to you;
            3) You answer must have only the missing part of the code;

            Please provide de completion for the following ${language} function:
            ${lineContent} # Write the rest of the function here`;
        
        const { responses } = await VBoostService.complete([
            {
                role: 'system',
                content: `You are a ${language} programming language expert.`
            },
            {
                role: "user",
                content: `Please consider this file: ${document.getText()}`,
            },
            {
                role: "user",
                content: `Please complete the code, only return the completed part without formmating and remove spaces, keep the format and ensure normal operation. No explanation needed. Code to complete after that: ${lineContent}`,
            },
        ] satisfies Message[]);

        result.items.push({
            insertText: responses[0]
        });

        return result;
    }
}