const instruction = {
    0: 'swapDirect',
    3: 'swapTransitive'
};

(({ data }, { typeParser }) => {
    return typeParser(data, instruction);
})(d, h, m);

