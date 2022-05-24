const instruction = {
    0: 'initialize',
    3: 'deposit',
    4: 'withdraw',
    9: 'swapBaseIn',
    10: 'preInitialize',
    11: 'swapBaseOut',
};

(({ data }, { typeParser }) => {
    return typeParser(data, instruction);
})(d, h, m);

