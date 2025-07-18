// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SocialProgramTracker
 * @dev A smart contract to track money flow for social programs.
 * It stores details like PIC, Organization, Milestones, and IPFS hashes
 * for evidences and transaction receipts.
 */
contract SocialProgramTracker {
    // Define a struct to hold the details of each program entry
    struct ProgramEntry {
        string picName;             // Person In Charge (PIC) name
        string organizationName;    // Organization name
        string milestone;           // Current milestone achieved
        string ipfsHashes;          // Combined IPFS hashes (evidence,receipt)
        uint256 amount;             // Amount in MYR cents
        uint256 timestamp;          // Timestamp when the entry was added
    }

    // An array to store all the program entries
    ProgramEntry[] public programEntries;

    // Event to log when a new entry is added
    event EntryAdded(
        uint256 indexed entryId,
        string picName,
        string organizationName,
        uint256 amount,
        uint256 timestamp
    );

    /**
     * @dev Adds a new program entry to the blockchain.
     * @param _picName The name of the Person In Charge.
     * @param _organizationName The name of the organization.
     * @param _milestone The current milestone achieved.
     * @param _ipfsHashes Combined IPFS hashes (evidence,receipt) separated by comma.
     * @param _amount The amount in MYR cents (e.g., 150 = 1.50 MYR).
     */
    function addProgramEntry(
        string calldata _picName,
        string calldata _organizationName,
        string calldata _milestone,
        string calldata _ipfsHashes,
        uint256 _amount
    ) public {
        programEntries.push(ProgramEntry({
            picName: _picName,
            organizationName: _organizationName,
            milestone: _milestone,
            ipfsHashes: _ipfsHashes,
            amount: _amount,
            timestamp: block.timestamp
        }));

        emit EntryAdded(
            programEntries.length - 1,
            _picName,
            _organizationName,
            _amount,
            block.timestamp
        );
    }

    /**
     * @dev Returns the total number of program entries.
     * @return The count of program entries.
     */
    function getEntriesCount() public view returns (uint256) {
        return programEntries.length;
    }

    /**
     * @dev Returns a specific program entry by its ID.
     * @param _entryId The ID (index) of the entry to retrieve.
     * @return picName The name of the Person In Charge.
     * @return organizationName The name of the organization.
     * @return milestone The current milestone achieved.
     * @return ipfsHashes Combined IPFS hashes (evidence,receipt).
     * @return amount The amount in MYR cents for this program entry.
     * @return timestamp The timestamp when the entry was added.
     */
    function getProgramEntry(uint256 _entryId)
        public
        view
        returns (
            string memory picName,
            string memory organizationName,
            string memory milestone,
            string memory ipfsHashes,
            uint256 amount,
            uint256 timestamp
        )
    {
        require(_entryId < programEntries.length, "Entry ID does not exist.");
        ProgramEntry storage entry = programEntries[_entryId];
        return (
            entry.picName,
            entry.organizationName,
            entry.milestone,
            entry.ipfsHashes,
            entry.amount,
            entry.timestamp
        );
    }
}
