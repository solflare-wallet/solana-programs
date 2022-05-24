const instruction = {
    0: 'initialize',
    1: 'deposit',
    2: 'withdraw',
    3: 'updatePool',
    7: 'emergencyWithdraw',
    10: 'createAssociatedAccount',
    11: 'depositV2',
    12: 'WithdrawV2',
};

(({ data }, { typeParser }) => {
    return typeParser(data, instruction);
})(d, h, m);

