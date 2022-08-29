// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

//
/**
 * @title IndexxUSD+ token
 * @notice Asset backed BEP20 Token with pausable, mintable and burn features
 * @notice Indexx USD+ Pegged to USDT crypto
 */
contract IndexxUSDP is ERC20, ERC20Burnable, Pausable, AccessControl {
    using SafeMath for uint256;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    address public feeAdmin;
    bool public feeActive = true;

    /**
     * @dev Constructor assigning Token name, symbol and minter, pauser and admin role to msg.sender
     */
    constructor() ERC20("IndexxUSD+", "iUSD+") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        feeAdmin = msg.sender;
    }

    /**
     * @dev Function to change Fee admin address
     * @param _newFeeAdmin The address of new fee admin
     */
    function changeFeeAdmin(address _newFeeAdmin)
        external
        onlyRole(MINTER_ROLE)
    {
        feeAdmin = _newFeeAdmin;
    }

    /**
     * @dev Function to change Fee active status
     * @param status new status for fee charging
     */
    function changeFeeStatus(bool status) external onlyRole(MINTER_ROLE) {
        feeActive = status;
    }

    /**
     * @dev Function to pause token transfer
     */
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    /**
     * @dev Function to mint tokens
     */
    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /**
     * @dev Function to mint tokens
     * @param to The address that will receive the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    /**
     * @dev Function to halt token transfers in case of extreme events and emergencies
     * @param to The address that will send the tokens.
     * @param from The address that will receive the tokens.
     * @param amount The amount of tokens to mint.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }

    function transfer(address to, uint256 amount)
        public
        override
        returns (bool)
    {
        address owner = _msgSender();

        if (feeActive == true && amount > 20000 * 10**18) {
            uint256 fee;
            if (amount > 40000 * 10**18) {
                if (amount > 80000 * 10**18) {
                    fee = amount.mul(15).div(1000);
                } else {
                    fee = amount.div(100);
                }
            } else {
                fee = amount.mul(5).div(1000);
            }
            _transfer(owner, feeAdmin, fee);
            amount = amount.sub(fee);
        }

        _transfer(owner, to, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);

        if (feeActive == true && amount > 20000 * 10**18) {
            uint256 fee;
            if (amount > 40000 * 10**18) {
                if (amount > 80000 * 10**18) {
                    fee = amount.mul(15).div(1000);
                } else {
                    fee = amount.div(100);
                }
            } else {
                fee = amount.mul(5).div(1000);
            }
            _transfer(from, feeAdmin, fee);
            amount = amount.sub(fee);
        }
        _transfer(from, to, amount);

        return true;
    }
}
