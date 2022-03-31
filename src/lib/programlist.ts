import { fetch } from 'cross-fetch';
import tokenlist from './../programs/solana.programlist.json';

export enum ENV {
    MainnetBeta = 101,
    Testnet = 102,
    Devnet = 103,
}

export enum Strategy {
    GitHub = 'GitHub',
    Static = 'Static',
    // Solana = 'Solana',
    // CDN = 'CDN',
}

export interface TagDetails {
    readonly name: string;
    readonly description: string;
}

export interface ProgramListItem {
    readonly name: string;
    readonly logoURI: string;
    readonly tags: { [tag: string]: TagDetails };
    readonly programs: ProgramInfo[];
}

export interface ProgramInfo {
    readonly chainId: number;
    readonly address: string;
    readonly name: string;
    readonly logoURI?: string;
    readonly tags?: string[];
    readonly extensions?: ProgramExtension;
}

export interface ProgramExtension {
    readonly website?: string;
    readonly address?: string;
    readonly github?: string;
    readonly imageUrl?: string;
    readonly description?: string;
}

export type ProgramInfoMap = { [chainId: number]: ProgramInfo };

export const CLUSTER_SLUGS: { [chain: string]: ENV } = {
    'mainnet-beta': ENV.MainnetBeta,
    'testnet': ENV.Testnet,
    'devnet': ENV.Devnet,
}

export interface ProgramListResolutionStrategy {
    readonly repositories: string[];
    resolve(): Promise<ProgramInfo[]>;
}

export class GitHubProgramListResolutionStrategy implements ProgramListResolutionStrategy {
    readonly repositories: string[] = [];

    resolve = () => {
        return queryJsonFiles(this.repositories);
    };
}

export class StaticProgramListResolutionStrategy implements ProgramListResolutionStrategy {
    readonly repositories: string[] = [];

    resolve = () => {
        return Promise.resolve(tokenlist.programs as ProgramInfo[]);
    };
}

const queryJsonFiles = async (files: string[]) => {
    const responses: ProgramListItem[] = (await Promise.all(
        files.map(async (repo) => {
            try {
                const response = await fetch(repo);
                const json = (await response.json()) as ProgramListItem;
                return json;
            } catch {
                console.info(
                    `@solana/program-registry: falling back to static repository.`
                );
                return tokenlist;
            }
        })
    )) as ProgramListItem[];

    return responses
        .map((tokenlist: ProgramListItem) => tokenlist.programs)
        .reduce((acc, arr) => (acc as ProgramInfo[]).concat(arr), []);
};

export class ProgramListProvider {
    static strategies = {
        [Strategy.GitHub]: new GitHubProgramListResolutionStrategy(),
        [Strategy.Static]: new StaticProgramListResolutionStrategy(),
    };

    resolve = async (strategy: Strategy): Promise<ProgramInfoMap> => {
        const programs = await ProgramListProvider.strategies[strategy].resolve();
        return programs.reduce((acc, program) => {
            acc[program.chainId] = program;
            return acc;
        }, {} as ProgramInfoMap);
    }
}

export class ProgramListContainer {
    constructor(private programList: ProgramInfo[]) { }

    filterByTag = (tag: string) => {
        return new ProgramListContainer(
            this.programList.filter((item) => (item.tags || []).includes(tag))
        );
    };

    filterByChainId = (chainId: number | ENV) => {
        return new ProgramListContainer(
            this.programList.filter((item) => item.chainId === chainId)
        );
    };

    excludeByChainId = (chainId: number | ENV) => {
        return new ProgramListContainer(
            this.programList.filter((item) => item.chainId !== chainId)
        );
    };

    excludeByTag = (tag: string) => {
        return new ProgramListContainer(
            this.programList.filter((item) => !(item.tags || []).includes(tag))
        );
    };

    filterByClusterSlug = (slug: string) => {
        if (slug in CLUSTER_SLUGS) {
            return this.filterByChainId(CLUSTER_SLUGS[slug]);
        }
        throw new Error(
            `Unknown slug: ${slug}, please use one of ${Object.keys(CLUSTER_SLUGS)}`
        );
    };

    getList = () => {
        return this.programList;
    };
}
