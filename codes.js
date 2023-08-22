module.exports = {
    answers : [
        `#include <bits/stdc++.h>
        using namespace std;
        int main(){
            int numberOfElements;
            cin>>numberOfElements;
            vector<int> array(numberOfElements);
            int sum = 0;

            for(int  i = 0 ; i < numberOfElements ;i++){
                cin>>array[i];
                sum+=array[i];
            }
            cout<<sum;
            return 0;
        }`
    ]
}