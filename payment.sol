// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HotelBookingPayment {
    address public owner;
    mapping(address => uint) public balances;

    event PaymentMade(address indexed from, address indexed to, uint amount);

    constructor() {
        owner = msg.sender;
    }

    function makePayment(address payable hotelAddress, uint amount) public {
        require(msg.sender != address(0) && msg.sender != hotelAddress, "Invalid address");
        require(amount > 0 && balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[hotelAddress] += amount;
        
        emit PaymentMade(msg.sender, hotelAddress, amount);
    }

    function deposit() public payable {
        require(msg.value > 0, "Invalid deposit amount");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) public {
        require(amount > 0 && balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
