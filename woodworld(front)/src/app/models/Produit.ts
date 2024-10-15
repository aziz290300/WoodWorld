import { FileHandle } from "./FileHandle";
export class Produit {
    id: number;
    name: string;
    price: number;
    woodtypes: Woodtypes;
    size: Size;
    stock: Stock;
    typesproduit: Typesproduit;
    souscategory: Souscategory;
    home: Home;
    category: Category;
    imageURL: string;
    images: FileHandle[];
  
    constructor() {
      this.id = 0;
      this.name = '';
      this.price = 0;
      this.woodtypes = Woodtypes.TYPE1; // Ajustez cette valeur selon vos besoins
      this.size = Size.SMALL;           // Ajustez cette valeur selon vos besoins
      this.stock = Stock.IN_STOCK;      // Ajustez cette valeur selon vos besoins
      this.typesproduit = Typesproduit.TYPE3;  // Ajustez cette valeur selon vos besoins
      this.souscategory = Souscategory.TYPE1;  // Ajustez cette valeur selon vos besoins
      this.home = Home.LIVING_ROOM;     // Ajustez cette valeur selon vos besoins
      this.category = Category.TYPE1;   // Ajustez cette valeur selon vos besoins
      this.imageURL = '';
      this.images = [];
    }
  }
  
  // Enumérations en TypeScript, à adapter selon les valeurs définies dans votre backend
  export enum Woodtypes {
    TYPE1 = 'TYPE1',
    TYPE2 = 'TYPE2',
    TYPE3 = 'TYPE3'
  }
  
  export enum Size {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'BIG'
  }
  
  export enum Stock {
    IN_STOCK = 'INSTOCK',
    OUT_OF_STOCK = 'OUTSTOCK'
  }
  
  export enum Typesproduit {
    TYPE1 = 'GALLERY',
    TYPE2 = 'ART',
  
    TYPE3 = 'PERSONALISE'
  }
  
  export enum Souscategory {
    TYPE1 = 'HOME',
    TYPE2 = 'WORKOFFICE',
    TYPE3 = 'HOTEL'
  }
  
  export enum Home {
    LIVING_ROOM = 'LIVING',
    BEDROOM = 'BEDROOM',
    KITCHEN = 'KITCHEN'
  }
  
  export enum Category {
    TYPE1 = 'GALLERY',
    TYPE2 = 'PERSONALISE',
    TYPE3 = 'ART'
  }
  
  // Modèle pour les données des images
  export class ImageData {
    fileName: string;
    fileType: string;
    data: any;
  
    constructor() {
      this.fileName = '';
      this.fileType = '';
      this.data = null;
    }
  }
  