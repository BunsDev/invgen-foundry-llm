pragma solidity ^0.8.0;

abstract contract IERC20Token {
    function name() public view returns (string memory) {
        this;
    }

    function symbol() public view returns (string memory) {
        this;
    }

    function decimals() public view returns (uint8) {
        this;
    }

    function totalSupply() public view returns (uint256) {
        this;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        _owner;
        this;
    }

    function allowance(address _owner, address _spender) public view returns (uint256) {
        _owner;
        _spender;
        this;
    }

    function transfer(address _to, uint256 _value) virtual public returns (bool success);

    function transferFrom(address _from, address _to, uint256 _value) virtual public returns (bool success);

    function approve(address _spender, uint256 _value) virtual public returns (bool success);
}

contract TokenHandler {
    bytes4 public constant APPROVE_FUNC_SELECTOR = bytes4(keccak256("approve(address,uint256)"));
    bytes4 public constant TRANSFER_FUNC_SELECTOR = bytes4(keccak256("transfer(address,uint256)"));
    bytes4 public constant TRANSFER_FROM_FUNC_SELECTOR = bytes4(keccak256("transferFrom(address,address,uint256)"));

    ///  @dev executes the ERC20 token's `approve` function and reverts upon failure
    ///  the main purpose of this function is to prevent a non standard ERC20 token
    ///  from failing silently
    ///  @param _token   ERC20 token address
    ///  @param _spender approved address
    ///  @param _value   allowance amount
    function safeApprove(IERC20Token _token, address _spender, uint256 _value) public {
        execute(_token, abi.encodeWithSelector(APPROVE_FUNC_SELECTOR, _spender, _value));
    }

    ///  @dev executes the ERC20 token's `transfer` function and reverts upon failure
    ///  the main purpose of this function is to prevent a non standard ERC20 token
    ///  from failing silently
    ///  @param _token   ERC20 token address
    ///  @param _to      target address
    ///  @param _value   transfer amount
    function safeTransfer(IERC20Token _token, address _to, uint256 _value) public {
        execute(_token, abi.encodeWithSelector(TRANSFER_FUNC_SELECTOR, _to, _value));
    }

    ///  @dev executes the ERC20 token's `transferFrom` function and reverts upon failure
    ///  the main purpose of this function is to prevent a non standard ERC20 token
    ///  from failing silently
    ///  @param _token   ERC20 token address
    ///  @param _from    source address
    ///  @param _to      target address
    ///  @param _value   transfer amount
    function safeTransferFrom(IERC20Token _token, address _from, address _to, uint256 _value) public {
        execute(_token, abi.encodeWithSelector(TRANSFER_FROM_FUNC_SELECTOR, _from, _to, _value));
    }

    ///  @dev executes a function on the ERC20 token and reverts upon failure
    ///  the main purpose of this function is to prevent a non standard ERC20 token
    ///  from failing silently
    ///  @param _token   ERC20 token address
    ///  @param _data    data to pass in to the token's contract for execution
    function execute(IERC20Token _token, bytes memory _data) private {
        uint256[1] memory ret = [uint256(1)];
        assembly {
            let success := call(gas(), _token, 0, add(_data, 32), mload(_data), ret, 32)
            if iszero(success) {
                revert(0, 0)
            }
        }
        require(ret[0] != 0, "ERR_TRANSFER_FAILED");
    }
}