---
title: "Fully Undetectable Selfish Mining in Bitcoin"
description: "Profitable selfish mining strategies that are statistically indistinguishable from honest mining with realistic latency."
date: 2025-12-11
tags:
  - bitcoin
  - cryptoeconomics
  - game-theory
---

This note summarizes my MS thesis work:
**Latency Makes You Look Honest: Fully Undetectable Selfish Mining in Bitcoin**.

The core question was whether selfish mining can remain profitable **and** avoid statistical detection, even if observers have global clocks and accurate delay measurements.

## Main Idea

A strategic miner can add a small delay to its own communication behavior and emulate an honest miner with slightly worse network latency.
Under this model, the attack can remain statistically indistinguishable from honest behavior while still increasing long-run reward share.

## Key Result

In the small-latency regime, profitability is achievable when attacker hash power satisfies:

$$
\alpha > \frac{1-\gamma}{2-\gamma},
$$

where:

- $\alpha$ is attacker hash power fraction,
- $\gamma$ is the probability honest miners mine on the attacker branch during a tie.

The analysis also shows limits of metadata-only protocol changes (headers/timestamps/signatures) for eliminating this class of attacks in the modeled setting.

![Example relationship between simulated delay and attacker payoff](/images/notes/thesis-opt-delay.png)

## Links

- Full thesis PDF: [/writeups/varun-vejalla-ms-thesis-2025.pdf](/writeups/varun-vejalla-ms-thesis-2025.pdf)
- DOI: [https://doi.org/10.18130/eehr-am14](https://doi.org/10.18130/eehr-am14)
