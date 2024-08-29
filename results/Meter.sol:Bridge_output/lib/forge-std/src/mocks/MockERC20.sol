pragma solidity >=0.6.2<0.9.0;

import { IERC20 } from "../interfaces/IERC20.sol";

/// @notice This is a mock contract of the ERC20 standard for testing purposes only, it SHOULD NOT be used in production.
///  @dev Forked from: https://github.com/transmissions11/solmate/blob/0384dbaaa4fcb5715738a9254a7c0a4cb62cf458/src/tokens/ERC20.sol
contract MockERC20 is IERC20 {
    string internal _name;
    string internal _symbol;
    uint8 internal _decimals;
    uint256 internal _totalSupply;
    mapping(address => uint256) internal _balanceOf;
    mapping(address => mapping(address => uint256)) internal _allowance;
    uint256 internal INITIAL_CHAIN_ID;
    bytes32 internal INITIAL_DOMAIN_SEPARATOR;
    mapping(address => uint256) public nonces;
    bool private initialized;

    function name() override external view returns (string memory) {
        return _name;
    }

    function symbol() override external view returns (string memory) {
        return _symbol;
    }

    function decimals() override external view returns (uint8) {
        return _decimals;
    }

    function totalSupply() override external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address owner) override external view returns (uint256) {
        return _balanceOf[owner];
    }

    function allowance(address owner, address spender) override external view returns (uint256) {
        return _allowance[owner][spender];
    }

    /// @dev To hide constructor warnings across solc versions due to different constructor visibility requirements and
    ///  syntaxes, we add an initialization function that can be called only once.
    function initialize(string memory name_, string memory symbol_, uint8 decimals_) public {
        require(!initialized, "ALREADY_INITIALIZED");
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        INITIAL_CHAIN_ID = _pureChainId();
        INITIAL_DOMAIN_SEPARATOR = computeDomainSeparator();
        initialized = true;
    }

    function approve(address spender, uint256 amount) virtual override public returns (bool) {
        _allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transfer(address to, uint256 amount) virtual override public returns (bool) {
        _balanceOf[msg.sender] = _sub(_balanceOf[msg.sender], amount);
        _balanceOf[to] = _add(_balanceOf[to], amount);
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) virtual override public returns (bool) {
        uint256 allowed = _allowance[from][msg.sender];
        if (allowed != (~uint256(0))) _allowance[from][msg.sender] = _sub(allowed, amount);
        _balanceOf[from] = _sub(_balanceOf[from], amount);
        _balanceOf[to] = _add(_balanceOf[to], amount);
        emit Transfer(from, to, amount);
        return true;
    }

    function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) virtual public {
        require(deadline >= block.timestamp, "PERMIT_DEADLINE_EXPIRED");
        address recoveredAddress = ecrecover(keccak256(abi.encodePacked("\u0019\u0001", DOMAIN_SEPARATOR(), keccak256(abi.encode(keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"), owner, spender, value, nonces[owner]++, deadline)))), v, r, s);
        require((recoveredAddress != address(0)) && (recoveredAddress == owner), "INVALID_SIGNER");
        _allowance[recoveredAddress][spender] = value;
        emit Approval(owner, spender, value);
    }

    function DOMAIN_SEPARATOR() virtual public view returns (bytes32) {
        return (_pureChainId() == INITIAL_CHAIN_ID) ? INITIAL_DOMAIN_SEPARATOR : computeDomainSeparator();
    }

    function computeDomainSeparator() virtual internal view returns (bytes32) {
        return keccak256(abi.encode(keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"), keccak256(bytes(_name)), keccak256("1"), _pureChainId(), address(this)));
    }

    function _mint(address to, uint256 amount) virtual internal {
        _totalSupply = _add(_totalSupply, amount);
        _balanceOf[to] = _add(_balanceOf[to], amount);
        emit Transfer(address(0), to, amount);
    }

    function _burn(address from, uint256 amount) virtual internal {
        _balanceOf[from] = _sub(_balanceOf[from], amount);
        _totalSupply = _sub(_totalSupply, amount);
        emit Transfer(from, address(0), amount);
    }

    function _add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "ERC20: addition overflow");
        return c;
    }

    function _sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(a >= b, "ERC20: subtraction underflow");
        return a - b;
    }

    function _viewChainId() private view returns (uint256 chainId) {
        assembly {
            chainId := chainid()
        }
        address(this);
    }

    function _pureChainId() private pure returns (uint256 chainId) {
        function() internal view returns (uint256) fnIn = _viewChainId;
        function() internal pure returns (uint256) pureChainId;
        assembly {
            pureChainId := fnIn
        }
        chainId = pureChainId();
    }
}