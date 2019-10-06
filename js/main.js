
function updatePtInput(){
    var reward_target = document.getElementById("rewardSelect").value
    document.getElementById("pt-need").value = reward_target;
}

function updateResult(){
    var reward_target = document.getElementById("pt-need").value;
    if (reward_target=="")
        reward_target = 0
    var acc_pt = document.getElementById("acc-pt").value;
    if(acc_pt == "")
        acc_pt = 0;
    else
        acc_pt = acc_pt
    
    var times = Math.ceil((reward_target - acc_pt)/document.getElementById("score_value").textContent);
    var lp_per = document.getElementById("lp_value").textContent;
    var extra_lp = lp_per * times - document.getElementById("available_lp").textContent;
    // <h2>計算結果 : </h2><p>PT 還差 XXX，需要 K 場<br>自然回體可打 L 場<br>需要額外 N 管體 = 幾顆星星</p>
    
    var str = "<h2>計算結果 : </h2><p>PT 還差 " + (reward_target - acc_pt) + " (" + times + "場)<br>需要 " +
        lp_per * times + " 體力，自然回體有 " + document.getElementById("available_lp").textContent + " 體<br>" +
        "故需額外 " + extra_lp + " 體力 (" + Math.ceil(extra_lp/100) + " 顆石頭)";
    str += "<p>額外體力若是負的，代表達標。<br>本服務僅提供試算，不同計算方式會有些差異。<br>有其他建議歡迎下方聯繫討論 :)</p>"
    document.getElementById("result").innerHTML = str;
}

function updateLp(){
    document.getElementById("available_lp").innerHTML = getLp();
}

function getLp(){
    var countDownDate = new Date("Oct 15, 2019 13:59:00");    
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
        if(wakeup_time == "")
            wakeup_time = 8
        if(rest_time == "")
            rest_time = 23
        var last_day_minutes = (countDownDate.getHours() - wakeup_time) * 60 + countDownDate.getMinutes();
        var full_day = (countDownDate.getDate() - now.getDate() - 1)*(rest_time-wakeup_time)*60;
        var today_minutes = (rest_time - now.getHours()) * 60 - now.getMinutes();
        console.log("last_day_minutes",last_day_minutes, " full:", full_day, ",  td min:" ,today_minutes);
        
        return Math.floor((last_day_minutes + full_day + today_minutes) / 3) + 100 * (countDownDate.getDate() - now.getDate())
    }

}

function updateLevelDescription(_inBtn){
    // 上 C 427  B 450 
    var level_score = [0, 0, 330, 375, 392 , 450, 450, 517 ,585];
    // 392 * 1.02 會讓JS小數溢位
    var level_name = ['easyB', 'easyA', 'easyS', 'normalB', 'normalA', 'normalS', 'hardB', 'hardA', 'hardS'];
    var level_lp = ['20', '20', '20', '25', '25', '25', '30', '30', '30'];
    var bonus_list = [0, 2, 5, 15];
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
    var player_dir = [{ 'type': 'casual', 'description': "一天只登起床睡前兩次，共耗體 200體/天"},
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
    
    // var distance = countDownDate - now;
    
    document.getElementById("player-description").innerHTML = str;
}

function init(){
    var level_labels = document.querySelectorAll("#level>label");
    var bonus_labels = document.querySelectorAll("#bonus>label");
    var player_labels = document.querySelectorAll("#player>label");
    var rewardSelect = document.getElementById("rewardSelect");
    var acc_pt = document.getElementById("acc-pt");

    for(var la of level_labels){
        la.addEventListener('click', function () {
            // this === link
            // console.log(this.getElementsByTagName('input')[0]);
            setTimeout(function () { 
                updateLevelDescription(); 
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
                updateLp();
                updatePlayerDescription();
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

}

init();
updateLp();
updateLevelDescription();
updatePlayerDescription();