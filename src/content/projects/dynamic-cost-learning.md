---
title: "Dynamic Cost Learning in Multi-Agent Games"
summary: "Learning policy, cost (including private cost features), and dynamics jointly for bounded-rational multi-agent navigation"
date: 2025-05-01
repoUrl: "https://github.com/VarunVejalla/cost-learning-dynamic"
image: "/images/projects/dynamic-cost-learning.png"
technologies:
  - Python
  - PyTorch
  - Julia
  - Multi-Agent Learning
  - Game Theory
featured: true
interactive: false
---

This project explores inverse-style learning in multi-agent dynamic games, where agent costs are not directly observed.

The model jointly trains:

- a policy network (actions),
- a cost network (agent objectives), and
- a dynamics network (state transitions),

while learning private cost embeddings per agent.

We generated two-agent collision-avoidance trajectories from a MaxEnt-MADG setup, trained on those trajectories, and evaluated predicted vs true trajectories qualitatively.

## Project Links

- Full report (PDF): [/writeups/multi-robot-navigation-guided-cost-learning.pdf](/writeups/multi-robot-navigation-guided-cost-learning.pdf)
- Code: [github.com/VarunVejalla/cost-learning-dynamic](https://github.com/VarunVejalla/cost-learning-dynamic)
