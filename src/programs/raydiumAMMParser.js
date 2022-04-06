const instruction = {
    0: 'initialize',
    3: 'deposit',
    4: 'withdraw',
    9: 'swapBaseIn',
    10: 'preInitialize',
    11: 'swapBaseOut',
};

((data, { instructionParser }) => {
    return instructionParser(data, instruction);
})(d, h, m);

