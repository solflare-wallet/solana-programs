import { fetch } from 'cross-fetch';
import { createContext, Script } from 'vm';
import { u8 } from '@solana/buffer-layout';
import { decode } from 'bs58';
import { snakeCase } from 'snake-case';
import { sha256 } from 'js-sha256';

const sighash = (ixName: string): Buffer => {
    const name = snakeCase(ixName);
    const preImage = `global:${name}`;
    return Buffer.from(sha256.digest(preImage)).slice(0, 8);
};

const instructionParser = (data: any, instruction: any) => {
    const b58decodedBuff = decode(data);
    let instructionType;

    try {
        const layout = u8('instruction');
        instructionType = layout.decode(b58decodedBuff);
        const type = instruction[instructionType] || instructionType;
        return { type };
    } catch (error) {
        console.error(error);
        return { type: 'unknown' };
    }
};

export class ParserFactory {
    public path?: string

    constructor(repository: string) {
        this.path = repository;
    }

    async createParser(parserPath: string) {

        if (parserPath) {
            this.path += parserPath;
        } else {
            this.path = undefined;
        }

        if (this.path) {
            try {
                const response = await fetch(this.path);
                const text = await response.text();
                const script = new Script(text,  { filename: this.path });
                const helpers = { instructionParser, sighash };
                const modules = { u8, decode, snakeCase, sha256 };

                return (data: any) => {
                    const context = createContext({
                        d: data,
                        h: helpers,
                        m: modules
                    });

                    return script.runInNewContext(context);
                };
            } catch (error) {
                console.error(error);
            }
        }

        return () => {
            throw new Error('Parser not found')
        };
    }
}
