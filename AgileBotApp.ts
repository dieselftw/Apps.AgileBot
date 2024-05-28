import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { SummarizeCommand } from "./commands/Summarize";
import { ThreadInit } from "./commands/Thread";
import { AppSettingsEnum, settings } from "./settings";
import { ISetting } from "@rocket.chat/apps-engine/definition/settings";

export class AgileBotApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async extendConfiguration(configuration: IConfigurationExtend) {
        configuration.slashCommands.provideSlashCommand(new SummarizeCommand());
        configuration.slashCommands.provideSlashCommand(new ThreadInit());

        await Promise.all(
            settings.map((setting) =>
                configuration.settings.provideSetting(setting)
            )
        );
    }
}
