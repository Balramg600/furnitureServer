// const { json } = require('express');
const express = require('express');
const app = express();
const cors=require('cors');
const { emptyQuery } = require('pg-protocol/dist/messages');
app.use(express.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
app.use(cors());
const cookieParser= require('cookie-parser');
app.use(cookieParser('abcdef-3477819'));
// let cookie=require('cookie');
const cookie = require('cookie');
const { json } = require('express');
// app.use(cookie());

let users=[{email:'user123@gmail.com', password:'user123', role:"user"},
           {email:'admin123@gmail.com', password:'admin123', role:"admin"}];
let orderData=[];
productData=[
    {
            prodCode:	"DS2S245",
            category:	"Dining",
            desc:	[
                    "Two	seater	Dining	Set",
                    "Built	from	High	quality	wood",
                    "1	year	warranty"
            ],
            img:
                    "https://hometown.gumlet.io/media/product/61/9353/47156/1-catalog_255.jpg",
            ingredients:	[
                    {	ingName:	"Dining	Table",	qty:	1	},
                    {	ingName:	"Chair",	qty:	2	}
            ],
            title:	"Two	seater	Dining	Set"
    },
    {
            prodCode:	"DS6S761",
            category:	"Dining",
            desc:	[
                    "Six	Seater	Dining	Set	in	Antique	Cherry	Colour",
                    "Assembly	by	Skilled	Carpenters",
                    "Made	from	Teak	wood"
            ],
            img:
                    "https://hometown.gumlet.io/media/product/03/9453/94498/1-catalog_255.jpg",
            ingredients:	[
                    {	ingName:	"Dining	Table",	qty:	1	},
                    {	ingName:	"Chair",	qty:	4	},
                    {	ingName:	"Bench",	qty:	1	}
            ],
            title:	"Six	Seater	Dining	Set"
    },
    {
            prodCode:	"DS4S177",
            category:	"Dining",
            desc:	[
                    "Mild	Steel	Four	Seater	Dining	Set	in	Black	Colour",
                    "Knock-down	construction	for	easy	transportation"
            ],
            img:
                    "https://hometown.gumlet.io/media/product/99/3753/86779/1-catalog_255.jpg",
            ingredients:	[
                    {	ingName:	"Dining	Table",	qty:	1	},
                    {	ingName:	"Chair",	qty:	4	}
            ],
            title:	"Mild	Steel	Dining	Set"
    },
    {
            prodCode:	"DC2S705",
            category:	"Dining",
            desc:	[
                    "Solid	Wood	Dining	Chair	Set	of	Two	in	Dark	Walnut	Colour",
                    "Beautiful	design	carved	on	dining	chair",
                    "Dining	chair	seat	upholstered	in	dark	brown	Fabric"
                ],
				img:
						"https://hometown.gumlet.io/media/product/87/9453/34067/1-catalog_255.jpg",
				ingredients:	[{	ingName:	"Chair",	qty:	2	}],
				title:	"Dining	Chair	Set"
		},
		{
				prodCode:	"BN1S388",
				category:	"Dining",
				desc:	[
						"Solid	Wood	Dining	Bench	in	Dark	Walnut	Colour",
						"Comfortable	bench	for	a	relaxed	dinner"
				],
				img:
						"https://hometown.gumlet.io/media/product/94/0553/11804/1-catalog_255.jpg",
				ingredients:	[{	ingName:	"Bench",	qty:	1	}],
				title:	"Dining	Bench"
		},
		{
				prodCode:	"SF2S532",
				category:	"Drawing",
				desc:	[
						"Characteristic	Rising	Track	Arm	Rest	Design",
						"Premium	High	Gloss	Leatherette	Upholstery",
						"Independent	Headrest	And	Lumber	Support"
				],
				img:
						"https://hometown.gumlet.io/media/product/48/2753/29530/1-catalog_255.jpg",
				ingredients:	[{	ingName:	"Sofa",	qty:	1	}],
				title:	"Two	Seater	Sofa"
		},
		{
				prodCode:	"SF2S206",
				category:	"Drawing",
				desc:	["Two	Seater	Sofa	in	Blue	Colour",	"Assembly	by	Skilled	Carpenters"],
				img:
						"https://hometown.gumlet.io/media/product/20/3453/62912/1-catalog_255.jpg",
				ingredients:	[{	ingName:	"Sofa",	qty:	1	}],
				title:	"Two	Seater	Sofa"
		},
		{
				prodCode:	"SFBD311",
				category:	"Drawing",
				desc:	[
						"Sofa	Cum	bed	in	Brown	Colour",
						"Ply-wood	construction	with	hand	polished	finish",
						"Removable	fabric	cover	on	best	quality	foam	mattress",
						"Throw	cushions	and	bolsters	come	with	the	product"
				],
				img:
						"https://hometown.gumlet.io/media/product/30/3253/57132/1-catalog_255.jpg",
				ingredients:	[{	ingName:	"Sofa",	qty:	1	},	{	ingName:	"Cushions",	qty:	2	}],
				title:	"Sofa	cum	Bed"
		},
		{
				prodCode:	"BDQS381",
				category:	"Bedroom",
                desc:	[
                    "Wood	Box	Storage	King	Size	Bed	in	Wenge	Colour	",
                    "Box	Storage	included	for	Maximum	space	utilization",
                    "Mattress	is	included"
            ],
            img:
                    "https://hometown.gumlet.io/media/product/43/8153/54285/1-catalog_255.jpg",
            ingredients:	[{	ingName:	"Bed",	qty:	1	},	{	ingName:	"Mattress",	qty:	2	}],
            title:	"King	size	Bed"
    },
    {
            prodCode:	"BDQS229",
            category:	"Bedroom",
            desc:	[
                    "Wood	Hydraulic	Storage	Queen	Size	Bed",
                    "Half	hydraulic	storage",
                    "Superior	E2	grade	MDF	used	with	melamine	finish"
            ],
            img:
                    "https://hometown.gumlet.io/media/product/74/1153/94332/1-catalog_255.jpg",
            ingredients:	[{	ingName:	"Bed",	qty:	1	}],
            title:	"Queen	size	Bed"
    },
    {
            prodCode:	"ST1T425",
            category:	"Study",
            desc:	[
                    "Wood	Study	Table	in	Walnut	Colour",
                    "Assembly	by	Skilled	Carpenters",
                    "Built	from	High	Quality	Wood"
            ],
            img:
                "https://hometown.gumlet.io/media/product/02/9153/44662/1-catalog_255.jpg",
            ingredients:	[{	ingName:	"Study	Table",	qty:	1	}],
            title:	"Study	Table"
    },
    {
            prodCode:	"ST1T588",
            category:	"Study",
            desc:	[
                    "	Wood	Study	Table	in	Highgloss	White	&	Blue	Colour",
                    "Study	table	comes	with	bookshelf	on	top,	5	drawers	&	1	open	shelf",
                    "Superior	quality	MDF	with	stain	resistant	melamine	finish"
            ],
            img:
                    "https://hometown.gumlet.io/media/product/07/9553/45053/1-catalog_255.jpg",
            ingredients:	[{	ingName:	"Study	Table",	qty:	1	}],
            title:	"Study	Table"
    }
]

// https://hometown.gumlet.io/media/product/84/3673/49894/1.jpg
  app.get('/product/:prodCode', (req, res)=>{
    let prodCode=req.params.prodCode;
    let product=productData.find(n=>n.prodCode==prodCode);
    console.log(prodCode, product);
    if(product)res.send(product);
    else res.status(404).send('No Product found');
  })


  app.get('/products/:category', (req, res)=>{
    let category=req.params.category;
    let arr=productData;
    if(category=='All')res.send(arr);
    else if(category){arr=productData.filter(n=>n.category==category);
    res.send(arr);}
  })

  app.post('/products', (req, res)=>{
    let body=req.body;
    console.log(body);
    productData.push(body);
    res.send(body);
  })

  app.put('/products/:prodCode', (req, res)=>{
    let prodCode=req.params.prodCode;
    let body=req.body;
    let index=productData.findIndex(pd=>pd.prodCode==prodCode);
    if(index>=0){
        body.prodCode=prodCode;
        productData[index]=body;
        res.send(body);
    }
    else res.status(404).send('No Product found');
  })

  app.delete('/products/:prodCode', (req, res)=>{
    let prodCode=req.params.prodCode;
    let index=productData.findIndex(pd=>pd.prodCode==prodCode);
    if(index>=0){
        let prod=productData.splice(index, 1);
        res.send(prod);
    }
  })

  app.post('/login', (req, res)=>{
    let body=req.body;
    let user=users.find(n=>n.email==body.email && n.password==body.password);
    if(user){
        let ur={};
        ur.email=user.email;
        ur.role=user.role;
        res.send(ur);

    }
    else res.status(401).send('Not Found');
  })


