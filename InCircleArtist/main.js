/* CONNECT_AUTOMATICALLY
  true: automatically connect to Web3 Provider on page load.
  false: enable "click to connect" button
*/
const CONNECT_AUTOMATICALLY = true;

if (CONNECT_AUTOMATICALLY) {
  main();
} else {
  connectButton.onclick = main;
}
async function main() {

  // INITIALIZAING STEPS (SKIP TO THE BOTTOM TO WRITE YOUR OWN CODE)
  loadingIconConnect.style.display = "block";
  // Check website compatibility
  if (navigator.userAgent.indexOf("Safari") != -1
    && navigator.userAgent.indexOf("Chrome") == -1) {
    alert("Please switch to a browser that supports Web3 (Chrome, Firefox, Brave, Edge, or Opera)");
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("Browser is Web3 compatible");

  // Check if MetaMask is installed
  if (!window.ethereum) {
    alert("No Web3 Provider detected, please install MetaMask (https://metamask.io)");
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("MetaMask is installed");

  // (REQUIRED) Connect to a Web3 provider (MetaMask in most cases)
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  // If the network changes, refresh the page. (e.g. the user switches from mainnet to goerli)
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload();
    }
  });

  try {
    // (REQUIRED) Request to connect current wallet to the dApp
    await provider.send("eth_requestAccounts", []);
  } catch (error) {
    const errorMessage = "Cannot connect to wallet. There might be an issue with another browser extenstion. Try disabling some browser extensions (other than MetaMask), then attempt to reconnect."
    console.error(errorMessage, error);
    alert(errorMessage);
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("Wallet connected");


  // Check if user is signed in to correct network
  const chainId = await provider.getNetwork();
  if (chainId.chainId != 5) {
    alert("Please switch to the Goerli Test Network in MetaMask. The page will refresh automatically after switching.");
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("Connected to Goerli");

  // AT THIS POINT, THE USER SHOULD BE SUCCESSFULLY CONNECTED TO THE DAPP

  // Update the page to show the user is connected
  connectionStatus.textContent = "🟢 Connected";

  connectButton.setAttribute("disabled", "true");
  //...............up is connection issues......................................//

  // MetaMask is our 'provider' in this case
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  // You (whoever is signed into MetaMask) is the 'signer'
  const signer = provider.getSigner();

  // the 'contract' object allows us to call functions from our smart contract
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  // the 'contractWithSigner' object allows us to call smart contract functions that
  // require us to send a transaction (like changing a number on the blockchain)
  const contractWithSigner = contract.connect(signer);

  //......................................connection issues.....................
  // Display the address of the signed-in wallet
  const connectedWalletAddress = await signer.getAddress();
  connectedWallet.textContent = connectedWalletAddress;
  console.log(`Connected Wallet: ${connectedWalletAddress}`);

  // hide the loading icon
  loadingIconConnect.style.display = "none";



  // demo:when I click on the setNum button...
  $('#setArtistButton').click(function () {
    setInfo();
  })


  setInterval(function () {
    getUserInfo();
  }, 2000)


  // FUNCTIONS

  // CHANGING THE BLOCKCHAIN
  async function getUserInfo() {

    // grab the number from the contract
    const namesList = await contract.getName();
    const addressList = await contract.getAddress();
    const currentInCircleArtist = await contract.getCurrentInCircleArtist(); 

    console.log(namesList)
    console.log(addressList)
    console.log(currentInCircleArtist);
    // namesList[0],namesList[1]

    // iterate through namesList and addressList, concat all items
    var nameAndAddressArray = [];
    var table = document.createElement("table");


    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = String("Artist");
    cell2.innerHTML = String("Address");

    for (var i = 0; i < namesList.length; i++) {

      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = String(namesList[i]);
      cell2.innerHTML = String(addressList[i]);

    }
    document.getElementById("currentArtist").innerHTML = "";
    document.getElementById("currentArtist").appendChild(table);

    // display the current nvvumber to your web page
    //$('#currentArtist').innerHTML = nameAndAddressArray

    // var row = table.insertRow(0);
    // var cell1 = row.insertCell(0);
    // var cell2 = row.insertCell(1);
    // cell1.innerHTML = "Artist";
    // cell2.innerHTML = "Address";
    // document.getElementById("currentArtist").appendChild(table);

    console.log(nameAndAddressArray)
    //document.getElementById("currentArtist").innerHTML = "<tr>"+"jjsjsjs"+"</tr>"
    // $('#addressList').text(addressList)
  }


  // READING FROM THE BLOCKCHAIN

  function setInfo() {
    // grab the user input from the input text box
    const nameToSet = $('#setArtistInput').val();
    const addressToSet = $('#setAddressInput').val();

    // pass the converted number to the contract/ enter their name and address
    if (addressToSet.length == 0) {
      // alert("Please enter an address")
      contractWithSigner.safeMint(connectedWalletAddress, nameToSet);
    } else {
      contractWithSigner.safeMint(addressToSet, nameToSet);
    }
  }

  checkNFT.onclick = async function () {
    let tokenBalance = await contract.balanceOf(connectedWalletAddress);
    console.log(+tokenBalance);
    tokenBalance = +tokenBalance;
    if (tokenBalance < 1) {
      sorry.style.display = "block";
    } else {
      // window.open("https://yvonne213.github.io/Projects/InCircleArtist/check", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=900, height=350")
      inCircleClub.style.display = "block";
      console.log("hello")
      VIP.textContent = "VIP: " + connectedWalletAddress;
    }
  }

  expand.onclick = expandWindow;
  let expanded = false;

  function expandWindow() {


if(expanded) {
  // shrink down
  inCircleClub.style.width = "900px";
  inCircleClub.style.height = "360px";
  inCircleClub.style.left = "50%";
  inCircleClub.style.top = "50%";
  expanded = false;
} else {
  // expand
  inCircleClub.style.width = "100%";
  inCircleClub.style.height = "100%";
  inCircleClub.style.left = "0";
  inCircleClub.style.top = "0";
  expanded = true;
}

    
  }
  

  setArtistButton.onclick = async function () {
    let tokenBalance = await contract.balanceOf(connectedWalletAddress);
    console.log(+tokenBalance);
    tokenBalance = +tokenBalance;
    if (tokenBalance < 1) {
      nonono.style.display = "block";
    } else {
      welcome.style.display = "block";
    }
  }
}


// EVENT LISTENERS

