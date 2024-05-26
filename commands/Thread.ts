import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import {
    ISlashCommand,
    SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

export class ThreadInit implements ISlashCommand {
    public command = 'scrum';
    public i18nParamsExample: string = 'agile_scrum_init';
    public i18nDescription: string = 'agile_scrum_init_description';
    public providesPreview: boolean = false;
   
    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const user = context.getSender();
        const room: IRoom = context.getRoom();
       
        const message = "@all **Biweekly update time! ** \n\n 1. What have you been working on? \n 2. Blockers? \n 3. Next plans?";
        await this.sendMessageToRoom(room, modify, user, message);
    }
   
    private async sendMessageToRoom(room: IRoom, modify: IModify, sender: IUser, message: string): Promise<void> {
        const messageBuilder = modify.getCreator().startMessage();
        messageBuilder.setText(message);
        messageBuilder.setRoom(room);
        messageBuilder.setSender(sender);
        await modify.getCreator().finish(messageBuilder);
    }
}
