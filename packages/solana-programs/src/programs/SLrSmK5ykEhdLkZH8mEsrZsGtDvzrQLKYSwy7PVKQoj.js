const instruction = {
    0: 'initGlobalConfig',
    1: 'updateGlobalConfig',
    2: 'initOracleConfig',
    3: 'updateOracleConfig',
    4: 'initFund',
    5: 'updateFundState',
    6: 'addAsset',
    7: 'removeAsset',
    8: 'deposit',
    9: 'withdraw',
    10: 'exchange',
    11: 'closeAccount',
    12: 'settle',
    13: 'initCreditAccount',
    14: 'exchangeDirect',
    15: 'closeSettleAccount',
    16: 'initOpenOrders',
    17: 'splitInvestor',
    18: 'calculateExitValue',
    19: 'withdrawSettle',
    20: 'depositIntoCredit',
    21: 'creditDeposit',
    22: 'initialDeposit',
    24: 'exchangeDirectAMM',
    25: 'verifyCreditAccountBalance',
    26: 'exchangeRouteIn',
    27: 'exchangeRouteOut'
};

(({ data }, { typeParser }) => {
    return typeParser(data, instruction);
})(d, h, m);

