---
title: Shannon switching game with n cops
description: Linear upper bound on size of complete graph needed for robber to win

tags:
    - Graph Theory
    - Combinatorial Game Theory
date: 2026-03-02
---

This is a follow-up to [Kimberly Wood's senior project](https://e.math.cornell.edu/people/belk/projects/KimberlyWood.pdf). I first heard about this problem through [3cycle's YouTube video](https://youtu.be/b39e3UfNNYQ?si=BE8yY0MhjqpL4605).

## Problem

Fix a graph $G$ and two distinct nodes $s,t\in V(G)$.

Each round proceeds as follows:
1. The cop deletes up to $n$ currently undeleted edges.
2. The robber claims one undeleted edge.

Deleted edges are gone permanently. Claimed robber edges stay forever in the robber's edge set.

- The robber wins once their claimed edges contain an $s$-$t$ path.
- The cop wins by preventing this (by disconnecting $s$ and $t$ before the robber can make a path).

For each $n$, define $\phi(n)$ to be the smallest $m$ such that on $K_m$, the robber has a winning strategy.

Main question:
> How large must $m$ be, as a function of $n$, to guarantee a robber win on $K_m$? That is, what is $\phi(n)$?

## Previous Bounds

Wood proves
$$
n+4\le \phi(n)\le 2n^2+n+1.
$$

A linear lower bound is immediate: if $m\le n+1$, then the cop can delete all edges incident to $s$ (or $t$) on the first move, so no $s$-$t$ path can ever be formed.

Wood's upper bound came from having the robber always choose a completely untouched new node. 

## Proof Overview

Wood's upper bound came from only considering a single component growing from the source node. What we will do is have two components grow from both the source and target nodes, like a bidirectional BFS. Thus, the available moves that will benefit us grows quadratically in the number of rounds, and we can make the quadratic growth rate be just as large/slightly larger than the cop's edge deletion rate.

## New Upper Bound

I refine the upper bound to linear:

**Theorem.** For all $n\ge 1$,
$$
\phi(n)\le 4n.
$$

So the robber wins on $K_{4n}$.

## Proof

Set $G=K_m$ with $m=4n+1$.

Let $C_s$ and $C_t$ be the robber components containing $s$ and $t$, respectively. While the robber has not yet won, these components are disjoint.

Write
$$
S=|C_s|,\quad T=|C_t|,\quad k=m-S-T.
$$
Here $k$ is the number of vertices in neither component.

### Robber strategy

On each robber move:
1. If an undeleted edge joins $C_s$ to $C_t$, claim it and win immediately.
2. Otherwise, enlarge the smaller of $C_s,C_t$ by one vertex (claim an undeleted edge from that component to a vertex outside it).

So, until the game ends, the robber always grows the smaller side.

### Invariants after $r$ robber moves

Before robber move $r+1$ (so the cop has moved $r+1$ times):
- $S+T=r+2$,
- $|S-T|\le 1$,
- total edge deletions are at most $(r+1)n$.

Assume without loss of generality that $S\le T$.

### Counting available edges

To implement their strategy, the robber needs at least one undeleted edge from $C_s$ to $V\setminus C_s$.

The number of such edges in $K_m$ is
$$
S(m-S).
$$
In the worst case, every deleted edge so far lies among these edges. Therefore, the robber is guaranteed to be able to implement their strategy if
$$
S(m-S)>(r+1)n.
$$

We need this to hold for all $r\in[0,m-2]$.

From $S+T=r+2$, $S\le T$, and $|S-T|\le 1$, we get
$$
S\ge \frac{r+1}{2}.
$$
Also $S\le m/2$, so $x(m-x)$ is increasing at $x=S$. Hence
$$
S(m-S)\ge \frac{r+1}{2}\left(m-\frac{r+1}{2}\right).
$$
It's enough to check
$$
\frac{r+1}{2}\left(4n-\frac{r+1}{2}\right)>(r+1)n.
$$

If you consider this as a quadratic in $r$, this inequality holds for 
$$
-1<r<4n-1=m-1.
$$
So it holds for every round before winning. 

Therefore, at every robber turn, the strategy is implementable: either the robber immediately connects $C_s$ to $C_t$, or grows the smaller component.

When $k$ reaches $0$ after the $(m-2)$th round, every vertex lies in $C_s\cup C_t$. At that point, any edge out of the smaller component must go directly to the other component, giving an immediate winning move in the $(m-1)$th round. Thus the robber wins on $K_{4n}$.

QED.

## Discussion and Conjecture

Although the strategy itself may work for smaller $m$, the proof as above doesn't work. Say $m=4n-1$. At the end, we would have $C_s=2n-1$ and $C_t=2n$. The cop would have deleted $(4n-2)n=4n^2-2n$ edges, while the robber has the same value of $(2n-1)(2n)=4n^2-2n$ edges to choose from.

This bound is definitely not tight. We only track two components and don't really consider the actual edges deleted by the cop. For example, we know for sure that the cop would've been forced to use edge deletions in previous rounds to prevent the components from getting connected. As the rounds go on, they use up more and more edge deletions on this. 

I think $\phi(n)$ is about $2n+3$, but I don't really have anything backing this up. My intuition was that it would take more than two rounds for the cop to disconnect any one node. But then in a round, the robber can grow their connected components.

## TODO

1. Round-by-round diagram for $n=2$ and $K_{8}$ showing the two-component growth strategy.
2. Use information about the edges the cop would be forced to take.
3. Three-component strategy (source, target, middle) with some potential function?
4. More generally, potentials prioritizing adaptability somehow?

