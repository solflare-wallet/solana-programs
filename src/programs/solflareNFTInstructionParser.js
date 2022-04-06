const instruction = {
    0: 'setProfileNFT',
    1: 'unsetProfileNFT'
};

((data, { instructionParser }) => {
    return instructionParser(data, instruction);
})(d, h, m);

