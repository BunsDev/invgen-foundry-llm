/// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2<0.9.0;

import { console } from "./console.sol";
import { console2 } from "./console2.sol";
import { safeconsole } from "./safeconsole.sol";
import { StdChains } from "./StdChains.sol";
import { StdCheatsSafe } from "./StdCheats.sol";
import { stdJson } from "./StdJson.sol";
import { stdMath } from "./StdMath.sol";
import { StdStorage, stdStorageSafe } from "./StdStorage.sol";
import { StdStyle } from "./StdStyle.sol";
import { StdUtils } from "./StdUtils.sol";
import { VmSafe } from "./Vm.sol";
import { ScriptBase } from "./Base.sol";

abstract contract Script is ScriptBase, StdChains, StdCheatsSafe, StdUtils {
    bool public IS_SCRIPT = true;
}