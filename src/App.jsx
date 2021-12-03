import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import buildspacelogo from './favicon.ico';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import myEpicNft from './utils/MyEpicNFT.json';
import {utils} from "ethers";
import Sound from 'react-sound';
import SongAmericanPsycho from './new-order-true-faith-american-psycho.mp3';


const TWITTER_HANDLE2 = '_buildspace';
const TWITTER_HANDLE = 'elKingRagnar';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_LINK2 = `https://twitter.com/${TWITTER_HANDLE2}`;
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/100nftchads-wxlocfoxnv';
const TOTAL_MINT_COUNT = 100;

const CONTRACT_ADDRESS = "0x4F422B0D665F48Df15d56ad5aAc6787F846Ac3F4";

const App = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [numberOFNFTs, setnumberOFNFTs] = useState("");
    const [nftsMinted, setNftsMinted] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
      } else {
          console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
					setCurrentAccount(account)
          
          // Setup listener! This is for the case where a user comes to our site
          // and ALREADY had their wallet connected + authorized.
          setupEventListener()
      } else {
          console.log("No authorized account found")
      }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener() 
    } catch (error) {
      console.log(error)
    }
  }



  const getTotalMinted = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
        console.log('Going to pop wallet now to pay gas...');
        const nftsMinted = await connectedContract.getTotalNFTsMintedSoFar();
        setNftsMinted(nftsMinted);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (err) {
      console.log(err)
    }
  }
  

  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

  
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        })
        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log("Mining...please wait.")
        await nftTxn.wait();
        console.log(nftTxn);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  const getTotalNFTsMintedSoFar = async () => {
    try {
         const { ethereum } = window;
   
         if (ethereum) {
           const provider = new ethers.providers.Web3Provider(ethereum);
           const signer = provider.getSigner();
           const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
   
           console.log("Going to pop wallet now to pay gas...")
           let numberOFNFTs = await connectedContract.getTotalNFTsMintedSoFar();
           console.log('returnedvalue is');
           console.log(parseInt(numberOFNFTs, 10));
           setnumberOFNFTs(parseInt(numberOFNFTs, 10));
           console.log('numberOFNFTs recuperated');
   
         } else {
           console.log("Ethereum object doesn't exist!");
         }
       } catch (error) {
         console.log(error)
       }

      }

      const PlaySound = ( 
        
        ) => {
      return (
          <div>
          <button onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? 'Play' : 'Stop'}</button>
          <sound
            url={SongAmericanPsycho}
            playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
            playFromPosition={100}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying} />
    </div>
      )
    }
     
  useEffect(() => {
        checkIfWalletIsConnected();
	       getTotalNFTsMintedSoFar();
        
    }, [])


  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect your wallet to discover
    </button>
  );

 const renderMintUI = () => (
    <button 
       onClick={askContractToMintNft} 
      className={`cta-button connect-wallet-button ${isMinting || nftsMinted >= TOTAL_MINT_COUNT ? 'cta-button-disabled' : ''}`}>
      {isMinting ? 'Minting...' : 'Mint'}
    </button>
  )

  const renderTotalMinted = () => {
    return (
      <div className="mintCountContainer">
        <div className="mintCountBadge">{`Minted: ${nftsMinted} / ${TOTAL_MINT_COUNT}`}</div>
      </div>
    )
  }


  return (
    <div className="App">
    <header className="sc-gKAaRy kslzvN"><div className="sc-fujyAs eysHZq"><a className="header-link" href="/"><span className="sc-kEqXSa jnaHXn">100NFTCHADS</span></a>
    <nav className="sc-pNWdM XJxhY"><a target="_blank" rel="noopener noreferrer" href={TWITTER_LINK} className="sc-jrsJWt dCEuUV">TWITTER
    </a>&nbsp;&nbsp;<a target="_blank" rel="noopener noreferrer" href={OPENSEA_LINK} className="sc-jrsJWt dCEuUV">OPENSEA</a>
    </nav>
    </div>
    </header>
      <div className="container">
        <div className="header-container">
        

  
  
    <h1 className="hero glitch layers" data-text="100NFTCHADS"><span>100NFTCHADS</span></h1><br />
          <p className="hero glitch layers" data-text="Which one you are?">
           Which one you are?
          </p>
          <br />
          <button className="cybr-btn">
         
           <span aria-hidden> {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}</span>
  <span aria-hidden className="cybr-btn__glitch"></span>
  <span aria-hidden className="cybr-btn__tag">007</span>
  
</button>
           
        </div>
        
        <div>
        <Sound 
          url={SongAmericanPsycho}
            playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
            playFromPosition={100}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}

        />
        
        {PlaySound}
        
        
        
        </div>
       <p className="nftcount"> NFT MINTED {numberOFNFTs}/100</p>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >By Lil Zloty</a>&nbsp;
           <a
            className="footer-text"
            href={TWITTER_LINK2}
            target="_blank"
            rel="noreferrer"
          >{`and @${TWITTER_HANDLE2}`}</a>
          <img alt="buildspacelogo" className="twitter-logo" src={buildspacelogo} />
        </div>
      </div>
    </div>
  );
};

export default App;
