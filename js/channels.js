function channels_main() {
    //Model
    var channel_manager = {};
    var tv = -1; //This variable stores how much it costs in satoshis to keep a channel open, per veo being stored, per block of times being stored. -1 is invalid, we store this until we can ask the server for the real value.
    function read(x) {
	console.log("read channel ");
  console.log("here is x:" + x);
  console.log("here is the channel manager: "+channel_manager[x]);
	console.log(JSON.stringify(x));
        var y = channel_manager[x];
        if (y == undefined) {
            return undefined;
        } else {
            return JSON.parse(JSON.stringify(y));
        }
    }
    function write(key, value) {
	if (value == undefined) {
	    throw("error, deleting channel data");
	}
	if (value.ssme == undefined) {
	    throw("error, ssme needs to be defined");
	}
	if (!(value.me[3][0] == -6)) {
	    throw("bets badly formated");
	}
	if (!(value.them[1][3][0] == -6)) {
	    throw("them bets badly formated");
	}
	var l1 = value.ssme.length;
	var l2 = value.me[3].length - 1;
	if (!(l1 == l2)) {
	    console.log(JSON.stringify(value.ssme));
	    console.log(JSON.stringify(value.me[3]));
	    throw("error, we need the same number of ss and bets in me.");
	}
	var l3 = value.ssthem.length;
	var l4 = value.them[1][3].length - 1;
	if (!(l3 == l4)) {
	    console.log(JSON.stringify([l3, l4]));
	    console.log(JSON.stringify(value.ssthem));//there is an extra.
	    console.log(JSON.stringify(value.them[1][3]));
	    throw("error, we need the same number of ss and bets in them.");
	}
        channel_manager[key] = value;
    }
    function remove(key) {
	delete channel_manager[key];
    }
    function new_cd(me, them, ssme, ssthem, expiration, cid) {
        return {"me": me, "them": them, "ssme": ssme, "ssthem": ssthem, "cid":cid, "expiration": expiration};
    }
    function new_ss(code, prove, meta) {
        if (meta == undefined) {
            meta = 0;
        }
        return {"code": code, "prove": prove, "meta": meta};
    }

    //View
    var channel_title = document.createElement("h3");
    channel_title.innerHTML = "Channel Settings";
    channel_title.setAttribute("id","channel_title111");

    var channels_div = document.createElement("div");
    channels_div.setAttribute("id","div9");

    var channel_warning_div = document.createElement("div");
    var channel_interface_div = document.createElement("div");

    channel_interface_div.setAttribute("id","div7");

    var load_button = document.createElement("input");
    load_button.type = "file";
    var save_name = document.createElement("INPUT");
    save_name.type = "text";
    save_name.id = "channel_name";
    save_name.value = "channel state ";


    var save_button = button_maker2("Save channel data to file", save_channel_data);

    var local_channel_download = button_maker2("local download", function(){});

    var local_channel_upload = button_maker2("local upload", function(){});
    local_channel_upload.onclick = function() { return populateStorage() };



    var channel_sync_button2 = button_maker2("Trusted channel sync", function(){
          channel_manager = {};
        variable_public_get(["pubkey"], function(pubkey) {
            spk_object.pull_channel_state(function() {
		refresh_channels_interfaces(pubkey, function() {
		    refresh_balance(pubkey);
		});
	    });
	});
    });
    var refresh_channels_button = button_maker2("Show channel interface", function() {
        variable_public_get(["pubkey"], function(pubkey) {
            return refresh_channels_interfaces(pubkey);
        });
    });
    document.body.appendChild(channel_title);
    append_children(channel_title,[br(),br()]);
    document.body.appendChild(channels_div);

    //xyz
    append_children(channels_div, [channel_warning_div, load_button, br(),channel_sync_button2, br(), br(), save_name, save_button, local_channel_upload, local_channel_download, br(),  br()]);
    document.body.appendChild(channel_interface_div);

    //main_view();

    var fee = 152050;
    var oid = document.createElement("INPUT");
    oid.setAttribute("type", "text");
    var oid_info = document.createElement("h8");
    oid_info.innerHTML = "market: ";

    oid.value = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJGE5yn/8=";

//    oid.value = "";

function populateStorage() {


  //we need to make sure to try to minimize inadvertent overwrites by misclicks.
  // simple solution is that if channel_data is null then dont let anyone upload.
//NULLTESTING

console.log("channel_data: " + JSON.stringify(channel_manager));
console.log("channel_data is empty?: "  + ((JSON.stringify(channel_manager) == "{}" )));

if (JSON.stringify(channel_manager) == "{}"){
    console.log("channel data is empty, cancelling local storage upload to prevent inadvertent overwrite");
} else{
  localStorage.setItem(keys.pub() +'channelData',  JSON.stringify(channel_manager));
  console.log("channel data loaded into local storage");
  console.log("loaded as: "+ keys.pub() +"channelData");

}






}



    var price = document.createElement("INPUT");
    price.setAttribute("type", "text");

    var longshort_info = document.createElement("h8");
    longshort_info.innerHTML = "go short if you intend to convert veo into btc; go long if you intend to long the veobtc pair";
    longshort_info.style.fontStyle = "italic";

    var marginrequirement = document.createElement("h8");
    marginrequirement.innerHTML = "Margin of safety: ";

    var capitalconstraint = document.createElement("h8");
    capitalconstraint.innerHTML = "Capital cost: ";

    var leverage = document.createElement("h8");
    leverage.innerHTML = "Leverage: ";


    var price_info = document.createElement("h8");
    price_info.innerHTML = "Price ("+ lowerlimit + " to " + upperlimit + "): ";
    var trade_type = document.createElement("INPUT");
    trade_type.setAttribute("type", "text");
    var trade_type_info = document.createElement("h8");
    trade_type_info.innerHTML = "Long or short: ";
    var trade_amount = document.createElement("INPUT");
    trade_amount.setAttribute("type", "text");
    var trade_amount_info = document.createElement("h8");
    trade_amount_info.innerHTML = "Amount of VEO: ";
    var height_button = button_maker2("Open channel", function() { })
    var cost_button = button_maker2("Calculate fee ", function() { })

    var long_button = button_maker2("Long", function() { })
    var short_button = button_maker2("Short", function() { })

    var spend_amount = document.createElement("INPUT");
    spend_amount.setAttribute("type", "text");
    var amount_info = document.createElement("h8");
    amount_info.innerHTML = "Amount of VEO to lock in channel: ";
    var spend_delay = document.createElement("INPUT");
    spend_delay.setAttribute("type", "text");
    spend_delay.value = "100";
    var delay_info = document.createElement("h8");
    delay_info.innerHTML = "channel delay (in blocks)";
    var lifespan = document.createElement("input");
    lifespan.type = "text";
    lifespan.value = "4000";
    var lifespan_info = document.createElement("h8");
    lifespan_info.innerHTML = "how long should the channel last? In blocks. Longer costs more.";
    var balance_div = document.createElement("div");
    balance_div.innerHTML = "waiting for channel transaction to be included in a block...";
    var channel_balance_button = button_maker2("Check balance", function() { });
    var market_title = document.createElement("h3");
    market_title.innerHTML = "Betting Interface";
    var market_link = document.createElement("a");
    market_link.innerHTML = "<a href=\"/explorer.html\">see the available markets here</a>";
    //    market_link.innerHTML = "see the available markets here ";
    //    market_link.href = "http://159.89.106.253:8080/explorer.html";
    var bet_example = document.createElement("h8");
    bet_example.innerHTML = "if price is 30, and amount is 1, then you can win 0.7, or you can lose 0.3.";
    var button = button_maker2("Place order", make_bet);

    var calcleverage = button_maker2("Calculate margin of safety", function() {});

    var calccapitalconstraint = button_maker2("Calculate capital cost", function() {});


    var bet_update_button = button_maker2("check if any bets have been settled", function() {});
    var combine_cancel_button = button_maker2("combine bets in opposite directions to recover the money from the market ", function() {});
    var list_bets_button = button_maker2("Calculate positions (takes some time) ", bets_object.main);
    var close_channel_button = button_maker2("Close channel", function(){ return; });

    var lightning_button = button_maker2("lightning spend", function(){ return; });
    var lightning_amount = document.createElement("INPUT");
    lightning_amount.setAttribute("type", "text");
    var lightning_amount_info = document.createElement("h8");
    lightning_amount_info.innerHTML = "amount: ";
    var lightning_to = document.createElement("INPUT");
    lightning_to.setAttribute("type", "text");
    var lightning_to_info = document.createElement("h8");
    lightning_to_info.innerHTML = "to pubkey: ";
    var channel_sync_button = button_maker2("trusted channel sync", function(){
        variable_public_get(["pubkey"], function(pubkey) {
            spk_object.pull_channel_state(function() {
		refresh_channels_interfaces(pubkey, function() {
		    refresh_balance(pubkey);
		});
	    });
	});
    });

    variable_public_get(["pubkey"], function(pubkey) {
        return refresh_channels_interfaces(pubkey);
    });
    function channel_warning() {
        channel_warning_div.innerHTML = "channel state needs to be saved!~~~~~~~";
    }
    function save_channel_data() {
        var save_name = document.getElementById("channel_name");
        download(JSON.stringify(channel_manager), save_name.value, "text/plain");
        channel_warning_div.innerHTML = "channel state is saved";
    }
    function load_channels(pubkey) {
	console.log("load channels");
        var file = (load_button.files)[0];
        var reader = new FileReader();
        reader.onload = function(e) {


            channel_manager = JSON.parse(reader.result);
	    //console.log(JSON.stringify(channel_manager));
            refresh_channels_interfaces(pubkey);
        }
        reader.readAsText(file);
    }

    local_channel_download.onclick = function() { return load_channels_local() };





    function load_channels_local() {

      console.log("PUBKEY" + string_to_array(atob(keys.pub())));
      console.log("PUBKEY2" + keys.pub().replace(/"/g, ''));


        channel_manager = JSON.parse(localStorage.getItem(keys.pub() + 'channelData'));
          console.log("NULLTESTING: " + (localStorage.getItem(keys.pub() + 'channelData') == null));

          console.log("NULLTESTINGSTRINGIFY: " + (JSON.stringify(localStorage.getItem(keys.pub() + 'channelData')) == null));

      if ((localStorage.getItem(keys.pub() + 'channelData') == null)) {
                console.log("no channel data in local storage, aborting channel load");
      }else{
        variable_public_get(["pubkey"], function(pubkey) {
            return refresh_channels_interfaces(pubkey);
          })

          variable_public_get(["pubkey"], function(pubkey) {
            return refresh_balance(pubkey);

              bets_object.main;
            })

            stablecoin_UI();



}

        console.log("PUBKEY" + keys.pub());


    }


    function refresh_channels_interfaces(pubkey, callback) {
        console.log("refresh channels interfaces");
        variable_public_get(["time_value"], function(x) {
            tv = x;
            console.log("refresh_channels_interfaces2 pubkey: " + pubkey);
            refresh_channels_interfaces2(pubkey, callback);
        });
    }
    function refresh_channels_interfaces2(pubkey, callback) {
	console.log("server pubkey is ");

function calculate_fee(){
    tv_display.innerHTML = ("Fee: ").concat((tv * 15000 * spend_amount.value / 100000000).toString()).concat(" VEO");
  }

function golong(){
  trade_type.value = "long";
  trade_type.innerHTML = "long";
  console.log(trade_type.value);

}

function goshort(){
  trade_type.value = "short";
  trade_type.innerHTML = "short";
  console.log(trade_type.value);

}

function capconstraintfunc(){

if (trade_type.value == "long"){
  capitalconstraint.innerHTML = "Capital cost: You: "+ Number(trade_amount.value) + " VEO; Server: " + Number(trade_amount.value) /(( Number(price.value)) / Number(upperlimit))+ " VEO";
} else {

  if (trade_type.value == "short"){
  capitalconstraint.innerHTML = "Capital cost: You: "+ Number(trade_amount.value) + " VEO; Server: " + Number(trade_amount.value) /((Number(upperlimit) - (Number(price.value))) / Number(upperlimit))+ " VEO";
}
}
   //+ Number(trade_amount.value) * Number(price.value) / (Number(0.05) + Number(price.value);

  //+ " VEO; Server: " + Number(trade_amount.value) /(Number(0.05) + Number(price.value))+ " VEO";

}

function calclev(){

console.log(trade_amount.value);
if (trade_type.value == "short"){
    marginrequirement.innerHTML = "Margin of safety: BTC stablecoin is safe up to " + parseFloat(Number(100) * Number(price.value) / Number(upperlimit)).toFixed(2) + "% decline from your order price"; //.toFixed(2) ;
    }else{
      marginrequirement.innerHTML = "Margin of safety: upside is capped to a " + parseFloat(Number(-100) + Number(100) * Number(upperlimit) / Number(price.value)).toFixed(2) + "% increase from your order price"; //.toFixed(2) ;

}
}

function returnTrueFalse(_bool2) {
  if (_bool2  == "long"){
    return "true";
  } else if (_bool2 == "short"){
    return "false";
  } else {
    return _bool2;
  }
}

	console.log(pubkey);
        load_button.onchange = function() {return load_channels(pubkey) };

      //  var div = channel_interface_div;
        var div = channel_interface_div;
        div.innerHTML = "";
        var tv_display = document.createElement("div");
        tv_display.setAttribute("id","tvDisplay3");
        tv_display.innerHTML = ("Fee: ");

        var stable_title = document.createElement("h3");
        stable_title.innerHTML = "BTC Stablecoin Market - February 12, 2019";

    //    tv_display.innerHTML = ("it costs this much to keep a channel open. per block per coin: ").concat((tv).toString());
        //var channel_server_mode = document.createElement("h3");
        //channel_server_mode.innerHTML = "channel with a server mode";
        //div.appendChild(channel_server_mode);
        div.appendChild(stable_title);
  //      div.appendChild(tv_display);

  //      div.appendChild(channel_sync_button);
      //  div.appendChild(br());
        var bets_div = document.createElement("div");
	bets_div.id = "bets_div";
        //check if we have a chnnel with the server yet.
        //if we don't, then give an interface for making one.

        console.log("before read pubkey: " + pubkey);
        if (read(pubkey) == undefined) {

            console.log(pubkey);


            console.log("give interface for making channels UNDEFINED.");

            height_button.onclick = function() { return make_channel_func(pubkey) };

            cost_button.onclick = function() { return calculate_fee() };

            append_children(div, [tv_display, br(), amount_info, spend_amount, br(), br(), height_button, cost_button, channel_sync_button2, br()]);
        } else {
            console.log("give interface for making bets in channels.");
            //we want to put some buttons here to go long or short
            long_button.onclick = function() { return golong() };

            short_button.onclick = function() { return goshort() };


            calcleverage.onclick = function() { return calclev() };
            calccapitalconstraint.onclick = function() { return capconstraintfunc() };


//            append_children(div, [long_button,short_button, br(), price_info, price,br(),trade_type_info, trade_type, br(),trade_amount_info, trade_amount, br(), oid_info, oid, button, br(), bet_update_button, br(), br(), combine_cancel_button, br(), br(), list_bets_button, br(), bets_div,close_channel_button, br(), balance_div, channel_balance_button]);

            append_children(div, [long_button,short_button,br(), br(),longshort_info, br(), br(), price_info, price, br(),trade_amount_info, trade_amount, br(), trade_type_info, trade_type, br(), marginrequirement, br(),capitalconstraint, br(), br(), button, calcleverage,calccapitalconstraint, br(), br(), bets_div, br(), balance_div, br(), channel_balance_button,list_bets_button, br(),br(),close_channel_button]);

            lightning_button.onclick = function() { lightning_spend(pubkey); };
            channel_balance_button.onclick = function() {refresh_balance(pubkey);};
            bet_update_button.onclick = function() {
                spk_object.pull_channel_state(function() {
                    refresh_channels_interfaces(pubkey);//it seems excessive to re-draw all this stuff every time the button is clicked.
		});
            };
            combine_cancel_button.onclick = function() {
                combine_cancel_object.main(pubkey);
            };
	    close_channel_button.onclick = function() { close_channel_func(pubkey); };
	    bets_object.draw();
        }
	if (!(callback == undefined)) {
	    callback();
	}
    }
    function close_channel_func(server_pubkey) {
	var cd = read(server_pubkey);
	var spk = cd.them[1];
	var height = headers_object.top()[1];
	var ss = cd.ssthem;
	if (!(JSON.stringify(ss) == JSON.stringify([]))) {
	    console.log("you need to close all smart contracts before you can close the channel");
	    return 0;
	};
	var fun_limit = 400;
	var var_limit = 200;
	spk_object.spk_run(0, ss, spk, height, 0, fun_limit, var_limit, function(x) { close_channel_func2(x, spk, cd, height, ss, server_pubkey); });
    }
    function close_channel_func2(spk_result, spk, cd, height, ss, server_pubkey) {
	var amount = spk_result.amount + cd.them[1][7];
	var cid = spk[6];
	merkle.request_proof("channels", cid, function(x) {
	    close_channel_func3(x, height, cd, amount, ss, cid, server_pubkey); });
    }
    function close_channel_func3(channel, height, cd, amount, ss, cid, server_pubkey) {
	var mypub = keys.pub();
	merkle.request_proof("accounts", mypub, function(acc) {close_channel_func4(acc, channel, height, cd, amount, mypub, ss, cid, server_pubkey);});
    }
    function close_channel_func4(acc, channel, height, cd, amount, mypub, ss, cid, server_pubkey) {
	var expires = cd.expiration;
	var lifespan = Math.max(0, expires - height);
	var bal1 = channel[4];
	var bal2 = channel[5];
	var cfee = Math.floor(tv * lifespan * (bal1 + bal2) / token_units());
	var nonce = acc[2];
	var fee = 152050;
	var acc1 = channel[2];
	var acc2 = channel[3];
	var tx = ["ctc", acc1, acc2, fee, nonce+1, cid, amount - cfee];
	var stx = keys.sign(tx);
	//console.log(JSON.stringify([bal1, bal2, tv, expires, height, amount]));
	variable_public_get(["channel_close", cid, mypub, [-6].concat(ss), stx], function(tx) {
	    remove(server_pubkey);
	    refresh_channels_interfaces2(server_pubkey);
	});
    }




//eventually make this function pull values from oracle question text
    function convertpricesinverse(_input2){
       return ((_input2 / Number(upperlimit) * 100));
    }
    function make_bet() {
        var oid_final = oid.value;
        variable_public_get(["market_data", oid_final], make_bet2);
    }
    function make_bet2(l) {

        console.log("price value is (converted): " + convertpricesinverse(price.value));
        console.log("price value is (not converted): " + price.value);

        var price_final = Math.floor(100 * parseFloat(convertpricesinverse(price.value), 10));

        if (trade_type.value  == "long"){
        } else if (trade_type.value == "short"){

          var price_final = Math.floor(10000 - price_final, 10);
    //      console.log("final price: " + price_final);

        };

        var type_final;

    //    var ttv =

        if (trade_type.value  == "long"){
          var ttv = "true";
        } else if (trade_type.value == "short"){
          var ttv = "false";
        } else {
          var ttv = trade_type.value;
        };

//        var ttv = returnTrueFalse(trade_type.value);
        if ((ttv == "true") ||
            (ttv == 1) ||
            (ttv == "1") ||
            (ttv == "yes") ||
            (ttv == "si") ||
            (ttv == "cierto") ||
            (ttv == "lon") ||
            (ttv == "真正") ||
            (ttv == "既不是")) {
            type_final = 1;
        } else if ((ttv == "false") ||
                   (ttv == 0) ||
                   (ttv == "0") ||
                   (ttv == 2) ||
                   (ttv == "2") ||
                   (ttv == "falso") ||
                   (ttv == "no") ||
                   (ttv == "lon ala") ||
                   (ttv == "也不是") ||
                   (ttv == "假")) {
            type_final = 2;
        }
      //  var amount_final = Math.floor(parseFloat(trade_amount.value,10) * parseFloat(10000,10)  / parseFloat(price_final,10) * token_units());


      var amount_final = Math.floor(parseFloat(Number(trade_amount.value) / ( Number(price_final) / (Number(10000))), 10) * token_units());

//        var amount_final = Math.floor(Number(10000) * parseFloat(Number(trade_amount.value) / (Number(10000) + Number(price_final)), 10) * token_units());
        console.log("price final is: "+ price_final);
        console.log("trade amount is: "+trade_amount.value);

        console.log("final amount is: "+amount_final);

        var oid_final = oid.value;
        var expires = l[1];
        var server_pubkey = l[2];
        var period = l[3];
	var sc;
	console.log("SCALAR ");
	console.log(JSON.stringify(l));
	console.log(JSON.stringify(l[4]));
	// if l[4] is ["binary"] then do this:
	if (l[4][0] == "binary") {
            sc = market_contract(type_final, expires, price_final, server_pubkey, period, amount_final, oid_final, headers_object.top()[1]);
	} else {
	    var lower_limit = l[4][1];
	    var upper_limit = l[4][2];
	    // sanity-check, verify 10 == l[4][3];
	//all scalar markets currently use 10 binary oracles to measure values.
            sc = scalar_market_contract(type_final, expires, price_final, server_pubkey, period, amount_final, oid_final, headers_object.top()[1], lower_limit, upper_limit, 10);
	}
        var cd = read(server_pubkey);
	console.log("channels scalar market contract");
	console.log(JSON.stringify(sc));
        var spk = market_trade(cd, amount_final, price_final, sc, server_pubkey, oid_final);
        var sspk = keys.sign(spk);
	console.log("spk ");
	console.log(JSON.stringify(spk));
	console.log("serialized spk ");
	console.log(JSON.stringify(serialize(spk)));
        var msg = ["trade", keys.pub(), price_final, type_final, amount_final, oid_final, sspk, fee];
        return variable_public_get(msg, function(x) {
            make_bet3(x, sspk, server_pubkey, oid_final);
        });
    }
    function make_bet3(sspk2, sspk, server_pubkey, oid_final) {
	var bool = verify_both(sspk2);
	if (!(bool)) {
	    throw("make bet3, badly signed sspk2");
	}
        var hspk2 = JSON.stringify(sspk2[1]);
        var hspk = JSON.stringify(sspk[1]);
	if (!(hspk == hspk2)) {
            console.log("error, we calculated the spk differently from the server. you calculated this: ");
            console.log(JSON.stringify(sspk[1]));
            console.log("the server calculated this: ");
            console.log(JSON.stringify(sspk2[1]));
	}
        var cd = read(server_pubkey);
        cd.me = sspk[1];
        cd.them = sspk2;
        var newss = new_ss([0,0,0,0,4], [-6, ["oracles", oid_final]]);
        cd.ssme = ([newss]).concat(cd.ssme);
        cd.ssthem = ([newss]).concat(cd.ssthem);
        write(server_pubkey, cd);
        trade_amount.value = "";
        channel_warning();


        populateStorage();

      //  console.log("CHANNEL MANAGER: " + JSON.stringify(channel_manager));
    }

    //Controller

    function make_channel_func(pubkey) {
        var amount = Math.floor(parseFloat(spend_amount.value, 10) * token_units());
        var delay = parseInt(144, 10);
        var expiration = parseInt(15000, 10) + headers_object.top()[1];
        var bal2 = amount - 1;
        spend_amount.value = "";
        var acc1 = keys.pub();
        var acc2 = pubkey;
        //let the server choose an unused cid for us.

        console.log('getting new channel transaction');
        console.log("getting channel pubkey: " + pubkey);
//        console.log()
        variable_public_get(["new_channel_tx", acc1, pubkey, amount, bal2,delay, fee], function(x) { make_channel_func2(x, amount, bal2, acc1, acc2, delay, expiration, pubkey); } );
    //    console.log('failure2');

    }
    function make_channel_func2(tx, amount, bal2, acc1, acc2, delay, expiration, pubkey) {
        //ask a server to make the tx for us, then check that all our data matches.
        console.log("making channel tx");
        //console.log(tx);
        var amount0 = tx[5];
        var bal20 = tx[6];
        var fee0 = tx[3];
        var acc10 = tx[1];
        var acc20 = tx[2];
        var cid = tx[8];
        var delay0 = tx[7];
        if ((!(delay == delay0)) || (!(amount == amount0)) ||
            (!(bal2 == bal20)) || (!(fee == fee0)) ||
            (!(acc1 == acc10)) || (!(acc2 == acc20))) {
            console.log(JSON.stringify([[delay, delay0], [amount, amount0], [bal2, bal20], [fee, fee0], [acc1, acc10], [acc2, acc20]]));
            console.log("server edited the tx. aborting");
        } else {
            var current_height = headers_object.top()[1];
            var lifespan = expiration - current_height;
            var spk_amount = Math.floor((tv * (delay + lifespan) * (amount + bal2) ) / 100000000);
            var spk = ["spk", acc1, acc2, [-6], 0, 0, cid, spk_amount, 0, delay];
            var stx = keys.sign(tx);
            var sspk = keys.sign(spk);
            console.log("new channel");
            variable_public_get(["new_channel", stx, sspk, expiration], function(x) { return channels3(x, expiration, pubkey, spk, tx) });
        }
    }


    function channels3(x, expiration, pubkey, spk, tx_original) {
        var sstx = x[1];
        var s2spk = x[2];
        var tx = sstx[1];
	if (!(JSON.stringify(tx) ==
	      JSON.stringify(tx_original))) {
	    console.log(JSON.stringify(tx));
	    console.log(JSON.stringify(tx_original));
	    throw("the server manipulated the tx in a way we don't know how to handle.");
	}
	var a = verify_both(sstx);
	if (!(a)) {
	    throw("bad signature on tx in channels 3");
	}
	a = verify2(s2spk);
	if (!(a)) {
	    throw("bad signature on spk in channels 3");
	}
	if (!(JSON.stringify(spk) ==
	      JSON.stringify(s2spk[1]))) {
	    throw("the server illegally manipulated the spk");
	}
        var cid = tx[9];
        var acc2 = tx[2];
        //console.log("double signed tx ");
        //console.log(JSON.stringify(sstx));
        //variable_public_get(["txs", [-6, sstx]], function(x) {});
        var spk = s2spk[1];
        var cd = new_cd(spk, s2spk, [], [], expiration, cid);


        write(acc2, cd);
        channel_warning();
        populateStorage();

        refresh_channels_interfaces(pubkey);




          console.log("refresh channels interfaces makechannelfunc2");



    }


  //  function refresh_balance2(pubkey){
      //  refresh_balance(pubkey);
  //    bets_object.main;

  //  }
    function refresh_balance(pubkey) {
        //console.log(channel_manager[pubkey]);
        console.log("your pubkey: " + keys.pub());

    //    console.log("LOCALSTORAGE JSON:" + JSON.stringify(localStorage.getItem('channelData')));
        var cd = read(pubkey);
        var trie_key = cd.me[6];//channel id, cid
	var top_header = headers_object.top();
        var top_hash = hash(headers_object.serialize(top_header));
	//console.log("refresh balance trie key is ");
	//console.log(trie_key);
        merkle.request_proof("channels", trie_key, function(val) {
            //var balance_div = document.getElementById("balance_div");
            var spk = cd.them[1];
	    var expiration = cd.expiration;
	    var height = top_header[1];
    //  console.log(spk);
            var amount = spk[7];
            var betAmount = sum_bets(spk[3]);
            var serverAmount = sum_bets2(spk[3]);
	    console.log(JSON.stringify([val[4], amount, betAmount, val[5], token_units()]));
            var mybalance = ((val[4] - betAmount - (betAmount + amount))/ token_units()).toString();

// the server amount is just subtracting mine,so we need to change
            var serverbalance = ((val[5] - serverAmount + amount + betAmount) / token_units()).toString();
            balance_div.innerHTML = ("Server capital: ").concat(
                serverbalance).concat("").concat(", Your capital: ").concat(
                    mybalance);
                  //  .concat(" Time left in blocks: ").concat(cd.expiration - height).toString())
        });
    }
    function channel_feeder_make_locked_payment(serverid, amount, code) {
        var cd = read(serverid);
        var spk = cd.me;
	console.log("channel feeder make locked payment");
	console.log(JSON.stringify(spk));
        var bet = ["bet", code, amount, code, 0];
        spk[3] = [-6, bet].concat((spk[3]).slice(1));
        spk[8] += 1;
        spk[5] += 1000;
        spk[4] = Math.max(spk[4], 1000);
        //spk[7] += amount;
        return keys.sign(spk);
    }
    function ss_to_external(ss) {
	return ["ss",
		btoa(array_to_string(ss.code)),
		([-6]).concat(ss.prove),
		([-6]).concat(ss.meta)];//prove and meta should start with -6.
    }
    function lightning_spend(serverid) {
	var header_height = headers_object.top()[1];
	variable_public_get(["height"], function(server_height) {
	    if (!(header_height == server_height)) {
		console.log("need to sync headers before you can make channel payments");
		throw("lightning spend error");
	    }
            var fee = 20;
            var a = Math.floor(parseFloat(lightning_amount.value, 10) * token_units());
            var to = lightning_to.value;
            var payment_contract = lightning_object.make(a);
            var code = payment_contract.bet[1];
            var ss = payment_contract.ss;
	    var emsg = [-6, ss_to_external(ss), code, a];
            var encrypted = keys.encrypt(emsg, to);
	    console.log("lightning spend emsg, a, fee");
	    console.log(JSON.stringify(ss));
	    console.log(JSON.stringify(emsg));
	    console.log(a);
	    console.log(fee);
            var sspk = channel_feeder_make_locked_payment(serverid, a+fee, code);
            var msg = ["locked_payment", sspk, a, fee, code, keys.pub(), to, encrypted];
            console.log("lightning spend msg is ");
            console.log(JSON.stringify(msg));
	    console.log("lightning encrypted msg is ");
            console.log(JSON.stringify(emsg));
            variable_public_get(msg, function(sspk2) {
		spk1 = sspk[1];
		spk2 = sspk2[1];
		var bool = verify_both(sspk2);
		if (!(bool)) {
		    throw("lightning spend, bad signature on spk");
		}
		if (!(JSON.stringify(spk1) ==
		      JSON.stringify(spk2))) {
		    console.log("error, the spks calculated by you and the server are not identical.");
		    throw("lightning_spend error")
		}
		var cd = read(serverid);
		var defaultss = new_ss([], [], 0);
		//cd.ssme = ([-6, defaultss]).concat(cd.ssme.slice(1));
		//cd.ssthem = ([-6, defaultss]).concat(cd.ssthem.slice(1));
		cd.ssme = ([defaultss]).concat(cd.ssme);
		cd.ssthem = ([defaultss]).concat(cd.ssthem);
		cd.me = spk1;
		cd.them = sspk2;
		/*
spk currently looks like this.
{"me":["spk","BCjdlkTKyFh7BBx4grLUGFJCedmzo4e0XT1KJtbSwq5vCJHrPltHATB+maZ+Pncjnfvt9CsCcI9Rn1vO+fPLIV4=","BIVZhs16gtoQ/uUMujl5aSutpImC4va8MewgCveh6MEuDjoDvtQqYZ5FeYcUhY/QLjpCBrXjqvTtFiN4li0Nhjo=",[-6],0,0,"uEHL7hd8f6hzyalwrYPOMKfL1DV4bshFb3qlc3mR3w0=",6374999,0,100],"them":["signed",["spk","BCjdlkTKyFh7BBx4grLUGFJCedmzo4e0XT1KJtbSwq5vCJHrPltHATB+maZ+Pncjnfvt9CsCcI9Rn1vO+fPLIV4=","BIVZhs16gtoQ/uUMujl5aSutpImC4va8MewgCveh6MEuDjoDvtQqYZ5FeYcUhY/QLjpCBrXjqvTtFiN4li0Nhjo=",[-6],0,0,"uEHL7hd8f6hzyalwrYPOMKfL1DV4bshFb3qlc3mR3w0=",6374999,0,100],[-6],"MEYCIQCtc7a8h5AksJDzyJascAWo4OPq7eh1wtWSmcQ7ia+dzgIhANqTE+NFQaiMeY952P64MfY2b15SlhNpvoBKCij5/7le"],"ssme":[-6,{"code":[],"prove":[],"meta":0}],"ssthem":[-6,{"code":[],"prove":[],"meta":0}],"expiration":5020}"
	     */
		write(serverid, cd);
            });
	});
    }
    function sum_bets(bets) {
	var x = 0;

	for (var i = 1; i < bets.length; i++) {
	    //console.log("sum bets bet is ");
	    //console.log(JSON.stringify(bets[i][2]));
//	    x += ( (Number(bets[i][2])) * (Number(bets[i][4][2]) /(  Number(bets[i][4][2]) + Number(10000))  ) );
//      x += (Number(bets[i][2])) * (Number(bets[i][4][2]) /(  Number(bets[i][4][2]) + Number(10000))  );
        x += ( (Number(bets[i][2])) * (Number(bets[i][4][2]) /(  Number(bets[i][4][2]) + Number(10000))  ) );
        console.log("here are prices: " + (Number(bets[i][4][2]) / Number(10000)));
        console.log("here are the amounts: " + (Number(bets[i][2]) / Number(100000000)));
        console.log("here is the multiplier: " + (Number(bets[i][4][2]) /(  Number(bets[i][4][2]) + Number(10000))  )    )
        console.log("here is the subtraction amount: " + ( (Number(bets[i][2])) * (Number(bets[i][4][2]) /(  Number(bets[i][4][2]) + Number(10000))  ) ) )
        console.log("cumulative amount is: " + x);
}
        return x;
    }

    function sum_bets2(bets) {
  var x = 0;

  for (var i = 1; i < bets.length; i++) {
      //console.log("sum bets bet is ");
      //console.log(JSON.stringify(bets[i][2]));
//	    x += ( (Number(bets[i][2])) * (Number(bets[i][4][2]) /(  Number(bets[i][4][2]) + Number(10000))  ) );
//      x += (Number(bets[i][2])) * (Number(bets[i][4][2]) /(  Number(bets[i][4][2]) + Number(10000))  );
        x += (( (Number(bets[i][2])) * (Number(bets[i][4][2]) /(  Number(bets[i][4][2]) + Number(10000))  ) ) / (Number(bets[i][4][2]) / Number(10000)));
        console.log("here are prices: " + (Number(bets[i][4][2]) / Number(10000)));
        console.log("here are the amounts: " + (Number(bets[i][2]) / Number(100000000)));
        console.log("here is the multiplier: " + (Number(bets[i][4][2]) /(  Number(bets[i][4][2]) + Number(10000))  )    )
        console.log("here is the subtraction amount: " + ( (Number(bets[i][2])) * (Number(bets[i][4][2]) /(  Number(bets[i][4][2]) + Number(10000))  ) ) )
        console.log("cumulative amount is: " + x);
}
        return x;
    }



    return {new_cd: new_cd,
            read: read,
            new_ss: new_ss,
            write: write,
	    ss_to_external: ss_to_external,
      loadchannelslocal_final: (function() { load_channels_local(); }),
      cmanager : channel_manager,
  loadchannelsreturn2: (function() { refresh_channels_interfaces(pubkey); }),
  loadchannelsreturn3: (function() { refresh_balance(pubkey); }),
  popStorage: (function() { populateStorage(); })}

}


var channels_object = channels_main();
