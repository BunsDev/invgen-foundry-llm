/// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;
pragma experimental ABIEncoderV2;

struct AppStorage {
    uint8 index;
    int8[32] cases;
    bool paused;
    uint128 pausedAt;
    Storage.Season season;
    Storage.Contracts c;
    Storage.Field f;
    Storage.Governance g;
    Storage.Oracle o;
    Storage.Rain r;
    Storage.Silo s;
    uint256 reentrantStatus;
    Storage.Weather w;
    Storage.AssetSilo bean;
    Storage.AssetSilo lp;
    Storage.IncreaseSilo si;
    Storage.SeasonOfPlenty sop;
    Storage.V1IncreaseSilo v1SI;
    uint256 unclaimedRoots;
    uint256 v2SIBeans;
    mapping(uint32 => uint256) sops;
    mapping(address => Account.State) a;
    uint32 bip0Start;
    uint32 hotFix3Start;
    mapping(uint32 => Storage.Fundraiser) fundraisers;
    uint32 fundraiserIndex;
    mapping(address => bool) isBudget;
    mapping(uint256 => bytes32) podListings;
    mapping(bytes32 => uint256) podOrders;
    mapping(address => Storage.AssetSilo) siloBalances;
    mapping(address => Storage.SiloSettings) ss;
    uint256 refundStatus;
    uint256 beanRefundAmount;
    uint256 ethRefundAmount;
}

contract Bip {
    using SafeMath for uint256;
    using LibSafeMath32 for uint32;
    using Decimal for Decimal.D256;

    AppStorage internal s;

    ///  Getters*
    function activeBips() public view returns (uint32[] memory) {
        return s.g.activeBips;
    }

    function numberOfBips() public view returns (uint32) {
        return s.g.bipIndex;
    }

    function bip(uint32 bipId) public view returns (Storage.Bip memory) {
        return s.g.bips[bipId];
    }

    function voted(address account, uint32 bipId) public view returns (bool) {
        return s.g.voted[bipId][account];
    }

    function rootsFor(uint32 bipId) public view returns (uint256) {
        return s.g.bips[bipId].roots;
    }

    function bipDiamondCut(uint32 bipId) public view returns (Storage.DiamondCut memory) {
        return s.g.diamondCuts[bipId];
    }

    function bipFacetCuts(uint32 bipId) public view returns (IDiamondCut.FacetCut[] memory) {
        return s.g.diamondCuts[bipId].diamondCut;
    }

    function diamondCutIsEmpty(uint32 bipId) public view returns (bool) {
        return ((s.g.diamondCuts[bipId].diamondCut.length == 0) && (s.g.diamondCuts[bipId].initAddress == address(0)));
    }

    ///  Internal*
    function createBip(IDiamondCut.FacetCut[] memory _diamondCut, address _init, bytes memory _calldata, uint8 pauseOrUnpause, uint32 period, address account) internal returns (uint32) {
        require((_init != address(0)) || (_calldata.length == 0), "Governance: calldata not empty.");
        uint32 bipId = s.g.bipIndex;
        s.g.bipIndex += 1;
        s.g.bips[bipId].start = season();
        s.g.bips[bipId].period = period;
        s.g.bips[bipId].timestamp = uint128(block.timestamp);
        s.g.bips[bipId].proposer = account;
        s.g.bips[bipId].pauseOrUnpause = pauseOrUnpause;
        for (uint i = 0; i < _diamondCut.length; i++) s.g.diamondCuts[bipId].diamondCut.push(_diamondCut[i]);
        s.g.diamondCuts[bipId].initAddress = _init;
        s.g.diamondCuts[bipId].initData = _calldata;
        s.g.activeBips.push(bipId);
        return bipId;
    }

    function endBip(uint32 bipId) internal {
        uint256 i = 0;
        while (s.g.activeBips[i] != bipId) i++;
        s.g.bips[bipId].timestamp = uint128(block.timestamp);
        s.g.bips[bipId].endTotalRoots = totalRoots();
        uint256 numberOfActiveBips = s.g.activeBips.length - 1;
        if (i < numberOfActiveBips) s.g.activeBips[i] = s.g.activeBips[numberOfActiveBips];
        s.g.activeBips.pop();
    }

    function cutBip(uint32 bipId) internal {
        if (diamondCutIsEmpty(bipId)) return;
        LibDiamond.diamondCut(s.g.diamondCuts[bipId].diamondCut, s.g.diamondCuts[bipId].initAddress, s.g.diamondCuts[bipId].initData);
    }

    function proposer(uint32 bipId) public view returns (address) {
        return s.g.bips[bipId].proposer;
    }

    function startFor(uint32 bipId) public view returns (uint32) {
        return s.g.bips[bipId].start;
    }

    function periodFor(uint32 bipId) public view returns (uint32) {
        return s.g.bips[bipId].period;
    }

    function timestamp(uint32 bipId) public view returns (uint256) {
        return uint256(s.g.bips[bipId].timestamp);
    }

    function isNominated(uint32 bipId) public view returns (bool) {
        return (startFor(bipId) > 0) && (!s.g.bips[bipId].executed);
    }

    function isActive(uint32 bipId) public view returns (bool) {
        return season() < startFor(bipId).add(periodFor(bipId));
    }

    function isExpired(uint32 bipId) public view returns (bool) {
        return season() > startFor(bipId).add(periodFor(bipId)).add(C.getGovernanceExpiration());
    }

    function bipVotePercent(uint32 bipId) public view returns (Decimal.D256 memory) {
        return Decimal.ratio(rootsFor(bipId), totalRoots());
    }

    function endedBipVotePercent(uint32 bipId) public view returns (Decimal.D256 memory) {
        return Decimal.ratio(s.g.bips[bipId].roots, s.g.bips[bipId].endTotalRoots);
    }

    function canPropose(address account) public view returns (bool) {
        if ((totalRoots() == 0) || (balanceOfRoots(account) == 0)) {
            return false;
        }
        Decimal.D256 memory stake = Decimal.ratio(balanceOfRoots(account), totalRoots());
        return stake.greaterThan(C.getGovernanceProposalThreshold());
    }

    function notTooProposed(address account) public view returns (bool) {
        uint256 propositions;
        for (uint256 i = 0; i < s.g.activeBips.length; i++) {
            uint32 bipId = s.g.activeBips[i];
            if (s.g.bips[bipId].proposer == account) propositions += 1;
        }
        return (propositions < C.getMaxPropositions());
    }

    ///  Shed*
    function incentiveTime(uint32 bipId) public view returns (uint256) {
        uint256 time = block.timestamp.sub(s.g.bips[bipId].timestamp);
        if (time > 1800) time = 1800;
        return time / 6;
    }

    function balanceOfRoots(address account) public view returns (uint256) {
        return s.a[account].roots;
    }

    function totalRoots() public view returns (uint256) {
        return s.s.roots;
    }

    function season() public view returns (uint32) {
        return s.season.current;
    }
}

interface IERC20 {
    ///  @dev Emitted when `value` tokens are moved from one account (`from`) to
    ///  another (`to`).
    ///  Note that `value` may be zero.
    event Transfer(address indexed from, address indexed to, uint256 value);

    ///  @dev Emitted when the allowance of a `spender` for an `owner` is set by
    ///  a call to {approve}. `value` is the new allowance.
    event Approval(address indexed owner, address indexed spender, uint256 value);

    ///  @dev Returns the amount of tokens in existence.
    function totalSupply() external view returns (uint256);

    ///  @dev Returns the amount of tokens owned by `account`.
    function balanceOf(address account) external view returns (uint256);

    ///  @dev Moves `amount` tokens from the caller's account to `recipient`.
    ///  Returns a boolean value indicating whether the operation succeeded.
    ///  Emits a {Transfer} event.
    function transfer(address recipient, uint256 amount) external returns (bool);

    ///  @dev Returns the remaining number of tokens that `spender` will be
    ///  allowed to spend on behalf of `owner` through {transferFrom}. This is
    ///  zero by default.
    ///  This value changes when {approve} or {transferFrom} are called.
    function allowance(address owner, address spender) external view returns (uint256);

    ///  @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
    ///  Returns a boolean value indicating whether the operation succeeded.
    ///  IMPORTANT: Beware that changing an allowance with this method brings the risk
    ///  that someone may use both the old and the new allowance by unfortunate
    ///  transaction ordering. One possible solution to mitigate this race
    ///  condition is to first reduce the spender's allowance to 0 and set the
    ///  desired value afterwards:
    ///  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
    ///  Emits an {Approval} event.
    function approve(address spender, uint256 amount) external returns (bool);

    ///  @dev Moves `amount` tokens from `sender` to `recipient` using the
    ///  allowance mechanism. `amount` is then deducted from the caller's
    ///  allowance.
    ///  Returns a boolean value indicating whether the operation succeeded.
    ///  Emits a {Transfer} event.
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract VotingBooth is Bip {
    using SafeMath for uint256;
    using LibSafeMath32 for uint32;

    event Vote(address indexed account, uint32 indexed bip, uint256 roots);

    ///  Voting*
    function _vote(address account, uint32 bipId) internal {
        recordVote(account, bipId);
        placeVotedUntil(account, bipId);
        emit Vote(account, bipId, balanceOfRoots(account));
    }

    function recordVote(address account, uint32 bipId) internal {
        s.g.voted[bipId][account] = true;
        s.g.bips[bipId].roots = s.g.bips[bipId].roots.add(balanceOfRoots(account));
    }

    function unrecordVote(address account, uint32 bipId) internal {
        s.g.voted[bipId][account] = false;
        s.g.bips[bipId].roots = s.g.bips[bipId].roots.sub(balanceOfRoots(account));
    }

    function placeVotedUntil(address account, uint32 bipId) internal {
        uint32 newLock = startFor(bipId).add(periodFor(bipId));
        if (newLock > s.a[account].votedUntil) {
            s.a[account].votedUntil = newLock;
        }
    }

    function updateVotedUntil(address account) internal {
        uint32[] memory actives = activeBips();
        uint32 lastSeason = 0;
        for (uint256 i = 0; i < actives.length; i++) {
            uint32 activeBip = actives[i];
            if (s.g.voted[activeBip][account]) {
                uint32 bipEnd = startFor(activeBip).add(periodFor(activeBip));
                if (bipEnd > lastSeason) lastSeason = bipEnd;
            }
        }
        s.a[account].votedUntil = lastSeason;
    }
}

///  @author Publius
///  @title Governance handles propsing, voting for and committing BIPs as well as pausing/unpausing.*
contract GovernanceFacet is VotingBooth {
    using SafeMath for uint256;
    using LibSafeMath32 for uint32;
    using Decimal for Decimal.D256;

    event Proposal(address indexed account, uint32 indexed bip, uint256 indexed start, uint256 period);

    event VoteList(address indexed account, uint32[] bips, bool[] votes, uint256 roots);

    event Unvote(address indexed account, uint32 indexed bip, uint256 roots);

    event Commit(address indexed account, uint32 indexed bip);

    event Incentivization(address indexed account, uint256 beans);

    event Pause(address account, uint256 timestamp);

    event Unpause(address account, uint256 timestamp, uint256 timePassed);

    ///  Proposition*
    function propose(IDiamondCut.FacetCut[] calldata _diamondCut, address _init, bytes calldata _calldata, uint8 _pauseOrUnpause) external {
        require(canPropose(msg.sender), "Governance: Not enough Stalk.");
        require(notTooProposed(msg.sender), "Governance: Too many active BIPs.");
        require(((_init != address(0)) || (_diamondCut.length > 0)) || (_pauseOrUnpause > 0), "Governance: Proposition is empty.");
        uint32 bipId = createBip(_diamondCut, _init, _calldata, _pauseOrUnpause, C.getGovernancePeriod(), msg.sender);
        s.a[msg.sender].proposedUntil = startFor(bipId).add(periodFor(bipId));
        emit Proposal(msg.sender, bipId, season(), C.getGovernancePeriod());
        _vote(msg.sender, bipId);
    }

    ///  Voting*
    function vote(uint32 bip) external {
        require(balanceOfRoots(msg.sender) > 0, "Governance: Must have Stalk.");
        require(isNominated(bip), "Governance: Not nominated.");
        require(isActive(bip), "Governance: Ended.");
        require(!voted(msg.sender, bip), "Governance: Already voted.");
        _vote(msg.sender, bip);
    }

    /// @notice Takes in a list of multiple bips and performs a vote on all of them
    ///  @param bip_list Contains the bip proposal ids to vote on
    function voteAll(uint32[] calldata bip_list) external {
        require(balanceOfRoots(msg.sender) > 0, "Governance: Must have Stalk.");
        bool[] memory vote_types = new bool[](bip_list.length);
        uint i = 0;
        uint32 lock = s.a[msg.sender].votedUntil;
        for (i = 0; i < bip_list.length; i++) {
            uint32 bip = bip_list[i];
            require(isNominated(bip), "Governance: Not nominated.");
            require(isActive(bip), "Governance: Ended.");
            require(!voted(msg.sender, bip), "Governance: Already voted.");
            recordVote(msg.sender, bip);
            vote_types[i] = true;
            uint32 newLock = startFor(bip).add(periodFor(bip));
            if (newLock > lock) lock = newLock;
        }
        s.a[msg.sender].votedUntil = lock;
        emit VoteList(msg.sender, bip_list, vote_types, balanceOfRoots(msg.sender));
    }

    function unvote(uint32 bip) external {
        require(isNominated(bip), "Governance: Not nominated.");
        require(balanceOfRoots(msg.sender) > 0, "Governance: Must have Stalk.");
        require(isActive(bip), "Governance: Ended.");
        require(voted(msg.sender, bip), "Governance: Not voted.");
        require(proposer(bip) != msg.sender, "Governance: Is proposer.");
        unrecordVote(msg.sender, bip);
        updateVotedUntil(msg.sender);
        emit Unvote(msg.sender, bip, balanceOfRoots(msg.sender));
    }

    /// @notice Takes in a list of multiple bips and performs an unvote on all of them
    ///  @param bip_list Contains the bip proposal ids to unvote on
    function unvoteAll(uint32[] calldata bip_list) external {
        require(balanceOfRoots(msg.sender) > 0, "Governance: Must have Stalk.");
        uint i = 0;
        bool[] memory vote_types = new bool[](bip_list.length);
        for (i = 0; i < bip_list.length; i++) {
            uint32 bip = bip_list[i];
            require(isNominated(bip), "Governance: Not nominated.");
            require(isActive(bip), "Governance: Ended.");
            require(voted(msg.sender, bip), "Governance: Not voted.");
            require(proposer(bip) != msg.sender, "Governance: Is proposer.");
            unrecordVote(msg.sender, bip);
            vote_types[i] = false;
        }
        updateVotedUntil(msg.sender);
        emit VoteList(msg.sender, bip_list, vote_types, balanceOfRoots(msg.sender));
    }

    /// @notice Takes in a list of multiple bips and performs a vote or unvote on all of them
    ///          depending on their status: whether they are currently voted on or not voted on
    ///  @param bip_list Contains the bip proposal ids
    function voteUnvoteAll(uint32[] calldata bip_list) external {
        require(balanceOfRoots(msg.sender) > 0, "Governance: Must have Stalk.");
        uint i = 0;
        bool[] memory vote_types = new bool[](bip_list.length);
        for (i = 0; i < bip_list.length; i++) {
            uint32 bip = bip_list[i];
            require(isNominated(bip), "Governance: Not nominated.");
            require(isActive(bip), "Governance: Ended.");
            if (s.g.voted[bip][msg.sender]) {
                require(proposer(bip) != msg.sender, "Governance: Is proposer.");
                unrecordVote(msg.sender, bip);
                vote_types[i] = false;
            } else {
                recordVote(msg.sender, bip);
                vote_types[i] = true;
            }
        }
        updateVotedUntil(msg.sender);
        emit VoteList(msg.sender, bip_list, vote_types, balanceOfRoots(msg.sender));
    }

    ///  Execution*
    function commit(uint32 bip) external {
        require(isNominated(bip), "Governance: Not nominated.");
        require(!isActive(bip), "Governance: Not ended.");
        require(!isExpired(bip), "Governance: Expired.");
        require(endedBipVotePercent(bip).greaterThanOrEqualTo(C.getGovernancePassThreshold()), "Governance: Must have majority.");
        _execute(msg.sender, bip, true, true);
    }

    function emergencyCommit(uint32 bip) external {
        require(isNominated(bip), "Governance: Not nominated.");
        require(block.timestamp >= timestamp(bip).add(C.getGovernanceEmergencyPeriod()), "Governance: Too early.");
        require(isActive(bip), "Governance: Ended.");
        require(bipVotePercent(bip).greaterThanOrEqualTo(C.getGovernanceEmergencyThreshold()), "Governance: Must have super majority.");
        _execute(msg.sender, bip, false, true);
    }

    function pauseOrUnpause(uint32 bip) external {
        require(isNominated(bip), "Governance: Not nominated.");
        require(diamondCutIsEmpty(bip), "Governance: Has diamond cut.");
        require(isActive(bip), "Governance: Ended.");
        require(bipVotePercent(bip).greaterThanOrEqualTo(C.getGovernanceEmergencyThreshold()), "Governance: Must have super majority.");
        _execute(msg.sender, bip, false, false);
    }

    function _execute(address account, uint32 bip, bool ended, bool cut) private {
        if (!ended) endBip(bip);
        s.g.bips[bip].executed = true;
        if (cut) cutBip(bip);
        pauseOrUnpauseBip(bip);
        incentivize(account, ended, bip, C.getCommitIncentive());
        emit Commit(account, bip);
    }

    function incentivize(address account, bool compound, uint32 bipId, uint256 amount) private {
        if (compound) amount = LibIncentive.fracExp(amount, 100, incentiveTime(bipId), 2);
        IBean(s.c.bean).mint(account, amount);
        emit Incentivization(account, amount);
    }

    ///  Pause / Unpause*
    function ownerPause() external {
        LibDiamond.enforceIsContractOwner();
        pause();
    }

    function ownerUnpause() external {
        LibDiamond.enforceIsContractOwner();
        unpause();
    }

    function pause() private {
        if (s.paused) return;
        s.paused = true;
        s.o.initialized = false;
        s.pausedAt = uint128(block.timestamp);
        emit Pause(msg.sender, block.timestamp);
    }

    function unpause() private {
        if (!s.paused) return;
        s.paused = false;
        uint256 timePassed = block.timestamp.sub(uint(s.pausedAt));
        timePassed = (timePassed.div(3600).add(1)).mul(3600);
        s.season.start = s.season.start.add(timePassed);
        emit Unpause(msg.sender, block.timestamp, timePassed);
    }

    function pauseOrUnpauseBip(uint32 bipId) private {
        if (s.g.bips[bipId].pauseOrUnpause == 1) pause(); else if (s.g.bips[bipId].pauseOrUnpause == 2) unpause();
    }
}

abstract contract IBean is IERC20 {
    function burn(uint256 amount) virtual public;

    function burnFrom(address account, uint256 amount) virtual public;

    function mint(address account, uint256 amount) virtual public returns (bool);
}

interface ISiloUpdate {
    function updateSilo(address account) external payable;
}

library LibInternal {
    struct FacetAddressAndPosition {
        address facetAddress;
        uint16 functionSelectorPosition;
    }

    struct FacetFunctionSelectors {
        bytes4[] functionSelectors;
        uint16 facetAddressPosition;
    }

    struct DiamondStorage {
        mapping(bytes4 => FacetAddressAndPosition) selectorToFacetAndPosition;
        mapping(address => FacetFunctionSelectors) facetFunctionSelectors;
        address[] facetAddresses;
        mapping(bytes4 => bool) supportedInterfaces;
        address contractOwner;
    }

    bytes32 internal constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage");

    function diamondStorage() public pure returns (DiamondStorage storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function updateSilo(address account) internal {
        DiamondStorage storage ds = diamondStorage();
        address facet = ds.selectorToFacetAndPosition[ISiloUpdate.updateSilo.selector].facetAddress;
        bytes memory myFunctionCall = abi.encodeWithSelector(ISiloUpdate.updateSilo.selector, account);
        (bool success, ) = address(facet).delegatecall(myFunctionCall);
        require(success, "Silo: updateSilo failed.");
    }
}

library LibIncentive {
    /// @notice fracExp estimates an exponential expression in the form: k * (1 + 1/q) ^ N.
    ///  We use a binomial expansion to estimate the exponent to avoid running into integer overflow issues.
    ///  @param k - the principle amount
    ///  @param q - the base of the fraction being exponentiated
    ///  @param n - the exponent
    ///  @param x - the excess # of times to run the iteration.
    ///  @return s - the solution to the exponential equation
    function fracExp(uint k, uint q, uint n, uint x) public pure returns (uint s) {
        uint p = (log_two(n) + 1) + ((x * n) / q);
        uint N = 1;
        uint B = 1;
        for (uint i = 0; i < p; ++i) {
            s += ((k * N) / B) / (q ** i);
            N = N * (n - i);
            B = B * (i + 1);
        }
    }

    /// @notice log_two calculates the log2 solution in a gas efficient manner
    ///  Motivation: https://ethereum.stackexchange.com/questions/8086
    ///  @param x - the base to calculate log2 of
    function log_two(uint x) public pure returns (uint y) {
        assembly {
            let arg := x
            x := sub(x, 1)
            x := or(x, div(x, 0x02))
            x := or(x, div(x, 0x04))
            x := or(x, div(x, 0x10))
            x := or(x, div(x, 0x100))
            x := or(x, div(x, 0x10000))
            x := or(x, div(x, 0x100000000))
            x := or(x, div(x, 0x10000000000000000))
            x := or(x, div(x, 0x100000000000000000000000000000000))
            x := add(x, 1)
            let m := mload(0x40)
            mstore(m, 0xf8f9cbfae6cc78fbefe7cdc3a1793dfcf4f0e8bbd8cec470b6a28a7a5a3e1efd)
            mstore(add(m, 0x20), 0xf5ecf1b3e9debc68e1d9cfabc5997135bfb7a7a3938b7b606b5b4b3f2f1f0ffe)
            mstore(add(m, 0x40), 0xf6e4ed9ff2d6b458eadcdf97bd91692de2d4da8fd2d0ac50c6ae9a8272523616)
            mstore(add(m, 0x60), 0xc8c0b887b0a8a4489c948c7f847c6125746c645c544c444038302820181008ff)
            mstore(add(m, 0x80), 0xf7cae577eec2a03cf3bad76fb589591debb2dd67e0aa9834bea6925f6a4a2e0e)
            mstore(add(m, 0xa0), 0xe39ed557db96902cd38ed14fad815115c786af479b7e83247363534337271707)
            mstore(add(m, 0xc0), 0xc976c13bb96e881cb166a933a55e490d9d56952b8d4e801485467d2362422606)
            mstore(add(m, 0xe0), 0x753a6d1b65325d0c552a4d1345224105391a310b29122104190a110309020100)
            mstore(0x40, add(m, 0x100))
            let magic := 0x818283848586878898a8b8c8d8e8f929395969799a9b9d9e9faaeb6bedeeff
            let shift := 0x100000000000000000000000000000000000000000000000000000000000000
            let a := div(mul(x, magic), shift)
            y := div(mload(add(m, sub(255, a))), shift)
            y := add(y, mul(256, gt(arg, 0x8000000000000000000000000000000000000000000000000000000000000000)))
        }
    }
}

///  @dev Wrappers over Solidity's arithmetic operations with added overflow
///  checks.
///  Arithmetic operations in Solidity wrap on overflow. This can easily result
///  in bugs, because programmers usually assume that an overflow raises an
///  error, which is the standard behavior in high level programming languages.
///  `SafeMath` restores this intuition by reverting the transaction when an
///  operation overflows.
///  Using this library instead of the unchecked operations eliminates an entire
///  class of bugs, so it's recommended to use it always.
library SafeMath {
    ///  @dev Returns the addition of two unsigned integers, with an overflow flag.
    ///  _Available since v3.4._
    function tryAdd(uint256 a, uint256 b) public pure returns (bool, uint256) {
        uint256 c = a + b;
        if (c < a) return (false, 0);
        return (true, c);
    }

    ///  @dev Returns the substraction of two unsigned integers, with an overflow flag.
    ///  _Available since v3.4._
    function trySub(uint256 a, uint256 b) public pure returns (bool, uint256) {
        if (b > a) return (false, 0);
        return (true, a - b);
    }

    ///  @dev Returns the multiplication of two unsigned integers, with an overflow flag.
    ///  _Available since v3.4._
    function tryMul(uint256 a, uint256 b) public pure returns (bool, uint256) {
        if (a == 0) return (true, 0);
        uint256 c = a * b;
        if ((c / a) != b) return (false, 0);
        return (true, c);
    }

    ///  @dev Returns the division of two unsigned integers, with a division by zero flag.
    ///  _Available since v3.4._
    function tryDiv(uint256 a, uint256 b) public pure returns (bool, uint256) {
        if (b == 0) return (false, 0);
        return (true, a / b);
    }

    ///  @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
    ///  _Available since v3.4._
    function tryMod(uint256 a, uint256 b) public pure returns (bool, uint256) {
        if (b == 0) return (false, 0);
        return (true, a % b);
    }

    ///  @dev Returns the addition of two unsigned integers, reverting on
    ///  overflow.
    ///  Counterpart to Solidity's `+` operator.
    ///  Requirements:
    ///  - Addition cannot overflow.
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    ///  @dev Returns the subtraction of two unsigned integers, reverting on
    ///  overflow (when the result is negative).
    ///  Counterpart to Solidity's `-` operator.
    ///  Requirements:
    ///  - Subtraction cannot overflow.
    function sub(uint256 a, uint256 b) public pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }

    ///  @dev Returns the multiplication of two unsigned integers, reverting on
    ///  overflow.
    ///  Counterpart to Solidity's `*` operator.
    ///  Requirements:
    ///  - Multiplication cannot overflow.
    function mul(uint256 a, uint256 b) public pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        require((c / a) == b, "SafeMath: multiplication overflow");
        return c;
    }

    ///  @dev Returns the integer division of two unsigned integers, reverting on
    ///  division by zero. The result is rounded towards zero.
    ///  Counterpart to Solidity's `/` operator. Note: this function uses a
    ///  `revert` opcode (which leaves remaining gas untouched) while Solidity
    ///  uses an invalid opcode to revert (consuming all remaining gas).
    ///  Requirements:
    ///  - The divisor cannot be zero.
    function div(uint256 a, uint256 b) public pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        return a / b;
    }

    ///  @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
    ///  reverting when dividing by zero.
    ///  Counterpart to Solidity's `%` operator. This function uses a `revert`
    ///  opcode (which leaves remaining gas untouched) while Solidity uses an
    ///  invalid opcode to revert (consuming all remaining gas).
    ///  Requirements:
    ///  - The divisor cannot be zero.
    function mod(uint256 a, uint256 b) public pure returns (uint256) {
        require(b > 0, "SafeMath: modulo by zero");
        return a % b;
    }

    ///  @dev Returns the subtraction of two unsigned integers, reverting with custom message on
    ///  overflow (when the result is negative).
    ///  CAUTION: This function is deprecated because it requires allocating memory for the error
    ///  message unnecessarily. For custom revert reasons use {trySub}.
    ///  Counterpart to Solidity's `-` operator.
    ///  Requirements:
    ///  - Subtraction cannot overflow.
    function sub(uint256 a, uint256 b, string memory errorMessage) public pure returns (uint256) {
        require(b <= a, errorMessage);
        return a - b;
    }

    ///  @dev Returns the integer division of two unsigned integers, reverting with custom message on
    ///  division by zero. The result is rounded towards zero.
    ///  CAUTION: This function is deprecated because it requires allocating memory for the error
    ///  message unnecessarily. For custom revert reasons use {tryDiv}.
    ///  Counterpart to Solidity's `/` operator. Note: this function uses a
    ///  `revert` opcode (which leaves remaining gas untouched) while Solidity
    ///  uses an invalid opcode to revert (consuming all remaining gas).
    ///  Requirements:
    ///  - The divisor cannot be zero.
    function div(uint256 a, uint256 b, string memory errorMessage) public pure returns (uint256) {
        require(b > 0, errorMessage);
        return a / b;
    }

    ///  @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
    ///  reverting with custom message when dividing by zero.
    ///  CAUTION: This function is deprecated because it requires allocating memory for the error
    ///  message unnecessarily. For custom revert reasons use {tryMod}.
    ///  Counterpart to Solidity's `%` operator. This function uses a `revert`
    ///  opcode (which leaves remaining gas untouched) while Solidity uses an
    ///  invalid opcode to revert (consuming all remaining gas).
    ///  Requirements:
    ///  - The divisor cannot be zero.
    function mod(uint256 a, uint256 b, string memory errorMessage) public pure returns (uint256) {
        require(b > 0, errorMessage);
        return a % b;
    }
}

///  @author Publius
///  @title LibSafeMath32 is a uint32 variation of Open Zeppelin's Safe Math library.*
library LibSafeMath32 {
    ///  @dev Returns the addition of two unsigned integers, with an overflow flag.
    ///  _Available since v3.4._
    function tryAdd(uint32 a, uint32 b) public pure returns (bool, uint32) {
        uint32 c = a + b;
        if (c < a) return (false, 0);
        return (true, c);
    }

    ///  @dev Returns the substraction of two unsigned integers, with an overflow flag.
    ///  _Available since v3.4._
    function trySub(uint32 a, uint32 b) public pure returns (bool, uint32) {
        if (b > a) return (false, 0);
        return (true, a - b);
    }

    ///  @dev Returns the multiplication of two unsigned integers, with an overflow flag.
    ///  _Available since v3.4._
    function tryMul(uint32 a, uint32 b) public pure returns (bool, uint32) {
        if (a == 0) return (true, 0);
        uint32 c = a * b;
        if ((c / a) != b) return (false, 0);
        return (true, c);
    }

    ///  @dev Returns the division of two unsigned integers, with a division by zero flag.
    ///  _Available since v3.4._
    function tryDiv(uint32 a, uint32 b) public pure returns (bool, uint32) {
        if (b == 0) return (false, 0);
        return (true, a / b);
    }

    ///  @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
    ///  _Available since v3.4._
    function tryMod(uint32 a, uint32 b) public pure returns (bool, uint32) {
        if (b == 0) return (false, 0);
        return (true, a % b);
    }

    ///  @dev Returns the addition of two unsigned integers, reverting on
    ///  overflow.
    ///  Counterpart to Solidity's `+` operator.
    ///  Requirements:
    ///  - Addition cannot overflow.
    function add(uint32 a, uint32 b) public pure returns (uint32) {
        uint32 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    ///  @dev Returns the subtraction of two unsigned integers, reverting on
    ///  overflow (when the result is negative).
    ///  Counterpart to Solidity's `-` operator.
    ///  Requirements:
    ///  - Subtraction cannot overflow.
    function sub(uint32 a, uint32 b) public pure returns (uint32) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }

    ///  @dev Returns the multiplication of two unsigned integers, reverting on
    ///  overflow.
    ///  Counterpart to Solidity's `*` operator.
    ///  Requirements:
    ///  - Multiplication cannot overflow.
    function mul(uint32 a, uint32 b) public pure returns (uint32) {
        if (a == 0) return 0;
        uint32 c = a * b;
        require((c / a) == b, "SafeMath: multiplication overflow");
        return c;
    }

    ///  @dev Returns the integer division of two unsigned integers, reverting on
    ///  division by zero. The result is rounded towards zero.
    ///  Counterpart to Solidity's `/` operator. Note: this function uses a
    ///  `revert` opcode (which leaves remaining gas untouched) while Solidity
    ///  uses an invalid opcode to revert (consuming all remaining gas).
    ///  Requirements:
    ///  - The divisor cannot be zero.
    function div(uint32 a, uint32 b) public pure returns (uint32) {
        require(b > 0, "SafeMath: division by zero");
        return a / b;
    }

    ///  @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
    ///  reverting when dividing by zero.
    ///  Counterpart to Solidity's `%` operator. This function uses a `revert`
    ///  opcode (which leaves remaining gas untouched) while Solidity uses an
    ///  invalid opcode to revert (consuming all remaining gas).
    ///  Requirements:
    ///  - The divisor cannot be zero.
    function mod(uint32 a, uint32 b) public pure returns (uint32) {
        require(b > 0, "SafeMath: modulo by zero");
        return a % b;
    }

    ///  @dev Returns the subtraction of two unsigned integers, reverting with custom message on
    ///  overflow (when the result is negative).
    ///  CAUTION: This function is deprecated because it requires allocating memory for the error
    ///  message unnecessarily. For custom revert reasons use {trySub}.
    ///  Counterpart to Solidity's `-` operator.
    ///  Requirements:
    ///  - Subtraction cannot overflow.
    function sub(uint32 a, uint32 b, string memory errorMessage) public pure returns (uint32) {
        require(b <= a, errorMessage);
        return a - b;
    }

    ///  @dev Returns the integer division of two unsigned integers, reverting with custom message on
    ///  division by zero. The result is rounded towards zero.
    ///  CAUTION: This function is deprecated because it requires allocating memory for the error
    ///  message unnecessarily. For custom revert reasons use {tryDiv}.
    ///  Counterpart to Solidity's `/` operator. Note: this function uses a
    ///  `revert` opcode (which leaves remaining gas untouched) while Solidity
    ///  uses an invalid opcode to revert (consuming all remaining gas).
    ///  Requirements:
    ///  - The divisor cannot be zero.
    function div(uint32 a, uint32 b, string memory errorMessage) public pure returns (uint32) {
        require(b > 0, errorMessage);
        return a / b;
    }

    ///  @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
    ///  reverting with custom message when dividing by zero.
    ///  CAUTION: This function is deprecated because it requires allocating memory for the error
    ///  message unnecessarily. For custom revert reasons use {tryMod}.
    ///  Counterpart to Solidity's `%` operator. This function uses a `revert`
    ///  opcode (which leaves remaining gas untouched) while Solidity uses an
    ///  invalid opcode to revert (consuming all remaining gas).
    ///  Requirements:
    ///  - The divisor cannot be zero.
    function mod(uint32 a, uint32 b, string memory errorMessage) public pure returns (uint32) {
        require(b > 0, errorMessage);
        return a % b;
    }
}

///  @author Publius
///  @title App Storage defines the state object for Beanstalk.*
contract Account {
    struct Field {
        mapping(uint256 => uint256) plots;
        mapping(address => uint256) podAllowances;
    }

    struct AssetSilo {
        mapping(uint32 => uint256) withdrawals;
        mapping(uint32 => uint256) deposits;
        mapping(uint32 => uint256) depositSeeds;
    }

    struct Deposit {
        uint128 amount;
        uint128 bdv;
    }

    struct Silo {
        uint256 stalk;
        uint256 seeds;
    }

    struct SeasonOfPlenty {
        uint256 base;
        uint256 roots;
        uint256 basePerRoot;
    }

    struct State {
        Field field;
        AssetSilo bean;
        AssetSilo lp;
        Silo s;
        uint32 votedUntil;
        uint32 lastUpdate;
        uint32 lastSop;
        uint32 lastRain;
        uint32 lastSIs;
        uint32 proposedUntil;
        SeasonOfPlenty sop;
        uint256 roots;
        uint256 wrappedBeans;
        mapping(address => mapping(uint32 => Deposit)) deposits;
        mapping(address => mapping(uint32 => uint256)) withdrawals;
    }
}

contract Storage {
    struct Contracts {
        address bean;
        address pair;
        address pegPair;
        address weth;
    }

    struct Field {
        uint256 soil;
        uint256 pods;
        uint256 harvested;
        uint256 harvestable;
    }

    struct Bip {
        address proposer;
        uint32 start;
        uint32 period;
        bool executed;
        int pauseOrUnpause;
        uint128 timestamp;
        uint256 roots;
        uint256 endTotalRoots;
    }

    struct DiamondCut {
        IDiamondCut.FacetCut[] diamondCut;
        address initAddress;
        bytes initData;
    }

    struct Governance {
        uint32[] activeBips;
        uint32 bipIndex;
        mapping(uint32 => DiamondCut) diamondCuts;
        mapping(uint32 => mapping(address => bool)) voted;
        mapping(uint32 => Bip) bips;
    }

    struct AssetSilo {
        uint256 deposited;
        uint256 withdrawn;
    }

    struct IncreaseSilo {
        uint256 beans;
        uint256 stalk;
    }

    struct V1IncreaseSilo {
        uint256 beans;
        uint256 stalk;
        uint256 roots;
    }

    struct SeasonOfPlenty {
        uint256 weth;
        uint256 base;
        uint32 last;
    }

    struct Silo {
        uint256 stalk;
        uint256 seeds;
        uint256 roots;
    }

    struct Oracle {
        bool initialized;
        uint256 cumulative;
        uint256 pegCumulative;
        uint32 timestamp;
        uint32 pegTimestamp;
    }

    struct Rain {
        uint32 start;
        bool raining;
        uint256 pods;
        uint256 roots;
    }

    struct Season {
        uint32 current;
        uint32 sis;
        uint8 withdrawSeasons;
        uint256 start;
        uint256 period;
        uint256 timestamp;
    }

    struct Weather {
        uint256 startSoil;
        uint256 lastDSoil;
        uint96 lastSoilPercent;
        uint32 lastSowTime;
        uint32 nextSowTime;
        uint32 yield;
        bool didSowBelowMin;
        bool didSowFaster;
    }

    struct Fundraiser {
        address payee;
        address token;
        uint256 total;
        uint256 remaining;
        uint256 start;
    }

    struct SiloSettings {
        bytes4 selector;
        uint32 seeds;
        uint32 stalk;
    }
}

///  @author Publius
///  @title C holds the contracts for Beanstalk.*
library C {
    using Decimal for Decimal.D256;
    using SafeMath for uint256;

    uint256 public constant PERCENT_BASE = 1e18;
    uint256 public constant CHAIN_ID = 1;
    uint256 public constant CURRENT_SEASON_PERIOD = 3600;
    uint256 public constant HARVESET_PERCENTAGE = 0.5e18;
    uint256 public constant POD_RATE_LOWER_BOUND = 0.05e18;
    uint256 public constant OPTIMAL_POD_RATE = 0.15e18;
    uint256 public constant POD_RATE_UPPER_BOUND = 0.25e18;
    uint256 public constant DELTA_POD_DEMAND_LOWER_BOUND = 0.95e18;
    uint256 public constant DELTA_POD_DEMAND_UPPER_BOUND = 1.05e18;
    uint32 public constant STEADY_SOW_TIME = 60;
    uint256 public constant RAIN_TIME = 24;
    uint32 public constant GOVERNANCE_PERIOD = 168;
    uint32 public constant GOVERNANCE_EMERGENCY_PERIOD = 86400;
    uint256 public constant GOVERNANCE_PASS_THRESHOLD = 5e17;
    uint256 public constant GOVERNANCE_EMERGENCY_THRESHOLD_NUMERATOR = 2;
    uint256 public constant GOVERNANCE_EMERGENCY_THRESHOLD_DEMONINATOR = 3;
    uint32 public constant GOVERNANCE_EXPIRATION = 24;
    uint256 public constant GOVERNANCE_PROPOSAL_THRESHOLD = 0.001e18;
    uint256 public constant BASE_COMMIT_INCENTIVE = 100e6;
    uint256 public constant MAX_PROPOSITIONS = 5;
    uint256 public constant BASE_ADVANCE_INCENTIVE = 100e6;
    uint32 public constant WITHDRAW_TIME = 25;
    uint256 public constant SEEDS_PER_BEAN = 2;
    uint256 public constant SEEDS_PER_LP_BEAN = 4;
    uint256 public constant STALK_PER_BEAN = 10000;
    uint256 public constant ROOTS_BASE = 1e12;
    uint256 public constant MAX_SOIL_DENOMINATOR = 4;
    uint256 public constant COMPLEX_WEATHER_DENOMINATOR = 1000;

    ///  Getters*
    function getSeasonPeriod() public pure returns (uint256) {
        return CURRENT_SEASON_PERIOD;
    }

    function getGovernancePeriod() public pure returns (uint32) {
        return GOVERNANCE_PERIOD;
    }

    function getGovernanceEmergencyPeriod() public pure returns (uint32) {
        return GOVERNANCE_EMERGENCY_PERIOD;
    }

    function getGovernanceExpiration() public pure returns (uint32) {
        return GOVERNANCE_EXPIRATION;
    }

    function getGovernancePassThreshold() public pure returns (Decimal.D256 memory) {
        return Decimal.D256({value: GOVERNANCE_PASS_THRESHOLD});
    }

    function getGovernanceEmergencyThreshold() public pure returns (Decimal.D256 memory) {
        return Decimal.ratio(GOVERNANCE_EMERGENCY_THRESHOLD_NUMERATOR, GOVERNANCE_EMERGENCY_THRESHOLD_DEMONINATOR);
    }

    function getGovernanceProposalThreshold() public pure returns (Decimal.D256 memory) {
        return Decimal.D256({value: GOVERNANCE_PROPOSAL_THRESHOLD});
    }

    function getAdvanceIncentive() public pure returns (uint256) {
        return BASE_ADVANCE_INCENTIVE;
    }

    function getCommitIncentive() public pure returns (uint256) {
        return BASE_COMMIT_INCENTIVE;
    }

    function getSiloWithdrawSeasons() public pure returns (uint32) {
        return WITHDRAW_TIME;
    }

    function getComplexWeatherDenominator() public pure returns (uint256) {
        return COMPLEX_WEATHER_DENOMINATOR;
    }

    function getMaxSoilDenominator() public pure returns (uint256) {
        return MAX_SOIL_DENOMINATOR;
    }

    function getHarvestPercentage() public pure returns (uint256) {
        return HARVESET_PERCENTAGE;
    }

    function getChainId() public pure returns (uint256) {
        return CHAIN_ID;
    }

    function getOptimalPodRate() public pure returns (Decimal.D256 memory) {
        return Decimal.ratio(OPTIMAL_POD_RATE, PERCENT_BASE);
    }

    function getUpperBoundPodRate() public pure returns (Decimal.D256 memory) {
        return Decimal.ratio(POD_RATE_UPPER_BOUND, PERCENT_BASE);
    }

    function getLowerBoundPodRate() public pure returns (Decimal.D256 memory) {
        return Decimal.ratio(POD_RATE_LOWER_BOUND, PERCENT_BASE);
    }

    function getUpperBoundDPD() public pure returns (Decimal.D256 memory) {
        return Decimal.ratio(DELTA_POD_DEMAND_UPPER_BOUND, PERCENT_BASE);
    }

    function getLowerBoundDPD() public pure returns (Decimal.D256 memory) {
        return Decimal.ratio(DELTA_POD_DEMAND_LOWER_BOUND, PERCENT_BASE);
    }

    function getSteadySowTime() public pure returns (uint32) {
        return STEADY_SOW_TIME;
    }

    function getRainTime() public pure returns (uint256) {
        return RAIN_TIME;
    }

    function getMaxPropositions() public pure returns (uint256) {
        return MAX_PROPOSITIONS;
    }

    function getSeedsPerBean() public pure returns (uint256) {
        return SEEDS_PER_BEAN;
    }

    function getSeedsPerLPBean() public pure returns (uint256) {
        return SEEDS_PER_LP_BEAN;
    }

    function getStalkPerBean() public pure returns (uint256) {
        return STALK_PER_BEAN;
    }

    function getStalkPerLPSeed() public pure returns (uint256) {
        return STALK_PER_BEAN / SEEDS_PER_LP_BEAN;
    }

    function getRootsBase() public pure returns (uint256) {
        return ROOTS_BASE;
    }
}

///  @title Decimal
///  @author dYdX
///  Library that defines a fixed-point number with 18 decimal places.
library Decimal {
    using SafeMath for uint256;

    struct D256 {
        uint256 value;
    }

    uint256 internal constant BASE = 10 ** 18;

    function zero() public pure returns (D256 memory) {
        return D256({value: 0});
    }

    function one() public pure returns (D256 memory) {
        return D256({value: BASE});
    }

    function from(uint256 a) public pure returns (D256 memory) {
        return D256({value: a.mul(BASE)});
    }

    function ratio(uint256 a, uint256 b) public pure returns (D256 memory) {
        return D256({value: getPartial(a, BASE, b)});
    }

    function add(D256 memory self, uint256 b) public pure returns (D256 memory) {
        return D256({value: self.value.add(b.mul(BASE))});
    }

    function sub(D256 memory self, uint256 b) public pure returns (D256 memory) {
        return D256({value: self.value.sub(b.mul(BASE))});
    }

    function sub(D256 memory self, uint256 b, string memory reason) public pure returns (D256 memory) {
        return D256({value: self.value.sub(b.mul(BASE), reason)});
    }

    function mul(D256 memory self, uint256 b) public pure returns (D256 memory) {
        return D256({value: self.value.mul(b)});
    }

    function div(D256 memory self, uint256 b) public pure returns (D256 memory) {
        return D256({value: self.value.div(b)});
    }

    function pow(D256 memory self, uint256 b) public pure returns (D256 memory) {
        if (b == 0) {
            return one();
        }
        D256 memory temp = D256({value: self.value});
        for (uint256 i = 1; i < b; i++) {
            temp = mul(temp, self);
        }
        return temp;
    }

    function add(D256 memory self, D256 memory b) public pure returns (D256 memory) {
        return D256({value: self.value.add(b.value)});
    }

    function sub(D256 memory self, D256 memory b) public pure returns (D256 memory) {
        return D256({value: self.value.sub(b.value)});
    }

    function sub(D256 memory self, D256 memory b, string memory reason) public pure returns (D256 memory) {
        return D256({value: self.value.sub(b.value, reason)});
    }

    function mul(D256 memory self, D256 memory b) public pure returns (D256 memory) {
        return D256({value: getPartial(self.value, b.value, BASE)});
    }

    function div(D256 memory self, D256 memory b) public pure returns (D256 memory) {
        return D256({value: getPartial(self.value, BASE, b.value)});
    }

    function equals(D256 memory self, D256 memory b) public pure returns (bool) {
        return self.value == b.value;
    }

    function greaterThan(D256 memory self, D256 memory b) public pure returns (bool) {
        return compareTo(self, b) == 2;
    }

    function lessThan(D256 memory self, D256 memory b) public pure returns (bool) {
        return compareTo(self, b) == 0;
    }

    function greaterThanOrEqualTo(D256 memory self, D256 memory b) public pure returns (bool) {
        return compareTo(self, b) > 0;
    }

    function lessThanOrEqualTo(D256 memory self, D256 memory b) public pure returns (bool) {
        return compareTo(self, b) < 2;
    }

    function isZero(D256 memory self) public pure returns (bool) {
        return self.value == 0;
    }

    function asUint256(D256 memory self) public pure returns (uint256) {
        return self.value.div(BASE);
    }

    function getPartial(uint256 target, uint256 numerator, uint256 denominator) public pure returns (uint256) {
        return target.mul(numerator).div(denominator);
    }

    function compareTo(D256 memory a, D256 memory b) public pure returns (uint256) {
        if (a.value == b.value) {
            return 1;
        }
        return (a.value > b.value) ? 2 : 0;
    }
}

library LibDiamond {
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    event DiamondCut(IDiamondCut.FacetCut[] _diamondCut, address _init, bytes _calldata);

    struct FacetAddressAndPosition {
        address facetAddress;
        uint96 functionSelectorPosition;
    }

    struct FacetFunctionSelectors {
        bytes4[] functionSelectors;
        uint256 facetAddressPosition;
    }

    struct DiamondStorage {
        mapping(bytes4 => FacetAddressAndPosition) selectorToFacetAndPosition;
        mapping(address => FacetFunctionSelectors) facetFunctionSelectors;
        address[] facetAddresses;
        mapping(bytes4 => bool) supportedInterfaces;
        address contractOwner;
    }

    bytes32 internal constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage");

    function diamondStorage() public pure returns (DiamondStorage storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function setContractOwner(address _newOwner) internal {
        DiamondStorage storage ds = diamondStorage();
        address previousOwner = ds.contractOwner;
        ds.contractOwner = _newOwner;
        emit OwnershipTransferred(previousOwner, _newOwner);
    }

    function contractOwner() public view returns (address contractOwner_) {
        contractOwner_ = diamondStorage().contractOwner;
    }

    function enforceIsContractOwner() public view {
        require(msg.sender == diamondStorage().contractOwner, "LibDiamond: Must be contract owner");
    }

    function addDiamondFunctions(address _diamondCutFacet, address _diamondLoupeFacet, address _ownershipFacet) internal {
        IDiamondCut.FacetCut[] memory cut = new IDiamondCut.FacetCut[](3);
        bytes4[] memory functionSelectors = new bytes4[](1);
        functionSelectors[0] = IDiamondCut.diamondCut.selector;
        cut[0] = IDiamondCut.FacetCut({facetAddress: _diamondCutFacet, action: IDiamondCut.FacetCutAction.Add, functionSelectors: functionSelectors});
        functionSelectors = new bytes4[](5);
        functionSelectors[0] = IDiamondLoupe.facets.selector;
        functionSelectors[1] = IDiamondLoupe.facetFunctionSelectors.selector;
        functionSelectors[2] = IDiamondLoupe.facetAddresses.selector;
        functionSelectors[3] = IDiamondLoupe.facetAddress.selector;
        functionSelectors[4] = IERC165.supportsInterface.selector;
        cut[1] = IDiamondCut.FacetCut({facetAddress: _diamondLoupeFacet, action: IDiamondCut.FacetCutAction.Add, functionSelectors: functionSelectors});
        functionSelectors = new bytes4[](2);
        functionSelectors[0] = IERC173.transferOwnership.selector;
        functionSelectors[1] = IERC173.owner.selector;
        cut[2] = IDiamondCut.FacetCut({facetAddress: _ownershipFacet, action: IDiamondCut.FacetCutAction.Add, functionSelectors: functionSelectors});
        diamondCut(cut, address(0), "");
    }

    function diamondCut(IDiamondCut.FacetCut[] memory _diamondCut, address _init, bytes memory _calldata) internal {
        for (uint256 facetIndex; facetIndex < _diamondCut.length; facetIndex++) {
            IDiamondCut.FacetCutAction action = _diamondCut[facetIndex].action;
            if (action == IDiamondCut.FacetCutAction.Add) {
                addFunctions(_diamondCut[facetIndex].facetAddress, _diamondCut[facetIndex].functionSelectors);
            } else if (action == IDiamondCut.FacetCutAction.Replace) {
                replaceFunctions(_diamondCut[facetIndex].facetAddress, _diamondCut[facetIndex].functionSelectors);
            } else if (action == IDiamondCut.FacetCutAction.Remove) {
                removeFunctions(_diamondCut[facetIndex].facetAddress, _diamondCut[facetIndex].functionSelectors);
            } else {
                revert("LibDiamondCut: Incorrect FacetCutAction");
            }
        }
        emit DiamondCut(_diamondCut, _init, _calldata);
        initializeDiamondCut(_init, _calldata);
    }

    function addFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal {
        require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
        DiamondStorage storage ds = diamondStorage();
        require(_facetAddress != address(0), "LibDiamondCut: Add facet can't be address(0)");
        uint96 selectorPosition = uint96(ds.facetFunctionSelectors[_facetAddress].functionSelectors.length);
        if (selectorPosition == 0) {
            addFacet(ds, _facetAddress);
        }
        for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
            bytes4 selector = _functionSelectors[selectorIndex];
            address oldFacetAddress = ds.selectorToFacetAndPosition[selector].facetAddress;
            require(oldFacetAddress == address(0), "LibDiamondCut: Can't add function that already exists");
            addFunction(ds, selector, selectorPosition, _facetAddress);
            selectorPosition++;
        }
    }

    function replaceFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal {
        require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
        DiamondStorage storage ds = diamondStorage();
        require(_facetAddress != address(0), "LibDiamondCut: Add facet can't be address(0)");
        uint96 selectorPosition = uint96(ds.facetFunctionSelectors[_facetAddress].functionSelectors.length);
        if (selectorPosition == 0) {
            addFacet(ds, _facetAddress);
        }
        for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
            bytes4 selector = _functionSelectors[selectorIndex];
            address oldFacetAddress = ds.selectorToFacetAndPosition[selector].facetAddress;
            require(oldFacetAddress != _facetAddress, "LibDiamondCut: Can't replace function with same function");
            removeFunction(ds, oldFacetAddress, selector);
            addFunction(ds, selector, selectorPosition, _facetAddress);
            selectorPosition++;
        }
    }

    function removeFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal {
        require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
        DiamondStorage storage ds = diamondStorage();
        require(_facetAddress == address(0), "LibDiamondCut: Remove facet address must be address(0)");
        for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
            bytes4 selector = _functionSelectors[selectorIndex];
            address oldFacetAddress = ds.selectorToFacetAndPosition[selector].facetAddress;
            removeFunction(ds, oldFacetAddress, selector);
        }
    }

    function addFacet(DiamondStorage storage ds, address _facetAddress) internal {
        enforceHasContractCode(_facetAddress, "LibDiamondCut: New facet has no code");
        ds.facetFunctionSelectors[_facetAddress].facetAddressPosition = ds.facetAddresses.length;
        ds.facetAddresses.push(_facetAddress);
    }

    function addFunction(DiamondStorage storage ds, bytes4 _selector, uint96 _selectorPosition, address _facetAddress) internal {
        ds.selectorToFacetAndPosition[_selector].functionSelectorPosition = _selectorPosition;
        ds.facetFunctionSelectors[_facetAddress].functionSelectors.push(_selector);
        ds.selectorToFacetAndPosition[_selector].facetAddress = _facetAddress;
    }

    function removeFunction(DiamondStorage storage ds, address _facetAddress, bytes4 _selector) internal {
        require(_facetAddress != address(0), "LibDiamondCut: Can't remove function that doesn't exist");
        require(_facetAddress != address(this), "LibDiamondCut: Can't remove immutable function");
        uint256 selectorPosition = ds.selectorToFacetAndPosition[_selector].functionSelectorPosition;
        uint256 lastSelectorPosition = ds.facetFunctionSelectors[_facetAddress].functionSelectors.length - 1;
        if (selectorPosition != lastSelectorPosition) {
            bytes4 lastSelector = ds.facetFunctionSelectors[_facetAddress].functionSelectors[lastSelectorPosition];
            ds.facetFunctionSelectors[_facetAddress].functionSelectors[selectorPosition] = lastSelector;
            ds.selectorToFacetAndPosition[lastSelector].functionSelectorPosition = uint96(selectorPosition);
        }
        ds.facetFunctionSelectors[_facetAddress].functionSelectors.pop();
        delete ds.selectorToFacetAndPosition[_selector];
        if (lastSelectorPosition == 0) {
            uint256 lastFacetAddressPosition = ds.facetAddresses.length - 1;
            uint256 facetAddressPosition = ds.facetFunctionSelectors[_facetAddress].facetAddressPosition;
            if (facetAddressPosition != lastFacetAddressPosition) {
                address lastFacetAddress = ds.facetAddresses[lastFacetAddressPosition];
                ds.facetAddresses[facetAddressPosition] = lastFacetAddress;
                ds.facetFunctionSelectors[lastFacetAddress].facetAddressPosition = facetAddressPosition;
            }
            ds.facetAddresses.pop();
            delete ds.facetFunctionSelectors[_facetAddress].facetAddressPosition;
        }
    }

    function initializeDiamondCut(address _init, bytes memory _calldata) internal {
        if (_init == address(0)) {
            require(_calldata.length == 0, "LibDiamondCut: _init is address(0) but_calldata is not empty");
        } else {
            require(_calldata.length > 0, "LibDiamondCut: _calldata is empty but _init is not address(0)");
            if (_init != address(this)) {
                enforceHasContractCode(_init, "LibDiamondCut: _init address has no code");
            }
            (bool success, bytes memory error) = _init.delegatecall(_calldata);
            if (!success) {
                if (error.length > 0) {
                    revert(string(error));
                } else {
                    revert("LibDiamondCut: _init function reverted");
                }
            }
        }
    }

    function enforceHasContractCode(address _contract, string memory _errorMessage) public view {
        uint256 contractSize;
        assembly {
            contractSize := extcodesize(_contract)
        }
        require(contractSize > 0, _errorMessage);
    }
}

interface IDiamondCut {
    enum FacetCutAction {
        Add,
        Replace,
        Remove
    }

    event DiamondCut(FacetCut[] _diamondCut, address _init, bytes _calldata);

    struct FacetCut {
        address facetAddress;
        FacetCutAction action;
        bytes4[] functionSelectors;
    }

    /// @notice Add/replace/remove any number of functions and optionally execute
    ///          a function with delegatecall
    ///  @param _diamondCut Contains the facet addresses and function selectors
    ///  @param _init The address of the contract or facet to execute _calldata
    ///  @param _calldata A function call, including function selector and arguments
    ///                   _calldata is executed with delegatecall on _init
    function diamondCut(FacetCut[] calldata _diamondCut, address _init, bytes calldata _calldata) external;
}

interface IDiamondLoupe {
    struct Facet {
        address facetAddress;
        bytes4[] functionSelectors;
    }

    /// @notice Gets all facet addresses and their four byte function selectors.
    ///  @return facets_ Facet
    function facets() external view returns (Facet[] memory facets_);

    /// @notice Gets all the function selectors supported by a specific facet.
    ///  @param _facet The facet address.
    ///  @return facetFunctionSelectors_
    function facetFunctionSelectors(address _facet) external view returns (bytes4[] memory facetFunctionSelectors_);

    /// @notice Get all the facet addresses used by a diamond.
    ///  @return facetAddresses_
    function facetAddresses() external view returns (address[] memory facetAddresses_);

    /// @notice Gets the facet that supports the given selector.
    ///  @dev If facet is not found return address(0).
    ///  @param _functionSelector The function selector.
    ///  @return facetAddress_ The facet address.
    function facetAddress(bytes4 _functionSelector) external view returns (address facetAddress_);
}

interface IERC165 {
    /// @notice Query if a contract implements an interface
    ///  @param interfaceId The interface identifier, as specified in ERC-165
    ///  @dev Interface identification is specified in ERC-165. This function
    ///   uses less than 30,000 gas.
    ///  @return `true` if the contract implements `interfaceID` and
    ///   `interfaceID` is not 0xffffffff, `false` otherwise
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

interface IERC173 {
    /// @notice Get the address of the owner
    ///  @return owner_ The address of the owner.
    function owner() external view returns (address owner_);

    /// @notice Set the address of the new owner of the contract
    ///  @dev Set _newOwner to address(0) to renounce any ownership.
    ///  @param _newOwner The address of the new owner of the contract
    function transferOwnership(address _newOwner) external;
}

library LibMeta {
    bytes32 internal constant EIP712_DOMAIN_TYPEHASH = keccak256(bytes("EIP712Domain(string name,string version,uint256 salt,address verifyingContract)"));

    function domainSeparator(string memory name, string memory version) public view returns (bytes32 domainSeparator_) {
        domainSeparator_ = keccak256(abi.encode(EIP712_DOMAIN_TYPEHASH, keccak256(bytes(name)), keccak256(bytes(version)), getChainID(), address(this)));
    }

    function getChainID() public pure returns (uint256 id) {
        assembly {
            id := chainid()
        }
    }

    function msgSender() public view returns (address sender_) {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                sender_ := and(mload(add(array, index)), 0xffffffffffffffffffffffffffffffffffffffff)
            }
        } else {
            sender_ = msg.sender;
        }
    }
}