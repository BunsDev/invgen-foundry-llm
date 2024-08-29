/// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Address.sol";
import "./IAssimilator.sol";
import "./ABDKMath64x64.sol";

library Assimilators {
    using ABDKMath64x64 for int128;
    using Address for address;

    IAssimilator public constant iAsmltr = IAssimilator(address(0));

    function delegate(address _callee, bytes memory _data) internal returns (bytes memory) {
        require(_callee.isContract(), "Assimilators/callee-is-not-a-contract");
        (bool _success, bytes memory returnData_) = _callee.delegatecall(_data);
        assembly {
            if eq(_success, 0) {
                revert(add(returnData_, 0x20), returndatasize())
            }
        }
        return returnData_;
    }

    function getRate(address _assim) public view returns (uint256 amount_) {
        amount_ = IAssimilator(_assim).getRate();
    }

    function viewRawAmount(address _assim, int128 _amt) public view returns (uint256 amount_) {
        amount_ = IAssimilator(_assim).viewRawAmount(_amt);
    }

    function viewRawAmountLPRatio(address _assim, uint256 _baseWeight, uint256 _quoteWeight, int128 _amount) public view returns (uint256 amount_) {
        amount_ = IAssimilator(_assim).viewRawAmountLPRatio(_baseWeight, _quoteWeight, address(this), _amount);
    }

    function viewNumeraireAmount(address _assim, uint256 _amt) public view returns (int128 amt_) {
        amt_ = IAssimilator(_assim).viewNumeraireAmount(_amt);
    }

    function viewNumeraireAmountAndBalance(address _assim, uint256 _amt) public view returns (int128 amt_, int128 bal_) {
        (amt_, bal_) = IAssimilator(_assim).viewNumeraireAmountAndBalance(address(this), _amt);
    }

    function viewNumeraireBalance(address _assim) public view returns (int128 bal_) {
        bal_ = IAssimilator(_assim).viewNumeraireBalance(address(this));
    }

    function viewNumeraireBalanceLPRatio(uint256 _baseWeight, uint256 _quoteWeight, address _assim) public view returns (int128 bal_) {
        bal_ = IAssimilator(_assim).viewNumeraireBalanceLPRatio(_baseWeight, _quoteWeight, address(this));
    }

    function intakeRaw(address _assim, uint256 _amt) internal returns (int128 amt_) {
        bytes memory data = abi.encodeWithSelector(iAsmltr.intakeRaw.selector, _amt);
        amt_ = abi.decode(delegate(_assim, data), (int128));
    }

    function intakeRawAndGetBalance(address _assim, uint256 _amt) internal returns (int128 amt_, int128 bal_) {
        bytes memory data = abi.encodeWithSelector(iAsmltr.intakeRawAndGetBalance.selector, _amt);
        (amt_, bal_) = abi.decode(delegate(_assim, data), (int128, int128));
    }

    function intakeNumeraire(address _assim, int128 _amt) internal returns (uint256 amt_) {
        bytes memory data = abi.encodeWithSelector(iAsmltr.intakeNumeraire.selector, _amt);
        amt_ = abi.decode(delegate(_assim, data), (uint256));
    }

    function intakeNumeraireLPRatio(address _assim, uint256 _baseWeight, uint256 _quoteWeight, int128 _amount) internal returns (uint256 amt_) {
        bytes memory data = abi.encodeWithSelector(iAsmltr.intakeNumeraireLPRatio.selector, _baseWeight, _quoteWeight, address(this), _amount);
        amt_ = abi.decode(delegate(_assim, data), (uint256));
    }

    function outputRaw(address _assim, address _dst, uint256 _amt) internal returns (int128 amt_) {
        bytes memory data = abi.encodeWithSelector(iAsmltr.outputRaw.selector, _dst, _amt);
        amt_ = abi.decode(delegate(_assim, data), (int128));
        amt_ = amt_.neg();
    }

    function outputRawAndGetBalance(address _assim, address _dst, uint256 _amt) internal returns (int128 amt_, int128 bal_) {
        bytes memory data = abi.encodeWithSelector(iAsmltr.outputRawAndGetBalance.selector, _dst, _amt);
        (amt_, bal_) = abi.decode(delegate(_assim, data), (int128, int128));
        amt_ = amt_.neg();
    }

    function outputNumeraire(address _assim, address _dst, int128 _amt) internal returns (uint256 amt_) {
        bytes memory data = abi.encodeWithSelector(iAsmltr.outputNumeraire.selector, _dst, _amt.abs());
        amt_ = abi.decode(delegate(_assim, data), (uint256));
    }
}