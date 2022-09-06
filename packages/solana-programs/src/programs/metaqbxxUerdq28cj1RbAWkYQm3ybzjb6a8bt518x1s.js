const instruction = [
  "CreateMetadataAccount",
  "UpdateMetadataAccount",
  "DeprecatedCreateMasterEdition",
  "DeprecatedMintNewEditionFromMasterEditionViaPrintingToken",
  "UpdatePrimarySaleHappenedViaToken",
  "DeprecatedSetReservationList",
  "DeprecatedCreateReservationList",
  "SignMetadata",
  "DeprecatedMintPrintingTokensViaToken",
  "DeprecatedMintPrintingTokens",
  "CreateMasterEdition",
  "MintNewEditionFromMasterEditionViaToken",
  "ConvertMasterEditionV1ToV2",
  "MintNewEditionFromMasterEditionViaVaultProxy",
  "PuffMetadata",
  "UpdateMetadataAccountV2",
  "CreateMetadataAccountV2",
  "CreateMasterEditionV3",
  "VerifyCollection",
  "Utilize",
  "ApproveUseAuthority",
  "RevokeUseAuthority",
  "UnverifyCollection",
  "ApproveCollectionAuthority",
  "RevokeCollectionAuthority",
  "SetAndVerifyCollection",
  "FreezeDelegatedAccount",
  "ThawDelegatedAccount",
  "RemoveCreatorVerification",
  "BurnNft",
  "VerifySizedCollectionItem",
  "UnverifySizedCollectionItem",
  "SetAndVerifySizedCollectionItem",
  "CreateMetadataAccountV3",
  "SetCollectionSize",
  "SetTokenStandard",
  "BubblegumSetCollectionSize",
];

(({ data }, { typeParser }) => {
  return typeParser(data, instruction);
})(d, h, m);