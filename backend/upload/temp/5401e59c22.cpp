#include <bits/stdc++.h>
#define fst first
#define snd second
#define int64 long long
#define FOR(i, a, b) for(int i = a; i <= b; i++)
#define FORD(i, b, a) for(int i = b; i >= a; i--)
 
using namespace std;
 
typedef pair<int,int> ii;
 
template<class X, class Y> bool maximize(X &a, Y b)
{
    if(a >= b) return false;
    a = b;
    return true;
}
 
template<class X, class Y> bool minimize(X &a, Y b)
{
    if(a <= b) return false;
    a = b;
    return true;
}
int main ()
{
    ios_base::sync_with_stdio(0); cin.tie(0);
    int x;
    cin >> x;
    if(x == 6) {
        cout << "7";
    }
    else cout << x;

}