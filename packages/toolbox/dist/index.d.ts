import { Logger as Logger$1 } from 'pino';

declare function getString(key: string, defaultValue: string): string;

declare function getListenAddr(key: string, defaultValue: string): {
    host: string;
    port: number;
};

declare function getBoolean(key: string, defaultValue: boolean): boolean;

declare function getEnum(key: string, values: string[], defaultValue: string): string;

declare function getNumber(key: string, defaultValue: number): number;

declare const logger: Logger$1<{
    transport: {
        target: string;
        options: {
            colorize: boolean;
        };
    };
}>;
type Logger = Logger$1;

type Signal = 'SIGINT' | 'SIGTERM';
declare function waitForSignal(signals: Signal[]): Promise<string>;

declare const wait: (d: number) => Promise<unknown>;

export { Logger, getBoolean, getEnum, getListenAddr, getNumber, getString, logger, wait, waitForSignal };
