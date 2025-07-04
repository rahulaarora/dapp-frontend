// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IMessageRecipient} from "@hyperlane-xyz/core/contracts/interfaces/IMessageRecipient.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";


interface IMailbox {
    function dispatch(
        uint32 _destinationDomain,
        bytes32 _recipientAddress,
        bytes calldata _body
    ) external payable returns (bytes32);
}

contract InterchainReceiver is Ownable, IMessageRecipient {
    IMailbox public mailbox;
    string public latestMessage;

    event SentMessage(uint32 indexed destinationDomain, address indexed sender, string message);
    event ReceivedMessage(uint32 indexed originDomain, address indexed sender, string message);

    constructor(address _mailbox) Ownable(msg.sender) {
        mailbox = IMailbox(_mailbox);
    }

    function setMailbox(address _newMailbox) public onlyOwner {
        mailbox = IMailbox(_newMailbox);
    }

    // send messages
    function sendMessage(uint32 _destinationDomain, bytes32 _recipientAddress, string memory _message) public payable {
        bytes memory body = abi.encodePacked(_message);
        mailbox.dispatch{value: msg.value}(_destinationDomain, _recipientAddress, body);
        emit SentMessage(_destinationDomain, msg.sender, _message);
    }

    // receive messages
    function handle(uint32 _origin, bytes32 _sender, bytes calldata _body) external payable override {
        // mailbox check
        require(msg.sender == address(mailbox), "Only mailbox can call handle");

        string memory receivedMessage = abi.decode(_body, (string));
        latestMessage = receivedMessage;
        emit ReceivedMessage(_origin, address(uint160(uint256(_sender))), receivedMessage);
    }
}