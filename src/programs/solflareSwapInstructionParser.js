const instruction = {
    0: 'swapDirect',
    3: 'swapTransitive'
};

((data, { instructionParser }) => {
    return instructionParser(data, instruction);
})(d, h, m);

