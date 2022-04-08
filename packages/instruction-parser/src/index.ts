import { ProgramInfo, ProgramListProvider, Strategy } from 'solana-programs';

document.body.style.backgroundColor = '#0f0f0faa';
document.body.style.color = '#00f000';
const root = document.getElementById('root');
const parserMap = new Map<string, ({ accounts, data }: { accounts: string[], data: string | number }) => unknown>();
let programMap = new Map<string, ProgramInfo>();

function render(message: string) {
    setTimeout(() => {
        const html = document.body.parentElement;
        html.scrollTop = html.scrollHeight;
    }, 300);

    root.innerText += '\n' + message;
}

function subscribeToMessages() {
    window.addEventListener('message', async (event) => {
        if (event.data.type === 'instruction') {

            const { accounts, instruction, id } = event.data.message;
            const { programId, data, parsed } = instruction
            const program = programMap.get(programId) || {} as ProgramInfo;

            if (!program.address) {
                render(`program info for ${programId} was not found`);
            }

            if (parsed) {
                render('instruction already contains parsed data');
                program.parsed = parsed;
                parent.postMessage({ type: 'instruction', message: { id, programId, data: program } }, '*');
            } else {
                const parser = parserMap.get(programId);

                if (parser) {
                    program.parsed = parser({ accounts, data });
                    render('parsing data ... done');
                } else {
                    if (program.parserFactory) {
                        const { parserFactory } = program;
                        render('creating parser ...');

                        try {
                            const parser = await parserFactory.createParser(`/src/programs/${programId}.js`, false);
                            parserMap.set(programId, parser);
                            render('creating parser ... done');

                            program.parsed = parser({ accounts, data });
                            render('parsing data ... done');
                        } catch (error) {
                            render('creating parser ... failed');
                            render(error.message);
                        }
                    } else {
                        render('parserFactory not found');
                    }
                }

                parent.postMessage({ type: 'instruction', message: { id, programId, data: program } }, '*');
            }

        }
    });
}

root.innerText = 'Instruction Parser';
render('getting list of programs ...');

new ProgramListProvider()
    .resolve(Strategy.Localhost)
    .then(programs => {
        const programList = programs.filterByClusterSlug('mainnet-beta').getList();

        programMap = programList.reduce((map, item) => {
            map.set(item.address, item);
            return map;
        }, new Map());

        render('getting map of programs ... done');
        parent.postMessage({ type: 'programs', message: programMap }, '*');
        render('posted map of programs');

        render('subscribing to message events ...');
        subscribeToMessages();
        render('subscribing to message events ... done');
    });
