/// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2<0.9.0;

import { IERC721Metadata } from "../interfaces/IERC721.sol";

/// @notice This is a mock contract of the ERC721 standard for testing purposes only, it SHOULD NOT be used in production.
///   @dev Forked from: https://github.com/transmissions11/solmate/blob/0384dbaaa4fcb5715738a9254a7c0a4cb62cf458/src/tokens/ERC721.sol
contract MockERC721 is IERC721Metadata {
    string internal _name;
    string internal _symbol;
    mapping(uint256 => address) internal _ownerOf;
    mapping(address => uint256) internal _balanceOf;
    mapping(uint256 => address) internal _getApproved;
    mapping(address => mapping(address => bool)) internal _isApprovedForAll;
    /// @dev A bool to track whether the contract has been initialized.
    bool private initialized;

    function name() override external view returns (string memory) {
        return _name;
    }

    function symbol() override external view returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 id) virtual override public view returns (string memory) {}

    function ownerOf(uint256 id) virtual override public view returns (address owner) {
        require((owner = _ownerOf[id]) != address(0), "NOT_MINTED");
    }

    function balanceOf(address owner) virtual override public view returns (uint256) {
        require(owner != address(0), "ZERO_ADDRESS");
        return _balanceOf[owner];
    }

    function getApproved(uint256 id) virtual override public view returns (address) {
        return _getApproved[id];
    }

    function isApprovedForAll(address owner, address operator) virtual override public view returns (bool) {
        return _isApprovedForAll[owner][operator];
    }

    /// @dev To hide constructor warnings across solc versions due to different constructor visibility requirements and
    ///   syntaxes, we add an initialization function that can be called only once.
    function initialize(string memory name_, string memory symbol_) public {
        require(!initialized, "ALREADY_INITIALIZED");
        _name = name_;
        _symbol = symbol_;
        initialized = true;
    }

    function approve(address spender, uint256 id) virtual override public payable {
        address owner = _ownerOf[id];
        require((msg.sender == owner) || _isApprovedForAll[owner][msg.sender], "NOT_AUTHORIZED");
        _getApproved[id] = spender;
        emit Approval(owner, spender, id);
    }

    function setApprovalForAll(address operator, bool approved) virtual override public {
        _isApprovedForAll[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function transferFrom(address from, address to, uint256 id) virtual override public payable {
        require(from == _ownerOf[id], "WRONG_FROM");
        require(to != address(0), "INVALID_RECIPIENT");
        require(((msg.sender == from) || _isApprovedForAll[from][msg.sender]) || (msg.sender == _getApproved[id]), "NOT_AUTHORIZED");
        _balanceOf[from]--;
        _balanceOf[to]++;
        _ownerOf[id] = to;
        delete _getApproved[id];
        emit Transfer(from, to, id);
    }

    function safeTransferFrom(address from, address to, uint256 id) virtual override public payable {
        transferFrom(from, to, id);
        require((!_isContract(to)) || (IERC721TokenReceiver(to).onERC721Received(msg.sender, from, id, "") == IERC721TokenReceiver.onERC721Received.selector), "UNSAFE_RECIPIENT");
    }

    function safeTransferFrom(address from, address to, uint256 id, bytes memory data) virtual override public payable {
        transferFrom(from, to, id);
        require((!_isContract(to)) || (IERC721TokenReceiver(to).onERC721Received(msg.sender, from, id, data) == IERC721TokenReceiver.onERC721Received.selector), "UNSAFE_RECIPIENT");
    }

    function supportsInterface(bytes4 interfaceId) virtual override public view returns (bool) {
        return ((interfaceId == 0x01ffc9a7) || (interfaceId == 0x80ac58cd)) || (interfaceId == 0x5b5e139f);
    }

    function _mint(address to, uint256 id) virtual internal {
        require(to != address(0), "INVALID_RECIPIENT");
        require(_ownerOf[id] == address(0), "ALREADY_MINTED");
        _balanceOf[to]++;
        _ownerOf[id] = to;
        emit Transfer(address(0), to, id);
    }

    function _burn(uint256 id) virtual internal {
        address owner = _ownerOf[id];
        require(owner != address(0), "NOT_MINTED");
        _balanceOf[owner]--;
        delete _ownerOf[id];
        delete _getApproved[id];
        emit Transfer(owner, address(0), id);
    }

    function _safeMint(address to, uint256 id) virtual internal {
        _mint(to, id);
        require((!_isContract(to)) || (IERC721TokenReceiver(to).onERC721Received(msg.sender, address(0), id, "") == IERC721TokenReceiver.onERC721Received.selector), "UNSAFE_RECIPIENT");
    }

    function _safeMint(address to, uint256 id, bytes memory data) virtual internal {
        _mint(to, id);
        require((!_isContract(to)) || (IERC721TokenReceiver(to).onERC721Received(msg.sender, address(0), id, data) == IERC721TokenReceiver.onERC721Received.selector), "UNSAFE_RECIPIENT");
    }

    function _isContract(address _addr) private view returns (bool) {
        uint256 codeLength;
        assembly {
            codeLength := extcodesize(_addr)
        }
        return codeLength > 0;
    }
}

interface IERC721TokenReceiver {
    function onERC721Received(address, address, uint256, bytes calldata) external returns (bytes4);
}