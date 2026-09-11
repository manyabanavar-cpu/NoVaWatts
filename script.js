window.onload = function() {
    runClockCheck();
    bindCalculator();
    bindCivicForm();
    setupSimToggle();
};

function runClockCheck() {
    var statBox = document.getElementById("status-box");
    var statMsg = document.getElementById("status-msg");
    var toggle = document.getElementById("sim-peak-toggle");
    
    var hr = new Date().getHours();
    
    statBox.classList.remove("loading");
    statBox.classList.remove("peak-alert");
    statBox.classList.remove("off-peak");
    
    if ((hr >= 16 && hr < 20) || (toggle && toggle.checked)) {
        statBox.innerText = "⚠️ THE GRID IS BUSY (PEAK HOURS)";
        statBox.className = "peak-alert";
        statMsg.innerHTML = "Data center internet traffic and home AC units are working overtime. <strong>Try waiting to run heavy appliances if you can!</strong>";
    } else {
        statBox.innerText = "🟢 THE GRID IS QUIET (OFF-PEAK HOURS)";
        statBox.className = "off-peak";
        statMsg.innerHTML = "Electricity demand is low across Northern Virginia. Running your appliances right now is cheaper and safer for the grid!";
    }
}

function setupSimToggle() {
    var toggle = document.getElementById("sim-peak-toggle");
    if (toggle) {
        toggle.onchange = function() {
            runClockCheck();
        };
    }
}

function checkAppliance(devName, powerLevel, tips) {
    document.getElementById("appliance-panel").classList.remove("hidden");
    document.getElementById("app-name").innerText = devName;
    document.getElementById("app-load").innerText = powerLevel;
    document.getElementById("app-desc").innerText = tips;
}

function chkNode(name, pct, writeup, colorTheme) {
    document.getElementById("sim-panel").classList.remove("hidden");
    document.getElementById("p-name").innerText = name;
    
    var badge = document.getElementById("p-badge");
    badge.innerText = pct + "% Full";
    badge.style.background = colorTheme;
    
    var fillBar = document.getElementById("p-bar");
    fillBar.style.width = pct + "%";
    fillBar.style.backgroundColor = colorTheme;
    
    document.getElementById("p-desc").innerText = writeup;
}

function bindCalculator() {
    var goBtn = document.getElementById("calc-go");
    
    goBtn.onclick = function() {
        var baseAmt = parseFloat(document.getElementById("user-bill").value);
        
        if (isNaN(baseAmt) || baseAmt <= 0) {
            alert("Please enter a valid bill amount first!");
            return;
        }
        
        var totalDiscounts = 0;
        var checkedCount = 0; 
        var checks = document.querySelectorAll(".disc-chk");
        
        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                totalDiscounts += parseFloat(checks[i].value);
                checkedCount++;
            }
        }
        
        var totalSaved = baseAmt * totalDiscounts;
        var optimizedBill = baseAmt - totalSaved;
        
        document.getElementById("res-bill").innerText = "$" + optimizedBill.toFixed(2);
        document.getElementById("res-saved").innerText = "$" + totalSaved.toFixed(2);
        
        var badgeField = document.getElementById("community-rank");
        if (checkedCount === 1) {
            badgeField.innerText = "⚡ Grid Saver";
            badgeField.style.color = "#3b82f6";
        } else if (checkedCount === 2) {
            badgeField.innerText = "🌿 Eco Champion";
            badgeField.style.color = "#10b981";
        } else if (checkedCount === 3) {
            badgeField.innerText = "👑 NoVa Energy Legend";
            badgeField.style.color = "#a855f7";
        } else {
            badgeField.innerText = "Eco Rookie";
            badgeField.style.color = "#94a3b8";
        }
        
        document.getElementById("math-view").classList.remove("hidden");
    };
}

function bindCivicForm() {
    var letterBtn = document.getElementById("letter-go");
    
    letterBtn.onclick = function() {
        var choice = document.getElementById("issue-select").value;
        var box = document.getElementById("letter-view");
        var output = document.getElementById("letter-text");
        
        var message = "Dear Representative Subramanyam,\n\nAs a resident of Virginia's 10th Congressional District, I am writing to express my views regarding energy infrastructure development in our communities.\n\n";
        
        if (choice === "rates") {
            message += "I am highly concerned about how the massive expansion of local data centers impacts our monthly residential electricity bills. I urge you to support policies that protect families from bearing unfair utility cost increases.";
        } else if (choice === "grid") {
            message += "Our local grid sustainability is a critical priority. With Northern Virginia handling so much global internet traffic, we need robust oversight to ensure that data facility demand doesn't cause blackouts or grid strain for local neighborhoods.";
        } else if (choice === "green") {
            message += "While technological expansion brings economic changes, preserving our district's beautiful open spaces, historical landmarks, and agricultural borders remains essential. We must balance infrastructure placement with environmental conservation.";
        }
        
        message += "\n\nThank you for your ongoing leadership and commitment to listening to the voices of VA-10 residents.\n\nSincerely,\nA Concerned Constituent";
        
        output.innerText = message;
        box.classList.remove("hidden");
    };
}