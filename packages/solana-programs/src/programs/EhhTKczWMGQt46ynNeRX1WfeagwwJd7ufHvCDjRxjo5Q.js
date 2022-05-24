const instruction = {
    0: 'initialize',
    1: 'deposit',
    2: 'withdraw',
    3: 'updatePool',
    7: 'emergencyWithdraw',
    9: 'createAssociatedAccount',
    10: 'depositV2',
    11: 'WithdrawV2',
};

(({ data }, { typeParser }) => {
    return typeParser(data, instruction);
})(d, h, m);

