var ass = require('assert');
const Web3 = require('web3');

const web3 = new Web3('http://localhost:8555');
const toBN = web3.utils.toBN;

const FlokiNFTCollection = artifacts.require("FlokiNFTCollection");

contract("contract test", async accounts => {
    let FlokiNFTCollectionInst;
    before(async () => {
        FlokiNFTCollectionInst = await FlokiNFTCollection.deployed();
    })

    it("account log", () => {
        console.log("accounts: ", accounts);
    });

    // it("FlokiNFTCollectionInst registerMetadata", async () => {
    //     await FlokiNFTCollectionInst.registerMetadata(0, "https://ipfs.infura.io/ipfs/QmREs4YP1c9P91mK8sZgU3FHWKSgsazuwmtokyFHUsyGN8");

    //     await FlokiNFTCollectionInst.registerMetadata(1, "https://ipfs.infura.io/ipfs/QmXLpyswRGci38RExizpya79DnpLU5GpUQwL6Wyw1BGVQV");
    //     await FlokiNFTCollectionInst.registerMetadata(1, "https://ipfs.infura.io/ipfs/QmUqMuMmGVmZeWuxjjbqys7u1UiGqoSAJAquNezVeSDKRH");
    //     await FlokiNFTCollectionInst.registerMetadata(1, "https://ipfs.infura.io/ipfs/QmUQFByXKs8D6muHNZ3jmZfZFRnV94HoWphtzDVj3JsCo8");
    //     await FlokiNFTCollectionInst.registerMetadata(1, "https://ipfs.infura.io/ipfs/QmfCGG2zzhkzpPapA5TDqKCa7ZbsoyjGQevcDvDmb4yAWD");

    //     await FlokiNFTCollectionInst.registerMetadata(2, "https://ipfs.infura.io/ipfs/QmUDe5hpqqDfou36jVbpNTeVWENW5RqaATyuFofCxTAAVg");
    //     await FlokiNFTCollectionInst.registerMetadata(2, "https://ipfs.infura.io/ipfs/QmdMKafm23nVtMssLch2SQAbA9ytPNxmB2XzTEvs2U3LHr");
    //     await FlokiNFTCollectionInst.registerMetadata(2, "https://ipfs.infura.io/ipfs/Qmdtt55yBirFbzX5aiNc9hYN87EDgVbbGHL8ZoDW9vNSMo");
    //     await FlokiNFTCollectionInst.registerMetadata(2, "https://ipfs.infura.io/ipfs/QmZMBddDidggQ1ssWYXKfgGwbxgo5Z2fzPCXzs5pGvNCqa");

    //     await FlokiNFTCollectionInst.registerMetadata(3, "https://ipfs.infura.io/ipfs/QmYXEHFHiu5xNgRrUA2Rzz1iTMfrCYGjQgf2cVhtxNxUU4");
    //     await FlokiNFTCollectionInst.registerMetadata(3, "https://ipfs.infura.io/ipfs/QmWKHBgHxBaL5WRsFfPY7p6KCMa1YNEkYFaU6z4giY1PxZ");
    //     await FlokiNFTCollectionInst.registerMetadata(3, "https://ipfs.infura.io/ipfs/QmbXf1c46g36qg7XvAV27P47bCQsR1dDmFAagCJMGQmeGT");
    //     await FlokiNFTCollectionInst.registerMetadata(3, "https://ipfs.infura.io/ipfs/QmYD1vdExGLAN2ibY8zMDnnCNdZpMhpmfRcGUNwo8vWV7H");

    //     await FlokiNFTCollectionInst.registerMetadata(4, "https://ipfs.infura.io/ipfs/QmSPZZyBkFuEqevAWKyKZQPNZGd6M2SBSQR2SPs73ucGzG");

    //     await FlokiNFTCollectionInst.registerMetadata(5, "https://ipfs.infura.io/ipfs/QmaeAx35K2gzcgDqTmTkYQRLwkySUrX4bHXdr7QuhsKUu6");
    // })

    it("FlokiNFTCollectionInst setMaxMintCountPerAccount", async () => {
        await FlokiNFTCollectionInst.setMaxMintCountPerAccount(3);
    })

    it("FlokiNFTCollectionInst setMaxMintCountPerTransaction", async () => {
        await FlokiNFTCollectionInst.setMaxMintCountPerTransaction(4);
    })

    it("FlokiNFTCollectionInst mint test and reveal", async () => {
        await FlokiNFTCollectionInst.batchMint(1, { from: accounts[3] });
        console.log(await FlokiNFTCollectionInst.tokenURI(1));

        await FlokiNFTCollectionInst.reveal(1, { from: accounts[3] });
        console.log(await FlokiNFTCollectionInst.tokenURI(1));
        console.log((await FlokiNFTCollectionInst.balanceOf(accounts[3])).toNumber());
    })

    it("FlokiNFTCollectionInst max mint/transaction", async () => {
        await FlokiNFTCollectionInst.batchMint(3, { from: accounts[2] });
        let tx = FlokiNFTCollectionInst.batchMint(5, { from: accounts[2] });
        let vv = await tx.catch(e => e.message);
        console.log(vv);
    })

    it("FlokiNFTCollectionInst max mint/wallet", async () => {
        let tx = FlokiNFTCollectionInst.batchMint(4, { from: accounts[1] });
        let vv = await tx.catch(e => e.message);
        console.log(vv);
    })

    it("FlokiNFTCollectionInst feeRecipient check", async () => {
        await FlokiNFTCollectionInst.setMintFeeRecipient(accounts[5]);
        await FlokiNFTCollectionInst.setMintFee(toBN('2000000000000000000')); // 2 ether or BNB

        let vv = await web3.eth.getBalance(accounts[5]);
        console.log("fee recipient balance: ", vv.toString());

        let tx = FlokiNFTCollectionInst.batchMint(2, { from: accounts[7] });
        vv = await tx.catch(e => e.message);
        console.log(vv);

        vv = await web3.eth.getBalance(accounts[5]);
        console.log("fee recipient balance: ", vv.toString());

        tx = FlokiNFTCollectionInst.batchMint(2, { value: toBN('6300000000000000000'), from: accounts[7] });
        vv = await tx.catch(e => e.message);

        vv = await web3.eth.getBalance(accounts[5]);
        console.log("fee recipient balance: ", vv.toString());

        vv = await web3.eth.getBalance(accounts[7]);
        console.log("minter balance: ", vv.toString());
    })

    it("FlokiNFTCollectionInst rarity random mint", async () => {
        await FlokiNFTCollectionInst.setMaxMintCountPerAccount(0);
        await FlokiNFTCollectionInst.setMaxMintCountPerTransaction(0);

        ass.equal((await FlokiNFTCollectionInst.totalSupply()).toNumber(), 6);

        // let i, j;
        // for (j = 0; j < 29; j++) {
        //     for (i = 0; i < 10; i++) {
        //         await FlokiNFTCollectionInst.batchMint(10, { from: accounts[i] });
        //     }
        // }

        // for (j = 0; j < 9; j++) {
        //     for (i = 0; i < 10; i++) {
        //         await FlokiNFTCollectionInst.mint({ from: accounts[i] });
        //     }
        // }

        // for (i = 1; i < 10; i++) {
        //     await FlokiNFTCollectionInst.mint({ from: accounts[i] });
        // }

        // ass.equal((await FlokiNFTCollectionInst.totalSupply()).toNumber(), 3003);
    })

    it("FlokiNFTCollectionInst total balance", async () => {
        let i, total = (await FlokiNFTCollectionInst.totalSupply()).toNumber();
        for (i = 1; i <= total; i++) {
            let uri = await FlokiNFTCollectionInst.tokenURI(i);
            if ( uri === '' ) {
                await FlokiNFTCollectionInst.reveal(i, { from: await FlokiNFTCollectionInst.ownerOf(i) });
            }
            console.log(await FlokiNFTCollectionInst.tokenURI(i));
        }
    })
})
