const instruction = {
    0: 'createAuction',
    1: 'bidding',
    2: 'closeAuction',
    3: 'cancelBid',
    4: 'putForSale',
    5: 'buy',
    6: 'updatePrice',
};

((data, { instructionParser }) => {
    return instructionParser(data, instruction);
})(d, h, m);

