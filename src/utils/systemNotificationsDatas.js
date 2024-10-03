export const notificationsDatas = {
    "user" : {
        "ON_REGISTERED" : { 
            "title" : "Bienveue!!!",
            "message" : "Nous sommes heureux de vous compter parmi nous. Sur jiraShopping, Vendez ce que vous voulez gratuitement.\nTout le monde merite une seconde chance, meme votre produit.",
            "page": "Home",
            "datas": { "type": "basket_add" }
        },
    },
    "basket": {
      "ON_BASKET_ADD": {
        "title": "Produit ajouté au panier !",
        "message": "Votre article a été ajouté avec succès.",
        "data" : {"component" : "Preferences", "nestedComponent":"Basket", "datas":{}}
      },
      "ON_BASKET_REMOVE": {
        "title": "Produit retiré du panier !",
        "message": "Votre article a été retiré avec succès.",
        "data" : {"component" : "Preferences", "nestedComponent":"Basket", "datas":{}}
      }
    },

    "product": {
        "ONE_NEW_PRODUCT": {
            "title": "Nouveau produit disponible !",
            "message": "Découvrez notre dernier produit ajouté.",
            "page": "ProductDetails",
            "datas": { "type": "new_product" }
        },
        "DISCOUNT_ON_PRODUCT": {
            "title": "Promotion sur un produit !",
            "message": "Ne manquez pas la remise sur ce produit.",
            "page": "ProductDetails",
            "datas": { "type": "discount" }
        },
        "ON_NEW_COMMENT" : { 
            "title" : "Nouveau Commentaire",
            "message" : "Votre produit a un nouveau commentaire. Profitez-en pour séduire le client.",
            "action" : "AllComments",
        },
        "ON_RESPONSE_COMMENT" : { 
            "title" : "Nouveau Commentaire",
            "message" : "Votre commentaire a reçu a une nouvelle réponse. Profitez-en pour séduire le client.",
            "action" : "AllComments",
        },
    }
}