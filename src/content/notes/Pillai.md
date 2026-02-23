---
title: First contribution to OEIS!
description: "A counterexample to a conjecture about Pillai's arithmetical function"
tags:
    - Number Theory
    - Computation
date: 2026-02-04
---

I recently made my first contribution to the OEIS - the *On-Line Encyclopedia of Integer Sequences*, an online database of integer sequences. It's a counterexample to a conjecture made on [A018804](https://oeis.org/A018804), the sequence for [Pillai's arithmetical function](https://en.wikipedia.org/wiki/Pillai%27s_arithmetical_function):
$$
P(n)=\sum_{i=1}^n\gcd(i,n).
$$


The conjecture states:

> For $n>1$,
> $$
> n\mid (P(n)+1)\quad \iff \quad n\text{ is prime}.
> $$

The smallest counterexample turns out to be
$$
n=3\cdot37\cdot43\cdot42\,307\cdot116\,341=23\,492\,890\,653\,051
$$
for which
$$
\frac{P(n)+1}{n}=26.
$$

I found out about this sequence and conjecture from a Math Stack Exchange question - my answer is [linked here](https://math.stackexchange.com/a/5076597/595055).

What is more interesting than the counterexample itself is how I found this counterexample. It'd be extremely difficult to find such a large counterexample without computer assistance, and even with computer assistance, the smallest counterexample would be difficult to find without any mathematical insight. You need both to actually find a counterexample (or you need to be willing to do a *lot* of arithmetic). It was also cool making a contribution to a resource I have used a lot before and disproving a conjecture since most conjectures I have seen have either since been proven to be true or are unsolved. If someone told me that some conjecture holds for the first $23\,492\,890\,653\,050$ natural numbers, I'd guess it holds for all natural numbers.[^fn-belief]

---

It's worth first showing that $P(n)$ is multiplicative.

> **Claim 1.** $P(n)$ is multiplicative. If $m$ and $n$ are coprime, then $P(mn)=P(m)\cdot P(n)$.

> **Proof.** Assume $m$ and $n$ are coprime. By the Chinese Remainder Theorem, every $x\in\{1,\cdots,mn\}$ corresponds uniquely (mod $mn$) to a pair $(a,b)\in\{1,\cdots,m\}\times \{1,\cdots,n\}$ with $x\equiv a\pmod m$ and $x\equiv b\pmod n$.
> So $$ P(mn)=\sum_{x=1}^{mn}\gcd(x,mn)=\sum_{a=1}^m\sum_{b=1}^n\gcd(x_{a,b},mn),$$
> where $x_{a,b}$ is the unique number (mod $mn$) matching $(a,b)$. Also, if $\gcd(m,n)=1$, then $\gcd(x,mn)=\gcd(x,m)\gcd(x,n)$. And since $\gcd(x,n)=\gcd(x+kn,n)$ for integer $k$, we have
> $$ P(mn)=\sum_{a=1}^m\sum_{b=1}^n\gcd(x_{a,b},m)\gcd(x_{a,b},n) =\sum_{a=1}^m\sum_{b=1}^n\gcd(a,m)\gcd(b,n)=P(m)P(n). $$ QED.

A multiplicative function can be defined in terms of the values at prime powers $p^k$. For this particular problem,
$$
P(p^k)=(k+1)p^k-kp^{k-1}.
$$
I'll leave this[^fn-primepower] for whoever's reading to show. Then the "if" direction of the conjecture is pretty easy to show. If $n$ is prime, then $P(n)=2n-1$ so $n$ divides $P(n)+1$.

<!-- --- -->

For the "only if" direction, we can show the conjecture at least holds for non-square-free $n$.

> **Claim 2.** If $p^2$ divides $n$ for some prime $p$, then $P(n)+1\not\equiv0\pmod n$.

> **Proof.** Suppose $p$ is a prime such that $p^2$ divides $n$. Then $P(n)\equiv 0\pmod p$ so $P(n)+1\not\equiv0\pmod p$. But $n\equiv0\pmod p$, so we would need $p$ to be a divisor of $P(n)+1$ as well. QED.

---

It remains to consider $n$ that are square-free. Write $n=p_1\cdots p_k$ with $p_1<\cdots<p_k$ and $k\ge 2$. We have
$$
P(n)=\prod_{i=1}^k(2p_i-1)
$$
and we are trying to find $n$ such that
$$
q(n)=\frac{1+P(n)}{n}
$$
is an integer. We can bound
$$
\frac{P(n)}{n}=\prod_{i=1}^k\left(\frac{2p_i-1}{p_i}\right)
<\frac{1+P(n)}{n}
<\prod_{i=1}^k\frac{2p_i}{p_i}
=2^k
$$
when $k\ge 2$.

---

## Pruning a computer search

For a computer search, suppose we fix the $m<k$ smallest prime factors. Write $a=p_1\cdots p_m$ (fixed) and $r=p_{m+1}\cdots p_k$ (to be determined). By multiplicativity, $P(n)=P(ar)=P(a)P(r)$.

From the previous inequality,
$$
\frac{P(r)}{r}< 2^{k-m},
$$
so
$$
P(r)<2^{k-m}r,
$$
and since $P(r)$ must be an integer, we have
$$
P(r)\le 2^{k-m}r-1.
$$

If we write
$$
q = \frac{P(a)P(r)+1}{ar},
$$
then
$$
q < \frac{P(a)}{a} 2^{k-m}.
$$

Note that this upper bound is not an integer unless $m=1$ and $p_1=2$. If it were an integer in other situations, then $p_1\cdots p_m$ would divide $P(n)$ so couldn't divide $P(n)+1$. More generally, if $p_i\mid(2p_j-1)$ for any $i,j$, it's impossible for $\frac{1+P(n)}{n}$ to be an integer.

Now suppose that the next prime factor $p_{m+1}$ and subsequent ones are very large. The function $\frac{2x-1}{x}$ is increasing and approaches $2$, so we would have
$$
\frac{P(n)}{n}=\frac{P(a)P(r)}{ar}\ge \frac{P(a)}{a}(2-\epsilon)^{k-m},
$$
where $2-\epsilon$ is such that $\frac{2p_{m+1}-1}{p_{m+1}}\ge 2-\epsilon$.

Putting these bounds together, for fixed $a$ and $k$, any valid $q$ must be an integer in the interval
$$
\bigg[
\frac{P(a)}{a} (2 - 1/N)^{k-m},
\;
\frac{P(a)}{a} 2^{k-m}
\bigg).
$$

If this interval contains no integer, then we know that increasing the primes by even larger values will not help, and we can move on from this branch.

---

As a concrete example, take $k=5$, $m=2$, $a=5\cdot 17=85$. Then $P(a)=297$, and the upper bound comes out to
$$
\frac{297}{85}\cdot 2^{5-2}\approx 27.95.
$$
Since we require $q$ to be an integer, we need $q\le 27$. The lower bound implies
$$
\frac{297}{85}(2-1/N)^3\le 27\implies N\le 43.
$$
Thus, we only need to check $17<p_{m+1}\le 43$. Here, the lower bound on $p_{m+1}$ came from the current largest prime factor on $a$ being $17$.

For the base case of $m=0$ (to start off, when no primes are given), we have the strict inequality of $c<2^k$. If
$$
\left(\frac{2N-1}{N}\right)^k>2^k-1
$$
there will not be any solution, so we need
$$
p_1<\frac{1}{2-\left(2^k-1\right)^{1/k}}.
$$

---

## Results

The punchline here is that for fixed $k$, we only need to check a finite number of cases. We can show that there is no solution that works for $k=2,3,4$. But for $k=5$, there is one counterexample of
$$
n=3\cdot37\cdot43\cdot42\,307\cdot116\,341=23\,492\,890\,653\,051\approx 2.3\times 10^{13}
$$
that has
$$
\frac{1+P(n)}{n}=26.
$$
When we skip over numbers that are guaranteed to be larger than this one, we can also show that this is the smallest counterexample, for any $k$. For $k=6$, there is at least one counterexample of
$$
n=2\cdot13\cdot151\cdot34\,649\cdot64\,783\cdot929\,765\,438\,293
=8\,193\,613\,126\,657\,808\,805\,087\,106\approx 8.2\times 10^{24}
$$
that has
$$
\frac{1+P(n)}{n}=46.
$$

---

## A modular constraint I didn't use

For each prime $p_i \mid n$, $q(n)$ being an integer requires
$$
\prod_{j \ne i} (2p_j - 1) \equiv 1 \pmod{p_i}.
$$
Interestingly, I didn't use these congruences in the search. It's possible that somehow incorporating them could speed up computation.

The implementation is very slow. I don't know if the second counterexample is the second smallest counterexample, or whether there are more counterexamples for $k=6$, or any for $k\ge 7$. What I can say "for sure"[^fn-fp] is that there are no other counterexamples with $n\le 10^{18}$.

<!-- ---

## Notes -->

[^fn-belief]: Assuming I'm not suspicious that they told me such an exact number
[^fn-primepower]: Hint: Sum over the divisors of $p^k$
[^fn-fp]: Assuming floating-point shenanigans aren't messing things up too badly, which might be a bold assumption when working with operations involving such large numbers

---

## Python code

<details>
  <summary><strong>Show Python code</strong></summary>

```python
from math import floor, log
from itertools import compress

def ceil_div(a,b):
    d,m=divmod(a,b)
    if m == 0:
        return d
    else:
        return d+1

def primeSieve(limit):
    #returns iterator of all primes under limit (doesn't include limit itself)
    if limit < 3:
        return []
    primes = [False, True]*(limit//2)
    if limit%2 == 1:
        primes.append(False)
    
    primes[1] = False
    primes[2] = True
    
    for base in range(3, int(limit**0.5 + 1), 2):
        if primes[base]:
            primes[base*base:limit:base] = [False]*(ceil_div(limit, base)-base)
    
    return compress(range(limit), primes)

primes = list(primeSieve(10**4))

def extend_primes(extra = -1):
    if extra == -1:
        extra = primes[-1]
    max_prime = primes[-1]
    is_prime = [True]*extra
    # is_prime[i] corresponds to whether i + max_prime + 1 is prime or not
    # need to check up to sqrt(extra+max_prime)
    for p in primes:
        if p*p > extra+max_prime:
            break
        
        lower = (-1-max_prime)%p
        upper = len(is_prime)
        num = ceil_div(upper-lower, p)
        is_prime[lower:upper:p] = [False]*num
    else:
        for i in range(len(is_prime)):
            if is_prime[i]:
                p = i+max_prime+1
                if p*p > extra+max_prime:
                    break
                lower = (-1-max_prime)%p
                upper = len(is_prime)
                num = ceil_div(upper-lower, p)
                is_prime[lower:upper:p] = [False]*num
    
    for i in range(len(is_prime)):
        if is_prime[i]:
            primes.append(i+max_prime+1)

def get_maximum_allowed(n, P, num_remaining):
    # adding 0.5 is for the sake of a buffer in case of floating-point errors
    upper_bound = ceil_div(P * 2**num_remaining, n) - 1
    
    limit = 1/(2-(upper_bound * n/P)**(1/num_remaining))
    
    # (upper_bound * n/P) > 1?
    # want floor(1/(2-(ub * n/P)^(1/r)))
    
    return floor(limit + 0.5)

def unbased_is_prime(n):
    # miller test (deterministic miller-rabin primality test)
    if n == 2:
        return True
    if n%2 == 0 or n < 2:
        return False
    
    d = n-1
    s = 1
    d //= 2
    while d%2 == 0:
        s += 1
        d //= 2
    for a in range(2, min(n-2, floor(2*log(n)**2+0.1)) + 1):
        x = pow(a,d,n)
        for _ in range(s):
            y = (x*x)%n
            if y == 1 and x != 1 and x != n-1:
                return False
            x = y
        if y != 1:
            return False
    return True

def is_prime(n):
    if n > primes[-1] and n < 10**9:
        extend_primes(max(n-primes[-1], primes[-1]))
        if n > primes[-1]:
            return False
        if n == primes[-1]:
            return True
    elif n > primes[-1]:
        return unbased_is_prime(n)
    
    low = 0
    high = len(primes)-1
    while (high-low) > 1:
        mid = (low+high)//2
        p = primes[mid]
        if n == p:
            return True
        elif n < p:
            high = mid
        elif n > p:
            low = mid
    if high-low == 1:
        return n == primes[low] or n == primes[high]
    elif high==low:
        return n == primes[low]

valid = []
def check_possible(n, P, chosen, num_remaining, starting_index):
    if num_remaining == 0:
        if (P+1)%n == 0:
            print(chosen)
        return
    
    i = starting_index
    while i+1 >= len(primes):
        extend_primes()
    
    if num_remaining == 1 and len(chosen) >= 3:
        # this solves it in the case of only one primes remaining using the approach for solving linear diophantine equations
        smallest_ratio = ceil_div(P*(2*primes[i]-1)+1, n*primes[i])
        largest_ratio = (P*2)//n
        for c in range(smallest_ratio, largest_ratio+1):
            p,m = divmod(P-1, 2*P-n*c)
            if m != 0:
                continue
            if is_prime(p):
                chosen[0] = p
                valid.append(chosen.copy())
                print(valid)
                chosen[0] = -1
        return
    
    limit = get_maximum_allowed(n, P, num_remaining)
    
    if num_remaining == 2 and len(chosen) >= 4:
        # this solves it in the case of only two primes remaining using the approach for solving quadratic diophantine equations
        # this isn't strictly necessary but makes it faster
        
        # it can be assumed that n doesn't divide 4P (since we would have already filtered these out)
        
        smallest_ratio = ceil_div(P*(2*primes[i]-1)*(2*primes[i+1]-1)+1, n*primes[i]*primes[i+1])
        largest_ratio = (P*4)//n
        
        for c in range(smallest_ratio, largest_ratio+1):
            i = starting_index
            # we have P(n)(2p-1)(2q-1)+1 = c*n*p*q
            # A = C = 0
            B = 4*P-c*n# > 0 
            D = E = -2*P
            F = P+1
            G = D*E-B*F# = cnP+cn-4P > 0
            
            if B <= 0 or G <= 0:
                raise Exception("invalid B or G")
            
            flag = False
            # factors we know can't be either of the last two
            for p in [2,3,5,7,11,13]:
                if B%p != 0 and E%p == 0 and G%p == 0:
                    flag = True
                    break
            if flag:
                continue
            
            # low_lim = floor(((-D-(D*D+4*B*G)**0.5)/(2*B)   -E)/B + 0.1)
            lim = min(limit, floor(((-D+(D*D+4*B*G)**0.5)/(2*B)   -E)/B + 0.1))
            
            while primes[i] <= lim:
                p = primes[i]
                d = p*B+E
                if d == 0 or G%d != 0:
                    flag = True
                else:
                    q,b = divmod(G//d - D, B)
                    if b != 0 or p >= q or not is_prime(q):
                        flag = True
                    else:
                        chosen[1] = p
                        chosen[0] = q
                        valid.append(chosen.copy())
                        print(valid)
                        chosen[0] = -1
                        chosen[1] = -1
                
                i += 1
                if i == len(primes):
                    extend_primes()
        return
    
    i = starting_index
    if i >= len(primes):
        extend_primes()
    
    while primes[i] <= limit:
        p = primes[i]
        flag = False
        if P%p == 0:
            flag = True
        if not flag:
            for j in range(num_remaining, len(chosen)):
                q = chosen[j]
                if (2*p-1)%q == 0:
                    flag = True
                    break
        i += 1
        if not flag:
            chosen[num_remaining-1] = p
            check_possible(n*p, P*(2*p-1), chosen, num_remaining-1, i)
            chosen[num_remaining-1] = -1
        
        if i >= len(primes):
            extend_primes()

for k in [2,3,4,5]:
    check_possible(1, 1, [-1]*k, k, 0)

# fully checking k = 6 is too slow (on my laptop, at least, without any parallelization)
```
</details>
