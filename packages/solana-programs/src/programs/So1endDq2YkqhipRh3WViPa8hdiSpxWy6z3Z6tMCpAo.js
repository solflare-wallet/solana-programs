const instruction = {
    1: 'initLendingMarket',
    2: 'setLendingMarketOwner',
    3: 'initReserve',
    4: 'refreshReserve',
    5: 'depositReserveLiquidity',
    6: 'redeemReserveCollateral',
    7: 'initObligation',
    8: 'refreshObligation',
    9: 'depositObligationCollateral',
    10: 'withdrawObligationCollateral',
    11: 'borrowObligationLiquidity',
    12: 'repayObligationLiquidity',
    13: 'liquidateObligation',
    14: 'flashLoan',
    15: 'depositReserveLiquidityAndObligationCollateral',
    16: 'withdrawObligationCollateralAndRedeemReserveCollateral'
};

(({ data }, { typeParser }) => {
    return typeParser(data, instruction);
})(d, h, m);

