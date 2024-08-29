"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControl_1 = require("../../../test/helpers/AccessControl");
const Factory_1 = require("../../../test/helpers/Factory");
const Proxy_1 = require("../../../test/helpers/Proxy");
const Time_1 = require("../../../test/helpers/Time");
const Trading_1 = require("../../../test/helpers/Trading");
const Utils_1 = require("../../../test/helpers/Utils");
const carbon_sdk_1 = require("../../../test/utility/carbon-sdk");
const testDataFactory_1 = require("../../../test/utility/testDataFactory");
const Constants_1 = require("../../../utils/Constants");
const Deploy_1 = require("../../../utils/Deploy");
const TokenData_1 = require("../../../utils/TokenData");
const Types_1 = require("../../../utils/Types");
const chai_1 = require("chai");
const decimal_js_1 = __importDefault(require("decimal.js"));
const ethers_1 = require("ethers");
const hardhat_1 = require("hardhat");
((0, Deploy_1.isTenderly)() ? describe : describe.skip)('network', async () => {
    let carbonController;
    let voucher;
    let carbonVortex;
    let daoMultisig;
    (0, Proxy_1.shouldHaveGap)('CarbonController');
    (0, Proxy_1.shouldHaveGap)('Pairs', '_lastPairId');
    (0, Proxy_1.shouldHaveGap)('Strategies', '_strategyCounter');
    (0, Proxy_1.shouldHaveGap)('Voucher', '_useGlobalURI');
    (0, Proxy_1.shouldHaveGap)('CarbonVortex', '_totalBurned');
    (0, Proxy_1.shouldHaveGap)('CarbonPOL', '_marketPriceMultiply');
    before(async () => {
        ({ daoMultisig } = await (0, Deploy_1.getNamedSigners)());
    });
    beforeEach(async () => {
        await (0, Deploy_1.runPendingDeployments)();
        carbonController = await Deploy_1.DeployedContracts.CarbonController.deployed();
        voucher = await Deploy_1.DeployedContracts.Voucher.deployed();
        carbonVortex = await Deploy_1.DeployedContracts.CarbonVortex.deployed();
    });
    describe('roles', () => {
        it('should have the correct set of roles', async () => {
            // expect dao multisig to be admin
            await (0, AccessControl_1.expectRoleMembers)(carbonController, AccessControl_1.Roles.Upgradeable.ROLE_ADMIN, [daoMultisig.address]);
            await (0, AccessControl_1.expectRoleMembers)(voucher, AccessControl_1.Roles.Upgradeable.ROLE_ADMIN, [daoMultisig.address]);
            await (0, AccessControl_1.expectRoleMembers)(carbonVortex, AccessControl_1.Roles.Upgradeable.ROLE_ADMIN, [daoMultisig.address]);
            // expect fee burner to have fee manager role in Carbon
            await (0, AccessControl_1.expectRoleMembers)(carbonController, AccessControl_1.Roles.CarbonController.ROLE_FEES_MANAGER, [carbonVortex.address]);
            // expect carbonController to have minter role in voucher
            await (0, AccessControl_1.expectRoleMembers)(voucher, AccessControl_1.Roles.Voucher.ROLE_MINTER, [carbonController.address]);
        });
    });
    describe('trading', () => {
        let deployer;
        let marketMaker;
        let trader;
        let bntWhale;
        let usdcWhale;
        let daiWhale;
        const tokens = {};
        before(async () => {
            const { bnt, usdc, dai } = await (0, hardhat_1.getNamedAccounts)();
            ({ deployer, bntWhale, usdcWhale, daiWhale } = await (0, Deploy_1.getNamedSigners)());
            [marketMaker, trader] = await hardhat_1.ethers.getSigners();
            await (0, Deploy_1.fundAccount)(deployer, (0, Types_1.toWei)(50000));
            await (0, Deploy_1.fundAccount)(bntWhale);
            await (0, Deploy_1.fundAccount)(marketMaker);
            await (0, Deploy_1.fundAccount)(trader);
            tokens[TokenData_1.TokenSymbol.BNT] = await hardhat_1.ethers.getContractAt('TestERC20Burnable', bnt);
            tokens[TokenData_1.TokenSymbol.DAI] = await hardhat_1.ethers.getContractAt('TestERC20Burnable', dai);
            tokens[TokenData_1.TokenSymbol.USDC] = await hardhat_1.ethers.getContractAt('TestERC20Burnable', usdc);
            tokens[TokenData_1.TokenSymbol.ETH] = await (0, Factory_1.createBurnableToken)(new TokenData_1.TokenData(TokenData_1.TokenSymbol.ETH));
            // fund deployer
            await (0, Utils_1.transfer)(bntWhale, tokens[TokenData_1.TokenSymbol.BNT], deployer.address, (0, Types_1.toWei)(1_000_000));
            await (0, Utils_1.transfer)(daiWhale, tokens[TokenData_1.TokenSymbol.DAI], deployer.address, (0, Types_1.toWei)(1_000_000));
            await (0, Utils_1.transfer)(usdcWhale, tokens[TokenData_1.TokenSymbol.USDC], deployer.address, (0, Types_1.toWei)(10_000_000, 6));
        });
        describe('strategy creation and update is correct', async () => {
            const permutations = [
                { sourceSymbol: TokenData_1.TokenSymbol.BNT, targetSymbol: TokenData_1.TokenSymbol.DAI, byTargetAmount: false },
                { sourceSymbol: TokenData_1.TokenSymbol.BNT, targetSymbol: TokenData_1.TokenSymbol.DAI, byTargetAmount: true },
                { sourceSymbol: TokenData_1.TokenSymbol.ETH, targetSymbol: TokenData_1.TokenSymbol.USDC, byTargetAmount: false }
            ];
            for (const { sourceSymbol, targetSymbol, byTargetAmount } of permutations) {
                it(`(${sourceSymbol}->${targetSymbol}) | byTargetAmount: ${byTargetAmount}`, async () => {
                    const testCase = (0, testDataFactory_1.testCaseFactory)({
                        sourceSymbol,
                        targetSymbol,
                        byTargetAmount
                    });
                    // create strategies
                    const strategyIds = await createStrategies(testCase.strategies);
                    // set correct strategy ids for the trade actions
                    for (let i = 0; i < testCase.tradeActions.length; ++i) {
                        testCase.tradeActions[i].strategyId = strategyIds[i];
                    }
                    // fund user for a trade
                    const { sourceAmount, targetAmount } = testCase;
                    await fundTrader(sourceAmount, targetAmount, byTargetAmount, sourceSymbol);
                    // get token fees before trade
                    const sourceTokenFeesBefore = await carbonController.accumulatedFees(tokens[testCase.sourceSymbol].address);
                    const targetTokenFeesBefore = await carbonController.accumulatedFees(tokens[testCase.targetSymbol].address);
                    // perform trade
                    const { receipt } = await trade({
                        sourceAmount,
                        targetAmount,
                        tradeActions: testCase.tradeActions,
                        sourceSymbol: testCase.sourceSymbol,
                        targetSymbol: testCase.targetSymbol,
                        byTargetAmount: testCase.byTargetAmount
                    });
                    // get token fees after trade
                    const sourceTokenFeesAfter = await carbonController.accumulatedFees(tokens[testCase.sourceSymbol].address);
                    const targetTokenFeesAfter = await carbonController.accumulatedFees(tokens[testCase.targetSymbol].address);
                    const tradingFeeAmount = getTradingFeeAmount(byTargetAmount, sourceAmount, targetAmount);
                    // check token fees are correct
                    if (byTargetAmount) {
                        (0, chai_1.expect)(sourceTokenFeesAfter).to.eq(sourceTokenFeesBefore.add(tradingFeeAmount));
                    }
                    else {
                        (0, chai_1.expect)(targetTokenFeesAfter).to.eq(targetTokenFeesBefore.add(tradingFeeAmount));
                    }
                    // --- check StrategyUpdated and TokensTraded events are emitted ---
                    // assert
                    if (!receipt || !receipt.events) {
                        chai_1.expect.fail('No events emitted');
                    }
                    const event = receipt.events[receipt.events.length - 1];
                    if (!event.args) {
                        chai_1.expect.fail('event emitted without args');
                    }
                    // prepare variables for assertions
                    const { expectedSourceAmount, expectedTargetAmount } = expectedSourceTargetAmounts(byTargetAmount, sourceAmount, targetAmount, tradingFeeAmount);
                    // Check proper TokensTraded event emit
                    const sourceToken = tokens[sourceSymbol];
                    const targetToken = tokens[targetSymbol];
                    const eventArgs = event.args;
                    (0, chai_1.expect)(eventArgs.sourceToken).to.eq(sourceToken.address);
                    (0, chai_1.expect)(eventArgs.targetToken).to.eq(targetToken.address);
                    (0, chai_1.expect)(eventArgs.sourceAmount).to.eq(expectedSourceAmount);
                    (0, chai_1.expect)(eventArgs.targetAmount).to.eq(expectedTargetAmount);
                    (0, chai_1.expect)(eventArgs.tradingFeeAmount).to.eq(tradingFeeAmount);
                    (0, chai_1.expect)(eventArgs.byTargetAmount).to.eq(byTargetAmount);
                    (0, chai_1.expect)(event.event).to.eq('TokensTraded');
                    const tradeActionsAmount = testCase.tradeActions.length;
                    for (let i = 0; i < tradeActionsAmount; i++) {
                        const strategy = testCase.strategies[i];
                        const event = receipt.events[i];
                        if (!event.args) {
                            chai_1.expect.fail('Event contains no args');
                        }
                        // check proper strategyUpdated event emit
                        for (let x = 0; x < 2; x++) {
                            const expectedOrder = strategy.orders[x].expected;
                            const emittedOrder = (0, carbon_sdk_1.decodeOrder)(event.args[`order${x}`]);
                            (0, chai_1.expect)(emittedOrder.liquidity.toFixed()).to.eq(expectedOrder.liquidity);
                            (0, chai_1.expect)((0, Trading_1.toFixed)(emittedOrder.lowestRate)).to.eq(expectedOrder.lowestRate);
                            (0, chai_1.expect)((0, Trading_1.toFixed)(emittedOrder.highestRate)).to.eq(expectedOrder.highestRate);
                            (0, chai_1.expect)((0, Trading_1.toFixed)(emittedOrder.marginalRate)).to.eq(expectedOrder.marginalRate);
                            (0, chai_1.expect)(event.args[`token${x}`]).to.eq(tokens[strategy.orders[x].token].address);
                            (0, chai_1.expect)(event.args.reason).to.eq(Constants_1.STRATEGY_UPDATE_REASON_TRADE);
                            (0, chai_1.expect)(event.event).to.eq('StrategyUpdated');
                        }
                    }
                    // --- Check orders are stored correctly ---
                    // fetch updated data from the chain
                    const token0 = tokens[testCase.sourceSymbol];
                    const token1 = tokens[testCase.targetSymbol];
                    const strategies = await carbonController.strategiesByPair(token0.address, token1.address, 0, 0);
                    // assertions
                    strategies.forEach((strategy, i) => {
                        // check only strategies we've created in the test
                        if (strategyIds.includes(strategy.id)) {
                            strategy.orders.forEach((order, x) => {
                                const { y, z, A, B } = order;
                                const encodedOrder = (0, carbon_sdk_1.decodeOrder)({ y, z, A, B });
                                const expectedOrder = testCase.strategies[i].orders[x].expected;
                                (0, chai_1.expect)(encodedOrder.liquidity.toFixed()).to.eq(expectedOrder.liquidity);
                                (0, chai_1.expect)((0, Trading_1.toFixed)(encodedOrder.lowestRate)).to.eq(expectedOrder.lowestRate);
                                (0, chai_1.expect)((0, Trading_1.toFixed)(encodedOrder.highestRate)).to.eq(expectedOrder.highestRate);
                                (0, chai_1.expect)((0, Trading_1.toFixed)(encodedOrder.marginalRate)).to.eq(expectedOrder.marginalRate);
                            });
                        }
                    });
                });
            }
        });
        /**
         * calculates and transfers to the trader the full amount required for a trade.
         */
        const fundTrader = async (sourceAmount, targetAmount, byTargetAmount, sourceSymbol) => {
            const tradingFeeAmount = getTradingFeeAmount(byTargetAmount, sourceAmount, targetAmount);
            const { expectedSourceAmount } = expectedSourceTargetAmounts(byTargetAmount, sourceAmount, targetAmount, tradingFeeAmount);
            await (0, Utils_1.transfer)(deployer, tokens[sourceSymbol], trader, expectedSourceAmount);
        };
        /**
         * returns the tradingFeeAmount expected for the specified arguments
         */
        const getTradingFeeAmount = (byTargetAmount, sourceAmount, targetAmount) => {
            if (byTargetAmount) {
                return (0, Trading_1.mulDivC)(sourceAmount, Constants_1.PPM_RESOLUTION, Constants_1.PPM_RESOLUTION - Constants_1.DEFAULT_TRADING_FEE_PPM)
                    .sub(sourceAmount)
                    .mul(+1);
            }
            else {
                return (0, Trading_1.mulDivF)(targetAmount, Constants_1.PPM_RESOLUTION - Constants_1.DEFAULT_TRADING_FEE_PPM, Constants_1.PPM_RESOLUTION)
                    .sub(targetAmount)
                    .mul(-1);
            }
        };
        /**
         * returns the expected source and target amounts for a trade including fees
         */
        const expectedSourceTargetAmounts = (byTargetAmount, sourceAmount, targetAmount, tradingFeeAmount) => {
            let expectedSourceAmount;
            let expectedTargetAmount;
            if (byTargetAmount) {
                expectedSourceAmount = ethers_1.BigNumber.from(sourceAmount).add(tradingFeeAmount);
                expectedTargetAmount = targetAmount;
            }
            else {
                expectedSourceAmount = sourceAmount;
                expectedTargetAmount = ethers_1.BigNumber.from(targetAmount).sub(tradingFeeAmount);
            }
            return { expectedSourceAmount, expectedTargetAmount };
        };
        /**
         * creates strategies based on provided test data.
         * handles approvals and supports the native token
         */
        const createStrategies = async (strategies) => {
            const strategyIds = [];
            for (let i = 0; i < strategies.length; ++i) {
                const strategy = strategies[i];
                // encode orders to values expected by the contract
                const orders = strategy.orders.map((order) => (0, carbon_sdk_1.encodeOrder)({
                    liquidity: new decimal_js_1.default(order.liquidity),
                    lowestRate: new decimal_js_1.default(order.lowestRate),
                    highestRate: new decimal_js_1.default(order.highestRate),
                    marginalRate: new decimal_js_1.default(order.marginalRate)
                }));
                let value = ethers_1.BigNumber.from(0);
                for (const i of [0, 1]) {
                    const token = tokens[strategy.orders[i].token];
                    await (0, Utils_1.transfer)(deployer, token, marketMaker, orders[i].y);
                    if (token.address !== TokenData_1.NATIVE_TOKEN_ADDRESS) {
                        await token.connect(marketMaker).approve(carbonController.address, orders[i].y);
                    }
                    else {
                        value = value.add(orders[i].y);
                    }
                }
                const tx = await carbonController
                    .connect(marketMaker)
                    .createStrategy(tokens[strategy.orders[0].token].address, tokens[strategy.orders[1].token].address, [orders[0], orders[1]], { value });
                const receipt = await tx.wait();
                const strategyCreatedEvent = receipt.events?.filter((e) => e.event === 'StrategyCreated');
                if (strategyCreatedEvent === undefined) {
                    throw new Error('event retrieval error');
                }
                const id = strategyCreatedEvent[0]?.args?.id;
                strategyIds.push(id);
            }
            return strategyIds;
        };
        /**
         * performs a trade while handling approvals, gas costs, deadline, etc..
         */
        const trade = async (params) => {
            const { tradeActions, sourceSymbol, targetSymbol, sourceAmount, targetAmount, byTargetAmount, sendWithExcessNativeTokenValue, constraint } = params;
            const sourceToken = tokens[sourceSymbol];
            const targetToken = tokens[targetSymbol];
            // add fee to the sourceAmount in case of trading by target amount
            const sourceAmountIncludingTradingFees = byTargetAmount
                ? ethers_1.BigNumber.from(sourceAmount).add(getTradingFeeAmount(true, sourceAmount, 0))
                : ethers_1.BigNumber.from(sourceAmount);
            // keep track of gas usage
            let gasUsed = ethers_1.BigNumber.from(0);
            // approve the trade if necessary
            if (sourceToken.address !== TokenData_1.NATIVE_TOKEN_ADDRESS) {
                const tx = await sourceToken
                    .connect(trader)
                    .approve(carbonController.address, sourceAmountIncludingTradingFees);
                const receipt = await tx.wait();
                gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);
            }
            // prepare vars for a trade
            const _constraint = (0, Trading_1.setConstraint)(constraint, byTargetAmount, sourceAmountIncludingTradingFees);
            const deadline = (await (0, Time_1.latest)()) + 1000;
            const pc = carbonController.connect(trader);
            let txValue = sourceSymbol === TokenData_1.TokenSymbol.ETH ? ethers_1.BigNumber.from(sourceAmountIncludingTradingFees) : ethers_1.BigNumber.from(0);
            // optionally - double the sent amount of native token required to complete the trade
            if (sendWithExcessNativeTokenValue) {
                txValue = txValue.mul(2);
            }
            // perform trade
            const tradeFn = byTargetAmount ? pc.tradeByTargetAmount : pc.tradeBySourceAmount;
            const tx = await tradeFn(sourceToken.address, targetToken.address, tradeActions, deadline, _constraint, {
                value: txValue
            });
            const receipt = await tx.wait();
            gasUsed = gasUsed.add(receipt.gasUsed.mul(receipt.effectiveGasPrice));
            // prepare variables for assertions
            const tradingFeeAmount = getTradingFeeAmount(byTargetAmount, sourceAmount, targetAmount);
            return {
                receipt,
                gasUsed,
                tradingFeeAmount,
                value: txValue
            };
        };
    });
    describe('strategies', async () => {
        let deployer;
        let owner;
        let nonAdmin;
        let bntWhale;
        let usdcWhale;
        let daiWhale;
        const tokens = {};
        before(async () => {
            const { bnt, usdc, dai } = await (0, hardhat_1.getNamedAccounts)();
            ({ deployer, bntWhale, usdcWhale, daiWhale } = await (0, Deploy_1.getNamedSigners)());
            [owner, nonAdmin] = await hardhat_1.ethers.getSigners();
            await (0, Deploy_1.fundAccount)(deployer, (0, Types_1.toWei)(50000));
            await (0, Deploy_1.fundAccount)(bntWhale);
            await (0, Deploy_1.fundAccount)(owner);
            await (0, Deploy_1.fundAccount)(nonAdmin);
            tokens[TokenData_1.TokenSymbol.BNT] = await hardhat_1.ethers.getContractAt('TestERC20Burnable', bnt);
            tokens[TokenData_1.TokenSymbol.DAI] = await hardhat_1.ethers.getContractAt('TestERC20Burnable', dai);
            tokens[TokenData_1.TokenSymbol.USDC] = await hardhat_1.ethers.getContractAt('TestERC20Burnable', usdc);
            tokens[TokenData_1.TokenSymbol.ETH] = await (0, Factory_1.createBurnableToken)(new TokenData_1.TokenData(TokenData_1.TokenSymbol.ETH));
            // fund deployer
            await (0, Utils_1.transfer)(bntWhale, tokens[TokenData_1.TokenSymbol.BNT], deployer.address, (0, Types_1.toWei)(1_000_000));
            await (0, Utils_1.transfer)(daiWhale, tokens[TokenData_1.TokenSymbol.DAI], deployer.address, (0, Types_1.toWei)(1_000_000));
            await (0, Utils_1.transfer)(usdcWhale, tokens[TokenData_1.TokenSymbol.USDC], deployer.address, (0, Types_1.toWei)(10_000_000, 6));
        });
        describe('strategy creation', async () => {
            describe('stores the information correctly', async () => {
                const _permutations = [
                    { token0: TokenData_1.TokenSymbol.ETH, token0Amount: 100, token1: TokenData_1.TokenSymbol.BNT, token1Amount: 100 },
                    { token0: TokenData_1.TokenSymbol.BNT, token0Amount: 100, token1: TokenData_1.TokenSymbol.ETH, token1Amount: 100 },
                    { token0: TokenData_1.TokenSymbol.BNT, token0Amount: 100, token1: TokenData_1.TokenSymbol.DAI, token1Amount: 100 }
                ];
                for (const { token0, token1, token0Amount, token1Amount } of _permutations) {
                    it(`(${token0}->${token1}) token0Amount: ${token0Amount} | token1Amount: ${token1Amount}`, async () => {
                        // prepare variables
                        const { z, A, B } = (0, Trading_1.generateTestOrder)();
                        const _token0 = tokens[token0];
                        const _token1 = tokens[token1];
                        // create strategy
                        const { id } = await createStrategy({
                            token0: _token0,
                            token1: _token1,
                            token0Amount,
                            token1Amount
                        });
                        // fetch the strategy created
                        const strategy = await carbonController.strategy(id);
                        // prepare a result object
                        const result = {
                            id: strategy.id.toString(),
                            owner: strategy.owner,
                            tokens: strategy.tokens,
                            orders: strategy.orders.map((o) => ({
                                y: o.y.toString(),
                                z: o.z.toString(),
                                A: o.A.toString(),
                                B: o.B.toString()
                            }))
                        };
                        // prepare the expected result object
                        const amounts = [token0Amount, token1Amount];
                        const _tokens = [tokens[token0], tokens[token1]];
                        const expectedResult = {
                            id: id.toString(),
                            owner: owner.address,
                            tokens: [_tokens[0].address, _tokens[1].address],
                            orders: [
                                { y: amounts[0].toString(), z: z.toString(), A: A.toString(), B: B.toString() },
                                { y: amounts[1].toString(), z: z.toString(), A: A.toString(), B: B.toString() }
                            ]
                        };
                        // assert
                        (0, chai_1.expect)(expectedResult).to.deep.equal(result);
                    });
                }
            });
            describe('reverts for non valid addresses', async () => {
                const _permutations = [
                    { token0: TokenData_1.TokenSymbol.DAI, token1: Constants_1.ZERO_ADDRESS },
                    { token0: Constants_1.ZERO_ADDRESS, token1: TokenData_1.TokenSymbol.BNT },
                    { token0: Constants_1.ZERO_ADDRESS, token1: Constants_1.ZERO_ADDRESS }
                ];
                const order = (0, Trading_1.generateTestOrder)();
                for (const { token0, token1 } of _permutations) {
                    it(`(${token0}->${token1})`, async () => {
                        const _token0 = tokens[token0] ? tokens[token0].address : Constants_1.ZERO_ADDRESS;
                        const _token1 = tokens[token1] ? tokens[token1].address : Constants_1.ZERO_ADDRESS;
                        // hardcoding gas limit to avoid gas estimation attempts (which get rejected instead of reverted)
                        const tx = await carbonController.createStrategy(_token0, _token1, [order, order], {
                            gasLimit: 6000000
                        });
                        await (0, chai_1.expect)(tx.wait()).to.be.reverted;
                    });
                }
            });
            it('emits the StrategyCreated event', async () => {
                const { y, z, A, B } = (0, Trading_1.generateTestOrder)();
                const { tx, id } = await createStrategy();
                await (0, chai_1.expect)(tx)
                    .to.emit(carbonController, 'StrategyCreated')
                    .withArgs(id, owner.address, tokens[TokenData_1.TokenSymbol.BNT].address, tokens[TokenData_1.TokenSymbol.DAI].address, [ethers_1.BigNumber.from(y), ethers_1.BigNumber.from(z), ethers_1.BigNumber.from(A), ethers_1.BigNumber.from(B)], [ethers_1.BigNumber.from(y), ethers_1.BigNumber.from(z), ethers_1.BigNumber.from(A), ethers_1.BigNumber.from(B)]);
            });
            it('mints a voucher token to the caller', async () => {
                const { id } = await createStrategy();
                const tokenOwner = await voucher.ownerOf(id);
                (0, chai_1.expect)(tokenOwner).to.eq(owner.address);
            });
            it('emits the voucher Transfer event', async () => {
                const { tx, id } = await createStrategy();
                await (0, chai_1.expect)(tx).to.emit(voucher, 'Transfer').withArgs(Constants_1.ZERO_ADDRESS, owner.address, id);
            });
            describe('balances are updated correctly', () => {
                const _permutations = [
                    { token0: TokenData_1.TokenSymbol.ETH, token0Amount: 100, token1: TokenData_1.TokenSymbol.BNT, token1Amount: 100 },
                    { token0: TokenData_1.TokenSymbol.BNT, token0Amount: 100, token1: TokenData_1.TokenSymbol.ETH, token1Amount: 100 },
                    { token0: TokenData_1.TokenSymbol.BNT, token0Amount: 100, token1: TokenData_1.TokenSymbol.DAI, token1Amount: 100 }
                ];
                for (const { token0, token1, token0Amount, token1Amount } of _permutations) {
                    it(`(${token0}->${token1}) token0Amount: ${token0Amount} | token1Amount: ${token1Amount}`, async () => {
                        // prepare variables
                        const _token0 = tokens[token0];
                        const _token1 = tokens[token1];
                        const amounts = [ethers_1.BigNumber.from(token0Amount), ethers_1.BigNumber.from(token1Amount)];
                        const balanceTypes = [
                            { type: 'ownerToken0', token: _token0, account: owner.address },
                            { type: 'ownerToken1', token: _token1, account: owner.address },
                            { type: 'controllerToken0', token: _token0, account: carbonController.address },
                            { type: 'controllerToken1', token: _token1, account: carbonController.address }
                        ];
                        // fund the owner
                        await (0, Utils_1.transfer)(deployer, _token0, owner, amounts[0]);
                        await (0, Utils_1.transfer)(deployer, _token1, owner, amounts[1]);
                        // fetch balances before creating
                        const before = {};
                        for (const b of balanceTypes) {
                            before[b.type] = await (0, Utils_1.getBalance)(b.token, b.account);
                        }
                        // create strategy
                        const { gasUsed } = await createStrategy({
                            token0Amount,
                            token1Amount,
                            token0: _token0,
                            token1: _token1,
                            skipFunding: true
                        });
                        // fetch balances after creating
                        const after = {};
                        for (const b of balanceTypes) {
                            after[b.type] = await (0, Utils_1.getBalance)(b.token, b.account);
                        }
                        // account for gas costs if the token is the native token;
                        const expectedOwnerAmountToken0 = _token0.address === TokenData_1.NATIVE_TOKEN_ADDRESS ? amounts[0].add(gasUsed) : amounts[0];
                        const expectedOwnerAmountToken1 = _token1.address === TokenData_1.NATIVE_TOKEN_ADDRESS ? amounts[1].add(gasUsed) : amounts[1];
                        // owner's balance should decrease y amount
                        (0, chai_1.expect)(after.ownerToken0).to.eq(before.ownerToken0.sub(expectedOwnerAmountToken0));
                        (0, chai_1.expect)(after.ownerToken1).to.eq(before.ownerToken1.sub(expectedOwnerAmountToken1));
                        // controller's balance should increase y amount
                        (0, chai_1.expect)(after.controllerToken0).to.eq(before.controllerToken0.add(amounts[0]));
                        (0, chai_1.expect)(after.controllerToken1).to.eq(before.controllerToken1.add(amounts[1]));
                    });
                }
            });
            const SID1 = (0, Trading_1.generateStrategyId)(1, 1);
            /**
             * creates a test strategy, handles funding and approvals
             * @returns a createStrategy transaction
             */
            const createStrategy = async (params) => {
                // prepare variables
                const _params = { ...params };
                const order = _params.order ? _params.order : (0, Trading_1.generateTestOrder)();
                const _owner = _params.owner ? _params.owner : owner;
                const _tokens = [
                    _params.token0 ? _params.token0 : tokens[TokenData_1.TokenSymbol.BNT],
                    _params.token1 ? _params.token1 : tokens[TokenData_1.TokenSymbol.DAI]
                ];
                const amounts = [order.y, order.y];
                if (_params.token0Amount != null) {
                    amounts[0] = ethers_1.BigNumber.from(_params.token0Amount);
                }
                if (_params.token1Amount != null) {
                    amounts[1] = ethers_1.BigNumber.from(_params.token1Amount);
                }
                // keep track of gas usage
                let gasUsed = ethers_1.BigNumber.from(0);
                let txValue = ethers_1.BigNumber.from(0);
                // fund and approve
                for (let i = 0; i < 2; i++) {
                    const token = _tokens[i];
                    // optionally skip funding
                    if (!_params.skipFunding) {
                        await (0, Utils_1.transfer)(deployer, token, owner, amounts[i]);
                    }
                    if (token.address === TokenData_1.NATIVE_TOKEN_ADDRESS) {
                        txValue = amounts[i];
                    }
                    else {
                        const tx = await token.connect(_owner).approve(carbonController.address, amounts[i]);
                        const receipt = await tx.wait();
                        gasUsed = gasUsed.add(receipt.gasUsed.mul(receipt.effectiveGasPrice));
                    }
                }
                if (_params.sendWithExcessNativeTokenValue) {
                    txValue = ethers_1.BigNumber.from(txValue).add(10000);
                }
                // create strategy
                const tx = await carbonController.connect(_owner).createStrategy(_tokens[0].address, _tokens[1].address, [
                    { ...order, y: amounts[0] },
                    { ...order, y: amounts[1] }
                ], { value: txValue });
                const receipt = await tx.wait();
                gasUsed = gasUsed.add(receipt.gasUsed.mul(receipt.effectiveGasPrice));
                const strategyCreatedEvent = receipt.events?.filter((e) => e.event === 'StrategyCreated');
                if (strategyCreatedEvent === undefined) {
                    throw new Error('event retrieval error');
                }
                const id = strategyCreatedEvent[0]?.args?.id;
                return { tx, gasUsed, id };
            };
            describe('strategy updating', async () => {
                const _permutations = [
                    {
                        token0: TokenData_1.TokenSymbol.BNT,
                        token1: TokenData_1.TokenSymbol.DAI,
                        order0Delta: 100,
                        order1Delta: -100,
                        sendWithExcessNativeTokenValue: false
                    },
                    {
                        token0: TokenData_1.TokenSymbol.BNT,
                        token1: TokenData_1.TokenSymbol.ETH,
                        order0Delta: 100,
                        order1Delta: -100,
                        sendWithExcessNativeTokenValue: false
                    },
                    {
                        token0: TokenData_1.TokenSymbol.ETH,
                        token1: TokenData_1.TokenSymbol.BNT,
                        order0Delta: 100,
                        order1Delta: -100,
                        sendWithExcessNativeTokenValue: false
                    }
                ];
                describe('orders are stored correctly', async () => {
                    for (const { token0, token1, order0Delta, order1Delta } of _permutations) {
                        it(`(${token0},${token1}) | order0Delta: ${order0Delta} | order1Delta: ${order1Delta}`, async () => {
                            // prepare variables
                            const { y, z, A, B } = (0, Trading_1.generateTestOrder)();
                            const _token0 = tokens[token0];
                            const _token1 = tokens[token1];
                            const _tokens = [_token0, _token1];
                            // create strategy
                            const { id } = await createStrategy({ token0: _tokens[0], token1: _tokens[1] });
                            // update strategy
                            await updateStrategy({
                                token0: _tokens[0],
                                token1: _tokens[1],
                                strategyId: id,
                                order0Delta,
                                order1Delta
                            });
                            // fetch the strategy created
                            const strategy = await carbonController.strategy(id);
                            // prepare a result object
                            const result = {
                                id: strategy.id.toString(),
                                owner: strategy.owner,
                                tokens: strategy.tokens,
                                orders: strategy.orders.map((o) => ({
                                    y: o.y.toString(),
                                    z: o.z.toString(),
                                    A: o.A.toString(),
                                    B: o.B.toString()
                                }))
                            };
                            // prepare the expected result object
                            const deltas = [order0Delta, order1Delta];
                            const expectedResult = {
                                id: id.toString(),
                                owner: owner.address,
                                tokens: [_tokens[0].address, _tokens[1].address],
                                orders: [
                                    {
                                        y: y.add(deltas[0]).toString(),
                                        z: z.add(deltas[0]).toString(),
                                        A: A.add(deltas[0]).toString(),
                                        B: B.add(deltas[0]).toString()
                                    },
                                    {
                                        y: y.add(deltas[1]).toString(),
                                        z: z.add(deltas[1]).toString(),
                                        A: A.add(deltas[1]).toString(),
                                        B: B.add(deltas[1]).toString()
                                    }
                                ]
                            };
                            // assert
                            (0, chai_1.expect)(expectedResult).to.deep.equal(result);
                        });
                    }
                });
                describe('orders are stored correctly without liquidity change', async () => {
                    const _permutations = [
                        { token0: TokenData_1.TokenSymbol.BNT, token1: TokenData_1.TokenSymbol.DAI, order0Delta: 1, order1Delta: -1 },
                        { token0: TokenData_1.TokenSymbol.ETH, token1: TokenData_1.TokenSymbol.BNT, order0Delta: 1, order1Delta: -1 },
                        { token0: TokenData_1.TokenSymbol.BNT, token1: TokenData_1.TokenSymbol.ETH, order0Delta: 1, order1Delta: -1 }
                    ];
                    for (const { token0, token1, order0Delta, order1Delta } of _permutations) {
                        it(`(${token0},${token1}) | order0Delta: ${order0Delta} | order1Delta: ${order1Delta}`, async () => {
                            // prepare variables
                            const order = (0, Trading_1.generateTestOrder)();
                            const newOrders = [];
                            const _token0 = tokens[token0];
                            const _token1 = tokens[token1];
                            const deltas = [order0Delta, order1Delta];
                            // prepare new orders
                            for (let i = 0; i < 2; i++) {
                                newOrders.push({
                                    y: order.y,
                                    z: order.z.add(deltas[i]),
                                    A: order.A.add(deltas[i]),
                                    B: order.B.add(deltas[i])
                                });
                            }
                            // create strategy
                            const { id } = await createStrategy({ token0: _token0, token1: _token1 });
                            // update strategy
                            await carbonController
                                .connect(owner)
                                .updateStrategy(id, [order, order], [newOrders[0], newOrders[1]]);
                            // fetch the strategy created
                            const strategy = await carbonController.strategy(id);
                            // prepare a result object
                            const result = {
                                id: strategy.id.toString(),
                                owner: strategy.owner,
                                tokens: strategy.tokens,
                                orders: strategy.orders.map((o) => ({
                                    y: o.y,
                                    z: o.z,
                                    A: o.A,
                                    B: o.B
                                }))
                            };
                            // prepare the expected result object
                            const expectedResult = {
                                id: id.toString(),
                                owner: owner.address,
                                tokens: [_token0.address, _token1.address],
                                orders: [newOrders[0], newOrders[1]]
                            };
                            // assert
                            (0, chai_1.expect)(expectedResult).to.deep.equal(result);
                        });
                    }
                });
                describe('balances are updated correctly', () => {
                    const strategyUpdatingPermutations = [
                        ..._permutations,
                        {
                            token0: TokenData_1.TokenSymbol.BNT,
                            token1: TokenData_1.TokenSymbol.ETH,
                            order0Delta: 100,
                            order1Delta: 100,
                            sendWithExcessNativeTokenValue: true
                        },
                        {
                            token0: TokenData_1.TokenSymbol.ETH,
                            token1: TokenData_1.TokenSymbol.BNT,
                            order0Delta: 100,
                            order1Delta: 100,
                            sendWithExcessNativeTokenValue: true
                        }
                    ];
                    for (const { token0, token1, order0Delta, order1Delta, sendWithExcessNativeTokenValue } of strategyUpdatingPermutations) {
                        // eslint-disable-next-line max-len
                        it(`(${token0},${token1}) | order0Delta: ${order0Delta} | order1Delta: ${order1Delta} | excess: ${sendWithExcessNativeTokenValue}`, async () => {
                            // prepare variables
                            const _tokens = [tokens[token0], tokens[token1]];
                            const deltas = [ethers_1.BigNumber.from(order0Delta), ethers_1.BigNumber.from(order1Delta)];
                            const delta0 = deltas[0];
                            const delta1 = deltas[1];
                            const balanceTypes = [
                                { type: 'ownerToken0', token: _tokens[0], account: owner.address },
                                { type: 'ownerToken1', token: _tokens[1], account: owner.address },
                                { type: 'controllerToken0', token: _tokens[0], account: carbonController.address },
                                { type: 'controllerToken1', token: _tokens[1], account: carbonController.address }
                            ];
                            // create strategy
                            const { id } = await createStrategy({ token0: _tokens[0], token1: _tokens[1] });
                            // fund user
                            for (let i = 0; i < 2; i++) {
                                const delta = deltas[i];
                                if (delta.gt(0)) {
                                    await (0, Utils_1.transfer)(deployer, _tokens[i], owner, deltas[i]);
                                }
                            }
                            // fetch balances before updating
                            const before = {};
                            for (const b of balanceTypes) {
                                before[b.type] = await (0, Utils_1.getBalance)(b.token, b.account);
                            }
                            // perform update
                            const { gasUsed } = await updateStrategy({
                                order0Delta,
                                order1Delta,
                                token0: _tokens[0],
                                token1: _tokens[1],
                                strategyId: id,
                                skipFunding: true,
                                sendWithExcessNativeTokenValue
                            });
                            // fetch balances after creating
                            const after = {};
                            for (const b of balanceTypes) {
                                after[b.type] = await (0, Utils_1.getBalance)(b.token, b.account);
                            }
                            // account for gas costs if the token is the native token;
                            const expectedOwnerDeltaToken0 = _tokens[0].address === TokenData_1.NATIVE_TOKEN_ADDRESS ? delta0.add(gasUsed) : delta0;
                            const expectedOwnerDeltaToken1 = _tokens[1].address === TokenData_1.NATIVE_TOKEN_ADDRESS ? delta1.add(gasUsed) : delta1;
                            // assert
                            (0, chai_1.expect)(after.ownerToken0).to.eq(before.ownerToken0.sub(expectedOwnerDeltaToken0));
                            (0, chai_1.expect)(after.ownerToken1).to.eq(before.ownerToken1.sub(expectedOwnerDeltaToken1));
                            (0, chai_1.expect)(after.controllerToken0).to.eq(before.controllerToken0.add(delta0));
                            (0, chai_1.expect)(after.controllerToken1).to.eq(before.controllerToken1.add(delta1));
                        });
                    }
                });
                /**
                 * updates a test strategy, handles funding and approvals
                 * @returns an updateStrategy transaction
                 */
                const updateStrategy = async (params) => {
                    const defaults = {
                        owner,
                        token0: tokens[TokenData_1.TokenSymbol.BNT],
                        token1: tokens[TokenData_1.TokenSymbol.DAI],
                        strategyId: SID1,
                        skipFunding: false,
                        order0Delta: 100,
                        order1Delta: -100
                    };
                    const _params = { ...defaults, ...params };
                    // keep track of gas usage
                    let gasUsed = ethers_1.BigNumber.from(0);
                    const _tokens = [_params.token0, _params.token1];
                    const deltas = [ethers_1.BigNumber.from(_params.order0Delta), ethers_1.BigNumber.from(_params.order1Delta)];
                    let txValue = ethers_1.BigNumber.from(0);
                    for (let i = 0; i < 2; i++) {
                        const token = _tokens[i];
                        const delta = deltas[i];
                        // only positive deltas (deposits) requires funding
                        if (!_params.skipFunding && delta.gt(0)) {
                            await (0, Utils_1.transfer)(deployer, token, _params.owner, delta);
                        }
                        if (token.address === TokenData_1.NATIVE_TOKEN_ADDRESS) {
                            // only positive deltas (deposits) require funding
                            if (delta.gt(0)) {
                                txValue = txValue.add(delta);
                            }
                        }
                        else {
                            if (delta.gt(0)) {
                                // approve the tx
                                const tx = await token.connect(_params.owner).approve(carbonController.address, delta);
                                // count the gas
                                const receipt = await tx.wait();
                                gasUsed = gasUsed.add(receipt.gasUsed.mul(receipt.effectiveGasPrice));
                            }
                        }
                    }
                    if (_params.sendWithExcessNativeTokenValue) {
                        txValue = ethers_1.BigNumber.from(txValue).add(10000);
                    }
                    // prepare orders
                    const currentOrder = (0, Trading_1.generateTestOrder)();
                    const token0NewOrder = { ...currentOrder };
                    const token1NewOrder = { ...currentOrder };
                    let p;
                    for (p in currentOrder) {
                        token0NewOrder[p] = currentOrder[p].add(deltas[0]);
                        token1NewOrder[p] = currentOrder[p].add(deltas[1]);
                    }
                    // update strategy
                    const tx = await carbonController.connect(owner).updateStrategy(_params.strategyId, [currentOrder, currentOrder], [token0NewOrder, token1NewOrder], {
                        value: txValue
                    });
                    const receipt = await tx.wait();
                    gasUsed = gasUsed.add(receipt.gasUsed.mul(receipt.effectiveGasPrice));
                    // return values
                    return { tx, gasUsed };
                };
            });
        });
    });
});
//# sourceMappingURL=carbon.js.map