import List "mo:core/List";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  // Types
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

  // Storage
  let products = Map.empty<Text, Product>();
  let blogPosts = Map.empty<Text, BlogPost>();
  let contactMessages = Map.empty<Text, ContactMessage>();

  // Products
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filteredProducts = List.empty<Product>();
    for (product in products.values()) {
      if (Text.equal(product.category, category)) {
        filteredProducts.add(product);
      };
    };
    filteredProducts.toArray();
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (products.containsKey(product.id)) {
      Runtime.trap("Product with id already exists");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not products.containsKey(product.id)) {
      Runtime.trap("Product with id does not exist");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not products.containsKey(id)) {
      Runtime.trap("Product with id does not exist");
    };
    products.remove(id);
  };

  // Blog Posts
  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  public query ({ caller }) func getBlogPostById(id : Text) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) { post };
    };
  };

  public shared ({ caller }) func addBlogPost(post : BlogPost) : async () {
    if (blogPosts.containsKey(post.id)) {
      Runtime.trap("Post with id already exists");
    };
    blogPosts.add(post.id, post);
  };

  public shared ({ caller }) func deleteBlogPost(id : Text) : async () {
    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Post with id does not exist");
    };
    blogPosts.remove(id);
  };

  // Contact Messages
  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    contactMessages.values().toArray();
  };

  public shared ({ caller }) func submitContactMessage(message : ContactMessage) : async () {
    if (contactMessages.containsKey(message.id)) {
      Runtime.trap("Message with id already exists");
    };
    contactMessages.add(message.id, message);
  };
};
