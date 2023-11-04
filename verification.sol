// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserVerification {
    mapping(address => bool) public verifiedUsers;

    event UserVerified(address indexed user);

    function verifyUser(bytes memory signature) public {
        require(!verifiedUsers[msg.sender], "User is already verified");

        bytes32 message = keccak256(abi.encodePacked("I am verifying my identity"));
        address signer = recoverSigner(message, signature);

        require(signer == msg.sender, "Signature verification failed");

        verifiedUsers[msg.sender] = true;
        emit UserVerified(msg.sender);
    }

    function recoverSigner(bytes32 message, bytes memory sig) internal pure returns (address) {
        uint8 v;
        bytes32 r;
        bytes32 s;

        (v, r, s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    function splitSignature(bytes memory sig) internal pure returns (uint8, bytes32, bytes32) {
        require(sig.length == 65, "Invalid signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }
}
