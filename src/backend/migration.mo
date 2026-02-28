import Map "mo:core/Map";
import Text "mo:core/Text";
import Float "mo:core/Float";

module {
  // Types from old actor (without orders)
  type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
    inStock : Bool;
  };

  type BlogPost = {
    id : Text;
    title : Text;
    content : Text;
    excerpt : Text;
    publishDate : Int;
    tags : [Text];
    imageUrl : Text;
    author : Text;
  };

  type ContactMessage = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    createdAt : Int;
  };

  // Order types for new actor
  type OrderItem = {
    productId : Text;
    productName : Text;
    price : Float;
    quantity : Nat;
  };

  type Order = {
    id : Text;
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    customerAddress : Text;
    items : [OrderItem];
    totalAmount : Float;
    status : Text; // "pending", "confirmed", "shipped", "delivered"
    createdAt : Int;
  };

  // Old actor state (without orders)
  type OldActor = {
    products : Map.Map<Text, Product>;
    blogPosts : Map.Map<Text, BlogPost>;
    contactMessages : Map.Map<Text, ContactMessage>;
  };

  // New actor state (with orders)
  type NewActor = {
    products : Map.Map<Text, Product>;
    blogPosts : Map.Map<Text, BlogPost>;
    contactMessages : Map.Map<Text, ContactMessage>;
    orders : Map.Map<Text, Order>;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      orders = Map.empty<Text, Order>()
    };
  };
};
