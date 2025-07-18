// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title PaymentTracker
 * @dev A smart contract to track payment transactions with user details.
 * It stores username, program & organization info, mobile, TIN, and amount.
 */
contract PaymentTracker {
    // Define a struct to hold the details of each payment entry
    struct PaymentEntry {
        string username;            // User's name
        string programOrganization; // Program & Organization concatenated
        string mobile;              // Mobile phone number
        string tin;                 // Tax Identification Number
        uint256 amount;             // Amount in MYR cents
        uint256 timestamp;          // Timestamp when the entry was added
    }

    // An array to store all the payment entries
    PaymentEntry[] public paymentEntries;

    // Event to log when a new payment entry is added
    event PaymentAdded(
        uint256 indexed entryId,
        string username,
        string programOrganization,
        string mobile,
        string tin,
        uint256 amount,
        uint256 timestamp
    );

    /**
     * @dev Adds a new payment entry to the blockchain.
     * @param _username The name of the user making the payment.
     * @param _programOrganization The concatenated program and organization name.
     * @param _mobile The mobile phone number of the user.
     * @param _tin The Tax Identification Number.
     * @param _amount The amount in MYR cents (e.g., 150 = 1.50 MYR).
     */
    function addPaymentEntry(
        string calldata _username,
        string calldata _programOrganization,
        string calldata _mobile,
        string calldata _tin,
        uint256 _amount
    ) public {
        paymentEntries.push(PaymentEntry({
            username: _username,
            programOrganization: _programOrganization,
            mobile: _mobile,
            tin: _tin,
            amount: _amount,
            timestamp: block.timestamp
        }));

        emit PaymentAdded(
            paymentEntries.length - 1,
            _username,
            _programOrganization,
            _mobile,
            _tin,
            _amount,
            block.timestamp
        );
    }

    /**
     * @dev Returns the total number of payment entries.
     * @return The count of payment entries.
     */
    function getPaymentCount() public view returns (uint256) {
        return paymentEntries.length;
    }

    /**
     * @dev Returns a specific payment entry by its ID.
     * @param _entryId The ID (index) of the entry to retrieve.
     * @return username The name of the user.
     * @return programOrganization The concatenated program and organization.
     * @return mobile The mobile phone number.
     * @return tin The Tax Identification Number.
     * @return amount The amount in MYR cents for this payment entry.
     * @return timestamp The timestamp when the entry was added.
     */
    function getPaymentEntry(uint256 _entryId)
        public
        view
        returns (
            string memory username,
            string memory programOrganization,
            string memory mobile,
            string memory tin,
            uint256 amount,
            uint256 timestamp
        )
    {
        require(_entryId < paymentEntries.length, "Entry ID does not exist.");
        PaymentEntry storage entry = paymentEntries[_entryId];
        return (
            entry.username,
            entry.programOrganization,
            entry.mobile,
            entry.tin,
            entry.amount,
            entry.timestamp
        );
    }

    /**
     * @dev Returns all payment entries for a specific user.
     * @param _username The username to search for.
     * @return An array of payment entry IDs for the given user.
     */
    function getPaymentsByUser(string calldata _username) 
        public 
        view 
        returns (uint256[] memory) 
    {
        uint256[] memory userPayments = new uint256[](paymentEntries.length);
        uint256 count = 0;

        for (uint256 i = 0; i < paymentEntries.length; i++) {
            if (keccak256(abi.encodePacked(paymentEntries[i].username)) == 
                keccak256(abi.encodePacked(_username))) {
                userPayments[count] = i;
                count++;
            }
        }

        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = userPayments[i];
        }

        return result;
    }
}
