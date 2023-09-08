// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract TrainingParticipant {
  struct Participant {
    uint id;
    string name;
    string role;
  }

  uint private participantCounter = 1;
  Participant[] private participants;

  function addParticipant(string memory _name, string memory _role) public payable {
    Participant memory participant = Participant(participantCounter, _name, _role);
    participants.push(participant);
    participantCounter++;
  }
  
  function getParticipants() public view returns (Participant[] memory) {
    return participants;
  }

  function getParticipantById(uint _id) public view returns (Participant memory) {
    Participant storage participant = participants[_id - 1];
    return participant;
  }
}
