import {
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IPersistenceRead,
    IRead,
    IUIKitSurfaceViewParam,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import {
    ButtonStyle,
    IUIKitResponse,
    UIKitActionButtonInteractionContext,
    UIKitViewSubmitInteractionContext,
    UIKitInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";


import { RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";

export class AgileModal {

    public async executor(
        context: UIKitActionButtonInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify,
        logger: ILogger
    ): Promise<IUIKitResponse> {
        const { actionId, room, message } = context.getInteractionData();

        const blockBuilder = modify.getCreator().getBlockBuilder();

            blockBuilder.addInputBlock({
                blockId: 'input-block',
                element: blockBuilder.newPlainTextInputElement({
                    actionId: 'input-element',
                    placeholder: blockBuilder.newPlainTextObject('Enter message...'),
                    multiline: true,
                }),
                label: blockBuilder.newPlainTextObject('Scrum message'),
            });

            blockBuilder.addInputBlock({
                blockId: 'multi-select-block',
                element: blockBuilder.newMultiStaticElement({
                    actionId: 'multi-select-element',
                    placeholder: blockBuilder.newPlainTextObject('Choose options...'),
                    options: [
                        {
                            text: blockBuilder.newPlainTextObject('Monday'),
                            value: 'Monday',
                        },
                        {
                            text: blockBuilder.newPlainTextObject('Tuesday'),
                            value: 'Tuesday',
                        },
                        {
                            text: blockBuilder.newPlainTextObject('Wednesday'),
                            value: 'Wednesday',
                        },
                        {
                            text: blockBuilder.newPlainTextObject('Thursday'),
                            value: 'Thursday',
                        },
                        {
                            text: blockBuilder.newPlainTextObject('Friday'),
                            value: 'Friday',
                        },
                        {
                            text: blockBuilder.newPlainTextObject('Saturday'),
                            value: 'Saturday',
                        },
                        {
                            text: blockBuilder.newPlainTextObject('Sunday'),
                            value: 'Sunday',
                        },
                    ],
                }),
                label: blockBuilder.newPlainTextObject('Select days'),
            });

            blockBuilder.addInputBlock({
                blockId: 'time-block',
                element: blockBuilder.newPlainTextInputElement({
                    actionId: 'time-element',
                    placeholder: blockBuilder.newPlainTextObject('Enter time in 24hour format'),
                }),
                label: blockBuilder.newPlainTextObject('Time in UTC'),
            });

            blockBuilder.addActionsBlock({
                blockId: 'button-section',
                elements: [
                    blockBuilder.newButtonElement({
                        text: blockBuilder.newPlainTextObject('Cancel'),
                        actionId: 'cancel',
                    }),
                    blockBuilder.newButtonElement({
                        text: blockBuilder.newPlainTextObject('Submit'),
                        actionId: 'submit',
                        style: ButtonStyle.PRIMARY,
                    }),
                ],
            });
        
        if (actionId === "agile-modal") {
            return context.getInteractionResponder().openModalViewResponse({
                title: {
                    type:"plain_text",
                    text:"Agile Modal",
                },
                blocks: blockBuilder.getBlocks(),
            });
        }
        

        return context.getInteractionResponder().successResponse();
    }
}
