const instruction = {
    0: 'initialize',
    1: 'swap',
    2: 'deposit',
    3: 'withdraw'
};

((data, { instructionParser }) => {
    return instructionParser(data, instruction);
})(d, h, m);

