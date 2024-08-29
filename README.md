## Install
```
npm install
```

## Example
#### 1. Create Retreival Augmented Generation (RAG) Database
First set up an RAG database as docker container. Notice that this container will use `localhost:8080`.
```
# Start Weaviate vector DB
cd weaviate
docker compose up -d
```
#### 2. Fill RAG Database
Run TestGen on any target project with the `--retrain` flag set. TestGen will parse all example projects located in `invariant_dataset` folder and write their invariant tests into Weaviate DB for RAG retrieval. 

To keep the codebase concise, `invariant_dataset` folder is git ignored. You can find one containing 155 sample projects on `Dev1` server `gmq/testgen`.

```
node ./build/src/index.js examples/ARK --project-type=foundry --compiler-version=0.8.13 --setup-file=script/ARK.s.sol:InvariantTest --target-file=src/ARK.sol:AbsToken --retrain
```

#### 3. Generate Invariants For A Given Smart Contract
An example generating potential vulnerabilities and corresponding invariant tests for [ARK](https://github.com/SunWeb3Sec/DeFiHackLabs/tree/main?tab=readme-ov-file#20240324-ark---business-logic-flaw), a project hacked in March 2024.

In this case:
- The project-under-test is located at `examples/ARK`.
- The invariant test contract with setup code is located at `${PROJECT_PATH}/script/ARK.s.sol` with contract name `InvariantTest`.
- The contract-under-test is located at `${PROJECT_PATH}/src/ARK.sol` with contract name `AbsToken`.

```bash
# Generate invariant tests for AbsToken contract in project ARK.
node ./build/src/index.js examples/ARK --project-type=foundry --compiler-version=0.8.13 --setup-file=script/ARK.s.sol:InvariantTest --target-file=src/ARK.sol:AbsToken
```
[Output identifying the vulnerability and writing a test for it](https://github.com/fuzzland/testgen/blob/main/results/ARK.sol%3AAbsToken_output/script/src_ARK_Invaraint.sol#L1324)
