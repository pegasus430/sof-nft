require('dotenv').config();

const FlokiNFTCollectionABI = require('../build/contracts/FlokiNFTCollection.json');
const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
const account = process.env.WALLET;

async function main() {
    const provider = new HDWalletProvider(
        process.env.MNEMONIC,
        "https://data-seed-prebsc-1-s1.binance.org:8545"
    );
    const web3Instance = new web3(provider);

    console.log("loading contract ...");
    const nftMinter = new web3Instance.eth.Contract(
        FlokiNFTCollectionABI.abi,
        process.env.NFT_CONTRACT_ADDRESS,
        { gasLimit: "1000000" }
    );

    console.log("registerMetadata...");
    await nftMinter.methods.registerMetadata(0, "https://ipfs.infura.io/ipfs/QmREs4YP1c9P91mK8sZgU3FHWKSgsazuwmtokyFHUsyGN8").send({from: account});

    await nftMinter.methods.registerMetadata(1, "https://ipfs.infura.io/ipfs/QmXLpyswRGci38RExizpya79DnpLU5GpUQwL6Wyw1BGVQV").send({from: account});
    await nftMinter.methods.registerMetadata(1, "https://ipfs.infura.io/ipfs/QmUqMuMmGVmZeWuxjjbqys7u1UiGqoSAJAquNezVeSDKRH").send({from: account});
    await nftMinter.methods.registerMetadata(1, "https://ipfs.infura.io/ipfs/QmUQFByXKs8D6muHNZ3jmZfZFRnV94HoWphtzDVj3JsCo8").send({from: account});
    await nftMinter.methods.registerMetadata(1, "https://ipfs.infura.io/ipfs/QmfCGG2zzhkzpPapA5TDqKCa7ZbsoyjGQevcDvDmb4yAWD").send({from: account});

    await nftMinter.methods.registerMetadata(2, "https://ipfs.infura.io/ipfs/QmUDe5hpqqDfou36jVbpNTeVWENW5RqaATyuFofCxTAAVg").send({from: account});
    await nftMinter.methods.registerMetadata(2, "https://ipfs.infura.io/ipfs/QmdMKafm23nVtMssLch2SQAbA9ytPNxmB2XzTEvs2U3LHr").send({from: account});
    await nftMinter.methods.registerMetadata(2, "https://ipfs.infura.io/ipfs/Qmdtt55yBirFbzX5aiNc9hYN87EDgVbbGHL8ZoDW9vNSMo").send({from: account});
    await nftMinter.methods.registerMetadata(2, "https://ipfs.infura.io/ipfs/QmZMBddDidggQ1ssWYXKfgGwbxgo5Z2fzPCXzs5pGvNCqa").send({from: account});

    await nftMinter.methods.registerMetadata(3, "https://ipfs.infura.io/ipfs/QmYXEHFHiu5xNgRrUA2Rzz1iTMfrCYGjQgf2cVhtxNxUU4").send({from: account});
    await nftMinter.methods.registerMetadata(3, "https://ipfs.infura.io/ipfs/QmWKHBgHxBaL5WRsFfPY7p6KCMa1YNEkYFaU6z4giY1PxZ").send({from: account});
    await nftMinter.methods.registerMetadata(3, "https://ipfs.infura.io/ipfs/QmbXf1c46g36qg7XvAV27P47bCQsR1dDmFAagCJMGQmeGT").send({from: account});
    await nftMinter.methods.registerMetadata(3, "https://ipfs.infura.io/ipfs/QmYD1vdExGLAN2ibY8zMDnnCNdZpMhpmfRcGUNwo8vWV7H").send({from: account});

    await nftMinter.methods.registerMetadata(4, "https://ipfs.infura.io/ipfs/QmSPZZyBkFuEqevAWKyKZQPNZGd6M2SBSQR2SPs73ucGzG").send({from: account});

    await nftMinter.methods.registerMetadata(5, "https://ipfs.infura.io/ipfs/QmaeAx35K2gzcgDqTmTkYQRLwkySUrX4bHXdr7QuhsKUu6").send({from: account});

    console.log("setMaxMintCountPerAccount by 3...");
    await nftMinter.methods.setMaxMintCountPerAccount(3).send({from: account});

    console.log("setMaxMintCountPerTransaction by 4...");
    await nftMinter.methods.setMaxMintCountPerTransaction(4).send({from: account});

    console.log("mint...");
    await nftMinter.methods.mint().send({from: account});
    console.log("tokenURI without reveal...");
    console.log(await nftMinter.methods.tokenURI(1).call());
    console.log("reveal...");
    await nftMinter.methods.reveal(1).send({from: account});
    console.log("tokenURI with reveal...");
    console.log(await nftMinter.methods.tokenURI(1).call());

    console.log("mint again...");
    await nftMinter.methods.mint().send({from: account});

    console.log("batchMint by 5 for max mint/transaction...");
    let tx = nftMinter.methods.batchMint(5).send({from: account});
    let vv = await tx.catch(e => e.message);
    console.log(vv);

    console.log("batchMint by 5 for max mint/wallet...");
    tx = nftMinter.methods.batchMint(4).send({from: account});
    vv = await tx.catch(e => e.message);
    console.log(vv);
}

main();
