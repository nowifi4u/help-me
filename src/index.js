const divAns = 1000000007

const gcdofzeroiszero = false //it is not, gcd(N,0) = N, 
                       //read https://proofwiki.org/wiki/Existence_of_Greatest_Common_Divisor
                       //Наконец сделали верные тесты :D

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
};


module.exports = function count(s, pairs) {
  let mask = []
  const ml = s.length
  for (let i=0; i<ml; i++){
      mask.push(Number(s[i]))
  }

  pairs.sort((l, r) => l[0] - r[0])
  let cycle = 1
  for (let i=0; i<pairs.length; i++){
    cycle *= pairs[i][0]
  }

  if (cycle > 200000000) return -1

  let gcds = new Array(cycle+ml).fill()
  for (let i=0; i<gcds.length; i++){
    gcds[i] = (gcd(cycle,i) === 1)
  }
  //console.log(gcds)

  let ans = 0
  for (let i = 0; i < cycle; i++){
    let check = true
    for (let j = 0; j<ml; j++){
      if ( gcds[i+j] ^ mask[j] ){
        check = false
        break
      }
    }
    if (check){ 
      ans++
    }
  }

  for (let i = 0; i<pairs.length; i++){
    ans = (ans*pairs[i][1]) % divAns;
  }
 
  if (gcdofzeroiszero && mask[0] === 0) ans--
  console.log(ans)
  return ans;
}
