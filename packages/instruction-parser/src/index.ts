import { ProgramInfo, ParserFactory } from '@solflare-wallet/solana-programs';

type Parser = (data: unknown) => unknown;
document.body.style.backgroundColor = '#0f0f0faa';
document.body.style.color = '#00f000';
const root = document.getElementById('root');
const parserMap = new Map<string, Parser>();
const parserPromises = new Map<string, Promise<Parser>>();
const parserResolves = new Map<string, Parser>();
let programMap = new Map<string, ProgramInfo>();

function render(message: string) {
	setTimeout(() => {
		const html = document.body.parentElement;
		html.scrollTop = html.scrollHeight;
	}, 300);

	root.innerText += '\n' + message;
}

/**
 * @param programId pubkey of the program
 * @returns `ProgramInfo` object
 * @description Returns `ProgramInfo` object for the program with the given pubkey. 
 * If the program is not found, parser that returns `type: 'unknown` will be created in `createParser`.
 */
function getProgram(programId: string) {
	return programMap.get(programId) || ({
		parserFactory: {
			repository: null,
			createParser: async () => () => ({ type: 'unknown' }),
		} as ParserFactory,
	} as ProgramInfo);
}

function getParser(programId: string) {
	if (parserMap.has(programId)) {
		return parserMap.get(programId);
	} else if (parserPromises.has(programId)) {
		return parserPromises.get(programId);
	}

	return null;
}

function subscribeToMessages() {
	window.addEventListener('message', async (event) => {
		if (event.data.type === 'instruction') {
			const { accounts, instruction, id } = event.data.message;
			const { programId, data, parsed } = instruction;
			const program = getProgram(programId);

			if (parsed) {
				render('instruction already contains parsed data');
				program.parsed = parsed;
				parent.postMessage({ type: 'instruction', message: { id, programId, data: program } }, '*');
			} else {
				const parser = await getParser(programId);

				// use cached parser if it exists
				if (parser) {
					render('using cached parser');
					program.parsed = parser({ accounts, data });
					render('parsing data ... done');
				} else { // fetch parser from repository
					if (program.parserFactory) {
						const { parserFactory, hasParser } = program;
						render('creating parser ...');

						try {
							if (hasParser) {
								parserPromises.set(programId, new Promise((resolve) => parserResolves.set(programId, resolve)));
								const _parser = await parserFactory.createParser(`/src/programs/${programId}.js`, false);
								parserResolves.get(programId)(_parser);
								parserResolves.delete(programId);
								parserPromises.delete(programId);
								parserMap.set(programId, _parser);
								render('creating parser ... done');
								program.parsed = _parser({ accounts, data });
							} else {
								render('program does not have a parser');
								program.parsed = { type: 'unknown' };
							}

							render('parsing data ... done');
						} catch (error) {
							render('creating parser ... failed');
							render(error.message);
						}
					} else {
						render(`parser for ${programId} was not found`);
					}
				}

				const _data = { ...program };
				delete _data.parserFactory;
				parent.postMessage({ type: 'instruction', message: { id, programId, data: _data } }, '*');
			}
		}
	});
}

root.innerText = 'Instruction Parser';
render('waiting for the list of programs ...');

window.addEventListener('message', (event) => {
	if (event.data.type === 'setPrograms') {
		const { message: programs } = event.data;
		programMap = programs instanceof Map ? programs : new Map(Object.entries(programs));
		render('waiting for the list of programs ... done');

		render('creating parser factories ...');
		programMap.forEach((program) => {
			const parserFactory = new ParserFactory(REPOSITORY);
			program.parserFactory = parserFactory;
		});
		render('creating parser factories ... done');

		render('subscribing to message events ...');
		subscribeToMessages();
		render('subscribing to message events ... done');
	}
});

window.parent.postMessage({ type: 'ready' }, '*');
