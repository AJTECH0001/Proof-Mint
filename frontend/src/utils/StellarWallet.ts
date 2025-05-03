import {
    StellarWalletsKit,
    WalletNetwork,
    AlbedoModule,
    FreighterModule,
    RabetModule,
    xBullModule,
  } from '@creit.tech/stellar-wallets-kit';
  
  const kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET, // TESTNET for development
    selectedWalletId: 'freighter', // Default to Freighter
    modules: [
      new AlbedoModule(),
      new FreighterModule(),
      new RabetModule(),
      new xBullModule(),
    ],
  });
  
  export default kit;