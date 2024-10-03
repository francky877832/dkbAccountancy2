export const offersDatas = [
	{
		id : 1,
		seller : "Francky",
		buyer : "Thomas",
		product : "1",
		realPrice : 2000,
		offers : [
			{_id:"1",from:"Thomas",price:"1200", hasGotResponse:0},{_id:"2",from:"Francky",price:"1800",hasGotResponse:0},{_id:"3",from:"Thomas",price:"1300",hasGotResponse:1,},
			{_id:"4",from:"Francky",price:"1800",hasGotResponse:1},{_id:"5",from:"Thomas",price:"1300",hasGotResponse:2,},{_id:"6",from:"Thomas",price:"1300",hasGotResponse:0,},
		],
	}
]
export const defaultOffer = [{_id:"100",hasGotResponse:0}]


export const settings = [
	{
		name : "Parametres Du Compte",
		component : "AccountSettings",
		available : true,
	},
	{
		name : "Changer De Mot De Passe",
		component : "PasswordChange",
		available : true,
	},
	{
		name : "Mes Adresses",
		component : "Address",
		available : true,
	},
	{
		name : "A Propos De Nous",
		component : "AboutUs",
		available : true,
	},
	{
		name : "Parrainage",
		component : "Referral",
		available : false,
	},
	{
		name : "Devenir Une Boutique Pro",
		component : "OpenShop",
		available : false,
	},
	{
		name : "Admin",
		component : "AdminPanel",
		available : true,
	},
	/*{
		name : "Admina",
		component : "AdminPanel",
		available : true,
	},
	{
		name : "Admin",
		component : "AdminPanel",
		available : true,
	},
	{
		name : "Admin",
		component : "AdminPanel",
		available : true,
	},*/
]




export const notifications = 
	{
		USER : {
			ON_REGISTERED : { 
				title : "Bienveue!!!",
				message : "Nous sommes heureux de vous compter parmi nous. Sur jiraShopping, Vendez ce que vous voulez gratuitement.\nTout le monde merite une seconde chance, meme votre produit.",
				action : "Account",
			},
		},

	ORDERS : {
		ON_NEW_ORDER : { 
			message : "",
			action : "",
		},
		PAYMENT_SUCCESSFUL : { 
			message : "",
			action : "",
		},
		PAYMENT_FAILED : { 
			message : "",
			action : "",
		},
		ON_ORDER_PENDING : { 
			message : "",
			action : "",
		},
		ON_ORDER_SHIPPED : { 
			message : "",
			action : "",
		},
		ON_ORDER_DELIVERED : { 
			message : "",
			action : "",
		},
	},

	OFFERS : {
		ON_NEW_OFFER : { 
			message : "",
			action : "",
		},
		ON_OFFER_RESPONSE : {
			ON_ACCEPTED : { 
				message : "",
				action : "",
			},
			ON_REFUSED : { 
				message : "",
				action : "",
			},
		}
	},

	PRODUCTS : {
		ON_NEW_LIKE : {
			title : "Nouveau Like",
			message : "Un de vos produits a reçu un nouveau Like. Précipitez-vous pour faire une propositon.",
			action : "ProductDetails",
		},
		ON_NEW_COMMENT : { 
			title : "Nouveau Commentaire",
			message : "Votre produit a un nouveau commentaire. Profitez-en pour séduire le client.",
			action : "AllComments",
		},
		ON_RESPONSE_COMMENT : { 
			title : "Nouveau Commentaire",
			message : "Votre commentaire a reçu a une nouvelle réponse. Profitez-en pour séduire le client.",
			action : "AllComments",
		},
		ON_NEW_BASKET : { 
			message : "",
			action : "",
		},
		ON_DELETE_BASKET : { 
			message : "",
			action : "",
		},
		ON_PRODUCT_UPDATED : { 
			title : "Produit Mis A Jour",
			message : "Un produit que vous suivez a ete mis a jour. Précipitez-vous pour placer un nouveau deal.",
			action : "ProductDetails",
		},
		ON_PRODUCT_CREADTED : { 
			title : "Nouveau Produit",
			message : "Une boutique que vous suivez vient d'ajouter un nouveau produit. Précipitez-vous pour faire une offre.",
			action : "ProductDetails",
		},
	},

	ADMIN : {
		MISSED_YOU : { 
			message : "",
			action : "",
		},
		NEW_PRODUCT : { 
			message : "",
			action : "",
		},
		DONT_WASTE_TIME : { 
			message : "",
			action : "",
		},
		BE_CAREFULL : {
			BAD_COMMENT : { 
				message : "",
				action : "",
			},
			BAD_PRODUCT : { 
				message : "",
				action : "",
			},
		},
	}
}
