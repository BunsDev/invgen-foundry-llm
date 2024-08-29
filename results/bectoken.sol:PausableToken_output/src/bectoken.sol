/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

///  @title SafeMath
///  @dev Math operations with safety checks that throw on error
library SafeMath {
    function mul(uint256 a, uint256 b) public pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        require((c / a) == b, "SafeMath: multiplication overflow");
        return c;
    }

    function div(uint256 a, uint256 b) public pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        return c;
    }

    function sub(uint256 a, uint256 b) public pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }

    function add(uint256 a, uint256 b) public pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
}

///  @title ERC20Basic
///  @dev Simpler version of ERC20 interface
///  @dev see https://github.com/ethereum/EIPs/issues/179
abstract contract ERC20Basic {
    event Transfer(address indexed from, address indexed to, uint256 value);

    uint256 public totalSupply;

    function balanceOf(address who) virtual public view returns (uint256);

    function transfer(address to, uint256 value) virtual public returns (bool);
}

///  @title Basic token
///  @dev Basic version of StandardToken, with no allowances.
contract BasicToken is ERC20Basic {
    using SafeMath for uint256;

    mapping(address => uint256) internal balances;

    ///  @dev transfer token for a specified address
    ///  @param _to The address to transfer to.
    ///  @param _value The amount to be transferred.
    function transfer(address _to, uint256 _value) virtual override public returns (bool) {
        require(_to != address(0), "BasicToken: transfer to the zero address");
        require((_value > 0) && (_value <= balances[msg.sender]), "BasicToken: transfer amount exceeds balance");
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    ///  @dev Gets the balance of the specified address.
    ///  @param _owner The address to query the the balance of.
    ///  @return balance An uint256 representing the amount owned by the passed address.
    function balanceOf(address _owner) override public view returns (uint256 balance) {
        return balances[_owner];
    }
}

///  @title ERC20 interface
///  @dev see https://github.com/ethereum/EIPs/issues/20
abstract contract ERC20 is ERC20Basic {
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function allowance(address owner, address spender) virtual public view returns (uint256);

    function transferFrom(address from, address to, uint256 value) virtual public returns (bool);

    function approve(address spender, uint256 value) virtual public returns (bool);
}

///  @title Standard ERC20 token
///  @dev Implementation of the basic standard token.
///  @dev https://github.com/ethereum/EIPs/issues/20
///  @dev Based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
contract StandardToken is ERC20, BasicToken {
    using SafeMath for uint256;

    mapping(address => mapping(address => uint256)) internal allowed;

    ///  @dev Transfer tokens from one address to another
    ///  @param _from address The address which you want to send tokens from
    ///  @param _to address The address which you want to transfer to
    ///  @param _value uint256 the amount of tokens to be transferred
    function transferFrom(address _from, address _to, uint256 _value) virtual override public returns (bool) {
        require(_to != address(0), "StandardToken: transfer to the zero address");
        require((_value > 0) && (_value <= balances[_from]), "StandardToken: transfer amount exceeds balance");
        require(_value <= allowed[_from][msg.sender], "StandardToken: transfer amount exceeds allowance");
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }

    ///  @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
    ///  Beware that changing an allowance with this method brings the risk that someone may use both the old
    ///  and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
    ///  race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
    ///  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
    ///  @param _spender The address which will spend the funds.
    ///  @param _value The amount of tokens to be spent.
    function approve(address _spender, uint256 _value) virtual override public returns (bool) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    ///  @dev Function to check the amount of tokens that an owner allowed to a spender.
    ///  @param _owner address The address which owns the funds.
    ///  @param _spender address The address which will spend the funds.
    ///  @return remaining A uint256 specifying the amount of tokens still available for the spender.
    function allowance(address _owner, address _spender) virtual override public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}

///  @title Ownable
///  @dev The Ownable contract has an owner address, and provides basic authorization control
///  functions, this simplifies the implementation of "user permissions".
contract Ownable {
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    address public owner;

    ///  @dev Throws if called by any account other than the owner.
    modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: caller is not the owner");
        _;
    }

    ///  @dev The Ownable constructor sets the original `owner` of the contract to the sender
    ///  account.
    constructor() {
        owner = msg.sender;
    }

    ///  @dev Allows the current owner to transfer control of the contract to a newOwner.
    ///  @param newOwner The address to transfer ownership to.
    function transferOwnership(address newOwner) public onlyOwner() {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

///  @title Pausable
///  @dev Base contract which allows children to implement an emergency stop mechanism.
contract Pausable is Ownable {
    event Pause();

    event Unpause();

    bool public paused = false;

    ///  @dev Modifier to make a function callable only when the contract is not paused.
    modifier whenNotPaused() {
        require(!paused, "Pausable: paused");
        _;
    }

    ///  @dev Modifier to make a function callable only when the contract is paused.
    modifier whenPaused() {
        require(paused, "Pausable: not paused");
        _;
    }

    ///  @dev called by the owner to pause, triggers stopped state
    function pause() public onlyOwner() whenNotPaused() {
        paused = true;
        emit Pause();
    }

    ///  @dev called by the owner to unpause, returns to normal state
    function unpause() public onlyOwner() whenPaused() {
        paused = false;
        emit Unpause();
    }
}

///  @title Pausable token
///  @dev StandardToken modified with pausable transfers.*
contract PausableToken is StandardToken, Pausable {
    using SafeMath for uint256;

    function transfer(address _to, uint256 _value) override(ERC20Basic, BasicToken) public whenNotPaused() returns (bool) {
        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) override public whenNotPaused() returns (bool) {
        return super.transferFrom(_from, _to, _value);
    }

    function approve(address _spender, uint256 _value) override public whenNotPaused() returns (bool) {
        return super.approve(_spender, _value);
    }

    function batchTransfer(address[] memory _receivers, uint256 _value) public whenNotPaused() returns (bool) {
        uint cnt = _receivers.length;
        uint256 amount = uint256(cnt) * _value;
        require((cnt > 0) && (cnt <= 20), "PausableToken: invalid number of receivers");
        require((_value > 0) && (balances[msg.sender] >= amount), "PausableToken: insufficient balance");
        balances[msg.sender] = balances[msg.sender].sub(amount);
        for (uint i = 0; i < cnt; i++) {
            balances[_receivers[i]] = balances[_receivers[i]].add(_value);
            emit Transfer(msg.sender, _receivers[i], _value);
        }
        return true;
    }
}

///  @title Bec Token
///  @dev Implementation of Bec Token based on the basic standard token.
contract BecToken is PausableToken {
    ///  Public variables of the token
    ///  The following variables are OPTIONAL vanities. One does not have to include them.
    ///  They allow one to customise the token contract & in no way influences the core functionality.
    ///  Some wallets/interfaces might not even bother to look at this information.
    string public name = "BeautyChain";
    string public symbol = "BEC";
    string public version = "1.0.0";
    uint8 public decimals = 18;

    ///  @dev Function to check the amount of tokens that an owner allowed to a spender.
    constructor() {
        totalSupply = 7000000000 * (10 ** (uint256(decimals)));
        balances[msg.sender] = totalSupply;
    }

    receive() external payable {
        revert();
    }
}