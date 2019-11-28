let booksData = [
	{id: 1, authors: "dgdrg gsgs", name: "zfjkdjdoiug", publishing_office: "dgjlsjg okrgked" , publication_year: 2005, status: ""},
	{id: 2, authors: "gdxgr e ghtrs", name: "ert eshwshrtryht", publishing_office: "m" , publication_year: 2008, status: ""},
	{id: 3, authors: "dg wrhwrr tr wtrs", name: "r5y5 4ryw45y", publishing_office: "spb" , publication_year: 2015, status: ""},
	{id: 4, authors: "wr rrthw t", name: "zwy yhtwh ", publishing_office: "m" , publication_year: 1990, status: ""},
	{id: 5, authors: "t tr qtr5wytw", name: "wry hhh  r5 y", publishing_office: "spb" , publication_year: 1999, status: ""},
	{id: 6, authors: "er tr ywrwrwy ", name: "ry ryyrr", publishing_office: "drspb" , publication_year: 2018, status: ""},
	{id: 7, authors: "gr ewe t4 ", name: "ryu yywyty", publishing_office: "rtr " , publication_year: 2018, status: ""}
]

let toolbar = {
    view:"toolbar",
    id:"myToolbar",
    cols:[
        {},
        { view:"button", value:"Log in", width:100 },
        { view:"button", value:"Log out", width:100 }
    ]
};

let booksTable = {
	view:"datatable",
	id: "booksTable",
	select: true,
	autowidth:true,
	columnWidth:200,
	columns:[
		{id:"id", header:"ID книги", width: 100, sort:"int"},
		{id:"authors", header:"Авторы",  sort:"string"},
		{id:"name", header:"Название",  sort:"string"},
		{id:"publishing_office", header:"Издательство",  sort:"string"},
		{id:"publication_year", header:"Год издания",  sort:"int"},
		{id:"status", header:{text:"#", rowspan:2}, width:50, css:"status"}
	]
}

let booksButtons = {
    id:"booksButtons",
    cols:[
    	{ view:"button", value:"Выдать книгу", width:100, height: 40 },
    	{ view:"button", value:"Принять книгу", width:100 },
        {},
        { view:"button", value:"Изменить", width:100 },
        { view:"button", value:"Добавить", width:100 },
        { view:"button", value:"Удалить", width:100 },
        {}
    ]
};

let books = {
	id: 'books',
	rows:[
	{template:"Search", height: 40},
	{cols:[booksTable], height: 400},
	{cols:[booksButtons]}
	]
}

let employees = {
	template:"employees",
	id:"employees"
}

let journal = {
	template:"journal",
	id:"journal"
}

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

webix.ready(function() {
	let myGUI = webix.ui({
		rows:[
			toolbar,
			tabview
		]
	});
	$$('booksTable').parse(booksData)
});

