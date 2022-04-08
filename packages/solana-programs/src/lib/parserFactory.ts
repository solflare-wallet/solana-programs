import { fetch } from 'cross-fetch';
import { createContext, Script } from 'vm';
import * as bufferLayout from '@solana/buffer-layout';
import { decode } from 'bs58';
import { snakeCase } from 'snake-case';
import { sha256 } from 'js-sha256';

const sighash = (ixName: string): Buffer => {
    const name = snakeCase(ixName);
    const preImage = `global:${name}`;
    return Buffer.from(sha256.digest(preImage)).slice(0, 8);
};

const typeParser = (data: any, instruction: any) => {
    const b58decodedBuff = decode(data);
    let instructionType;

    try {
        const layout = bufferLayout.u8('instruction');
        instructionType = layout.decode(b58decodedBuff);
        const type = instruction[instructionType] || instructionType;
        return { type };
    } catch (error) {
        console.error(error);
        return { type: 'unknown' };
    }
};

export class ParserFactory {

    constructor(public repository: string) { }

    async createParser(parserPath: string, runInNewContext = true) {
        if (this.repository) {
            try {
                const response = await fetch(this.repository + parserPath);
                const text = await response.text();
                const script = new Script(text);
                const helpers = { typeParser, sighash };
                const modules = { bufferLayout, decode, snakeCase, sha256 };

                return (data: any) => {
                    const d = data;
                    const h = helpers;
                    const m = modules;
                    const context = createContext({ d, h, m });

                    if (runInNewContext) {
                        return script.runInNewContext(context);
                    } else {
                        return eval(text);
                    }
                };
            } catch (error) {
                console.error(error);
            }
        }

        return () => {
            throw new Error('Parser not found');
        };
    }
}
