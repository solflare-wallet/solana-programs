const instructions = [
    'mercurialExchange',
    'saberExchange',
    'saberAddDecimalsDeposit',
    'saberAddDecimalsWithdraw',
    'serumSwap',
    'market',
    'tokenSwap',
    'stepTokenSwap',
    'cropperTokenSwap',
    'raydiumSwap',
    'raydiumSwapV2',
    'aldrinSwap',
    'aldrinV2Swap',
    'riskCheckAndFee',
    'initializeTokenLedger',
    'setTokenLedger',
    'createOpenOrders',
];

(({ data }, { sighash }, { decode }) => {
    const jupiterMap = new Map();
    for (const instruction of instructions) {
        const hash = sighash(instruction).toString('hex');
        jupiterMap.set(hash, instruction);
    }

    const parser = (data) => {
        try {

            /**
             * Decode data from 58 string
             */
            const b58decodedBuff = decode(data);

            /**
             * Take first eight bytes to determine instruction
             */
            const type = jupiterMap.get(b58decodedBuff.slice(0, 8).toString('hex'));

            return { type };
        } catch (error) {
            console.error(error);
            return { type: 'unknown' };
        }

    };

    return parser(data);
})(d, h, m);
