let booksData = [
	{id: 1, authors: "dgdrg gsgs", name: "zfjkdjdoiug", publishing_office: "dgjlsjg okrgked", pages: 131, publication_year: 2005, status: "доступна"},
	{id: 2, authors: "gdxgr e ghtrs", name: "ert eshwshrtryht", publishing_office: "m", pages: 111, publication_year: 2008, status: "на руках"},
	{id: 3, authors: "dg wrhwrr tr wtrs", name: "r5y5 4ryw45y", publishing_office: "spb", pages: 251, publication_year: 2015, status: "доступна"},
	{id: 4, authors: "wr rrthw t", name: "zwy yhtwh ", publishing_office: "m", pages: 131, publication_year: 1990, status: "на руках"},
	{id: 5, authors: "t tr qtr5wytw", name: "wry hhh  r5 y", publishing_office: "spb", pages: 131, publication_year: 1999, status: "доступна"},
	{id: 6, authors: "er tr ywrwrwy ", name: "ry ryyrr", publishing_office: "drspb", pages: 4535, publication_year: 2018, status: "на руках"},
	{id: 7, authors: "gr ewe t4 ", name: "ryu yywyty", publishing_office: "rtr ", pages: 156, publication_year: 2018, status: "на руках"}
];

let employeesData = [
	{id: 1, surname: "dgdrgngsgs", name: "zfjkdjdoiug", middle_name: "dgjlsjgokrgked" , position: "sfesf sfsfs", phone_number: "+71234567910"},
	{id: 2, surname: "dgdr", name: "etrtr", middle_name: "jgokrgked" , position: "sfesf sfsfs", phone_number: "+70009090908"},
	{id: 3, surname: "dfgfgdrg", name: "yyy", middle_name: "rtytyrgked" , position: "ioiouou", phone_number: "+73543647646"},
	{id: 4, surname: "uioouoio", name: "yyy", middle_name: "yiuid" , position: "uoiouop", phone_number: "+75346436646"},
	{id: 5, surname: "dotertet", name: "erww", middle_name: "duiiud" , position: "ioiouou", phone_number: "+64646547567"}
];

let employeesBooksData = [];

let journalDate = [
	{id: 1, date_of_issue: "12.11.2019", employee: "segfsffdf", book: "dgrdgdreg sg stg hfss ghsf shgggggggggg", status: "на руках", return_date: "", who_issued: "sfs sfsfsfsfs" },
	{id: 2, date_of_issue: "13.11.2019", employee: "segfsffdf", book: "ddgrgg shgggggggdfgstg hfss ghsf sooioou", status: "возвращена", return_date: "17.11.2019", who_issued: "sfs sfsfsfsfs" },
	{id: 4, date_of_issue: "14.11.2019", employee: "tytytyty", book: "dgrdgdreg uiouuog uiyi tuytyt yryry rryyt r ", status: "возвращена", return_date: "17.11.2019", who_issued: "рррррр" },
	{id: 5, date_of_issue: "15.11.2019", employee: "segfsffdf", book: "dgrdgdreg   yi yiyiyiyuiiiiry ttrttt tiiyig", status: "на руках", return_date: "", who_issued: "sfs sfsfsfsfs" },
	{id: 6, date_of_issue: "15.11.2019", employee: "segfsffdf", book: "dgrdgdreg sg stg hyiyifss ghsf shuiuyiuiu", status: "на руках", return_date: "", who_issued: "рррррр" }
];



//------------------------------------------Вкладка "Книги"------------------------------------------------------------

// таблица с книгами
let booksTable = {
	width:1000,
	scrollY:true,
	scrollX:true,
	view:"datatable",
	id: "booksTable",
	columnWidth:200,
	select: true,
	footer:true,
	columns:[
		{id:"id", header:["ID книги",{ content:"textFilter"}], width: 100, sort:"int"},
		{id:"authors", header:["Авторы",{ content:"textFilter"}],  sort:"string", adjust: true},
		{id:"name", header:["Название",{ content:"textFilter"}],  sort:"string", adjust: true},
		{id:"publishing_office", header:["Издательство",{ content:"textFilter"}],  sort:"string", adjust: true},
		{id:"publication_year", header:["Год издания",""], width:80, sort:"int"},
		{id:"pages", header:["Страниц",""], width:100},
		{id:"status", header:["Статус",{content:"customSelectStatusBook"}], width:120, css:"status_color"}
	]
};

// кнопки на вкладке "Книги"
let booksButtons = {
    id:"booksButtons",
    cols:[
    	{id:"give_out_book", view:"button", value:"Выдать книгу", width:150, height: 40, click:giveOutBook },
    	{id:"take_back_book", view:"button", value:"Принять книгу", width:150, click:takeBackBook },
        {},
        {id:"btn_edit_book", view:"button", value:"Изменить", width:100, click:editBook},
        {id:"btn_add_book", view:"button", value:"Добавить", width:100, click:addBook },
        {id:"btn_remove_book", view:"button", value:"Удалить", width:100, click:removeBook },
    ]
};

// вкладка "Книги"
let books = {
	id: 'books',
	rows:[
		{template:"Something", height: 40},
		{cols:[booksTable], height: 400},
		{cols:[booksButtons]}
	]
};

// фильтр книг по статусу 
webix.ui.datafilter.customSelectStatusBook = {
    getInputNode:function(node){ return node.firstChild?node.firstChild.firstChild : { value: null}; },
    getValue:function(node){ return this.getInputNode(node).value;  },
    setValue:function(node, value){ this.getInputNode(node).value = value;  },
    refresh: function(master, node, column){  
      master.registerFilter(node, column, this);
      column.compare = column.compare || function(value, filter){
        if (filter === "all")
          return true;
        else if (filter === "available")
          return value.toString() == "доступна";
        else if (filter === "unavailable")
          return value.toString() == "на руках";
      };      
      node.onchange = function(){    
        master.filterByAll();
      };
      node.onclick = webix.html.preventEvent;
    },
    render:function(a, b){
      return  "<select style='height:30px; font-family:Verdana; color:#556; width:90px'; id="+b.columnId+">" +
        "<option value='all'>Все</option>" +
        "<option value='available'>Доступна</option>" +
        "<option value='unavailable'>На руках</option>" +
        "</select>";
    }
  };

// форма для добавления книг
let formAddBook = {
  	view:"form",
  	id:"formAddBook",
  	width: 500,
  	elements:[
  		{ view:"text", placeholder:"ID книги", name:"id", width: 200}, 
  		{ view:"text", placeholder:"Авторы", name:"authors"},
  		{ view:"text", placeholder:"Название", name:"name"},
  		{cols:[
  			{ view:"text", placeholder:"Издательство", name:"publishing", width: 200},
  			{ view:"text", placeholder:"Год", name:"year", width: 90},
  			{ view:"text", placeholder:"Количество страниц", name:"pages"},
  		]},
  		{cols:[
  			{},
  			{ view:"button", value:"Отмена", width:150, click:function(){
  				$$("formAddBook").clear();
  				$$("formAddBook").clearValidation();
  				$$('windowAddBook').hide();
  			}},
  			{ view:"button", type:"form", value:"Добавить книгу", width:150, click:function(){
  				$$("formAddBook").validate();
  				if ($$("formAddBook").validate() == true){          
  					var values = this.getFormView().getValues();
  					webix.message(JSON.stringify(values));
  				}
  			}}
  		]}
	],
	// правила валидации
	rules:{
		"id":webix.rules.isNumber,
		"authors":webix.rules.isNotEmpty,
		"name":webix.rules.isNotEmpty,
		"publishing":webix.rules.isNotEmpty,
		"year":webix.rules.isNumber,
		"pages":webix.rules.isNumber
	}
};

// форма для измененения книг
let formEditBook = {
  	view:"form",
  	id:"formEditBook",
  	width: 500,
  	elements:[
  		{ view:"text", placeholder:"ID книги", name:"id", width: 200}, 
  		{ view:"text", placeholder:"Авторы", name:"authors"},
  		{ view:"text", placeholder:"Название", name:"name"},
  		{cols:[
  			{ view:"text", placeholder:"Издательство", name:"publishing", width: 200},
  			{ view:"text", placeholder:"Год", name:"year", width: 90},
  			{ view:"text", placeholder:"Количество страниц", name:"pages"},
  		]},
  		{cols:[
  			{},
  			{ view:"button", value:"Отмена", width:150, click:function(){
  				$$("formEditBook").clear();
  				$$("formEditBook").clearValidation();
  				$$('windowEditBook').hide();
  			}},
  			{ view:"button", type:"form", value:"Изменить", width:150, click:function(){
  				$$("formEditBook").validate();
  				if ($$("formEditBook").validate() == true){          
  					var values = this.getFormView().getValues();
  					webix.message(JSON.stringify(values));
  				}
  			}}
  		]}
	],
	// правила валидации
	rules:{
		"id":webix.rules.isNumber,
		"authors":webix.rules.isNotEmpty,
		"name":webix.rules.isNotEmpty,
		"publishing":webix.rules.isNotEmpty,
		"year":webix.rules.isNumber,
		"pages":webix.rules.isNumber
	}
};

// форма выдачи книги


// окно с формой для добавления книги
let windowAddBook = webix.ui({
    view:"window",
    modal: true,
    id:"windowAddBook",
    head:"Введите данные новой книги",
    position:"center",
    width: 500,
    height: 400,
    body:formAddBook
});

// окно с формой для изменения книги
let windowEditBook = webix.ui({
    view:"window",
    modal: true,
    id:"windowEditBook",
    head:"Изменение книги",
    position:"center",
    width: 500,
    height: 400,
    body:formEditBook
});

// окно с формой для выдачи книги
let windowGiveOutBook = webix.ui({
    view:"window",
    modal: true,
    id:"windowGiveOutBook",
    head:"",
    position:"center",
    width: 500,
    height: 400,
    body:formGiveOutBook
});

// обработчик события кнопки "Изменить"
function editBook(id){
    $$('windowEditBook').show();
    webix.message("Click on button " + id);
}

// обработчик события кнопки "Добавить"  
function addBook(id){
    $$('windowAddBook').show();
    webix.message("Click on button " + id);
}

// обработчик события кнопки "Удалить"
function removeBook(id){
    // your code here
    webix.message("Click on button " + id);
}

// обработчик события кнопки "Выдать книгу"
function giveOutBook(id){
    $$('windowGiveOutBook').show();
    webix.message("Click on button " + id);
}

// обработчик события кнопки "Принять книгу"
function takeBackBook(id){
    // your code here
    webix.message("Click on button " + id);
}


//-------------------------------------------Вкладка "Сотрудники"--------------------------------------------------------


let employeesTable = {
	width:1000,
	scrollY:true,
	scrollX:true,
	view:"datatable",
	id: "employeesTable",
	select: true,
	columnWidth:200,
	columns:[
		{id:"surname", header:["Фамилия",{ content:"textFilter" }],  sort:"string"},
		{id:"name", header:["Имя",{ content:"textFilter" }],  sort:"string"},
		{id:"middle_name", header:["Отчество",{ content:"textFilter" }],  sort:"string"},
		{id:"position", header:["Должность",{ content:"textFilter" }], sort:"string"},
		{id:"phone_number", header:["Телефон",{ content:"textFilter" }], width:120}
	]
};

let employeesButtons = {
    id:"employeesButtons",
    cols:[
        {},
        { view:"button", id:"btn_edit_employee",value:"Изменить", width:100, click:editEmployee },
        { view:"button", id:"btn_add_employee", value:"Добавить", width:100, click:addEmployee },
        { view:"button", id:"btn_remove_employee", value:"Удалить", width:100, click:removeEmployee },
    ]
};

let employeesBooksTable = {
	width:1000,
	view:"datatable",
	id: "employeesBooks",
	select: true,
	columnWidth:200,
	columns:[
		{id:"id", header:["ID книги",{ content:"textFilter"}], width: 100, sort:"int"},
		{id:"name", header:["Книга",{ content:"textFilter"}],  sort:"string", adjust: true, width: 400},		
		{id:"date_of_issue", header:["Дата выдачи",{ content:"textFilter"}],  sort:"date"},		
	]
};

let employees = {
	id:"employees",
	rows:[
		{cols:[employeesTable], height: 400},
		{cols:[employeesButtons]},
		{cols:[{template:"Книги на руках:", css:"subtitle"}], height: 40},
		{cols:[employeesBooksTable],  height: 200},
		{cols:[{view:"button", id:"take_back_book", value:"Принять книгу", width:150, click:takeBackBook}]}
	]
};

// форма для добавления сотрудников
let formAddEmployee = {
  	view:"form",
  	id:"formAddEmployee",
  	width: 650,
  	elements:[
  		{cols:[
  			{ view:"text", placeholder:"Фамилия", name:"surname", width: 200}, 
  			{ view:"text", placeholder:"Имя", name:"name",  width: 200},
  			{ view:"text", placeholder:"Отчество", name:"middle_name",  width: 200}
  		]},
  		{cols:[
  			{ view:"text", placeholder:"Должность", name:"position", width: 200},
  			{ view:"text", placeholder:"Номер телефона", name:"phone_number", width: 200},
  		]},
  		{cols:[
  			{},
  			{ view:"button", value:"Отмена", width:150, click:function(){
  				$$("formAddEmployee").clear();
  				$$("formAddEmployee").clearValidation();
  				$$('windowAddEmployee').hide();
  			}},
  			{ view:"button", type:"form", value:"Добавить сотрудника", width:200, click:function(){
  				$$("formAddEmployee").validate();
  				if ($$("formAddEmployee").validate() == true){          
  					var values = this.getFormView().getValues();
  					webix.message(JSON.stringify(values));
  				}
  			}}
  		]}
	],
	// правила валидации
	rules:{
		"surname":webix.rules.isNotEmpty,
		"name":webix.rules.isNotEmpty,
		"middle_name":webix.rules.isNotEmpty,
		"position":webix.rules.isNotEmpty,
		"phone_number":webix.rules.isNumber
	}
};

// форма для изменения сотрудников
let formEditEmployee = {
  	view:"form",
  	id:"formEditEmployee",
  	width: 650,
  	elements:[
  		{cols:[
  			{ view:"text", placeholder:"Фамилия", name:"surname", width: 200}, 
  			{ view:"text", placeholder:"Имя", name:"name",  width: 200},
  			{ view:"text", placeholder:"Отчество", name:"middle_name",  width: 200}
  		]},
  		{cols:[
  			{ view:"text", placeholder:"Должность", name:"position", width: 200},
  			{ view:"text", placeholder:"Номер телефона", name:"phone_number", width: 200},
  		]},
  		{cols:[
  			{},
  			{ view:"button", value:"Отмена", width:150, click:function(){
  				$$("formEditEmployee").clear();
  				$$("formEditEmployee").clearValidation();
  				$$('windowEditEmployee').hide();
  			}},
  			{ view:"button", type:"form", value:"Изменить", width:200, click:function(){
  				$$("formEditEmployee").validate();
  				if ($$("formEditEmployee").validate() == true){          
  					var values = this.getFormView().getValues();
  					webix.message(JSON.stringify(values));
  				}
  			}}
  		]}
	],
	// правила валидации
	rules:{
		"surname":webix.rules.isNotEmpty,
		"name":webix.rules.isNotEmpty,
		"middle_name":webix.rules.isNotEmpty,
		"position":webix.rules.isNotEmpty,
		"phone_number":webix.rules.isNumber
	}
};

// окно с формой для добавления сотрудников
let windowAddEmployee = webix.ui({
    view:"window",
    modal: true,
    id:"windowAddEmployee",
    head:"Введите данные нового сотрудника",
    position:"center",
    width: 800,
    height: 400,
    body:formAddEmployee
});

// окно с формой для изменения сотрудников
let windowEditEmployee = webix.ui({
    view:"window",
    modal: true,
    id:"windowEditEmployee",
    head:"Введите данные нового сотрудника",
    position:"center",
    width: 800,
    height: 400,
    body:formEditEmployee
});

// обработчик события кнопки "Изменить" 
function editEmployee(id){
    $$('windowEditEmployee').show();
    webix.message("Click on button " + id);
}

// обработчик события кнопки "Добавить"  
function addEmployee(id){
    $$('windowAddEmployee').show();
    webix.message("Click on button " + id);
}

// обработчик события кнопки "Удалить"
function removeEmployee(id){
    // your code here
    webix.message("Click on button " + id);
}

// обработчик события кнопки "Принять книгу"
function takeBackBook(id){
    // your code here
    webix.message("Click on button " + id);
}



//---------------------------------------------Вкладка "Журнал"----------------------------------------------

let journalTable = {
	width:1000,
	scrollY:true,
	scrollX:true,
	view:"datatable",
	id:"journalTable",
	columnWidth:200,
	//select: true,
	columns:[
		{id:"id", header:["№",{ content:"textFilter" }], sort:"int", width:50},
		{id:"date_of_issue", header:["Дата выдачи",{ content:"textFilter" }],  width:140, sort:"string"},
		{id:"employee", header:["Сотрудники",{ content:"textFilter" }],  sort:"string", adjust: true},
		{id:"book", header:["Книги",{ content:"textFilter" }],  sort:"string", adjust: true},
		{id:"status", header:["Статус",{content:"customSelectStatus"}], width:140},
		{id:"return_date", header:["Дата возврата",{ content:"textFilter" }],  width:140, sort:"string"},
		{id:"who_issued", header:["Кем выдана", { content:"textFilter" }], sort:"string", adjust: true}
	]
};


webix.ui.datafilter.customSelectStatus = {
    getInputNode:function(node){ return node.firstChild?node.firstChild.firstChild : { value: null}; },
    getValue:function(node){ return this.getInputNode(node).value;  },
    setValue:function(node, value){ this.getInputNode(node).value = value;  },
    refresh: function(master, node, column){  
      master.registerFilter(node, column, this);
      column.compare = column.compare || function(value, filter){
        if (filter === "all")
          return true;
        else if (filter === "available")
          return value.toString() == "возвращена";
        else if (filter === "unavailable")
          return value.toString() == "на руках";
      };      
      node.onchange = function(){    
        master.filterByAll();
      };
      node.onclick = webix.html.preventEvent;
    },
    render:function(a, b){
      return  "<select style='height:30px; font-family:Verdana; color:#556; width:120px'; id="+a.columnId+">" +
        "<option value='all'>Все</option>" +
        "<option value='available'>Возвращена</option>" +
        "<option value='unavailable'>На руках</option>" +
        "</select>";
    }
  };


  let journal = {
	rows:[
		{cols:[journalTable]},
		{cols:[{template:"something", height:100}]}
	],
	id:"journal"
};


//-----------------------------------------------------------------------------------------------------------

let toolbar = {
    view:"toolbar",
    id:"myToolbar",
    cols:[
        {},
        { view:"button", id:"btn_log_in", value:"Log in", width:100, click: logIn },
        { view:"button", id:"btn_log_out", value:"Log out", width:100 }
    ]
};

let tabview = {
    rows:[
  	{
  		view:"tabbar", type:"wide", multiview:true,
  		options:[
  			{value:"Книги", id:"books", width: 160},
  			{value:"Сотрудники", id:"employees", width: 160},
  			{value:"Журнал", id:"journal",  width: 160}
  		]
  	},
  	{
  		cells:[
  			books,
  			employees,
  			journal
  		]
  	}
  ]
};

// форма авторизации
let formLogIn = {
  	view:"form",
  	id:"formLogIn",
  	width: 350,
  	elements:[  		
  			{ view:"text", placeholder:"Логин", name:"login", width: 250, align:"center"}, 
  			{ view:"text", type:"password", placeholder:"Пароль", name:"pass",  width: 250, align:"center"},  	
  		{cols:[
  			{},
  			{ view:"button", value:"Отмена", width:125, click:function(){
  				$$("formLogIn").clear();
  				$$("formLogIn").clearValidation();
  				$$('windowLogIn').hide();
  			}},
  			{ view:"button", type:"form", value:"Войти", width:125, click:function(){
  				$$("formLogIn").validate();
  				if ($$("formLogIn").validate() == true){          
  					var values = this.getFormView().getValues();
  					webix.message(JSON.stringify(values));
  				}
  			}},
  			{}
  		]}
	],
	// правила валидации
	rules:{
		"login":webix.rules.isNotEmpty,
		"pass":webix.rules.isNotEmpty
	}
};


// окно с формой авторизации
let windowLogIn = webix.ui({
    view:"window",
    modal: true,
    id:"windowLogIn",
    head:"Введите логин и пароль",
    position:"center",
    width: 400,
    height: 350,
    body:formLogIn
});

function logIn(id){
	$$("windowLogIn").show();
	webix.message("Click on button " + id);
}


webix.ready(function() {
	let myGUI = webix.ui({
		container:"wrapper",
		rows:[
			toolbar,
			tabview
		]
	})
	$$('booksTable').parse(booksData);
	$$('employeesTable').parse(employeesData);
	//$$('employeesBooksTable').parse();
	$$('journalTable').parse(journalDate);
	$$('employeesTable').adjust();

});


