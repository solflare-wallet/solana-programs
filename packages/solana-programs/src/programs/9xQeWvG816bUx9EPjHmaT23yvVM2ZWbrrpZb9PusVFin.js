const instruction = {
    0: 'initializeMarket',
    1: 'newOrder',
    2: 'matchOrders',
    3: 'consumeEvents',
    4: 'cancelOrder',
    5: 'settleFunds',
    6: 'cancelOrderByClientId',
    7: 'disableMarket',
    8: 'sweepFees',
    9: 'newOrderV2',
    10: 'newOrderV3',
    11: 'cancelOrderV2',
    12: 'cancelOrderByClientIdV2',
    13: 'sendTake',
    14: 'closeOpenOrders',
    15: 'initOpenOrders',
    16: 'prune',
    17: 'consumeEventsPermissioned',
    18: 'cancelOrdersByClientIds',
    19: 'replaceOrderByClientId',
    20: 'replaceOrdersByClientIds',
};

(({ data }, { typeParser }) => {
    return typeParser(data, instruction);
})(d, h, m);
