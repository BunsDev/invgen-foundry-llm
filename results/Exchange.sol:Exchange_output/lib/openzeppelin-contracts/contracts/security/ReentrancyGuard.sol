/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

///  @dev Contract module that helps prevent reentrant calls to a function.
///  Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
///  available, which can be applied to functions to make sure there are no nested
///  (reentrant) calls to them.
///  Note that because there is a single `nonReentrant` guard, functions marked as
///  `nonReentrant` may not call one another. This can be worked around by making
///  those functions `private`, and then adding `external` `nonReentrant` entry
///  points to them.
///  TIP: If you would like to learn more about reentrancy and alternative ways
///  to protect against it, check out our blog post
///  https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;

    ///  @dev Prevents a contract from calling itself, directly or indirectly.
    ///  Calling a `nonReentrant` function from another `nonReentrant`
    ///  function is not supported. It is possible to prevent this from happening
    ///  by making the `nonReentrant` function external, and making it call a
    ///  `private` function that does the actual work.
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    constructor() {
        _status = _NOT_ENTERED;
    }

    function _nonReentrantBefore() private {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
    }

    function _nonReentrantAfter() private {
        _status = _NOT_ENTERED;
    }

    ///  @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
    ///  `nonReentrant` function in the call stack.
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == _ENTERED;
    }
}