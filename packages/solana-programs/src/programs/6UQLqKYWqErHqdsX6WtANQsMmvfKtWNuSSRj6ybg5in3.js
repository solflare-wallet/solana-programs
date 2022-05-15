const instruction = {
    0: 'setProfileNFT',
    1: 'unsetProfileNFT'
};

const accountsMap = {
    'setProfileNFT': [{
        name: 'signer',
        writable: false,
        signer: true,
    }, {
        name: 'nft_profile_picture_pda',
        writable: true,
        signer: false,
    }, {
        name: 'nft_mint',
        writable: false,
        signer: false,
    }, {
        name: 'nft_token_account',
        writable: false,
        signer: false,
    }, {
        name: 'nft_metadata',
        writable: false,
        signer: false,
    }, {
        name: 'clock_sysvar',
        writable: false,
        signer: false,
    }, {
        name: 'system_program',
        writable: false,
        signer: false,
    }],
    'unsetProfileNFT': [{
        name: 'signer',
        writable: false,
        signer: true,
    }, {
        name: 'nft_profile_picture_pda',
        writable: true,
        signer: false,
    }]
};

(({ accounts, data }, { typeParser }, { bufferLayout, decode }) => {
    const { type } = typeParser(data, instruction);

    const ixLayouts = {
        'setProfileNFT': bufferLayout.struct([
            bufferLayout.u8('instructionType'),
        ]),
        'unsetProfileNFT': bufferLayout.struct([
            bufferLayout.u8('instructionType')
        ])
    };

    const b58decodedBuff = decode(data);
    const layout = ixLayouts[type];
    const parsedIx = layout.decode(b58decodedBuff);
    const info = { ...parsedIx };

    const ixAccounts = accountsMap[type];
    ixAccounts.forEach((acc, index) => info[acc.name] = accounts[index]);

    return { type, info }
})(d, h, m);
