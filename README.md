Amoveo Stablecoin Tool
========

This is built on top of the light node for the Amoveo cryptocurrency and is meant to be used to try out testnet BTC stablecoins. The idea is that you can effectively convert VEO into BTC using this market. This is meant to test out functionality and there may be significant bugs. In fact there is a high chance of something going wrong, so lower your expectations.

You can either download the light node from this repository, or you can just access it from here: http://18.222.121.248:8070/stablecoin.html

INSTRUCTIONS:

First time users:
1. open link http://18.222.121.248:8070/stablecoin.html
2. wait for sync to complete
3. click the "account settings" button at the top and either load your private key or create a new one.
4. click the "stablecoin market" button at the top. enter how much veo you want to lock into a channel, then hit "open channel" and wait for a block to be mined.
5. in the stablecoin market, fill out the fields with a veo/btc price, an amount of veo, and click long or short. short means you want a stablecoin, long means you want to go long veobtc. hit "Place order".
6. you can click "calculate positions (takes some time)" to see if your order has been filled yet, though as mentioned it does not respond immediately and will take some time to calculate. "check balance" checks your channel balance.
              
              An order to short 1 VEO at 0.025 veobtc that has been filled looks like this:
                      ACTIVE ORDER - Remaining: -1 VEO, Order Price: 0.025 
              
              If this same order wasn't filled, it would look like this:
                      POSITION - Value: -1 VEO, Entry Price: 0.025

note: as a backup, users should save their channel state before exiting the page by clicking "channel settings" at the top and downloading their channel state. this tool does store channel state in your local storage for ease of use and in case you forget to download your channel state.

