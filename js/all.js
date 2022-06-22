// 點擊蔬果/水果/花卉 搜尋對應種類
// 點擊th上的價位資訊來排序搜尋後結果

//篩選狀態
let filterStatus = false;

// 目前頁數
let currentPage=1;

//排序宣告
let sorta = [];
let sort = [];
let eachdata=[];

//種類篩選
let category = document.querySelector(".category");
let kind;
let resultName = document.querySelector(".span");
let kindName;
let categoryBtns=document.querySelectorAll(".category li a");
category.addEventListener("click", function (e) {
  if (e.target.nodeName !== "A") {
    return;
  }
  e.preventDefault();
  filterStatus = false;
  categoryBtns.forEach(function(item){
    item.setAttribute("class","");
  });
  e.target.setAttribute("class","active");
  kind = e.target.getAttribute("data-id");
  console.log(e.target.getAttribute("data-id"));
  kindName = e.target.textContent;
  setCategory();
});

let result = document.querySelector("table");
function setCategory() {
  let str = "";
  sorta = []; //每次篩選時清空排序
  eachdata=[];
  currentPage=1;
  axios
    .get("https://hexschool.github.io/js-filter-data/data.json")
    .then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        if (kind == response.data[i].種類代碼) {
          str += `<tr><td>${response.data[i].作物名稱}</td><td>${response.data[i].市場名稱}</td><td>${response.data[i].上價}</td><td>${response.data[i].中價}</td><td>${response.data[i].下價}</td><td>${response.data[i].平均價}</td><td>${response.data[i].交易量}</td></tr>`;

          //把結果新增到陣列
          sorta.push([
            `${response.data[i].作物名稱}`,
            `${response.data[i].市場名稱}`,
            `${response.data[i].上價}`,
            `${response.data[i].中價}`,
            `${response.data[i].下價}`,
            `${response.data[i].平均價}`,
            `${response.data[i].交易量}`
          ]);
          // console.log(sorta);
          eachdata.push(`<tr><td>${response.data[i].作物名稱}</td><td>${response.data[i].市場名稱}</td><td>${response.data[i].上價}</td><td>${response.data[i].中價}</td><td>${response.data[i].下價}</td><td>${response.data[i].平均價}</td><td>${response.data[i].交易量}</td></tr>`);
          console.log("篩選時");
          console.log(eachdata);
        }
      }
      // str =
      //   `<tr class="title">
      //   <th width="10%">作物名稱</th>
      //   <th width="10%">市場名稱</th>
      //   <th width="10%"><a href="#">上價<i class="fas fa-sort"></i></a></th>
      //   <th width="10%"><a href="#">中價<i class="fas fa-sort"></i></a></th>
      //   <th width="10%"><a href="#">下價<i class="fas fa-sort"></i></a></th>
      //   <th width="10%"><a href="#">平均價<i class="fas fa-sort"></i></a></th>
      //   <th width="10%"><a href="#">交易量<i class="fas fa-sort"></i></a></th>
      // </tr>` + str;
      // result.innerHTML = str;
    eachPage(eachdata,result,rows,currentPage);
    setPagination(eachdata, pagination, rows);
      resultName.innerHTML = `查看「${kindName}類別」的比價結果`;
    })
  .catch(function(error){
    return console.log(error)
  });
  result.innerHTML = `<td colspan="7" class="init">搜尋中...</td>`;
    
}

//按照名稱搜尋
let ser_btn = document.querySelector(".search_btn");
let itemName = document.querySelector("#find");

ser_btn.addEventListener("click", function (e) {
  filterStatus = false;
  currentPage=1;
  let str = "";
  let no = "";
  sorta = []; //每次搜尋時清空排序
  eachdata=[];
  axios
    .get("https://hexschool.github.io/js-filter-data/data.json")
    .then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        console.log(str);
        // alert(typeof itemName.value);
        // alert(typeof response.data[i].作物名稱);
        if (itemName.value === response.data[i].作物名稱) {
          str += `<tr><td>${response.data[i].作物名稱}</td><td>${response.data[i].市場名稱}</td><td>${response.data[i].上價}</td><td>${response.data[i].中價}</td><td>${response.data[i].下價}</td><td>${response.data[i].平均價}</td><td>${response.data[i].交易量}</td></tr>`;

          //把結果新增到陣列
          sorta.push([
            `${response.data[i].作物名稱}`,
            `${response.data[i].市場名稱}`,
            `${response.data[i].上價}`,
            `${response.data[i].中價}`,
            `${response.data[i].下價}`,
            `${response.data[i].平均價}`,
            `${response.data[i].交易量}`
          ]);
          eachdata.push(`<tr><td>${response.data[i].作物名稱}</td><td>${response.data[i].市場名稱}</td><td>${response.data[i].上價}</td><td>${response.data[i].中價}</td><td>${response.data[i].下價}</td><td>${response.data[i].平均價}</td><td>${response.data[i].交易量}</td></tr>`);
        } else if (itemName.value !== response.data[i].作物名稱) {
          no = `<td colspan="7" class="init">查無此結果X_X</td>`;
        }
      }
      if (str == "") {
        no =
          `<tr class="title">
        <th width="10%">作物名稱</th>
        <th width="10%">市場名稱</th>
       <th width="10%"><a href="#">上價<i class="fas fa-sort"></i></a></th>
        <th width="10%"><a href="#">中價<i class="fas fa-sort"></i></a></th>
        <th width="10%"><a href="#">下價<i class="fas fa-sort"></i></a></th>
        <th width="10%"><a href="#">平均價<i class="fas fa-sort"></i></a></th>
        <th width="10%"><a href="#">交易量<i class="fas fa-sort"></i></a></th>
      </tr>` + no;
        result.innerHTML = no;
      } else {
      //   str =
      //     `<tr class="title">
      //   <th width="10%">作物名稱</th>
      //   <th width="10%">市場名稱</th>
      //  <th width="10%"><a href="#">上價<i class="fas fa-sort"></i></a></th>
      //   <th width="10%"><a href="#">中價<i class="fas fa-sort"></i></a></th>
      //   <th width="10%"><a href="#">下價<i class="fas fa-sort"></i></a></th>
      //   <th width="10%"><a href="#">平均價<i class="fas fa-sort"></i></a></th>
      //   <th width="10%"><a href="#">交易量<i class="fas fa-sort"></i></a></th>
      // </tr>` + str;
      //   result.innerHTML = str;
        eachPage(eachdata,result,rows,currentPage);
        setPagination(eachdata, pagination, rows);
      }

      resultName.innerHTML = `查看「${itemName.value}」的比價結果`;
      itemName.value="";
    })
  .catch(function(error){
    return console.log(error);
  })
  result.innerHTML = `<td colspan="7" class="init">搜尋中...</td>`;

});

//排序篩選 jquery
let table_filter = document.querySelectorAll(".title th");
let table_th = document.querySelector(".title");
let reverseSort = 0;
$(document).ready(function () {
  $("table").on("click", ".title th", function (e) {
    e.preventDefault();
    filterStatus = true;
    currentPage=1;
    switch (this.textContent) {
      case "上價":
        if(reverseSort==0){
          reverseSort=1;
        sort = sorta.slice(0);
        console.log(sort);
        sort.sort(
          (function (index) {
            return function (a, b) {
              return a[index] === b[index]
                ? 0
                : a[index] - b[index] < 0
                ? -1
                : 1;
            };
          })(2)
        );
        } else {
        reverseSort=0;
        sort = sorta.slice(0);
        console.log(sort);
        sort.sort(
          (function (index) {
            return function (a, b) {
              return a[index] === b[index]
                ? 0
                : b[index] - a[index] > 0
                ? 1
                : -1;
            };
          })(2)
        );
        }
        break;

      case "中價":
        if(reverseSort==0){
          reverseSort=1;
        sort = sorta.slice(0);
        console.log(sort);
        sort.sort(
          (function (index) {
            return function (a, b) {
              return a[index] === b[index]
                ? 0
                : a[index] - b[index] < 0
                ? -1
                : 1;
            };
          })(3)
        );
        } else {
        reverseSort=0;
        sort = sorta.slice(0);
        console.log(sort);
        sort.sort(
          (function (index) {
            return function (a, b) {
              return a[index] === b[index]
                ? 0
                : b[index] - a[index] > 0
                ? 1
                : -1;
            };
          })(3)
        );
        }
        break;

      case "下價":
        if(reverseSort==0){
          reverseSort=1;
        sort = sorta.slice(0);
        console.log(sort);
        sort.sort(
          (function (index) {
            return function (a, b) {
              return a[index] === b[index]
                ? 0
                : a[index] - b[index] < 0
                ? -1
                : 1;
            };
          })(4)
        );
        } else {
        reverseSort=0;
        sort = sorta.slice(0);
        console.log(sort);
        sort.sort(
          (function (index) {
            return function (a, b) {
              return a[index] === b[index]
                ? 0
                : b[index] - a[index] > 0
                ? 1
                : -1;
            };
          })(4)
        );
        }
        break;

      case "平均價":
        if(reverseSort==0){
          reverseSort=1;
        sort = sorta.slice(0);
        console.log(sort);
        sort.sort(
          (function (index) {
            return function (a, b) {
              return a[index] === b[index]
                ? 0
                : a[index] - b[index] < 0
                ? -1
                : 1;
            };
          })(5)
        );
        } else {
        reverseSort=0;
        sort = sorta.slice(0);
        console.log(sort);
        sort.sort(
          (function (index) {
            return function (a, b) {
              return a[index] === b[index]
                ? 0
                : b[index] - a[index] > 0
                ? 1
                : -1;
            };
          })(5)
        );
        }
        break;

      case "交易量":
        if(reverseSort==0){
          reverseSort=1;
        sort = sorta.slice(0);
        console.log(sort);
        sort.sort(
          (function (index) {
            return function (a, b) {
              return a[index] === b[index]
                ? 0
                : a[index] - b[index] < 0
                ? -1
                : 1;
            };
          })(6)
        );
        } else {
        reverseSort=0;
        sort = sorta.slice(0);
        console.log(sort);
        sort.sort(
          (function (index) {
            return function (a, b) {
              return a[index] === b[index]
                ? 0
                : b[index] - a[index] > 0
                ? 1
                : -1;
            };
          })(6)
        );
        }
        break;
    }
    sort = sort.map(function (item) {
      return item.map(function (item2) {
        return (item2 = `<td>${item2}</td>`);
      });
    });
    
    sort = sort.map(function(item){
      return item.join('');
    })

    sort = sort.map(function (item) {
      return (item = `<tr class="title">${item}</tr>`);
    });
    console.log('iiii')
    console.log(sort);
    eachPage(sort,result,rows,currentPage);
    setPagination(sort, pagination, rows);

    // sort = sort.toString();
    // sort = sort.replaceAll(",", "");
    // console.log(sort);

    // sort =
    //   `<tr class="title">
    //     <th width="10%">作物名稱</th>
    //     <th width="10%">市場名稱</th>
    //     <th width="10%"><a href="#">上價<i class="fas fa-sort"></i></a></th>
    //     <th width="10%"><a href="#">中價<i class="fas fa-sort"></i></a></th>
    //     <th width="10%"><a href="#">下價<i class="fas fa-sort"></i></a></th>
    //     <th width="10%"><a href="#">平均價<i class="fas fa-sort"></i></a></th>
    //     <th width="10%"><a href="#">交易量<i class="fas fa-sort"></i></a></th>
    //   </tr>` + sort;

    // result.innerHTML = sort;




    // let sortArr=sort.toString();
    // console.log(sortArr);
  });
});
//排序篩選 原生js
// table_th.addEventListener('click',function(e){
// switch(e.target.textContent){
//   case "上價":
//     alert("^_^");
//     break;

//     case "中價":
//     alert("^0^");
//     break;

//     case "下價":
//     alert("^w^");
//     break;

//     case "平均價":
//     alert("^U^");
//     break;

//     case "交易量":
//     alert("^x^");
//     break;
// }                                        })

//讀取API種類
// axios.get('https://hexschool.github.io/js-filter-data/data.json')
// .then(function(response){
//   console.log(response.data[0].種類代碼);
// });
//N04 蔬菜
//N05 水果
//N06 花卉

// //初始化
// let result =document.querySelector('.items');
// let str="";
// // str+=`<td colspan="7" class="init">請輸入並搜尋想比價的作物名稱'0'</td>`;
// str+=`<td>椰子</td><td>台北二</td><td>43.1</td><td>30.9</td><td>20.0</td><td>31.2</td><td>1290.0</td>`
// result.innerHTML=str;

let rows=10;


function eachPage(items,direction,quantity,page) {
  direction.innerHTML='';
  page--;
  
  let start = page*quantity;
  let end = start+quantity;
  let eachItems = items.slice(start,end);
let top= `<tr class="title">
        <th width="10%">作物名稱</th>
        <th width="10%">市場名稱</th>
        <th width="10%"><a href="#">上價<i class="fas fa-sort"></i></a></th>
        <th width="10%"><a href="#">中價<i class="fas fa-sort"></i></a></th>
        <th width="10%"><a href="#">下價<i class="fas fa-sort"></i></a></th>
        <th width="10%"><a href="#">平均價<i class="fas fa-sort"></i></a></th>
        <th width="10%"><a href="#">交易量<i class="fas fa-sort"></i></a></th>
      </tr>`;
  // direction.innerHTML=top;
      let itemAll ="";
	for (let i = 0; i < eachItems.length; i++) {
		let item = eachItems[i];
    itemAll += item;
	}
  itemAll= top+itemAll;
  direction.innerHTML=itemAll;
}
// eachPage(eachdata,result,rows,currentPage);

let pagination=document.querySelector('.pag');

function setPagination (items, pag, quantity) {
	pag.innerHTML = "";

	let pageCount = Math.ceil(items.length / quantity);

	for (let i = 1; i < pageCount + 1; i++) {
		let btn = PaginationButton(i, items);
		pag.appendChild(btn);
	}
  showScrollBtn();
}

function PaginationButton (page, items) {
	let button = document.createElement('button');
	button.innerText = page;

 $(button).on('click',function(){
   currentPage = page;
   
$(this).siblings().removeClass('pag_active');
    button.setAttribute('class','pag_active');
   
    if(filterStatus === true) {
      eachPage(sort,result,rows,currentPage);
    } else {
		eachPage(eachdata,result,rows,currentPage);
  }
 })   
	return button;
}

function showScrollBtn() {
  let scrolldown = document.querySelector('.scrolldown');
  let scrollup = document.querySelector('.scrollup');
  scrolldown.setAttribute('style','display:inline-block;');
  scrollup.setAttribute('style','display:inline-block;');
  scrolldown.onclick = function(){
  pagination.scrollTo ({
  top:pagination.scrollTop+70, behavior:"smooth"
});
};
scrollup.onclick = function(){
  pagination.scrollTo ({
  top:pagination.scrollTop-70, behavior:"smooth"
});
};
}
