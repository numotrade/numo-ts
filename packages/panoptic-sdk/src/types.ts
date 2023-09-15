import type { BaseERC20, ERC20Amount, Fraction, Price } from "reverse-mirage";
import type { Address } from "viem";

/**
 * Fee charged on a swap in pips
 */
export type FeeTier = 100 | 500 | 3_000 | 10_000;

export type TickSpacing = 1 | 10 | 60 | 200;

export type PanopticPool = {
    type: "panopticPool";
    token0: BaseERC20;
    token1: BaseERC20;
    feeTier: FeeTier;
    tickSpacing: TickSpacing;
    address: Address;
    blockCreated: bigint;
  };

export type Tick = { type: "tick"; tick: number };

export type Position = {
    type: "position";
    pool: PanopticPool;
    owner: Address;
    tickLimitLow: Tick; // price slippage limit
    tickLimitHigh: Tick;
    tokenID: Address;
};

export type TickData = {
    type: "tickData";
    tick: Tick;
    tickUtilizations: Fraction;
    liquidityNet: bigint;
    feeGrowthOutside0: Fraction;
    feeGrowthOutside1: Fraction;
  };

  export type PositionData = {
    type: "positionData";
    position: Position;
    liquidity: bigint;
    tokenType: boolean; //0: short, 1: long
    grossPremia0: ERC20Amount<Position["pool"]["token0"]>;
    grossPremia1: ERC20Amount<Position["pool"]["token0"]>;
    owedPremia0: ERC20Amount<Position["pool"]["token0"]>;
    owedPremia1: ERC20Amount<Position["pool"]["token1"]>;
  };

  export type PanopticPoolData = {
    type: "panopticPoolData";
    panopticPool: PanopticPool;
    price: Price<PanopticPool["token0"], PanopticPool["token1"]>;
    tick: number;
    poolUtilizations: bigint;
    feeGlobalGrowth0: Fraction;
    feeGlobalGrowth1: Fraction;
    liquidity: bigint;
    tokenID: Address;
    numberOfContracts: bigint;
    ticks: { [tick: Tick["tick"]]: TickData };
  };