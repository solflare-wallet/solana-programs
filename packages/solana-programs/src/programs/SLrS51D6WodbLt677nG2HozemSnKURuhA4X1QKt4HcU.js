const instruction = {
    0: 'createStakeAccount',
    1: 'topupStakeAccount',
    2: 'withdrawRewards',
    3: 'withdrawPrincipal',
};

(({ data }, { typeParser }) => {
    return typeParser(data, instruction);
})(d, h, m);
