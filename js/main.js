
function computeExp(_times){
    var current_exp = document.getElementById("current_exp").value;
    var current_lv = document.getElementById("current_lv").value;
    if (current_lv == ""){
        console.log("ERROR");
        current_lv = 1;
    }
    if(current_exp == ""){
        current_exp = 0;
    }

    var exp_per_song = [16,27,42];
    var total_exp = current_exp;
    var UP_EXP = [0, 100, 115, 130, 145, 190, 240, 285, 335, 385, 435, 485, 535, 590, 640, 690, 745, 800, 850, 905, 960, 1015, 1065, 1120, 1175, 1230, 1285, 1345, 1400, 1455, 1510, 1570, 1625, 1680, 1740, 1795, 1850, 1910, 1970, 2025, 2085, 2140, 2200, 2260, 2315, 2375, 2435, 2495, 2550, 2610, 2670, 2730, 2790, 2850, 2910, 2970, 3030, 3090, 3150, 3210, 3270, 3330, 3390, 3450, 3510, 3575, 3635, 3695, 3755, 3815, 3880, 3940, 4e3, 4065, 4125, 4185, 4250, 4310, 4370, 4435, 4495, 4560, 4620, 4685, 4745, 4810, 4870, 4935, 4995, 5060, 5125, 5185, 5250, 5310, 5375, 5440, 5500, 5565, 5630, 5690, 5755, 5820, 5885, 5945, 6010, 6075, 6140, 6205, 6265, 6330, 6395, 6460, 6525, 6590, 6655, 6715, 6780, 6845, 6910, 6975, 7040, 7105, 7170, 7235, 7300, 7365, 7430, 7495, 7560, 7625, 7690, 7755, 7820, 7885, 7955, 8020, 8085, 8150, 8215, 8280, 8345, 8415, 8480, 8545, 8610, 8675, 8745, 8810, 8875, 8940, 9005, 9075, 9140, 9205, 9275, 9340, 9405, 9470, 9540, 9605, 9670, 9740, 9805, 9875, 9940, 10005, 10075, 10140, 10205, 10275, 10340, 10410, 10475, 10545, 10610, 10675, 10745, 10810, 10880, 10945, 11015, 11080, 11150, 11215, 11285, 11350, 11420, 11490, 11555, 11625, 11690, 11760, 11825, 11895, 11965, 12030, 12100, 12165, 12235, 12305];
    var diff_btn = document.querySelector("input[name='level-options']:checked");
    if (diff_btn.id.search("hard") != -1){
        total_exp = exp_per_song[2];
    } else if (diff_btn.id.search("normal") != -1){
        total_exp = exp_per_song[1];
    }else{
        total_exp = exp_per_song[0];
    }
    total_exp = _times*total_exp;
    //console.log("Total exp : ", total_exp);
    
    var cnt = 0;
    while( total_exp > 0 ){
        total_exp = total_exp - UP_EXP[current_lv++];
        cnt++;
    }
    console.log("level up times:", cnt - 1, " now level:", current_lv - 1, " now your exp", total_exp + UP_EXP[current_lv-1]);
    return { "level_up_times": cnt - 1, "now_level": current_lv - 1, "now_your_exp": total_exp + UP_EXP[current_lv - 1]}
}

function updatePtInput(){
    var reward_target = document.getElementById("rewardSelect").value
    document.getElementById("pt-need").value = reward_target;
}

function updateResult(){
    var reward_target = Number(document.getElementById("pt-need").value);
    if (reward_target=="")
        reward_target = 0
    var acc_pt = Number(document.getElementById("acc-pt").value);
    if(acc_pt == "")
        acc_pt = 0;
    else
        acc_pt = acc_pt
    
    var score_value = Number(document.getElementById("score_value").textContent);
    var times = Math.ceil((reward_target - acc_pt) / score_value);
    var available_lp =  Number(document.getElementById("available_lp").textContent);
    var lp_per = Number(document.getElementById("lp_value").textContent);
    var extra_lp = lp_per * times - available_lp;
    var normal_get_pt = (available_lp / lp_per) * score_value + acc_pt;
    

    let need_star = Math.ceil(extra_lp / 10);
    // <h2>計算結果 : </h2><p>PT 還差 XXX，需要 K 場<br>自然回體可打 L 場<br>需要額外 N 管體 = 幾顆星星</p>
    var str = "<h2>計算結果 : </h2><p>自然回體到結束 PT 可達到 " + normal_get_pt +
        "。<br>PT 還差 " + (reward_target - acc_pt) + " (" + times + "場)<br>需要 " +
        lp_per * times + " 體力，自然回體有 " + available_lp + " 體<br>" +
        "故需額外 " + extra_lp + " 體力 (" + need_star + " 顆石頭)";

    var expDir = {}
    if (document.getElementById("current_lv").value != ""){
        expDir = computeExp(times);
        console.log(expDir);
        
        str += "<br>預估會到 LV" + expDir['now_level'] + ", 升級次數 " + expDir['level_up_times'] + " 次(仍需" + (need_star-expDir['level_up_times']*10) +"顆)";
    }

    str += "<p>額外體力若是負的，代表達標。<br>本服務僅提供試算，不同計算方式會有些差異。\
            <br>有其他建議歡迎下方聯繫討論 :)</p>"
    document.getElementById("result").innerHTML = str;
}

function getHardcoreLp(_countDownDate){
    var countDownDate = _countDownDate;    
    var now = new Date();
    var total_minutes = (countDownDate.getTime() - now.getTime()) / 1000 / 60;
    console.log( (countDownDate.getTime() - now.getTime())/1000/60/60,"小時" );
    return Math.floor(total_minutes/3)
}

function getNormalLp(_countDownDate){
    var countDownDate = _countDownDate;    
    var now = new Date();
    // now = new Date("Oct 13, 2019 00:00:00");
    
    if (now.getDate() == countDownDate.getDate()){
        // 5hr = 100LP, 60min = 20LP, 3min = 1LP
        var minutes = (countDownDate.getHours() - now.getHours()) * 60 + countDownDate.getMinutes() - now.getMinutes();
        return Math.floor(minutes/3) // 除三因為 3min  = 1LP
    }else{
        // 幾點起床
        var wakeup_time = document.getElementById("work").value;
        var rest_time = document.getElementById("rest").value;
        var lp_value = document.getElementById("lp_value").textContent;
        if(wakeup_time == "")
            wakeup_time = 8
        if(rest_time == "")
            rest_time = 23

        var last_day_minutes = (countDownDate.getHours() - wakeup_time) * 60 + countDownDate.getMinutes();
        var full_day = (countDownDate.getDate() - now.getDate() - 2)*( (rest_time-wakeup_time)*60 + 300 ) ; // +300 因為睡覺回體
        var today_minutes = (rest_time - now.getHours()) * 60 - now.getMinutes();
        var true_lp = Math.floor((last_day_minutes + full_day + today_minutes) / 3) + 100 * (countDownDate.getDate() - now.getDate());
        var total_times = Math.floor((today_minutes / 3) / lp_value) + Math.floor((last_day_minutes / 3) / lp_value) + Math.floor((full_day/3)/lp_value);
        console.log("last_day_minutes : ",last_day_minutes, " full_day_mins : ", full_day, ",  today remain mins :" ,today_minutes);
        //console.log(countDownDate.getDate() - now.getDate() - 2, (rest_time - wakeup_time) * 60 + 300);
        return total_times * lp_value
    }
}

function getCasualLp(_countDownDate){
    var countDownDate = _countDownDate;
    var now = new Date();
    // now = new Date("Oct 13, 2019 00:00:00");
    
    if (now.getDate() == countDownDate.getDate()) {
        // 5hr = 100LP, 60min = 20LP, 3min = 1LP
        var minutes = (countDownDate.getHours() - now.getHours()) * 60 + countDownDate.getMinutes() - now.getMinutes();
        return Math.floor(minutes / 3) // 除三因為 3min  = 1LP
    } else {
        var wakeup_time = document.getElementById("work").value;
        var rest_time = document.getElementById("rest").value;
        if (wakeup_time == "")
            wakeup_time = 8
        if (rest_time == "")
            rest_time = 23
        var lp_value = document.getElementById("lp_value").textContent;

        var last_day_minutes = (countDownDate.getHours() - wakeup_time) * 60 + countDownDate.getMinutes();
        var full_day_times = (countDownDate.getDate() - now.getDate() - 2);
        var today_minutes = ((rest_time - now.getHours()) * 60 - now.getMinutes()) < 300 ? (rest_time - now.getHours()) * 60 - now.getMinutes() : 300;
        // console.log("last_day_minutes", last_day_minutes, " full:", full_day, ",  td min:", today_minutes);
        var total_times = Math.floor((today_minutes / 3) / lp_value) + Math.floor(100 / lp_value) * 2 * full_day_times + Math.floor((last_day_minutes / 3) / lp_value)
        console.log(Math.floor((last_day_minutes / 3) / lp_value));
        
        return total_times * lp_value
    }
}

function updateAvailableLp(countDownDate) {
    var checked_btn = document.querySelector("input[name='player-options']:checked");
    if (checked_btn.id == 'casual')
        document.getElementById("available_lp").innerHTML = getCasualLp(countDownDate);
    else if (checked_btn.id == 'hardcore')
        document.getElementById("available_lp").innerHTML = getHardcoreLp(countDownDate); 
    else
        document.getElementById("available_lp").innerHTML = getNormalLp(countDownDate);
}

function updateLevelDescription(_inBtn){
    // 上 C 427  B 450 
    var level_score = [300, 315, 330, 375, 392 , 450, 450, 517 ,585];
    // 392 * 1.02 會讓JS小數溢位
    var level_name = ['easyB', 'easyA', 'easyS', 'normalB', 'normalA', 'normalS', 'hardB', 'hardA', 'hardS'];
    var level_lp = ['20', '20', '20', '25', '25', '25', '30', '30', '30'];
    var bonus_list = [0, 2 , 2 , 5, 15];
    // var checked_btn = _inBtn;
    var checked_btn = document.querySelector("input[name='level-options']:checked");
    var bonus_checked_btn = document.querySelectorAll("#bonus>label.active>input");
    var bonus = 0;
    for(var active of bonus_checked_btn){
        bonus += bonus_list[active.id];
    }
    
    var str = "耗體 : <span id='lp_value'>" + level_lp[level_name.indexOf(checked_btn.id)] + "</span> , 加成 : <span id='bonus_value'>" + bonus +"</span>%,每場分數 : <span id='score_value'>" + Math.round(level_score[level_name.indexOf(checked_btn.id)] *(1+ bonus*0.01)) +"</span>";
    document.getElementById("level-description").innerHTML = str;
}

function updatePlayerDescription(){
    var checked_btn = document.querySelector("input[name='player-options']:checked");
    var player_dir = [{ 'type': 'casual', 'description': "一天只登起床睡前兩次，共耗體 200體/天<br>此選項計算可能會有誤差。"},
        { 'type': 'normal', 'description': "早8 ~ 晚11的 15小時 都不爆體，共耗體 400體/天" },
        { 'type': 'hardcore', 'description': "每5個小時就清一次體力，活動間不爆體，共耗體 480體/天" }
        ];
    var str = ""
    for(var dic of player_dir){
        if (dic['type'] == checked_btn.id){
            str = dic['description'];
            break;
        }
    }
    document.getElementById("player-description").innerHTML = str;
}


function init(){
    var level_labels = document.querySelectorAll("#level>label");
    var bonus_labels = document.querySelectorAll("#bonus>label");
    var player_labels = document.querySelectorAll("#player>label");
    var rewardSelect = document.getElementById("rewardSelect");
    var acc_pt = document.getElementById("acc-pt");

    var countDownDate = new Date("Oct 15, 2019 13:59:00");    
    updateAvailableLp(countDownDate);

    for(var la of level_labels){
        la.addEventListener('click', function () {
            // this === link
            // console.log(this.getElementsByTagName('input')[0]);
            setTimeout(function () { 
                updateLevelDescription(); 
                updateAvailableLp(countDownDate);
                updateResult();}, 500);  
            // updateLevelDescription(this.getElementsByTagName('input')[0]);
            
        })
    }

    for (var la of bonus_labels) {
        la.addEventListener('click', function () {
            // this === link
            setTimeout(function () {
                updateLevelDescription();
                updateResult();
            }, 500);  
        })
    }

    for (var la of player_labels) {
        la.addEventListener('click', function () {
            // this === link
            setTimeout(function () { 
                updatePlayerDescription();
                updateAvailableLp(countDownDate);
                updateResult();
            }, 500);
            
        })
    }

    rewardSelect.addEventListener('change', function () {
        updatePtInput();
        updateResult();
    })

    acc_pt.addEventListener('input', function () {
        updateResult();
    })

    document.getElementById("pt-need").addEventListener('input', function () {
        updateResult();
    })

    document.getElementById("work").addEventListener('input', function () {
        updateResult();
    })

    document.getElementById("rest").addEventListener('input', function () {
        updateResult();
    })

    document.getElementById("current_lv").addEventListener('input', function () {
        updateResult();
    })

    document.getElementById("current_exp").addEventListener('input', function () {
        updateResult();
    })
}

updateLevelDescription();
updatePlayerDescription();
init();
updateResult();