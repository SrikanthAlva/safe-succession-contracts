// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

contract SafeSuccession {
    struct SafeWill {
        address creator;
        address executor;
        string willCID;
        bool revealed;
        uint256 revealPercent;
        uint256 totalReveals;
        address[] nominees;
    }

    SafeWill[] private safeWills;
    mapping(address => uint256) userToWillDetails;
    mapping(address => string[]) nomineeWillIds;

    error SafeSuccession__NotAuthorizedExecutor(address unauthorizedExecutor);
    event SafeSuccession_WillCreated(
        address indexed creatorAddr,
        uint256 indexed willId,
        string indexed willIdentifier
    );

    function createWill(
        address _executor,
        string memory _willCID,
        address[] memory _nominees
    ) external {
        uint256 willId = safeWills.length;
        SafeWill memory safeWill;
        safeWill.creator = msg.sender;
        safeWill.executor = _executor;
        safeWill.willCID = _willCID;
        safeWill.revealed = false;
        safeWill.revealPercent = 0;
        safeWill.totalReveals = _nominees.length + 1;
        safeWill.nominees = _nominees;

        safeWills.push(safeWill);
        userToWillDetails[msg.sender] = willId;
        for (uint256 i; i < _nominees.length; i++) {
            nomineeWillIds[_nominees[i]].push(_willCID);
        }
        emit SafeSuccession_WillCreated(msg.sender, willId, _willCID);
    }

    function initiateWillExecution(uint256 _willId) external {
        if (safeWills[_willId].executor != msg.sender)
            revert SafeSuccession__NotAuthorizedExecutor(msg.sender);
        safeWills[_willId].revealPercent =
            (1 * 100) /
            safeWills[_willId].totalReveals;
    }

    function getAssociatedWills()
        external
        view
        returns (string[] memory willCID)
    {
        return nomineeWillIds[msg.sender];
    }

    function getWillExecuotr(
        uint256 _wllId
    ) public view returns (address executorAddr) {
        return safeWills[_wllId].executor;
    }

    // TODO: Only Executor can initiate the process
    // TODO: Per User only One Will
}
