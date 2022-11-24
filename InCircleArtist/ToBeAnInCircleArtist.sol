// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ToBeAnInCircleArtist {
    address public user;
    string public realname;
    // string public addr;
    string public autoname = "Anonymous artist"; 
    mapping (address=>bool) public statusB;
    string[] public nameList; 
    address[] public addrList; 


    function nameInput(address _address, string memory _realname)public {

        require(statusB[msg.sender]==false,"You have already become an in-circle artist");
        // require(_address != address(0), "Please enter your address");

        
        if(bytes(_realname).length == 0) {
            realname = autoname;
        } else {
            realname = _realname;
        }
        
        user = _address;
     
        statusB[msg.sender] = true;
        nameList.push(_realname);
        addrList.push(_address);
    }

    function getName() public view returns(string[] memory){
          return nameList;
    }
    function getAddress() public view returns(address[] memory){
          return addrList;
    }
    
}