/// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "./ABDKMath64x64.sol";
import "./Storage.sol";
import "./CurveMath.sol";

library Orchestrator {
    using SafeERC20 for IERC20;
    using ABDKMath64x64 for int128;
    using ABDKMath64x64 for uint256;

    event ParametersSet(uint256 alpha, uint256 beta, uint256 delta, uint256 epsilon, uint256 lambda);

    event AssetIncluded(address indexed numeraire, address indexed reserve, uint256 weight);

    event AssimilatorIncluded(address indexed derivative, address indexed numeraire, address indexed reserve, address assimilator);

    int128 public constant ONE_WEI = 0x12;

    function setParams(Storage.Curve storage curve, uint256 _alpha, uint256 _beta, uint256 _feeAtHalt, uint256 _epsilon, uint256 _lambda) external {
        require((0 < _alpha) && (_alpha < 1e18), "Curve/parameter-invalid-alpha");
        require(_beta < _alpha, "Curve/parameter-invalid-beta");
        require(_feeAtHalt <= 5e17, "Curve/parameter-invalid-max");
        require(_epsilon <= 1e16, "Curve/parameter-invalid-epsilon");
        require(_lambda <= 1e18, "Curve/parameter-invalid-lambda");
        int128 _omega = getFee(curve);
        curve.alpha = (_alpha + 1).divu(1e18);
        curve.beta = (_beta + 1).divu(1e18);
        curve.delta = 1;
        curve.epsilon = (_epsilon + 1).divu(1e18);
        curve.lambda = (_lambda + 1).divu(1e18);
        int128 _psi = getFee(curve);
        require(_omega >= _psi, "Curve/parameters-increase-fee");
        emit ParametersSet(_alpha, _beta, curve.delta.mulu(1e18), _epsilon, _lambda);
    }

    function getFee(Storage.Curve storage curve) public view returns (int128 fee_) {
        int128 _gLiq;
        int128[] memory _bals = new int128[](2);
        for (uint256 i = 0; i < _bals.length; i++) {
            int128 _bal = Assimilators.viewNumeraireBalance(curve.assets[i].addr);
            _bals[i] = _bal;
            _gLiq += _bal;
        }
        fee_ = CurveMath.calculateFee(_gLiq, _bals, curve.beta, curve.delta, curve.weights);
    }

    function initialize(Storage.Curve storage curve, address[] storage numeraires, address[] storage reserves, address[] storage derivatives, address[] calldata _assets, uint256[] calldata _assetWeights) external {
        require(_assetWeights.length == 2, "Curve/assetWeights-must-be-length-two");
        require((_assets.length % 5) == 0, "Curve/assets-must-be-divisible-by-five");
        for (uint256 i = 0; i < _assetWeights.length; i++) {
            uint256 ix = i * 5;
            numeraires.push(_assets[ix]);
            derivatives.push(_assets[ix]);
            reserves.push(_assets[2 + ix]);
            if (_assets[ix] != _assets[2 + ix]) derivatives.push(_assets[2 + ix]);
            includeAsset(curve, _assets[ix], _assets[1 + ix], _assets[2 + ix], _assets[3 + ix], _assets[4 + ix], _assetWeights[i]);
        }
    }

    function includeAsset(Storage.Curve storage curve, address _numeraire, address _numeraireAssim, address _reserve, address _reserveAssim, address _reserveApproveTo, uint256 _weight) private {
        require(_numeraire != address(0), "Curve/numeraire-cannot-be-zeroth-address");
        require(_numeraireAssim != address(0), "Curve/numeraire-assimilator-cannot-be-zeroth-address");
        require(_reserve != address(0), "Curve/reserve-cannot-be-zeroth-address");
        require(_reserveAssim != address(0), "Curve/reserve-assimilator-cannot-be-zeroth-address");
        require(_weight < 1e18, "Curve/weight-must-be-less-than-one");
        if (_numeraire != _reserve) IERC20(_numeraire).safeApprove(_reserveApproveTo, uint256(-1));
        Storage.Assimilator storage _numeraireAssimilator = curve.assimilators[_numeraire];
        _numeraireAssimilator.addr = _numeraireAssim;
        _numeraireAssimilator.ix = uint8(curve.assets.length);
        Storage.Assimilator storage _reserveAssimilator = curve.assimilators[_reserve];
        _reserveAssimilator.addr = _reserveAssim;
        _reserveAssimilator.ix = uint8(curve.assets.length);
        int128 __weight = _weight.divu(1e18).add(uint256(1).divu(1e18));
        curve.weights.push(__weight);
        curve.assets.push(_numeraireAssimilator);
        emit AssetIncluded(_numeraire, _reserve, _weight);
        emit AssimilatorIncluded(_numeraire, _numeraire, _reserve, _numeraireAssim);
        if (_numeraireAssim != _reserveAssim) {
            emit AssimilatorIncluded(_reserve, _numeraire, _reserve, _reserveAssim);
        }
    }

    function includeAssimilator(Storage.Curve storage curve, address _derivative, address _numeraire, address _reserve, address _assimilator, address _derivativeApproveTo) private {
        require(_derivative != address(0), "Curve/derivative-cannot-be-zeroth-address");
        require(_numeraire != address(0), "Curve/numeraire-cannot-be-zeroth-address");
        require(_reserve != address(0), "Curve/numeraire-cannot-be-zeroth-address");
        require(_assimilator != address(0), "Curve/assimilator-cannot-be-zeroth-address");
        IERC20(_numeraire).safeApprove(_derivativeApproveTo, uint256(-1));
        Storage.Assimilator storage _numeraireAssim = curve.assimilators[_numeraire];
        curve.assimilators[_derivative] = Storage.Assimilator(_assimilator, _numeraireAssim.ix);
        emit AssimilatorIncluded(_derivative, _numeraire, _reserve, _assimilator);
    }

    function viewCurve(Storage.Curve storage curve) external view returns (uint256 alpha_, uint256 beta_, uint256 delta_, uint256 epsilon_, uint256 lambda_) {
        alpha_ = curve.alpha.mulu(1e18);
        beta_ = curve.beta.mulu(1e18);
        delta_ = curve.delta.mulu(1e18);
        epsilon_ = curve.epsilon.mulu(1e18);
        lambda_ = curve.lambda.mulu(1e18);
    }
}