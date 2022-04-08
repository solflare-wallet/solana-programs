const instruction = {
    0: 'initialize',
    1: 'swap',
    2: 'deposit',
    3: 'withdraw'
};

(({ data }, { typeParser }) => {
    return typeParser(data, instruction);
})(d, h, m);

