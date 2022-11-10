const text = document.querySelector(".text");
const addBtn = document.querySelector(".btn_add");
const list = document.querySelector(".list");
const tab = document.querySelector(".tab");
let tabState = "all";
const undo = document.querySelector(".undo");
const clear = document.querySelector(".clear");
let data =[];
let clearNum = 0;


renderData()
// function test(){
//     console.log("000")
// };
// test();

// enter輸入
text.addEventListener("keydown", function(e){
    if(e.keyCode == 13){
        addData();
    };
    
});

// 新增資料

function addData(){
    if (text.value == "") {
        alert("請輸入待辦事項!!!");
        return;
    };
    let obj = {};
    obj.content = text.value;
    obj.checked = false;
    data.push(obj);
    renderData();
    text.value = "";
};
addBtn.addEventListener("click", function (e) {
    addData();
});



// 刪除資料

list.addEventListener("click", function(e){
    if(e.target.getAttribute("class") == "delete"){
        let num = e.target.getAttribute("data-num");
        data.splice(num, 1);
        renderData();
    };
    
});

// 更新資料
function renderData(){
    let str ="";
    let count = 0 ;
    data.forEach(function(item, index){
        if(item.checked == false){count += 1};
        if((item.checked == false) && (tabState == "all" || tabState == "notDone")){
            str += `<li>
        <label class="checkbox" for="">
          <input type="checkbox" data-num="${index}" />
          <span>${item.content}</span>
        </label>
        <a href="#" class="delete" data-num="${index}"></a>
      </li>`
        }else if((item.checked == true) && (tabState == "all" || tabState == "already")){
            str += `<li>
            <label class="checkbox" for="">
              <input type="checkbox" data-num="${index}" checked/>
              <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
          </li>`
        };
        
    });

    list.innerHTML=str;
    undo.textContent=`${count}個待完成項目`;

    if(clearNum > 0){
        clear.classList.add("notZero")
    }else if(clearNum == 0){
        clear.classList.remove("notZero")
    };
    // list.addEventListener("click", function (e) {
    //     if (e.target.getAttribute("data-check") == "0") {
    //         e.target.setAttribute("data-check", "1")
    //     } else if (e.target.getAttribute("data-check") == "1") {
    //         e.target.setAttribute("data-check", "0")
    //     };
    // });
};



// TAB轉換
tab.addEventListener("click", function(e){
    tabState = e.target.getAttribute("data-state");
    let allTab = document.querySelectorAll(".tab li");
    allTab.forEach(function(item, index){
        item.classList.remove("active");
    });
    e.target.setAttribute("class", "active");
    
    renderData();
});

// 勾選判斷
list.addEventListener("click", function(e){
    if(e.target.getAttribute("type") == "checkbox"){
        let num = e.target.getAttribute("data-num");
        if(data[num].checked == true){
            data[num].checked = false;
            clearNum --;
            console.log(clearNum);
        }else if(data[num].checked == false){
            data[num].checked = true;
            clearNum ++;
            console.log(clearNum);
        };
    };

    renderData();
});

// 清除已完成
clear.addEventListener("click", function(e){
    clearNum = 0;
    
    let newData = data.filter(function(item){
        return item.checked == false;
    });
    data = newData;
        
        // data.forEach(function(item, index){
        //     if(item.checked == true){
        //         data.splice(index, 1);
        //     };
        // });
    
    

    
    

    renderData();
    console.log(clearNum);
});
