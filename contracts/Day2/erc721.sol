//SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract erc721 is ERC721("Genomic", "gene") { 

  address public owner;

  constructor() public {
    owner = msg.sender;
  }
  
  struct Users {
    string name;
    uint id;
    uint level;
    uint exp;
    uint TargetExp;
    uint hp;
    uint attack;
    uint defense;
  }

  Users[] public users;

  function createUser(string memory _name, address _to) public {
  require(msg.sender == owner);
  uint id = users.length;
    users.push(Users({
      name: _name,
      id: id,
      level: 1,
      exp: 0,
      TargetExp: 100,
      hp: 100,
      attack: 10,
      defense: 10
    }));
    _mint(_to, id);
  }
  
  function checkTheUser(uint _id) public view returns (string memory) {
    return users[_id].name;
  }
  event whoWon(uint _winnerID);

  function Battle(uint _userID, uint _targetID) public {
  Users storage Me = users[_userID];
  Users storage Target = users[_targetID];
  while(Me.hp > 0 && Target.hp > 0) {
    if(Me.attack < Target.defense) {
      Me.hp -= (Target.defense - Me.attack);
      Target.exp += (Target.defense - Me.attack);
      while(Target.exp >= Target.TargetExp) {
        Target.level += 1;
        Target.exp -= 100;
        Target.TargetExp *= Target.level * 100;
        Target.hp += 10;
        Target.attack += 10;
        Target.defense += 10;
      }
    } else {
      Target.hp -= (Me.attack - Target.defense);
      Me.exp += (Me.attack - Target.defense);

      while(Me.exp >= Me.TargetExp) {
        Me.level += 1;
        Me.exp -= 100;
        Me.TargetExp *= Me.level * 100;
        Me.hp += 10;
        Me.attack += 10;
        Me.defense += 10;
        }
      }
    }
    if(Me.hp == 0) {
      Me.hp = 100;
      emit whoWon(_targetID);
    } else if(Target.hp == 0) {
      Target.hp = 100;
      emit whoWon(_userID);
    }
  }
}